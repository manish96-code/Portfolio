<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Models\Certificate;
use App\Models\ContactMessage;
use App\Models\Experience;
use App\Models\Project;
use App\Models\Setting;
use App\Models\Skill;
use App\Models\SocialLink;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PublicController extends Controller
{
    /**
     * Display the portfolio home landing page.
     */
    public function index()
    {
        $projects = collect();
        $skills = collect();
        $experiences = collect();
        $certificates = collect();
        $socialLinks = collect();
        $settings = [];

        try {
            $projects = Project::where('status', 'Completed')->orWhere('is_featured', true)->get();
        } catch (\Exception $e) {
            // Ignore missing table error
        }

        try {
            $skills = Skill::all()->groupBy('category');
        } catch (\Exception $e) {
            // Ignore missing table error
        }

        try {
            $experiences = Experience::orderBy('order_index')->get();
        } catch (\Exception $e) {
            // Ignore missing table error
        }

        try {
            $certificates = Certificate::all();
        } catch (\Exception $e) {
            // Ignore missing table error
        }

        try {
            $socialLinks = SocialLink::all();
        } catch (\Exception $e) {
            // Ignore missing table error
        }

        try {
            $settings = Setting::pluck('value', 'key')->all();
        } catch (\Exception $e) {
            // Ignore missing table error
        }

        // Apply defaults if table was not migrated or database is empty
        if (count($settings) === 0) {
            $settings = [
                'name' => 'Manish Kumar',
                'title' => 'Full Stack Laravel Developer',
                'location' => 'Jaipur, Rajasthan, India',
                'current_company' => 'Comestro Techlabs Pvt Ltd',
                'education' => 'BCA, Purnea University',
                'objective' => 'Highly motivated Full Stack Developer Intern looking to leverage solid expertise in Laravel, React, and MySQL database management to build modern web environments.',
                'bio' => 'I build premium, high-performance web applications using Laravel, React, and Inertia.js. Specialize in crafting pixel-perfect frontend layouts using Tailwind CSS and integrating Model Context Protocol servers for AI agents.',
                'email' => 'manish.kumar@example.com',
            ];
        }

        if (count($skills) === 0) {
            $skills = collect([
                'Backend' => collect([
                    ['name' => 'Laravel', 'level' => 95],
                    ['name' => 'PHP', 'level' => 95],
                    ['name' => 'Livewire', 'level' => 85]
                ]),
                'Frontend' => collect([
                    ['name' => 'React', 'level' => 90],
                    ['name' => 'JavaScript', 'level' => 92],
                    ['name' => 'Tailwind CSS', 'level' => 95]
                ]),
                'Database' => collect([
                    ['name' => 'MySQL', 'level' => 88]
                ]),
                'Tools' => collect([
                    ['name' => 'Git', 'level' => 90],
                    ['name' => 'GitHub', 'level' => 95]
                ])
            ]);
        }

        if (count($projects) === 0) {
            $projects = collect([
                (object)[
                    'id' => 1,
                    'title' => 'KitabiAdda',
                    'slug' => 'kitabi-adda',
                    'description' => 'A premium Multi-Vendor Book Marketplace designed for students, sellers, and readers to interact and transact seamlessly.',
                    'technologies' => ['Laravel', 'React', 'Inertia', 'MySQL', 'Tailwind CSS'],
                    'github_url' => 'https://github.com',
                    'live_url' => 'http://localhost:8000',
                    'status' => 'Completed',
                    'is_featured' => true,
                ],
                (object)[
                    'id' => 2,
                    'title' => 'Campus Connect',
                    'slug' => 'campus-connect',
                    'description' => 'A dynamic social and academic platform for students to share notes, assignments, and interact in real-time.',
                    'technologies' => ['Laravel', 'React', 'MySQL', 'Tailwind CSS', 'Inertia'],
                    'github_url' => 'https://github.com',
                    'live_url' => 'http://localhost:8000',
                    'status' => 'Completed',
                    'is_featured' => true,
                ],
                (object)[
                    'id' => 3,
                    'title' => 'Gym Management SaaS',
                    'slug' => 'gym-management-saas',
                    'description' => 'A multi-tenant software-as-a-service system designed for fitness clubs to handle subscriptions, billing, and attendance tracking.',
                    'technologies' => ['Laravel', 'React', 'MySQL', 'Tailwind CSS', 'Inertia'],
                    'github_url' => 'https://github.com',
                    'live_url' => 'http://localhost:8000',
                    'status' => 'In Progress',
                    'is_featured' => false,
                ]
            ]);
        }

        if (count($experiences) === 0) {
            $experiences = collect([
                (object)[
                    'company' => 'Comestro Techlabs Pvt Ltd',
                    'designation' => 'Full Stack Developer Intern',
                    'duration' => 'Currently',
                    'description' => "Developed multi-vendor bookstore applications (KitabiAdda) and academic portals using Laravel, Inertia, and React. Optimized SQL query performance and integrated custom MCP server nodes to assist in codebase analysis.",
                    'skills_used' => ['Laravel', 'React', 'Inertia.js', 'Tailwind CSS', 'MySQL', 'Git'],
                    'is_current' => true,
                    'order_index' => 0,
                ]
            ]);
        }

        if (count($socialLinks) === 0) {
            $socialLinks = collect([
                (object)['platform' => 'GitHub', 'url' => 'https://github.com', 'icon' => 'github'],
                (object)['platform' => 'LinkedIn', 'url' => 'https://linkedin.com', 'icon' => 'linkedin'],
                (object)['platform' => 'Email', 'url' => 'mailto:manish.kumar@example.com', 'icon' => 'mail'],
            ]);
        }

        return Inertia::render('Public/Home', [
            'projects' => $projects,
            'skills' => $skills,
            'experiences' => $experiences,
            'certificates' => $certificates,
            'socialLinks' => $socialLinks,
            'settings' => $settings,
        ]);
    }

    /**
     * Display details for a single project.
     */
    public function projectDetails($slug)
    {
        $project = Project::where('slug', $slug)->firstOrFail();
        $socialLinks = SocialLink::all();
        $settings = Setting::pluck('value', 'key')->all();

        return Inertia::render('Public/ProjectDetails', [
            'project' => $project,
            'socialLinks' => $socialLinks,
            'settings' => $settings,
        ]);
    }

    /**
     * Display public blogs list.
     */
    public function blogList(Request $request)
    {
        $query = Blog::where('status', 'published');

        if ($request->has('search')) {
            $search = $request->get('search');
            $query->where(function($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('summary', 'like', "%{$search}%")
                  ->orWhere('content', 'like', "%{$search}%");
            });
        }

        if ($request->has('category') && $request->get('category') !== 'all') {
            $query->where('category', $request->get('category'));
        }

        $blogs = $query->latest()->get();
        $categories = Blog::where('status', 'published')->distinct()->pluck('category')->all();
        $socialLinks = SocialLink::all();
        $settings = Setting::pluck('value', 'key')->all();

        return Inertia::render('Public/BlogList', [
            'blogs' => $blogs,
            'categories' => array_merge(['all'], $categories),
            'filters' => $request->only(['search', 'category']),
            'socialLinks' => $socialLinks,
            'settings' => $settings,
        ]);
    }

    /**
     * Show a single blog post.
     */
    public function blogShow($slug)
    {
        $blog = Blog::where('slug', $slug)->where('status', 'published')->firstOrFail();
        $socialLinks = SocialLink::all();
        $settings = Setting::pluck('value', 'key')->all();

        return Inertia::render('Public/BlogShow', [
            'blog' => $blog,
            'socialLinks' => $socialLinks,
            'settings' => $settings,
        ]);
    }

    /**
     * Handle public contact form submissions.
     */
    public function submitContact(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'subject' => 'nullable|string|max:255',
            'message' => 'required|string',
        ]);

        ContactMessage::create($validated);

        return back()->with('success', 'Thank you! Your message has been sent successfully.');
    }

    /**
     * Download public resume file.
     */
    public function downloadResume()
    {
        $resumePath = Setting::get('resume_file');
        
        if ($resumePath && file_exists(public_path($resumePath))) {
            return response()->download(public_path($resumePath), 'Manish_Kumar_Resume.pdf');
        }

        return back()->with('error', 'Resume file is currently unavailable.');
    }
}

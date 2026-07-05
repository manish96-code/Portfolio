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
        $projects = Project::where('status', 'Completed')->orWhere('is_featured', true)->get();
        $skills = Skill::all()->groupBy('category');
        $experiences = Experience::orderBy('order_index')->get();
        $certificates = Certificate::all();
        $socialLinks = SocialLink::all();
        
        // Fetch all key-value settings into a single array
        $settings = Setting::pluck('value', 'key')->all();

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

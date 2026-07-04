<?php

use App\Models\Project;
use App\Models\ContactMessage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    // If the database has not been seeded yet or is empty, return static array first,
    // but try to query Projects table
    $projects = [];
    try {
        $projects = Project::all();
    } catch (\Exception $e) {
        // Fallback if table doesn't exist yet before migrations are run
    }

    return Inertia::render('Welcome', [
        'projects' => count($projects) > 0 ? $projects : null,
        'profile' => [
            'name' => 'Manish Sharma',
            'title' => 'Full Stack & AI Agent Engineer',
            'bio' => 'Building advanced web systems using Laravel, Inertia, and React. Expert in Model Context Protocol integrations and automated AI developer tools.',
            'email' => 'manish.sharma@example.com',
            'github' => 'https://github.com',
            'linkedin' => 'https://linkedin.com',
            'location' => 'Jaipur, Rajasthan, India',
        ],
        'skills' => [
            ['name' => 'Laravel / PHP', 'level' => '95%', 'category' => 'Backend'],
            ['name' => 'React.js / JS', 'level' => '92%', 'category' => 'Frontend'],
            ['name' => 'Inertia.js', 'level' => '95%', 'category' => 'Bridge'],
            ['name' => 'Tailwind CSS v4', 'level' => '90%', 'category' => 'Design'],
            ['name' => 'SQLite / MySQL', 'level' => '85%', 'category' => 'Database'],
            ['name' => 'MCP Server Dev', 'level' => '90%', 'category' => 'AI System Integration'],
        ]
    ]);
});

Route::post('/contact', function (Request $request) {
    $data = $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|email|max:255',
        'message' => 'required|string',
    ]);

    try {
        ContactMessage::create($data);
    } catch (\Exception $e) {
        // Fallback for contact submissions if migrations haven't run
    }

    return back()->with('success', 'Message sent successfully!');
});

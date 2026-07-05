<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ProjectController extends Controller
{
    /**
     * Display a listing of projects.
     */
    public function index()
    {
        $projects = Project::latest()->get();
        return \Inertia\Inertia::render('Admin/Projects/Index', [
            'projects' => $projects
        ]);
    }

    /**
     * Store a newly created project in database.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'content' => 'nullable|string',
            'technologies' => 'required|array',
            'github_url' => 'nullable|url',
            'live_url' => 'nullable|url',
            'status' => 'required|string',
            'is_featured' => 'required|boolean',
            'thumbnail_file' => 'nullable|image|max:5000',
            'image_files.*' => 'nullable|image|max:5000',
        ]);

        $project = new Project();
        $project->title = $validated['title'];
        $project->slug = Str::slug($validated['title']);
        $project->description = $validated['description'];
        $project->content = $validated['content'];
        $project->technologies = $validated['technologies'];
        $project->github_url = $validated['github_url'];
        $project->live_url = $validated['live_url'];
        $project->status = $validated['status'];
        $project->is_featured = $validated['is_featured'];

        // Handle thumbnail upload
        if ($request->hasFile('thumbnail_file')) {
            $thumbnail = $request->file('thumbnail_file');
            $name = time() . '_thumb_' . $thumbnail->getClientOriginalName();
            $thumbnail->move(public_path('images/projects'), $name);
            $project->thumbnail = '/images/projects/' . $name;
        }

        // Handle multiple gallery images upload
        $images = [];
        if ($request->hasFile('image_files')) {
            foreach ($request->file('image_files') as $imgFile) {
                $name = time() . '_' . rand(100, 999) . '_' . $imgFile->getClientOriginalName();
                $imgFile->move(public_path('images/projects'), $name);
                $images[] = '/images/projects/' . $name;
            }
        }
        $project->images = $images;

        $project->save();

        return redirect()->route('admin.projects.index')->with('success', 'Project created successfully.');
    }

    /**
     * Update the specified project in database.
     */
    public function update(Request $request, $id)
    {
        $project = Project::findOrFail($id);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'content' => 'nullable|string',
            'technologies' => 'required|array',
            'github_url' => 'nullable|url',
            'live_url' => 'nullable|url',
            'status' => 'required|string',
            'is_featured' => 'required|boolean',
            'thumbnail_file' => 'nullable|image|max:5000',
            'image_files.*' => 'nullable|image|max:5000',
        ]);

        $project->title = $validated['title'];
        $project->slug = Str::slug($validated['title']);
        $project->description = $validated['description'];
        $project->content = $validated['content'];
        $project->technologies = $validated['technologies'];
        $project->github_url = $validated['github_url'];
        $project->live_url = $validated['live_url'];
        $project->status = $validated['status'];
        $project->is_featured = $validated['is_featured'];

        // Handle thumbnail upload
        if ($request->hasFile('thumbnail_file')) {
            // Delete old if exists
            if ($project->thumbnail && file_exists(public_path($project->thumbnail))) {
                @unlink(public_path($project->thumbnail));
            }
            $thumbnail = $request->file('thumbnail_file');
            $name = time() . '_thumb_' . $thumbnail->getClientOriginalName();
            $thumbnail->move(public_path('images/projects'), $name);
            $project->thumbnail = '/images/projects/' . $name;
        }

        // Handle multiple gallery images upload
        if ($request->hasFile('image_files')) {
            // Option: delete old ones or append them? We will replace them
            $oldImages = $project->images ?: [];
            foreach ($oldImages as $oldImg) {
                if (file_exists(public_path($oldImg))) {
                    @unlink(public_path($oldImg));
                }
            }

            $images = [];
            foreach ($request->file('image_files') as $imgFile) {
                $name = time() . '_' . rand(100, 999) . '_' . $imgFile->getClientOriginalName();
                $imgFile->move(public_path('images/projects'), $name);
                $images[] = '/images/projects/' . $name;
            }
            $project->images = $images;
        }

        $project->save();

        return redirect()->route('admin.projects.index')->with('success', 'Project updated successfully.');
    }

    /**
     * Remove the specified project from database.
     */
    public function destroy($id)
    {
        $project = Project::findOrFail($id);
        
        // Delete files
        if ($project->thumbnail && file_exists(public_path($project->thumbnail))) {
            @unlink(public_path($project->thumbnail));
        }
        $images = $project->images ?: [];
        foreach ($images as $img) {
            if (file_exists(public_path($img))) {
                @unlink(public_path($img));
            }
        }

        $project->delete();

        return redirect()->route('admin.projects.index')->with('success', 'Project deleted successfully.');
    }
}

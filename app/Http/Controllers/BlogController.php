<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class BlogController extends Controller
{
    /**
     * Display a listing of blogs in admin dashboard.
     */
    public function index()
    {
        $blogs = Blog::latest()->get();
        return \Inertia\Inertia::render('Admin/Blogs/Index', [
            'blogs' => $blogs
        ]);
    }

    /**
     * Store a newly created blog in database.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'summary' => 'nullable|string',
            'content' => 'required|string',
            'category' => 'required|string|max:255',
            'tags' => 'nullable|array',
            'status' => 'required|string', // draft, published
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string',
            'thumbnail_file' => 'nullable|image|max:5000',
        ]);

        $blog = new Blog();
        $blog->title = $validated['title'];
        $blog->slug = Str::slug($validated['title']);
        $blog->summary = $validated['summary'];
        $blog->content = $validated['content'];
        $blog->category = $validated['category'];
        $blog->tags = $validated['tags'];
        $blog->status = $validated['status'];
        $blog->meta_title = $validated['meta_title'];
        $blog->meta_description = $validated['meta_description'];

        if ($request->hasFile('thumbnail_file')) {
            $file = $request->file('thumbnail_file');
            $name = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('images/blogs'), $name);
            $blog->thumbnail = '/images/blogs/' . $name;
        }

        $blog->save();

        return redirect()->route('admin.blogs.index')->with('success', 'Blog post created successfully.');
    }

    /**
     * Update the specified blog in database.
     */
    public function update(Request $request, $id)
    {
        $blog = Blog::findOrFail($id);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'summary' => 'nullable|string',
            'content' => 'required|string',
            'category' => 'required|string|max:255',
            'tags' => 'nullable|array',
            'status' => 'required|string',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string',
            'thumbnail_file' => 'nullable|image|max:5000',
        ]);

        $blog->title = $validated['title'];
        $blog->slug = Str::slug($validated['title']);
        $blog->summary = $validated['summary'];
        $blog->content = $validated['content'];
        $blog->category = $validated['category'];
        $blog->tags = $validated['tags'];
        $blog->status = $validated['status'];
        $blog->meta_title = $validated['meta_title'];
        $blog->meta_description = $validated['meta_description'];

        if ($request->hasFile('thumbnail_file')) {
            if ($blog->thumbnail && file_exists(public_path($blog->thumbnail))) {
                @unlink(public_path($blog->thumbnail));
            }
            $file = $request->file('thumbnail_file');
            $name = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('images/blogs'), $name);
            $blog->thumbnail = '/images/blogs/' . $name;
        }

        $blog->save();

        return redirect()->route('admin.blogs.index')->with('success', 'Blog post updated successfully.');
    }

    /**
     * Remove the specified blog from database.
     */
    public function destroy($id)
    {
        $blog = Blog::findOrFail($id);

        if ($blog->thumbnail && file_exists(public_path($blog->thumbnail))) {
            @unlink(public_path($blog->thumbnail));
        }

        $blog->delete();

        return redirect()->route('admin.blogs.index')->with('success', 'Blog post deleted successfully.');
    }
}

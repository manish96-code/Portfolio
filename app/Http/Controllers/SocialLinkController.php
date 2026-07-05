<?php

namespace App\Http\Controllers;

use App\Models\SocialLink;
use Illuminate\Http\Request;

class SocialLinkController extends Controller
{
    /**
     * Display a listing of social links.
     */
    public function index()
    {
        $socialLinks = SocialLink::all();
        return \Inertia\Inertia::render('Admin/SocialLinks/Index', [
            'socialLinks' => $socialLinks
        ]);
    }

    /**
     * Store a newly created social link in database.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'platform' => 'required|string|max:255',
            'url' => 'required|url',
            'icon' => 'nullable|string|max:255',
        ]);

        SocialLink::create($validated);

        return redirect()->route('admin.social-links.index')->with('success', 'Social link added successfully.');
    }

    /**
     * Update the specified social link in database.
     */
    public function update(Request $request, $id)
    {
        $socialLink = SocialLink::findOrFail($id);

        $validated = $request->validate([
            'platform' => 'required|string|max:255',
            'url' => 'required|url',
            'icon' => 'nullable|string|max:255',
        ]);

        $socialLink->update($validated);

        return redirect()->route('admin.social-links.index')->with('success', 'Social link updated successfully.');
    }

    /**
     * Remove the specified social link from database.
     */
    public function destroy($id)
    {
        $socialLink = SocialLink::findOrFail($id);
        $socialLink->delete();

        return redirect()->route('admin.social-links.index')->with('success', 'Social link deleted successfully.');
    }
}

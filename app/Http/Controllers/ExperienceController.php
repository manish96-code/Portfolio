<?php

namespace App\Http\Controllers;

use App\Models\Experience;
use Illuminate\Http\Request;

class ExperienceController extends Controller
{
    /**
     * Display a listing of experiences.
     */
    public function index()
    {
        $experiences = Experience::orderBy('order_index')->get();
        return \Inertia\Inertia::render('Admin/Experiences/Index', [
            'experiences' => $experiences
        ]);
    }

    /**
     * Store a newly created experience in database.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'company' => 'required|string|max:255',
            'designation' => 'required|string|max:255',
            'duration' => 'required|string|max:255',
            'description' => 'nullable|string',
            'skills_used' => 'nullable|array',
            'is_current' => 'required|boolean',
            'order_index' => 'required|integer',
        ]);

        Experience::create($validated);

        return redirect()->route('admin.experiences.index')->with('success', 'Experience record created successfully.');
    }

    /**
     * Update the specified experience in database.
     */
    public function update(Request $request, $id)
    {
        $experience = Experience::findOrFail($id);

        $validated = $request->validate([
            'company' => 'required|string|max:255',
            'designation' => 'required|string|max:255',
            'duration' => 'required|string|max:255',
            'description' => 'nullable|string',
            'skills_used' => 'nullable|array',
            'is_current' => 'required|boolean',
            'order_index' => 'required|integer',
        ]);

        $experience->update($validated);

        return redirect()->route('admin.experiences.index')->with('success', 'Experience record updated successfully.');
    }

    /**
     * Remove the specified experience from database.
     */
    public function destroy($id)
    {
        $experience = Experience::findOrFail($id);
        $experience->delete();

        return redirect()->route('admin.experiences.index')->with('success', 'Experience record deleted successfully.');
    }
}

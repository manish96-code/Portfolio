<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Models\Certificate;
use App\Models\ContactMessage;
use App\Models\Project;
use App\Models\Setting;
use App\Models\Skill;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;

class AdminController extends Controller
{
    /**
     * Display the dashboard statistics.
     */
    public function dashboard()
    {
        $stats = [
            'projectsCount' => Project::count(),
            'skillsCount' => Skill::count(),
            'messagesCount' => ContactMessage::count(),
            'unreadMessagesCount' => ContactMessage::where('is_read', false)->count(),
            'blogsCount' => Blog::count(),
            'certificatesCount' => Certificate::count(),
        ];

        return \Inertia\Inertia::render('Admin/Dashboard', [
            'stats' => $stats
        ]);
    }

    /**
     * Display the settings page.
     */
    public function settings()
    {
        $settings = Setting::pluck('value', 'key')->all();

        return \Inertia\Inertia::render('Admin/Settings', [
            'settings' => $settings
        ]);
    }

    /**
     * Update global site settings.
     */
    public function updateSettings(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'title' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'current_company' => 'required|string|max:255',
            'education' => 'required|string|max:255',
            'objective' => 'required|string',
            'bio' => 'required|string',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:20',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string',
            'robots' => 'nullable|string|max:50',
        ]);

        foreach ($validated as $key => $value) {
            Setting::set($key, $value);
        }

        return back()->with('success', 'Website settings updated successfully.');
    }

    /**
     * Upload or replace the resume file.
     */
    public function uploadResume(Request $request)
    {
        $request->validate([
            'resume' => 'required|file|mimes:pdf|max:10000', // max 10MB PDF
        ]);

        if ($request->hasFile('resume')) {
            $file = $request->file('resume');
            $fileName = 'Manish_Kumar_Resume.pdf';
            
            // Move file directly to public directory for easy access
            $file->move(public_path('downloads'), $fileName);

            Setting::set('resume_file', '/downloads/' . $fileName);

            return back()->with('success', 'Resume uploaded and replaced successfully.');
        }

        return back()->withErrors(['resume' => 'Failed to upload resume file.']);
    }

    /**
     * Display profile settings form.
     */
    public function profile()
    {
        return \Inertia\Inertia::render('Admin/Profile', [
            'user' => Auth::user()
        ]);
    }

    /**
     * Update admin profile details.
     */
    public function updateProfile(Request $request)
    {
        $user = Auth::user();

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'current_password' => 'nullable|string|required_with:new_password',
            'new_password' => ['nullable', 'confirmed', Password::defaults()],
        ]);

        $user->name = $validated['name'];
        $user->email = $validated['email'];

        if (!empty($validated['new_password'])) {
            if (!Hash::check($validated['current_password'], $user->password)) {
                return back()->withErrors(['current_password' => 'The provided password does not match your current password.']);
            }
            $user->password = Hash::make($validated['new_password']);
        }

        $user->save();

        return back()->with('success', 'Profile updated successfully.');
    }

    /**
     * Display contact messages in admin panel.
     */
    public function messages()
    {
        $messages = ContactMessage::latest()->get();

        return \Inertia\Inertia::render('Admin/Messages', [
            'messages' => $messages
        ]);
    }

    /**
     * Mark a contact message as read.
     */
    public function markMessageRead($id)
    {
        $message = ContactMessage::findOrFail($id);
        $message->is_read = true;
        $message->save();

        return back()->with('success', 'Message marked as read.');
    }

    /**
     * Delete a contact message.
     */
    public function deleteMessage($id)
    {
        $message = ContactMessage::findOrFail($id);
        $message->delete();

        return back()->with('success', 'Message deleted successfully.');
    }
}

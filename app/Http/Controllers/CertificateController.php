<?php

namespace App\Http\Controllers;

use App\Models\Certificate;
use Illuminate\Http\Request;

class CertificateController extends Controller
{
    /**
     * Display a listing of certificates.
     */
    public function index()
    {
        $certificates = Certificate::latest()->get();
        return \Inertia\Inertia::render('Admin/Certificates/Index', [
            'certificates' => $certificates
        ]);
    }

    /**
     * Store a newly created certificate in database.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'organization' => 'required|string|max:255',
            'issue_date' => 'required|string|max:255',
            'credential_url' => 'nullable|url',
            'image_file' => 'nullable|image|max:5000',
        ]);

        $cert = new Certificate();
        $cert->title = $validated['title'];
        $cert->organization = $validated['organization'];
        $cert->issue_date = $validated['issue_date'];
        $cert->credential_url = $validated['credential_url'];

        if ($request->hasFile('image_file')) {
            $file = $request->file('image_file');
            $name = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('images/certificates'), $name);
            $cert->image = '/images/certificates/' . $name;
        }

        $cert->save();

        return redirect()->route('admin.certificates.index')->with('success', 'Certificate record added successfully.');
    }

    /**
     * Update the specified certificate in database.
     */
    public function update(Request $request, $id)
    {
        $cert = Certificate::findOrFail($id);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'organization' => 'required|string|max:255',
            'issue_date' => 'required|string|max:255',
            'credential_url' => 'nullable|url',
            'image_file' => 'nullable|image|max:5000',
        ]);

        $cert->title = $validated['title'];
        $cert->organization = $validated['organization'];
        $cert->issue_date = $validated['issue_date'];
        $cert->credential_url = $validated['credential_url'];

        if ($request->hasFile('image_file')) {
            // Delete old file if exists
            if ($cert->image && file_exists(public_path($cert->image))) {
                @unlink(public_path($cert->image));
            }
            $file = $request->file('image_file');
            $name = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('images/certificates'), $name);
            $cert->image = '/images/certificates/' . $name;
        }

        $cert->save();

        return redirect()->route('admin.certificates.index')->with('success', 'Certificate record updated successfully.');
    }

    /**
     * Remove the specified certificate from database.
     */
    public function destroy($id)
    {
        $cert = Certificate::findOrFail($id);

        if ($cert->image && file_exists(public_path($cert->image))) {
            @unlink(public_path($cert->image));
        }

        $cert->delete();

        return redirect()->route('admin.certificates.index')->with('success', 'Certificate record deleted successfully.');
    }
}

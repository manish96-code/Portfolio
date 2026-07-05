import React from 'react';
import AdminLayout from '../../Layouts/AdminLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Settings({ settings }) {
    const { data, setData, post, processing: formProcessing, errors, wasSuccessful } = useForm({
        name: settings.name || '',
        title: settings.title || '',
        location: settings.location || '',
        current_company: settings.current_company || '',
        education: settings.education || '',
        objective: settings.objective || '',
        bio: settings.bio || '',
        email: settings.email || '',
        phone: settings.phone || '',
        meta_title: settings.meta_title || '',
        meta_description: settings.meta_description || '',
        robots: settings.robots || 'index, follow',
    });

    const { data: resumeData, setData: setResumeData, post: postResume, processing: resumeProcessing, errors: resumeErrors, wasSuccessful: resumeSuccess } = useForm({
        resume: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/admin/settings');
    };

    const handleResumeSubmit = (e) => {
        e.preventDefault();
        postResume('/admin/resume/upload');
    };

    return (
        <AdminLayout>
            <Head title="Website Settings" />

            <div className="max-w-4xl mx-auto space-y-10">
                <div className="flex justify-between items-center border-b border-slate-900 pb-4">
                    <div>
                        <h1 className="text-2xl font-black text-slate-100">Global Website Settings</h1>
                        <p className="text-slate-500 text-xs mt-1">Configure your personal portfolio metadata, contact info, and objective text.</p>
                    </div>
                </div>

                {wasSuccessful && (
                    <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
                        Website settings updated successfully.
                    </div>
                )}

                {/* Upload Resume Form */}
                <div className="p-6 rounded-2xl bg-[#0d121f]/40 border border-slate-900 space-y-4">
                    <h3 className="font-extrabold text-sm text-slate-300 uppercase tracking-wider">Upload / Replace PDF Resume</h3>
                    {resumeSuccess && (
                        <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px]">
                            Resume uploaded and replaced successfully.
                        </div>
                    )}
                    <form onSubmit={handleResumeSubmit} className="flex flex-col sm:flex-row gap-4 items-end">
                        <div className="flex-grow">
                            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Resume File (PDF only, max 10MB)</label>
                            <input
                                type="file"
                                accept=".pdf"
                                onChange={e => setResumeData('resume', e.target.files[0])}
                                className="w-full bg-slate-950 border border-slate-900 rounded-xl px-4 py-2.5 text-xs text-slate-300 file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-[10px] file:font-semibold file:bg-[#FF2D20] file:text-white hover:file:bg-[#e0241b]"
                                required
                            />
                            {resumeErrors.resume && <p className="text-[10px] text-rose-500 mt-1">{resumeErrors.resume}</p>}
                        </div>
                        <button
                            type="submit"
                            disabled={resumeProcessing}
                            className="px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-[#FF2D20]/30 hover:bg-[#FF2D20]/10 text-slate-300 hover:text-[#FF2D20] text-xs font-bold transition"
                        >
                            {resumeProcessing ? 'Uploading...' : 'Save Resume'}
                        </button>
                    </form>
                    {settings.resume_file && (
                        <p className="text-[10px] text-slate-500 font-mono">Current path: {settings.resume_file}</p>
                    )}
                </div>

                {/* Settings Fields Form */}
                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-[#0d121f]/20 border border-slate-900 p-8 rounded-3xl backdrop-blur-sm space-y-4 sm:space-y-0">
                        <h3 className="font-extrabold text-sm text-slate-300 uppercase tracking-wider col-span-2 pb-2 border-b border-slate-900 mb-4">
                            Personal & Contact Details
                        </h3>

                        <div className="sm:col-span-1">
                            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Your Name</label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={e => setData('name', e.target.value)}
                                className="w-full bg-slate-950 border border-slate-900 focus:border-[#FF2D20]/60 rounded-xl px-4 py-2.5 text-xs text-slate-200"
                                required
                            />
                            {errors.name && <p className="text-[10px] text-rose-500 mt-1">{errors.name}</p>}
                        </div>

                        <div className="sm:col-span-1">
                            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Designation / Role Title</label>
                            <input
                                type="text"
                                value={data.title}
                                onChange={e => setData('title', e.target.value)}
                                className="w-full bg-slate-950 border border-slate-900 focus:border-[#FF2D20]/60 rounded-xl px-4 py-2.5 text-xs text-slate-200"
                                required
                            />
                            {errors.title && <p className="text-[10px] text-rose-500 mt-1">{errors.title}</p>}
                        </div>

                        <div className="sm:col-span-1">
                            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Email Address</label>
                            <input
                                type="email"
                                value={data.email}
                                onChange={e => setData('email', e.target.value)}
                                className="w-full bg-slate-950 border border-slate-900 focus:border-[#FF2D20]/60 rounded-xl px-4 py-2.5 text-xs text-slate-200"
                                required
                            />
                            {errors.email && <p className="text-[10px] text-rose-500 mt-1">{errors.email}</p>}
                        </div>

                        <div className="sm:col-span-1">
                            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Contact Phone</label>
                            <input
                                type="text"
                                value={data.phone}
                                onChange={e => setData('phone', e.target.value)}
                                className="w-full bg-slate-950 border border-slate-900 focus:border-[#FF2D20]/60 rounded-xl px-4 py-2.5 text-xs text-slate-200"
                            />
                        </div>

                        <div className="sm:col-span-1">
                            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Location</label>
                            <input
                                type="text"
                                value={data.location}
                                onChange={e => setData('location', e.target.value)}
                                className="w-full bg-slate-950 border border-slate-900 focus:border-[#FF2D20]/60 rounded-xl px-4 py-2.5 text-xs text-slate-200"
                                required
                            />
                        </div>

                        <div className="sm:col-span-1">
                            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Current Company</label>
                            <input
                                type="text"
                                value={data.current_company}
                                onChange={e => setData('current_company', e.target.value)}
                                className="w-full bg-slate-950 border border-slate-900 focus:border-[#FF2D20]/60 rounded-xl px-4 py-2.5 text-xs text-slate-200"
                                required
                            />
                        </div>

                        <div className="sm:col-span-2">
                            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Education / Degree</label>
                            <input
                                type="text"
                                value={data.education}
                                onChange={e => setData('education', e.target.value)}
                                className="w-full bg-slate-950 border border-slate-900 focus:border-[#FF2D20]/60 rounded-xl px-4 py-2.5 text-xs text-slate-200"
                                required
                            />
                        </div>

                        <div className="sm:col-span-2">
                            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Career Objective Summary</label>
                            <textarea
                                rows="3"
                                value={data.objective}
                                onChange={e => setData('objective', e.target.value)}
                                className="w-full bg-slate-950 border border-slate-900 focus:border-[#FF2D20]/60 rounded-xl px-4 py-2.5 text-xs text-slate-200 resize-none"
                                required
                            ></textarea>
                        </div>

                        <div className="sm:col-span-2">
                            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Personal Biography Description</label>
                            <textarea
                                rows="4"
                                value={data.bio}
                                onChange={e => setData('bio', e.target.value)}
                                className="w-full bg-slate-950 border border-slate-900 focus:border-[#FF2D20]/60 rounded-xl px-4 py-2.5 text-xs text-slate-200 resize-none"
                                required
                            ></textarea>
                        </div>
                    </div>

                    {/* SEO Fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-[#0d121f]/20 border border-slate-900 p-8 rounded-3xl backdrop-blur-sm space-y-4 sm:space-y-0">
                        <h3 className="font-extrabold text-sm text-slate-300 uppercase tracking-wider col-span-2 pb-2 border-b border-slate-900 mb-4">
                            SEO & Indexing Configurations
                        </h3>

                        <div className="sm:col-span-2">
                            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Meta Title</label>
                            <input
                                type="text"
                                value={data.meta_title}
                                onChange={e => setData('meta_title', e.target.value)}
                                className="w-full bg-slate-950 border border-slate-900 focus:border-[#FF2D20]/60 rounded-xl px-4 py-2.5 text-xs text-slate-200"
                            />
                        </div>

                        <div className="sm:col-span-2">
                            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Meta Description</label>
                            <textarea
                                rows="3"
                                value={data.meta_description}
                                onChange={e => setData('meta_description', e.target.value)}
                                className="w-full bg-slate-950 border border-slate-900 focus:border-[#FF2D20]/60 rounded-xl px-4 py-2.5 text-xs text-slate-200 resize-none"
                            ></textarea>
                        </div>

                        <div className="sm:col-span-1">
                            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Robots Tags</label>
                            <input
                                type="text"
                                value={data.robots}
                                onChange={e => setData('robots', e.target.value)}
                                className="w-full bg-slate-950 border border-slate-900 focus:border-[#FF2D20]/60 rounded-xl px-4 py-2.5 text-xs text-slate-200"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={formProcessing}
                        className="w-full py-4 rounded-xl bg-[#FF2D20] hover:bg-[#e0241b] text-white font-bold transition shadow-lg shadow-[#FF2D20]/25 disabled:opacity-50"
                    >
                        {formProcessing ? 'Updating settings...' : 'Update Settings'}
                    </button>
                </form>
            </div>
        </AdminLayout>
    );
}

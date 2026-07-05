import React, { useState } from 'react';
import AdminLayout from '../../../Layouts/AdminLayout';
import { Head, useForm, router } from '@inertiajs/react';

export default function Index({ projects }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProject, setEditingProject] = useState(null);
    const [techInput, setTechInput] = useState('');

    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        description: '',
        content: '',
        technologies: [],
        github_url: '',
        live_url: '',
        status: 'Completed',
        is_featured: false,
        thumbnail_file: null,
        image_files: null,
    });

    const openCreateModal = () => {
        reset();
        setTechInput('');
        setEditingProject(null);
        setIsModalOpen(true);
    };

    const openEditModal = (project) => {
        setEditingProject(project);
        const tags = Array.isArray(project.technologies) ? project.technologies : JSON.parse(project.technologies || '[]');
        setData({
            title: project.title,
            description: project.description,
            content: project.content || '',
            technologies: tags,
            github_url: project.github_url || '',
            live_url: project.live_url || '',
            status: project.status,
            is_featured: project.is_featured === 1 || project.is_featured === true,
            thumbnail_file: null,
            image_files: null,
        });
        setTechInput('');
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        reset();
        setEditingProject(null);
    };

    const addTech = () => {
        if (techInput.trim() !== '' && !data.technologies.includes(techInput.trim())) {
            setData('technologies', [...data.technologies, techInput.trim()]);
            setTechInput('');
        }
    };

    const removeTech = (tech) => {
        setData('technologies', data.technologies.filter(t => t !== tech));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Build FormData manually for multipart uploads since Inertia automatically handles it when files are present
        if (editingProject) {
            router.post(`/admin/projects/${editingProject.id}`, {
                _method: 'PUT',
                ...data
            }, {
                onSuccess: () => closeModal(),
            });
        } else {
            post('/admin/projects', {
                onSuccess: () => closeModal(),
            });
        }
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this project permanently? This will delete all local images.')) {
            router.delete(`/admin/projects/${id}`);
        }
    };

    return (
        <AdminLayout>
            <Head title="Manage Projects" />

            <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-slate-900 pb-4">
                    <div>
                        <h1 className="text-2xl font-black text-slate-100">Projects Portfolio</h1>
                        <p className="text-slate-500 text-xs mt-1">Manage project descriptions, case studies, technologies, and repositories.</p>
                    </div>
                    <button
                        onClick={openCreateModal}
                        className="px-4 py-2 rounded-xl bg-[#FF2D20] hover:bg-[#e0241b] text-white text-xs font-bold transition shadow-lg shadow-[#FF2D20]/20"
                    >
                        + Add Project
                    </button>
                </div>

                <div className="bg-[#0d121f]/20 border border-slate-900 rounded-2xl overflow-hidden">
                    <table className="w-full text-left border-collapse text-xs">
                        <thead>
                            <tr className="bg-slate-900/40 text-slate-400 font-bold border-b border-slate-900">
                                <th className="p-4">Project Title</th>
                                <th className="p-4">Technologies</th>
                                <th className="p-4">Status</th>
                                <th className="p-4">Featured</th>
                                <th className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-900/60 text-slate-300">
                            {projects.length > 0 ? (
                                projects.map((project) => {
                                    const tags = Array.isArray(project.technologies) ? project.technologies : JSON.parse(project.technologies || '[]');
                                    return (
                                        <tr key={project.id} className="hover:bg-[#0d121f]/10">
                                            <td className="p-4 font-bold text-slate-200">{project.title}</td>
                                            <td className="p-4 max-w-[200px] truncate">{tags.join(', ') || '—'}</td>
                                            <td className="p-4">
                                                <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${
                                                    project.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                                                }`}>
                                                    {project.status}
                                                </span>
                                            </td>
                                            <td className="p-4 font-mono text-slate-400">{project.is_featured ? '⭐ Yes' : 'No'}</td>
                                            <td className="p-4 text-right space-x-2">
                                                <button
                                                    onClick={() => openEditModal(project)}
                                                    className="text-xs text-slate-500 hover:text-[#FF2D20] transition"
                                                >
                                                    Edit
                                                </button>
                                                <span className="text-slate-700">|</span>
                                                <button
                                                    onClick={() => handleDelete(project.id)}
                                                    className="text-xs text-slate-500 hover:text-rose-400 transition"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan="5" className="p-8 text-center text-slate-500 font-light">
                                        No projects registered yet.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-sm">
                        <div className="w-full max-w-2xl bg-slate-900 border border-slate-850 p-8 rounded-3xl shadow-2xl relative max-h-[90vh] overflow-y-auto">
                            <h3 className="text-lg font-black text-slate-100 mb-6">
                                {editingProject ? 'Edit Project Details' : 'Add New Project'}
                            </h3>

                            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Project Title</label>
                                        <input
                                            type="text"
                                            value={data.title}
                                            onChange={e => setData('title', e.target.value)}
                                            className="w-full bg-slate-955 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-200"
                                            placeholder="KitabiAdda"
                                            required
                                        />
                                        {errors.title && <p className="text-[10px] text-rose-500 mt-1">{errors.title}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Project Status</label>
                                        <select
                                            value={data.status}
                                            onChange={e => setData('status', e.target.value)}
                                            className="w-full bg-slate-955 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-200"
                                        >
                                            <option value="Completed">Completed</option>
                                            <option value="In Progress">In Progress</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Short Description</label>
                                    <textarea
                                        rows="2"
                                        value={data.description}
                                        onChange={e => setData('description', e.target.value)}
                                        className="w-full bg-slate-955 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-200 resize-none"
                                        placeholder="A brief overview for cards..."
                                        required
                                    ></textarea>
                                    {errors.description && <p className="text-[10px] text-rose-500 mt-1">{errors.description}</p>}
                                </div>

                                <div>
                                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Case Study Detailed Content (Markdown supported)</label>
                                    <textarea
                                        rows="6"
                                        value={data.content}
                                        onChange={e => setData('content', e.target.value)}
                                        className="w-full bg-slate-955 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-200 resize-y font-mono text-[10px]"
                                        placeholder="# KitabiAdda\n\n## Overview\n..."
                                    ></textarea>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">GitHub Source Link</label>
                                        <input
                                            type="url"
                                            value={data.github_url}
                                            onChange={e => setData('github_url', e.target.value)}
                                            className="w-full bg-slate-955 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-200"
                                            placeholder="https://github.com/..."
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Live Production URL</label>
                                        <input
                                            type="url"
                                            value={data.live_url}
                                            onChange={e => setData('live_url', e.target.value)}
                                            className="w-full bg-slate-955 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-200"
                                            placeholder="https://..."
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Project Thumbnail Image</label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={e => setData('thumbnail_file', e.target.files[0])}
                                            className="w-full bg-slate-955 border border-slate-800 rounded-xl px-4 py-2 text-slate-300 file:mr-3 file:py-0.5 file:px-2 file:rounded file:border-0 file:bg-slate-900 file:text-slate-400 file:text-[10px]"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Upload Gallery Images</label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            multiple
                                            onChange={e => setData('image_files', e.target.files)}
                                            className="w-full bg-slate-955 border border-slate-800 rounded-xl px-4 py-2 text-slate-300 file:mr-3 file:py-0.5 file:px-2 file:rounded file:border-0 file:bg-slate-900 file:text-slate-400 file:text-[10px]"
                                        />
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <label className="flex items-center gap-2 text-slate-300 font-bold uppercase tracking-wider text-[9px] cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={data.is_featured}
                                            onChange={e => setData('is_featured', e.target.checked)}
                                            className="rounded bg-slate-955 border-slate-800 text-[#FF2D20] focus:ring-0"
                                        />
                                        Feature on Portfolio Homepage
                                    </label>
                                </div>

                                <div>
                                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Technologies Used</label>
                                    <div className="flex gap-2 mb-2">
                                        <input
                                            type="text"
                                            value={techInput}
                                            onChange={e => setTechInput(e.target.value)}
                                            className="w-full bg-slate-955 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-200"
                                            placeholder="Add skill, e.g. React"
                                            onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addTech(); } }}
                                        />
                                        <button
                                            type="button"
                                            onClick={addTech}
                                            className="px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs font-bold transition"
                                        >
                                            Add
                                        </button>
                                    </div>
                                    <div className="flex flex-wrap gap-1.5 p-3 rounded-xl bg-slate-950/60 border border-slate-850 min-h-[50px]">
                                        {data.technologies.map((t, idx) => (
                                            <span key={idx} className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800 text-[10px]">
                                                {t}
                                                <button type="button" onClick={() => removeTech(t)} className="text-rose-500 font-bold hover:text-rose-400">×</button>
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex justify-end gap-3 pt-4 border-t border-slate-850">
                                    <button
                                        type="button"
                                        onClick={closeModal}
                                        className="px-4 py-2 rounded-xl border border-slate-800 text-slate-400 hover:text-white transition"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="px-5 py-2.5 rounded-xl bg-[#FF2D20] text-white font-bold transition shadow-lg shadow-[#FF2D20]/20 disabled:opacity-50"
                                    >
                                        {processing ? 'Saving...' : 'Save Project'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}

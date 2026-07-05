import React, { useState } from 'react';
import AdminLayout from '../../../Layouts/AdminLayout';
import { Head, useForm, router } from '@inertiajs/react';

export default function Index({ socialLinks }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingLink, setEditingLink] = useState(null);

    const { data, setData, post, put, processing, errors, reset } = useForm({
        platform: '',
        url: '',
        icon: '',
    });

    const openCreateModal = () => {
        reset();
        setEditingLink(null);
        setIsModalOpen(true);
    };

    const openEditModal = (link) => {
        setEditingLink(link);
        setData({
            platform: link.platform,
            url: link.url,
            icon: link.icon || '',
        });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        reset();
        setEditingLink(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingLink) {
            put(`/admin/social-links/${editingLink.id}`, {
                onSuccess: () => closeModal(),
            });
        } else {
            post('/admin/social-links', {
                onSuccess: () => closeModal(),
            });
        }
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this social link?')) {
            router.delete(`/admin/social-links/${id}`);
        }
    };

    return (
        <AdminLayout>
            <Head title="Manage Social Links" />

            <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-slate-900 pb-4">
                    <div>
                        <h1 className="text-2xl font-black text-slate-100">Social Connections</h1>
                        <p className="text-slate-500 text-xs mt-1">Manage profiles and direct URLs (GitHub, LinkedIn, Email).</p>
                    </div>
                    <button
                        onClick={openCreateModal}
                        className="px-4 py-2 rounded-xl bg-[#FF2D20] hover:bg-[#e0241b] text-white text-xs font-bold transition shadow-lg shadow-[#FF2D20]/20"
                    >
                        + Add Connection
                    </button>
                </div>

                <div className="bg-[#0d121f]/20 border border-slate-900 rounded-2xl overflow-hidden">
                    <table className="w-full text-left border-collapse text-xs">
                        <thead>
                            <tr className="bg-slate-900/40 text-slate-400 font-bold border-b border-slate-900">
                                <th className="p-4">Platform Name</th>
                                <th className="p-4">Direct Link URL</th>
                                <th className="p-4">Icon Reference</th>
                                <th className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-900/60 text-slate-300">
                            {socialLinks.length > 0 ? (
                                socialLinks.map((link) => (
                                    <tr key={link.id} className="hover:bg-[#0d121f]/10">
                                        <td className="p-4 font-bold text-slate-200">{link.platform}</td>
                                        <td className="p-4 font-mono text-slate-500 hover:text-slate-300">
                                            <a href={link.url} target="_blank" rel="noreferrer">{link.url}</a>
                                        </td>
                                        <td className="p-4 font-mono text-slate-500">{link.icon || '—'}</td>
                                        <td className="p-4 text-right space-x-2">
                                            <button
                                                onClick={() => openEditModal(link)}
                                                className="text-xs text-slate-500 hover:text-[#FF2D20] transition"
                                            >
                                                Edit
                                            </button>
                                            <span className="text-slate-700">|</span>
                                            <button
                                                onClick={() => handleDelete(link.id)}
                                                className="text-xs text-slate-500 hover:text-rose-400 transition"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="p-8 text-center text-slate-500 font-light">
                                        No social connections added.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-sm">
                        <div className="w-full max-w-md bg-slate-900 border border-slate-850 p-8 rounded-3xl shadow-2xl relative">
                            <h3 className="text-lg font-black text-slate-100 mb-6">
                                {editingLink ? 'Edit Connection' : 'Add New Connection'}
                            </h3>

                            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Platform (e.g. GitHub)</label>
                                    <input
                                        type="text"
                                        value={data.platform}
                                        onChange={e => setData('platform', e.target.value)}
                                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-200"
                                        placeholder="GitHub"
                                        required
                                    />
                                    {errors.platform && <p className="text-[10px] text-rose-500 mt-1">{errors.platform}</p>}
                                </div>

                                <div>
                                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Direct URL</label>
                                    <input
                                        type="text"
                                        value={data.url}
                                        onChange={e => setData('url', e.target.value)}
                                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-200"
                                        placeholder="https://github.com/..."
                                        required
                                    />
                                    {errors.url && <p className="text-[10px] text-rose-500 mt-1">{errors.url}</p>}
                                </div>

                                <div>
                                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Icon String Identifier</label>
                                    <input
                                        type="text"
                                        value={data.icon}
                                        onChange={e => setData('icon', e.target.value)}
                                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-200"
                                        placeholder="github, linkedin, mail"
                                    />
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
                                        {processing ? 'Saving...' : 'Save Connection'}
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

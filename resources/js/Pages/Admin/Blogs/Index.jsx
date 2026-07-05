import React, { useState } from 'react';
import AdminLayout from '../../../Layouts/AdminLayout';
import { Head, useForm, router } from '@inertiajs/react';

export default function Index({ blogs }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingBlog, setEditingBlog] = useState(null);
    const [tagInput, setTagInput] = useState('');

    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        summary: '',
        content: '',
        category: 'Backend',
        tags: [],
        status: 'draft',
        meta_title: '',
        meta_description: '',
        thumbnail_file: null,
    });

    const openCreateModal = () => {
        reset();
        setTagInput('');
        setEditingBlog(null);
        setIsModalOpen(true);
    };

    const openEditModal = (blog) => {
        setEditingBlog(blog);
        const tags = Array.isArray(blog.tags) ? blog.tags : JSON.parse(blog.tags || '[]');
        setData({
            title: blog.title,
            summary: blog.summary || '',
            content: blog.content,
            category: blog.category,
            tags: tags,
            status: blog.status,
            meta_title: blog.meta_title || '',
            meta_description: blog.meta_description || '',
            thumbnail_file: null,
        });
        setTagInput('');
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        reset();
        setEditingBlog(null);
    };

    const addTag = () => {
        if (tagInput.trim() !== '' && !data.tags.includes(tagInput.trim())) {
            setData('tags', [...data.tags, tagInput.trim()]);
            setTagInput('');
        }
    };

    const removeTag = (tag) => {
        setData('tags', data.tags.filter(t => t !== tag));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (editingBlog) {
            router.post(`/admin/blogs/${editingBlog.id}`, {
                _method: 'PUT',
                ...data
            }, {
                onSuccess: () => closeModal(),
            });
        } else {
            post('/admin/blogs', {
                onSuccess: () => closeModal(),
            });
        }
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this blog post permanently?')) {
            router.delete(`/admin/blogs/${id}`);
        }
    };

    return (
        <AdminLayout>
            <Head title="Manage Blogs" />

            <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-slate-900 pb-4">
                    <div>
                        <h1 className="text-2xl font-black text-slate-100">Articles & Blogs</h1>
                        <p className="text-slate-500 text-xs mt-1">Write technical guides, review stats, publish drafts, and configure SEO details.</p>
                    </div>
                    <button
                        onClick={openCreateModal}
                        className="px-4 py-2 rounded-xl bg-[#FF2D20] hover:bg-[#e0241b] text-white text-xs font-bold transition shadow-lg shadow-[#FF2D20]/20"
                    >
                        + Write Article
                    </button>
                </div>

                <div className="bg-[#0d121f]/20 border border-slate-900 rounded-2xl overflow-hidden">
                    <table className="w-full text-left border-collapse text-xs">
                        <thead>
                            <tr className="bg-slate-900/40 text-slate-400 font-bold border-b border-slate-900">
                                <th className="p-4">Blog Title</th>
                                <th className="p-4">Category</th>
                                <th className="p-4">Tags</th>
                                <th className="p-4">Status</th>
                                <th className="p-4">Publish Date</th>
                                <th className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-900/60 text-slate-300">
                            {blogs.length > 0 ? (
                                blogs.map((blog) => {
                                    const tags = Array.isArray(blog.tags) ? blog.tags : JSON.parse(blog.tags || '[]');
                                    return (
                                        <tr key={blog.id} className="hover:bg-[#0d121f]/10">
                                            <td className="p-4 font-bold text-slate-200">{blog.title}</td>
                                            <td className="p-4 capitalize">{blog.category}</td>
                                            <td className="p-4 max-w-[150px] truncate">{tags.join(', ') || '—'}</td>
                                            <td className="p-4">
                                                <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                                                    blog.status === 'published' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-800 text-slate-500'
                                                }`}>
                                                    {blog.status}
                                                </span>
                                            </td>
                                            <td className="p-4 text-slate-500">{new Date(blog.created_at).toLocaleDateString()}</td>
                                            <td className="p-4 text-right space-x-2">
                                                <button
                                                    onClick={() => openEditModal(blog)}
                                                    className="text-xs text-slate-500 hover:text-[#FF2D20] transition"
                                                >
                                                    Edit
                                                </button>
                                                <span className="text-slate-700">|</span>
                                                <button
                                                    onClick={() => handleDelete(blog.id)}
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
                                    <td colSpan="6" className="p-8 text-center text-slate-500 font-light">
                                        No articles created yet.
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
                                {editingBlog ? 'Edit Article Details' : 'Write New Article'}
                            </h3>

                            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <div className="sm:col-span-2">
                                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Article Title</label>
                                        <input
                                            type="text"
                                            value={data.title}
                                            onChange={e => setData('title', e.target.value)}
                                            className="w-full bg-slate-955 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-200"
                                            placeholder="Mastering React 19..."
                                            required
                                        />
                                        {errors.title && <p className="text-[10px] text-rose-500 mt-1">{errors.title}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Category</label>
                                        <select
                                            value={data.category}
                                            onChange={e => setData('category', e.target.value)}
                                            className="w-full bg-slate-955 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-200"
                                        >
                                            <option value="Backend">Backend</option>
                                            <option value="Frontend">Frontend</option>
                                            <option value="General">General</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Blog Status</label>
                                        <select
                                            value={data.status}
                                            onChange={e => setData('status', e.target.value)}
                                            className="w-full bg-slate-955 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-200"
                                        >
                                            <option value="draft">Draft</option>
                                            <option value="published">Published</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Thumbnail Image</label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={e => setData('thumbnail_file', e.target.files[0])}
                                            className="w-full bg-slate-955 border border-slate-800 rounded-xl px-4 py-2 text-slate-300 file:mr-3 file:py-0.5 file:px-2 file:rounded file:border-0 file:bg-slate-900 file:text-slate-400 file:text-[10px]"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Short Summary / Subtitle</label>
                                    <textarea
                                        rows="2"
                                        value={data.summary}
                                        onChange={e => setData('summary', e.target.value)}
                                        className="w-full bg-slate-955 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-200 resize-none"
                                        placeholder="A brief subtitle for cards..."
                                        required
                                    ></textarea>
                                </div>

                                <div>
                                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Article Content (Markdown supported)</label>
                                    <textarea
                                        rows="8"
                                        value={data.content}
                                        onChange={e => setData('content', e.target.value)}
                                        className="w-full bg-slate-955 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-200 font-mono text-[10px]"
                                        placeholder="# Title\n\nIntroduction paragraph..."
                                        required
                                    ></textarea>
                                    {errors.content && <p className="text-[10px] text-rose-500 mt-1">{errors.content}</p>}
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-950/20 p-5 rounded-2xl border border-slate-850">
                                    <h4 className="font-bold text-[10px] text-slate-400 uppercase tracking-widest col-span-2 pb-1 border-b border-slate-900">SEO Configurations</h4>
                                    <div>
                                        <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Meta Title</label>
                                        <input
                                            type="text"
                                            value={data.meta_title}
                                            onChange={e => setData('meta_title', e.target.value)}
                                            className="w-full bg-slate-955 border border-slate-800 rounded-xl px-4 py-2 text-slate-200"
                                            placeholder="SEO title tag"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Meta Description</label>
                                        <input
                                            type="text"
                                            value={data.meta_description}
                                            onChange={e => setData('meta_description', e.target.value)}
                                            className="w-full bg-slate-955 border border-slate-800 rounded-xl px-4 py-2 text-slate-200"
                                            placeholder="SEO description tag"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Tags</label>
                                    <div className="flex gap-2 mb-2">
                                        <input
                                            type="text"
                                            value={tagInput}
                                            onChange={e => setTagInput(e.target.value)}
                                            className="w-full bg-slate-955 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-200"
                                            placeholder="Add tag, e.g. React"
                                            onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addTag(); } }}
                                        />
                                        <button
                                            type="button"
                                            onClick={addTag}
                                            className="px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs font-bold transition"
                                        >
                                            Add
                                        </button>
                                    </div>
                                    <div className="flex flex-wrap gap-1.5 p-3 rounded-xl bg-slate-950/60 border border-slate-850 min-h-[50px]">
                                        {data.tags.map((t, idx) => (
                                            <span key={idx} className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800 text-[10px]">
                                                {t}
                                                <button type="button" onClick={() => removeTag(t)} className="text-rose-500 font-bold hover:text-rose-400">×</button>
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
                                        {processing ? 'Saving...' : 'Save Article'}
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

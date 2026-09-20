import React, { useState } from 'react';

const BlogFormModal = ({ blog, onSave, onClose }) => {
    const [form, setForm] = useState(blog || {
        title: '', slug: '', summary: '', content: '',
        category: 'Frontend', tags: [], created_at: new Date().toISOString().split('T')[0]
    });
    const [tagInput, setTagInput] = useState('');

    const handleChange = (key, value) => setForm(prev => ({ ...prev, [key]: value }));

    const addTag = () => {
        if (tagInput.trim() && !form.tags.includes(tagInput.trim())) {
            handleChange('tags', [...form.tags, tagInput.trim()]);
            setTagInput('');
        }
    };

    const removeTag = (tag) => {
        handleChange('tags', form.tags.filter(t => t !== tag));
    };

    return (
        <div className="admin-modal-overlay" onClick={onClose}>
            <div className="admin-modal" onClick={e => e.stopPropagation()} style={{ maxWidth: '700px' }}>
                <div className="admin-modal-header">
                    <h3 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: '700', fontSize: '1.125rem', color: '#0f172a', margin: 0 }}>
                        {blog ? 'Edit Blog Post' : 'Write New Blog Post'}
                    </h3>
                    <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', fontSize: '1.25rem' }}>✕</button>
                </div>
                <div className="admin-modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '600', color: '#475569', marginBottom: '0.375rem' }}>Title</label>
                        <input className="admin-input" value={form.title} onChange={e => handleChange('title', e.target.value)} placeholder="Blog post title" />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '600', color: '#475569', marginBottom: '0.375rem' }}>Slug</label>
                            <input className="admin-input" value={form.slug} onChange={e => handleChange('slug', e.target.value)} placeholder="url-slug" />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '600', color: '#475569', marginBottom: '0.375rem' }}>Category</label>
                            <select className="admin-input admin-select" value={form.category} onChange={e => handleChange('category', e.target.value)}>
                                <option value="Frontend">Frontend</option>
                                <option value="Backend">Backend</option>
                                <option value="Database">Database</option>
                                <option value="DevOps">DevOps</option>
                                <option value="General">General</option>
                            </select>
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '600', color: '#475569', marginBottom: '0.375rem' }}>Date</label>
                            <input type="date" className="admin-input" value={form.created_at} onChange={e => handleChange('created_at', e.target.value)} />
                        </div>
                    </div>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '600', color: '#475569', marginBottom: '0.375rem' }}>Summary</label>
                        <textarea className="admin-input admin-textarea" value={form.summary} onChange={e => handleChange('summary', e.target.value)} placeholder="Brief blog summary..." style={{ minHeight: '70px' }} />
                    </div>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '600', color: '#475569', marginBottom: '0.375rem' }}>Content (Markdown)</label>
                        <textarea className="admin-input admin-textarea" value={form.content} onChange={e => handleChange('content', e.target.value)} placeholder="# Blog Title&#10;&#10;Write your content here..." style={{ minHeight: '200px', fontFamily: "'Fira Code', monospace", fontSize: '0.8125rem' }} />
                    </div>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '600', color: '#475569', marginBottom: '0.375rem' }}>Tags</label>
                        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                            <input className="admin-input" value={tagInput} onChange={e => setTagInput(e.target.value)} placeholder="e.g. React" onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTag())} style={{ flex: 1 }} />
                            <button onClick={addTag} className="admin-btn admin-btn-primary" type="button">Add</button>
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
                            {form.tags.map((tag, i) => (
                                <span key={i} className="admin-badge admin-badge-teal" style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.375rem' }} onClick={() => removeTag(tag)}>
                                    {tag} <span style={{ opacity: 0.6 }}>×</span>
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="admin-modal-footer">
                    <button onClick={onClose} className="admin-btn admin-btn-secondary">Cancel</button>
                    <button onClick={() => onSave(form)} className="admin-btn admin-btn-primary">
                        {blog ? 'Save Changes' : 'Publish Post'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default function AdminBlogs({ blogs: initialBlogs, navigate }) {
    const [blogs, setBlogs] = useState(initialBlogs);
    const [showModal, setShowModal] = useState(false);
    const [editBlog, setEditBlog] = useState(null);
    const [deleteConfirm, setDeleteConfirm] = useState(null);

    const handleSave = (formData) => {
        if (editBlog) {
            setBlogs(prev => prev.map(b => b.id === editBlog.id ? { ...editBlog, ...formData } : b));
        } else {
            setBlogs(prev => [...prev, { ...formData, id: Date.now() }]);
        }
        setShowModal(false);
        setEditBlog(null);
    };

    const handleDelete = (id) => {
        setBlogs(prev => prev.filter(b => b.id !== id));
        setDeleteConfirm(null);
    };

    const categoryColors = {
        Frontend: 'admin-badge-indigo',
        Backend: 'admin-badge-teal',
        Database: 'admin-badge-amber',
        DevOps: 'admin-badge-rose',
        General: 'admin-badge-green',
    };

    return (
        <div>
            {/* Header */}
            <div className="admin-animate-in" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <div>
                    <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.375rem', fontWeight: '700', color: '#0f172a', margin: 0 }}>
                        Blog Posts
                    </h2>
                    <p style={{ fontSize: '0.8125rem', color: '#64748b', margin: 0 }}>
                        Manage your blog articles ({blogs.length} posts)
                    </p>
                </div>
                <button onClick={() => { setEditBlog(null); setShowModal(true); }} className="admin-btn admin-btn-primary">
                    <svg style={{ width: 16, height: 16 }} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Write Post
                </button>
            </div>

            {/* Blog Table */}
            <div className="admin-animate-in admin-animate-in-2" style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '1rem', overflow: 'hidden' }}>
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Tags</th>
                            <th>Date</th>
                            <th style={{ textAlign: 'right' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {blogs.map((blog, i) => (
                            <tr key={blog.id}>
                                <td>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <div style={{
                                            width: '36px', height: '36px', borderRadius: '0.5rem',
                                            background: `linear-gradient(135deg, ${i % 2 === 0 ? '#4f46e5, #6366f1' : '#0d9488, #14b8a6'})`,
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            color: '#fff', flexShrink: 0
                                        }}>
                                            <svg style={{ width: 16, height: 16 }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25H5.625a2.25 2.25 0 01-2.25-2.25V6.375c0-.621.504-1.125 1.125-1.125H8.25m8.25 0h.375a1.125 1.125 0 011.125 1.125v.375" />
                                            </svg>
                                        </div>
                                        <div>
                                            <div style={{ fontWeight: '600', color: '#0f172a', maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                {blog.title}
                                            </div>
                                            <div style={{ fontSize: '0.75rem', color: '#94a3b8', maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                {blog.summary}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <span className={`admin-badge ${categoryColors[blog.category] || 'admin-badge-indigo'}`}>
                                        {blog.category}
                                    </span>
                                </td>
                                <td>
                                    <div style={{ display: 'flex', gap: '0.25rem', flexWrap: 'wrap' }}>
                                        {blog.tags.slice(0, 2).map((tag, j) => (
                                            <span key={j} style={{ fontSize: '0.6875rem', color: '#64748b', background: '#f1f5f9', padding: '0.125rem 0.5rem', borderRadius: '9999px' }}>
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </td>
                                <td style={{ fontSize: '0.8125rem', color: '#64748b' }}>
                                    {new Date(blog.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                                </td>
                                <td>
                                    <div style={{ display: 'flex', gap: '0.375rem', justifyContent: 'flex-end' }}>
                                        <button onClick={() => { setEditBlog(blog); setShowModal(true); }} className="admin-btn admin-btn-secondary" style={{ padding: '0.375rem 0.625rem' }}>
                                            <svg style={{ width: 14, height: 14 }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125" /></svg>
                                        </button>
                                        <button onClick={() => setDeleteConfirm(blog.id)} className="admin-btn admin-btn-danger" style={{ padding: '0.375rem 0.625rem' }}>
                                            <svg style={{ width: 14, height: 14 }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modals */}
            {showModal && <BlogFormModal blog={editBlog} onSave={handleSave} onClose={() => { setShowModal(false); setEditBlog(null); }} />}

            {deleteConfirm && (
                <div className="admin-modal-overlay" onClick={() => setDeleteConfirm(null)}>
                    <div className="admin-modal" onClick={e => e.stopPropagation()} style={{ maxWidth: '400px' }}>
                        <div className="admin-modal-body" style={{ textAlign: 'center', padding: '2rem' }}>
                            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#fef2f2', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', fontSize: '1.25rem' }}>🗑️</div>
                            <h3 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: '700', color: '#0f172a', marginBottom: '0.5rem' }}>Delete Blog Post?</h3>
                            <p style={{ fontSize: '0.8125rem', color: '#64748b', marginBottom: '1.5rem' }}>This action cannot be undone.</p>
                            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
                                <button onClick={() => setDeleteConfirm(null)} className="admin-btn admin-btn-secondary">Cancel</button>
                                <button onClick={() => handleDelete(deleteConfirm)} className="admin-btn admin-btn-danger">Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

import React, { useState } from 'react';

const ProjectFormModal = ({ project, onSave, onClose }) => {
    const [form, setForm] = useState(project || {
        title: '', slug: '', description: '', content: '',
        technologies: [], github_url: '', live_url: '',
        status: 'Completed', is_featured: false
    });
    const [techInput, setTechInput] = useState('');

    const handleChange = (key, value) => setForm(prev => ({ ...prev, [key]: value }));

    const addTech = () => {
        if (techInput.trim() && !form.technologies.includes(techInput.trim())) {
            handleChange('technologies', [...form.technologies, techInput.trim()]);
            setTechInput('');
        }
    };

    const removeTech = (tech) => {
        handleChange('technologies', form.technologies.filter(t => t !== tech));
    };

    return (
        <div className="admin-modal-overlay" onClick={onClose}>
            <div className="admin-modal" onClick={e => e.stopPropagation()} style={{ maxWidth: '680px' }}>
                <div className="admin-modal-header">
                    <h3 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: '700', fontSize: '1.125rem', color: '#0f172a', margin: 0 }}>
                        {project ? 'Edit Project' : 'Add New Project'}
                    </h3>
                    <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', fontSize: '1.25rem' }}>✕</button>
                </div>
                <div className="admin-modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '600', color: '#475569', marginBottom: '0.375rem' }}>Project Title</label>
                        <input className="admin-input" value={form.title} onChange={e => handleChange('title', e.target.value)} placeholder="e.g. GymMitra" />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '600', color: '#475569', marginBottom: '0.375rem' }}>Slug</label>
                            <input className="admin-input" value={form.slug} onChange={e => handleChange('slug', e.target.value)} placeholder="e.g. gymmitra" />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '600', color: '#475569', marginBottom: '0.375rem' }}>Status</label>
                            <select className="admin-input admin-select" value={form.status} onChange={e => handleChange('status', e.target.value)}>
                                <option value="Completed">Completed</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Planned">Planned</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '600', color: '#475569', marginBottom: '0.375rem' }}>Short Description</label>
                        <textarea className="admin-input admin-textarea" value={form.description} onChange={e => handleChange('description', e.target.value)} placeholder="Brief project description..." style={{ minHeight: '80px' }} />
                    </div>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '600', color: '#475569', marginBottom: '0.375rem' }}>Detailed Content (Markdown)</label>
                        <textarea className="admin-input admin-textarea" value={form.content} onChange={e => handleChange('content', e.target.value)} placeholder="# Project Title&#10;&#10;Detailed markdown content..." style={{ minHeight: '120px', fontFamily: "'Fira Code', monospace", fontSize: '0.8125rem' }} />
                    </div>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '600', color: '#475569', marginBottom: '0.375rem' }}>Technologies</label>
                        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                            <input className="admin-input" value={techInput} onChange={e => setTechInput(e.target.value)} placeholder="e.g. Laravel" onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTech())} style={{ flex: 1 }} />
                            <button onClick={addTech} className="admin-btn admin-btn-primary" type="button">Add</button>
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
                            {form.technologies.map((tech, i) => (
                                <span key={i} className="admin-badge admin-badge-indigo" style={{ cursor: 'pointer', gap: '0.375rem', display: 'inline-flex', alignItems: 'center' }} onClick={() => removeTech(tech)}>
                                    {tech} <span style={{ fontSize: '0.875rem', opacity: 0.6 }}>×</span>
                                </span>
                            ))}
                        </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '600', color: '#475569', marginBottom: '0.375rem' }}>GitHub URL</label>
                            <input className="admin-input" value={form.github_url} onChange={e => handleChange('github_url', e.target.value)} placeholder="https://github.com/..." />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '600', color: '#475569', marginBottom: '0.375rem' }}>Live URL</label>
                            <input className="admin-input" value={form.live_url || ''} onChange={e => handleChange('live_url', e.target.value)} placeholder="https://..." />
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <input type="checkbox" id="featured" checked={form.is_featured} onChange={e => handleChange('is_featured', e.target.checked)} style={{ width: '16px', height: '16px', accentColor: '#4f46e5' }} />
                        <label htmlFor="featured" style={{ fontSize: '0.8125rem', fontWeight: '500', color: '#334155' }}>Mark as Featured Project</label>
                    </div>
                </div>
                <div className="admin-modal-footer">
                    <button onClick={onClose} className="admin-btn admin-btn-secondary">Cancel</button>
                    <button onClick={() => onSave(form)} className="admin-btn admin-btn-primary">
                        {project ? 'Save Changes' : 'Create Project'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default function AdminProjects({ projects: initialProjects, navigate }) {
    const [projects, setProjects] = useState(initialProjects);
    const [showModal, setShowModal] = useState(false);
    const [editProject, setEditProject] = useState(null);
    const [deleteConfirm, setDeleteConfirm] = useState(null);

    const handleSave = (formData) => {
        if (editProject) {
            setProjects(prev => prev.map(p => p.id === editProject.id ? { ...editProject, ...formData } : p));
        } else {
            setProjects(prev => [...prev, { ...formData, id: Date.now(), images: [] }]);
        }
        setShowModal(false);
        setEditProject(null);
    };

    const handleDelete = (id) => {
        setProjects(prev => prev.filter(p => p.id !== id));
        setDeleteConfirm(null);
    };

    return (
        <div>
            {/* Header */}
            <div className="admin-animate-in" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <div>
                    <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.375rem', fontWeight: '700', color: '#0f172a', margin: 0 }}>
                        Projects
                    </h2>
                    <p style={{ fontSize: '0.8125rem', color: '#64748b', margin: 0 }}>
                        Manage your portfolio projects ({projects.length} total)
                    </p>
                </div>
                <button onClick={() => { setEditProject(null); setShowModal(true); }} className="admin-btn admin-btn-primary">
                    <svg style={{ width: 16, height: 16 }} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Add Project
                </button>
            </div>

            {/* Projects Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1rem' }}>
                {projects.map((project, i) => (
                    <div key={project.id} className={`admin-animate-in admin-animate-in-${Math.min(i + 1, 6)}`} style={{
                        background: '#ffffff', border: '1px solid #e2e8f0',
                        borderRadius: '1rem', overflow: 'hidden',
                        transition: 'all 0.3s ease'
                    }}>
                        {/* Card Header with gradient */}
                        <div style={{
                            height: '6px',
                            background: `linear-gradient(90deg, ${['#4f46e5, #6366f1', '#0d9488, #14b8a6', '#7c3aed, #8b5cf6', '#f59e0b, #fbbf24', '#e11d48, #fb7185'][i % 5]})`
                        }} />
                        <div style={{ padding: '1.25rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <div style={{
                                        width: '42px', height: '42px', borderRadius: '0.75rem',
                                        background: `linear-gradient(135deg, ${['#4f46e5, #6366f1', '#0d9488, #14b8a6', '#7c3aed, #8b5cf6', '#f59e0b, #fbbf24'][i % 4]})`,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        color: '#fff', fontWeight: '700', fontSize: '0.75rem',
                                        fontFamily: "'Outfit', sans-serif", flexShrink: 0
                                    }}>
                                        {project.title.substring(0, 2).toUpperCase()}
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: '700', color: '#0f172a', fontSize: '0.9375rem' }}>{project.title}</div>
                                        <div style={{ display: 'flex', gap: '0.375rem', marginTop: '0.25rem' }}>
                                            <span className={`admin-badge ${project.status === 'Completed' ? 'admin-badge-green' : 'admin-badge-amber'}`}>
                                                {project.status}
                                            </span>
                                            {project.is_featured && <span className="admin-badge admin-badge-amber">★ Featured</span>}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <p style={{ fontSize: '0.8125rem', color: '#64748b', lineHeight: '1.5', marginBottom: '0.75rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                {project.description}
                            </p>

                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem', marginBottom: '1rem' }}>
                                {project.technologies.slice(0, 4).map((tech, j) => (
                                    <span key={j} className="admin-badge admin-badge-indigo">{tech}</span>
                                ))}
                                {project.technologies.length > 4 && (
                                    <span className="admin-badge admin-badge-indigo">+{project.technologies.length - 4}</span>
                                )}
                            </div>

                            <div style={{ display: 'flex', gap: '0.5rem', borderTop: '1px solid #f1f5f9', paddingTop: '0.75rem' }}>
                                <button onClick={() => { setEditProject(project); setShowModal(true); }} className="admin-btn admin-btn-secondary" style={{ flex: 1, justifyContent: 'center' }}>
                                    <svg style={{ width: 14, height: 14 }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125" /></svg>
                                    Edit
                                </button>
                                <button onClick={() => setDeleteConfirm(project.id)} className="admin-btn admin-btn-danger" style={{ justifyContent: 'center' }}>
                                    <svg style={{ width: 14, height: 14 }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modals */}
            {showModal && <ProjectFormModal project={editProject} onSave={handleSave} onClose={() => { setShowModal(false); setEditProject(null); }} />}
            
            {deleteConfirm && (
                <div className="admin-modal-overlay" onClick={() => setDeleteConfirm(null)}>
                    <div className="admin-modal" onClick={e => e.stopPropagation()} style={{ maxWidth: '400px' }}>
                        <div className="admin-modal-body" style={{ textAlign: 'center', padding: '2rem' }}>
                            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#fef2f2', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', color: '#dc2626', fontSize: '1.25rem' }}>🗑️</div>
                            <h3 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: '700', color: '#0f172a', marginBottom: '0.5rem' }}>Delete Project?</h3>
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

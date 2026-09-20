import React, { useState } from 'react';

export default function AdminSkills({ skills: initialSkills, navigate }) {
    const [skills, setSkills] = useState(initialSkills);
    const [editSkill, setEditSkill] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [newCategory, setNewCategory] = useState('');
    const [showCategoryModal, setShowCategoryModal] = useState(false);

    // Form state
    const [form, setForm] = useState({ name: '', level: 80 });

    const openAddSkill = (category) => {
        setSelectedCategory(category);
        setEditSkill(null);
        setForm({ name: '', level: 80 });
        setShowModal(true);
    };

    const openEditSkill = (category, skill) => {
        setSelectedCategory(category);
        setEditSkill(skill);
        setForm({ name: skill.name, level: skill.level });
        setShowModal(true);
    };

    const handleSave = () => {
        if (!form.name.trim()) return;
        setSkills(prev => {
            const updated = { ...prev };
            if (editSkill) {
                updated[selectedCategory] = updated[selectedCategory].map(s =>
                    s.name === editSkill.name ? { name: form.name, level: parseInt(form.level) } : s
                );
            } else {
                updated[selectedCategory] = [...(updated[selectedCategory] || []), { name: form.name, level: parseInt(form.level) }];
            }
            return updated;
        });
        setShowModal(false);
    };

    const handleDelete = (category, skillName) => {
        setSkills(prev => {
            const updated = { ...prev };
            updated[category] = updated[category].filter(s => s.name !== skillName);
            if (updated[category].length === 0) delete updated[category];
            return updated;
        });
    };

    const handleAddCategory = () => {
        if (!newCategory.trim() || skills[newCategory.trim()]) return;
        setSkills(prev => ({ ...prev, [newCategory.trim()]: [] }));
        setNewCategory('');
        setShowCategoryModal(false);
    };

    const categoryGradients = ['#4f46e5, #6366f1', '#0d9488, #14b8a6', '#7c3aed, #8b5cf6', '#f59e0b, #fbbf24', '#e11d48, #fb7185', '#0284c7, #38bdf8'];

    return (
        <div>
            {/* Header */}
            <div className="admin-animate-in" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <div>
                    <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.375rem', fontWeight: '700', color: '#0f172a', margin: 0 }}>Skills</h2>
                    <p style={{ fontSize: '0.8125rem', color: '#64748b', margin: 0 }}>
                        Manage your skills across {Object.keys(skills).length} categories
                    </p>
                </div>
                <button onClick={() => setShowCategoryModal(true)} className="admin-btn admin-btn-primary">
                    <svg style={{ width: 16, height: 16 }} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Add Category
                </button>
            </div>

            {/* Skills Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1rem' }}>
                {Object.entries(skills).map(([category, skillList], catIdx) => (
                    <div key={category} className={`admin-animate-in admin-animate-in-${Math.min(catIdx + 1, 6)}`} style={{
                        background: '#ffffff', border: '1px solid #e2e8f0',
                        borderRadius: '1rem', overflow: 'hidden'
                    }}>
                        {/* Category Header */}
                        <div style={{
                            padding: '1rem 1.25rem',
                            background: `linear-gradient(135deg, ${categoryGradients[catIdx % categoryGradients.length]})`,
                            display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                        }}>
                            <div>
                                <h3 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: '700', color: '#ffffff', margin: 0, fontSize: '1rem' }}>
                                    {category}
                                </h3>
                                <span style={{ fontSize: '0.6875rem', color: 'rgba(255,255,255,0.7)' }}>
                                    {skillList.length} skills
                                </span>
                            </div>
                            <button onClick={() => openAddSkill(category)} style={{
                                background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '0.375rem',
                                padding: '0.375rem', cursor: 'pointer', color: '#ffffff',
                                display: 'flex', alignItems: 'center', justifyContent: 'center'
                            }}>
                                <svg style={{ width: 16, height: 16 }} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                            </button>
                        </div>

                        {/* Skills List */}
                        <div style={{ padding: '0.75rem 1.25rem' }}>
                            {skillList.map((skill, i) => (
                                <div key={skill.name} style={{
                                    padding: '0.625rem 0',
                                    borderBottom: i < skillList.length - 1 ? '1px solid #f1f5f9' : 'none'
                                }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.375rem' }}>
                                        <span style={{ fontSize: '0.8125rem', fontWeight: '600', color: '#0f172a' }}>{skill.name}</span>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <span style={{ fontSize: '0.75rem', fontWeight: '600', color: '#6366f1' }}>{skill.level}%</span>
                                            <button onClick={() => openEditSkill(category, skill)} style={{
                                                background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', padding: '2px'
                                            }}>
                                                <svg style={{ width: 13, height: 13 }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125" /></svg>
                                            </button>
                                            <button onClick={() => handleDelete(category, skill.name)} style={{
                                                background: 'none', border: 'none', cursor: 'pointer', color: '#f87171', padding: '2px'
                                            }}>
                                                <svg style={{ width: 13, height: 13 }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                                            </button>
                                        </div>
                                    </div>
                                    <div style={{ height: '6px', background: '#f1f5f9', borderRadius: '9999px', overflow: 'hidden' }}>
                                        <div style={{
                                            height: '100%', width: `${skill.level}%`,
                                            background: `linear-gradient(90deg, ${categoryGradients[catIdx % categoryGradients.length]})`,
                                            borderRadius: '9999px',
                                            transition: 'width 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
                                        }} />
                                    </div>
                                </div>
                            ))}
                            {skillList.length === 0 && (
                                <div style={{ textAlign: 'center', padding: '1.5rem', color: '#94a3b8', fontSize: '0.8125rem' }}>
                                    No skills yet. Click + to add one.
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Skill Form Modal */}
            {showModal && (
                <div className="admin-modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="admin-modal" onClick={e => e.stopPropagation()} style={{ maxWidth: '440px' }}>
                        <div className="admin-modal-header">
                            <h3 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: '700', fontSize: '1.125rem', color: '#0f172a', margin: 0 }}>
                                {editSkill ? 'Edit Skill' : `Add Skill to ${selectedCategory}`}
                            </h3>
                            <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', fontSize: '1.25rem' }}>✕</button>
                        </div>
                        <div className="admin-modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '600', color: '#475569', marginBottom: '0.375rem' }}>Skill Name</label>
                                <input className="admin-input" value={form.name} onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))} placeholder="e.g. React" />
                            </div>
                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.375rem' }}>
                                    <label style={{ fontSize: '0.75rem', fontWeight: '600', color: '#475569' }}>Proficiency Level</label>
                                    <span style={{ fontSize: '0.875rem', fontWeight: '700', color: '#4f46e5' }}>{form.level}%</span>
                                </div>
                                <input
                                    type="range" min="10" max="100" step="5"
                                    value={form.level}
                                    onChange={e => setForm(prev => ({ ...prev, level: e.target.value }))}
                                    style={{ width: '100%', accentColor: '#4f46e5' }}
                                />
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.625rem', color: '#94a3b8', marginTop: '0.25rem' }}>
                                    <span>Beginner</span>
                                    <span>Intermediate</span>
                                    <span>Expert</span>
                                </div>
                            </div>
                        </div>
                        <div className="admin-modal-footer">
                            <button onClick={() => setShowModal(false)} className="admin-btn admin-btn-secondary">Cancel</button>
                            <button onClick={handleSave} className="admin-btn admin-btn-primary">
                                {editSkill ? 'Save Changes' : 'Add Skill'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* New Category Modal */}
            {showCategoryModal && (
                <div className="admin-modal-overlay" onClick={() => setShowCategoryModal(false)}>
                    <div className="admin-modal" onClick={e => e.stopPropagation()} style={{ maxWidth: '400px' }}>
                        <div className="admin-modal-header">
                            <h3 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: '700', fontSize: '1.125rem', color: '#0f172a', margin: 0 }}>Add Skill Category</h3>
                            <button onClick={() => setShowCategoryModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', fontSize: '1.25rem' }}>✕</button>
                        </div>
                        <div className="admin-modal-body">
                            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '600', color: '#475569', marginBottom: '0.375rem' }}>Category Name</label>
                            <input className="admin-input" value={newCategory} onChange={e => setNewCategory(e.target.value)} placeholder="e.g. Cloud Services" onKeyDown={e => e.key === 'Enter' && handleAddCategory()} />
                        </div>
                        <div className="admin-modal-footer">
                            <button onClick={() => setShowCategoryModal(false)} className="admin-btn admin-btn-secondary">Cancel</button>
                            <button onClick={handleAddCategory} className="admin-btn admin-btn-primary">Add Category</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

import React, { useState } from 'react';

const ExperienceFormModal = ({ experience, onSave, onClose }) => {
    const [form, setForm] = useState(experience || {
        company: '', designation: '', duration: '', description: '', skills_used: []
    });
    const [skillInput, setSkillInput] = useState('');

    const handleChange = (key, value) => setForm(prev => ({ ...prev, [key]: value }));

    const addSkill = () => {
        if (skillInput.trim() && !form.skills_used.includes(skillInput.trim())) {
            handleChange('skills_used', [...form.skills_used, skillInput.trim()]);
            setSkillInput('');
        }
    };

    return (
        <div className="admin-modal-overlay" onClick={onClose}>
            <div className="admin-modal" onClick={e => e.stopPropagation()} style={{ maxWidth: '580px' }}>
                <div className="admin-modal-header">
                    <h3 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: '700', fontSize: '1.125rem', color: '#0f172a', margin: 0 }}>
                        {experience ? 'Edit Experience' : 'Add Experience'}
                    </h3>
                    <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', fontSize: '1.25rem' }}>✕</button>
                </div>
                <div className="admin-modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '600', color: '#475569', marginBottom: '0.375rem' }}>Company Name</label>
                        <input className="admin-input" value={form.company} onChange={e => handleChange('company', e.target.value)} placeholder="e.g. Comestro Techlabs Pvt Ltd" />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '600', color: '#475569', marginBottom: '0.375rem' }}>Designation</label>
                            <input className="admin-input" value={form.designation} onChange={e => handleChange('designation', e.target.value)} placeholder="e.g. Laravel Developer" />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '600', color: '#475569', marginBottom: '0.375rem' }}>Duration</label>
                            <input className="admin-input" value={form.duration} onChange={e => handleChange('duration', e.target.value)} placeholder="e.g. May 2026 - Present" />
                        </div>
                    </div>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '600', color: '#475569', marginBottom: '0.375rem' }}>Description</label>
                        <textarea className="admin-input admin-textarea" value={form.description} onChange={e => handleChange('description', e.target.value)} placeholder="Describe your role and responsibilities..." style={{ minHeight: '120px' }} />
                    </div>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '600', color: '#475569', marginBottom: '0.375rem' }}>Skills Used</label>
                        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                            <input className="admin-input" value={skillInput} onChange={e => setSkillInput(e.target.value)} placeholder="e.g. Laravel" onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addSkill())} style={{ flex: 1 }} />
                            <button onClick={addSkill} className="admin-btn admin-btn-primary" type="button">Add</button>
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
                            {form.skills_used.map((skill, i) => (
                                <span key={i} className="admin-badge admin-badge-indigo" style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}
                                    onClick={() => handleChange('skills_used', form.skills_used.filter(s => s !== skill))}>
                                    {skill} <span style={{ opacity: 0.6 }}>×</span>
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="admin-modal-footer">
                    <button onClick={onClose} className="admin-btn admin-btn-secondary">Cancel</button>
                    <button onClick={() => onSave(form)} className="admin-btn admin-btn-primary">
                        {experience ? 'Save Changes' : 'Add Experience'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default function AdminExperience({ experiences: initialExperiences, navigate }) {
    const [experiences, setExperiences] = useState(initialExperiences);
    const [showModal, setShowModal] = useState(false);
    const [editExp, setEditExp] = useState(null);

    const handleSave = (formData) => {
        if (editExp) {
            setExperiences(prev => prev.map((e, i) => i === experiences.indexOf(editExp) ? formData : e));
        } else {
            setExperiences(prev => [...prev, formData]);
        }
        setShowModal(false);
        setEditExp(null);
    };

    const handleDelete = (idx) => {
        setExperiences(prev => prev.filter((_, i) => i !== idx));
    };

    return (
        <div>
            {/* Header */}
            <div className="admin-animate-in" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <div>
                    <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.375rem', fontWeight: '700', color: '#0f172a', margin: 0 }}>Experience</h2>
                    <p style={{ fontSize: '0.8125rem', color: '#64748b', margin: 0 }}>
                        Manage your work experience ({experiences.length} entries)
                    </p>
                </div>
                <button onClick={() => { setEditExp(null); setShowModal(true); }} className="admin-btn admin-btn-primary">
                    <svg style={{ width: 16, height: 16 }} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Add Experience
                </button>
            </div>

            {/* Timeline */}
            <div style={{ position: 'relative', paddingLeft: '2rem' }}>
                {/* Timeline line */}
                <div style={{
                    position: 'absolute', left: '11px', top: '24px', bottom: '24px',
                    width: '2px', background: 'linear-gradient(180deg, #4f46e5, #0d9488)'
                }} />

                {experiences.map((exp, i) => (
                    <div key={i} className={`admin-animate-in admin-animate-in-${Math.min(i + 1, 6)}`} style={{
                        position: 'relative', marginBottom: '1.5rem'
                    }}>
                        {/* Timeline dot */}
                        <div style={{
                            position: 'absolute', left: '-2rem', top: '1.5rem',
                            width: '24px', height: '24px', borderRadius: '50%',
                            background: '#ffffff', border: '3px solid #4f46e5',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            zIndex: 1
                        }}>
                            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4f46e5' }} />
                        </div>

                        <div style={{
                            background: '#ffffff', border: '1px solid #e2e8f0',
                            borderRadius: '1rem', padding: '1.5rem',
                            transition: 'all 0.3s ease'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                                <div>
                                    <h3 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: '700', fontSize: '1.125rem', color: '#0f172a', margin: 0 }}>
                                        {exp.designation}
                                    </h3>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.25rem' }}>
                                        <span style={{ fontSize: '0.8125rem', color: '#4f46e5', fontWeight: '600' }}>{exp.company}</span>
                                        <span className="admin-badge admin-badge-indigo">{exp.duration}</span>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '0.375rem' }}>
                                    <button onClick={() => { setEditExp(exp); setShowModal(true); }} className="admin-btn admin-btn-secondary" style={{ padding: '0.375rem 0.5rem' }}>
                                        <svg style={{ width: 14, height: 14 }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125" /></svg>
                                    </button>
                                    <button onClick={() => handleDelete(i)} className="admin-btn admin-btn-danger" style={{ padding: '0.375rem 0.5rem' }}>
                                        <svg style={{ width: 14, height: 14 }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>
                                    </button>
                                </div>
                            </div>

                            <p style={{ fontSize: '0.8125rem', color: '#64748b', lineHeight: '1.6', marginBottom: '0.75rem' }}>
                                {exp.description}
                            </p>

                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
                                {exp.skills_used.map((skill, j) => (
                                    <span key={j} className="admin-badge admin-badge-teal">{skill}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {showModal && <ExperienceFormModal experience={editExp} onSave={handleSave} onClose={() => { setShowModal(false); setEditExp(null); }} />}
        </div>
    );
}

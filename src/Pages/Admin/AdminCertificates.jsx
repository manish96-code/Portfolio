import React, { useState } from 'react';

const CertificateFormModal = ({ certificate, onSave, onClose }) => {
    const [form, setForm] = useState(certificate || {
        title: '', organization: '', issue_date: '', credential_url: '#'
    });

    const handleChange = (key, value) => setForm(prev => ({ ...prev, [key]: value }));

    return (
        <div className="admin-modal-overlay" onClick={onClose}>
            <div className="admin-modal" onClick={e => e.stopPropagation()} style={{ maxWidth: '480px' }}>
                <div className="admin-modal-header">
                    <h3 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: '700', fontSize: '1.125rem', color: '#0f172a', margin: 0 }}>
                        {certificate ? 'Edit Certificate' : 'Add Certificate'}
                    </h3>
                    <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', fontSize: '1.25rem' }}>✕</button>
                </div>
                <div className="admin-modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '600', color: '#475569', marginBottom: '0.375rem' }}>Certificate Title</label>
                        <input className="admin-input" value={form.title} onChange={e => handleChange('title', e.target.value)} placeholder="e.g. Laravel & PHP Web Development" />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '600', color: '#475569', marginBottom: '0.375rem' }}>Status / Organization</label>
                            <input className="admin-input" value={form.organization} onChange={e => handleChange('organization', e.target.value)} placeholder="e.g. Status: Completed" />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '600', color: '#475569', marginBottom: '0.375rem' }}>Progress</label>
                            <select className="admin-input admin-select" value={form.issue_date} onChange={e => handleChange('issue_date', e.target.value)}>
                                <option value="Learned">Learned</option>
                                <option value="Learning">Learning</option>
                                <option value="Planned">Planned</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '600', color: '#475569', marginBottom: '0.375rem' }}>Credential URL</label>
                        <input className="admin-input" value={form.credential_url} onChange={e => handleChange('credential_url', e.target.value)} placeholder="https://..." />
                    </div>
                </div>
                <div className="admin-modal-footer">
                    <button onClick={onClose} className="admin-btn admin-btn-secondary">Cancel</button>
                    <button onClick={() => onSave(form)} className="admin-btn admin-btn-primary">
                        {certificate ? 'Save Changes' : 'Add Certificate'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default function AdminCertificates({ certificates: initialCertificates, navigate }) {
    const [certificates, setCertificates] = useState(initialCertificates);
    const [showModal, setShowModal] = useState(false);
    const [editCert, setEditCert] = useState(null);

    const handleSave = (formData) => {
        if (editCert) {
            setCertificates(prev => prev.map(c => c.id === editCert.id ? { ...editCert, ...formData } : c));
        } else {
            setCertificates(prev => [...prev, { ...formData, id: Date.now() }]);
        }
        setShowModal(false);
        setEditCert(null);
    };

    const handleDelete = (id) => {
        setCertificates(prev => prev.filter(c => c.id !== id));
    };

    const statusColors = {
        Learned: { bg: '#f0fdf4', color: '#15803d', border: '#bbf7d0', icon: '✅' },
        Learning: { bg: '#fffbeb', color: '#b45309', border: '#fde68a', icon: '📖' },
        Planned: { bg: '#f0f9ff', color: '#0369a1', border: '#bae6fd', icon: '📋' },
    };

    const gradients = ['#4f46e5, #6366f1', '#0d9488, #14b8a6', '#7c3aed, #8b5cf6', '#f59e0b, #fbbf24'];

    return (
        <div>
            {/* Header */}
            <div className="admin-animate-in" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <div>
                    <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.375rem', fontWeight: '700', color: '#0f172a', margin: 0 }}>Certificates</h2>
                    <p style={{ fontSize: '0.8125rem', color: '#64748b', margin: 0 }}>
                        Track your learning progress ({certificates.length} certificates)
                    </p>
                </div>
                <button onClick={() => { setEditCert(null); setShowModal(true); }} className="admin-btn admin-btn-primary">
                    <svg style={{ width: 16, height: 16 }} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Add Certificate
                </button>
            </div>

            {/* Cards Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
                {certificates.map((cert, i) => {
                    const status = statusColors[cert.issue_date] || statusColors.Learned;
                    return (
                        <div key={cert.id} className={`admin-animate-in admin-animate-in-${Math.min(i + 1, 6)}`} style={{
                            background: '#ffffff', border: '1px solid #e2e8f0',
                            borderRadius: '1rem', overflow: 'hidden',
                            transition: 'all 0.3s ease'
                        }}>
                            {/* Top gradient bar */}
                            <div style={{
                                height: '4px',
                                background: `linear-gradient(90deg, ${gradients[i % gradients.length]})`
                            }} />

                            <div style={{ padding: '1.25rem' }}>
                                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '1rem' }}>
                                    <div style={{
                                        width: '44px', height: '44px', borderRadius: '0.75rem',
                                        background: `linear-gradient(135deg, ${gradients[i % gradients.length]})`,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        flexShrink: 0
                                    }}>
                                        <svg style={{ width: 22, height: 22, color: '#fff' }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342" />
                                        </svg>
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <h4 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: '700', fontSize: '0.9375rem', color: '#0f172a', margin: 0 }}>
                                            {cert.title}
                                        </h4>
                                        <p style={{ fontSize: '0.75rem', color: '#64748b', margin: '0.25rem 0 0' }}>
                                            {cert.organization}
                                        </p>
                                    </div>
                                </div>

                                <div style={{
                                    display: 'inline-flex', alignItems: 'center', gap: '0.375rem',
                                    padding: '0.25rem 0.75rem', borderRadius: '9999px',
                                    background: status.bg, border: `1px solid ${status.border}`,
                                    fontSize: '0.6875rem', fontWeight: '600', color: status.color,
                                    marginBottom: '1rem'
                                }}>
                                    {status.icon} {cert.issue_date}
                                </div>

                                <div style={{ display: 'flex', gap: '0.5rem', borderTop: '1px solid #f1f5f9', paddingTop: '0.75rem' }}>
                                    <button onClick={() => { setEditCert(cert); setShowModal(true); }} className="admin-btn admin-btn-secondary" style={{ flex: 1, justifyContent: 'center', fontSize: '0.75rem' }}>
                                        Edit
                                    </button>
                                    <button onClick={() => handleDelete(cert.id)} className="admin-btn admin-btn-danger" style={{ fontSize: '0.75rem' }}>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {showModal && <CertificateFormModal certificate={editCert} onSave={handleSave} onClose={() => { setShowModal(false); setEditCert(null); }} />}
        </div>
    );
}

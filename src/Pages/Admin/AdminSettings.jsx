import React, { useState } from 'react';

export default function AdminSettings({ settings: initialSettings, socialLinks: initialSocialLinks, navigate }) {
    const [settings, setSettings] = useState(initialSettings);
    const [socialLinks, setSocialLinks] = useState(initialSocialLinks);
    const [saved, setSaved] = useState(false);
    const [activeTab, setActiveTab] = useState('profile');

    const handleSettingChange = (key, value) => {
        setSettings(prev => ({ ...prev, [key]: value }));
        setSaved(false);
    };

    const handleSocialChange = (idx, key, value) => {
        setSocialLinks(prev => prev.map((link, i) => i === idx ? { ...link, [key]: value } : link));
        setSaved(false);
    };

    const addSocialLink = () => {
        setSocialLinks(prev => [...prev, { platform: '', url: '', icon: '' }]);
    };

    const removeSocialLink = (idx) => {
        setSocialLinks(prev => prev.filter((_, i) => i !== idx));
    };

    const handleSave = () => {
        // In Phase 2, this will call the Laravel API
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    const tabs = [
        { key: 'profile', label: 'Profile', icon: '👤' },
        { key: 'social', label: 'Social Links', icon: '🔗' },
        { key: 'seo', label: 'SEO', icon: '🔍' },
    ];

    const platformIcons = ['github', 'linkedin', 'facebook', 'instagram', 'whatsapp', 'mail', 'twitter', 'youtube', 'discord'];

    return (
        <div>
            {/* Header */}
            <div className="admin-animate-in" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <div>
                    <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.375rem', fontWeight: '700', color: '#0f172a', margin: 0 }}>Settings</h2>
                    <p style={{ fontSize: '0.8125rem', color: '#64748b', margin: 0 }}>
                        Manage your profile, social links, and SEO settings
                    </p>
                </div>
                <button onClick={handleSave} className={`admin-btn ${saved ? 'admin-btn-success' : 'admin-btn-primary'}`}>
                    {saved ? (
                        <>
                            <svg style={{ width: 16, height: 16 }} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                            </svg>
                            Saved!
                        </>
                    ) : (
                        <>
                            <svg style={{ width: 16, height: 16 }} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Save Changes
                        </>
                    )}
                </button>
            </div>

            {/* Tabs */}
            <div className="admin-animate-in admin-animate-in-1" style={{
                display: 'flex', gap: '0.5rem', marginBottom: '1.5rem',
                borderBottom: '2px solid #f1f5f9', paddingBottom: '0'
            }}>
                {tabs.map(tab => (
                    <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        style={{
                            padding: '0.75rem 1.25rem',
                            border: 'none', borderBottom: `2px solid ${activeTab === tab.key ? '#4f46e5' : 'transparent'}`,
                            background: 'none',
                            cursor: 'pointer',
                            fontFamily: "'Inter', sans-serif",
                            fontSize: '0.8125rem',
                            fontWeight: activeTab === tab.key ? '600' : '500',
                            color: activeTab === tab.key ? '#4f46e5' : '#64748b',
                            transition: 'all 0.2s ease',
                            display: 'flex', alignItems: 'center', gap: '0.375rem',
                            marginBottom: '-2px'
                        }}
                    >
                        <span>{tab.icon}</span>
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            {activeTab === 'profile' && (
                <div className="admin-animate-in" style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '1rem', padding: '1.5rem' }}>
                    <h3 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: '700', fontSize: '1rem', color: '#0f172a', marginBottom: '1.25rem' }}>
                        Personal Information
                    </h3>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                        {[
                            { key: 'name', label: 'Full Name', placeholder: 'Manish Kumar' },
                            { key: 'title', label: 'Professional Title', placeholder: 'Full Stack Web Developer | Laravel | React' },
                            { key: 'location', label: 'Location', placeholder: 'Purnea, Bihar, India' },
                            { key: 'current_company', label: 'Current Company', placeholder: 'Comestro Techlabs Pvt Ltd' },
                            { key: 'education', label: 'Education', placeholder: 'BCA, Purnea University (2023-2026)' },
                            { key: 'email', label: 'Email', placeholder: 'your@email.com', type: 'email' },
                            { key: 'phone', label: 'Phone', placeholder: '+91 8207593672', type: 'tel' },
                            { key: 'resume_file', label: 'Resume File Path', placeholder: '/downloads/resume.pdf' },
                        ].map(field => (
                            <div key={field.key}>
                                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '600', color: '#475569', marginBottom: '0.375rem' }}>
                                    {field.label}
                                </label>
                                <input
                                    className="admin-input"
                                    type={field.type || 'text'}
                                    value={settings[field.key] || ''}
                                    onChange={e => handleSettingChange(field.key, e.target.value)}
                                    placeholder={field.placeholder}
                                />
                            </div>
                        ))}
                    </div>

                    <div style={{ marginTop: '1rem' }}>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '600', color: '#475569', marginBottom: '0.375rem' }}>
                            Bio / Objective
                        </label>
                        <textarea
                            className="admin-input admin-textarea"
                            value={settings.bio || ''}
                            onChange={e => handleSettingChange('bio', e.target.value)}
                            placeholder="Write a brief bio..."
                            style={{ minHeight: '100px' }}
                        />
                    </div>

                    <div style={{ marginTop: '1rem' }}>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '600', color: '#475569', marginBottom: '0.375rem' }}>
                            Objective Statement
                        </label>
                        <textarea
                            className="admin-input admin-textarea"
                            value={settings.objective || ''}
                            onChange={e => handleSettingChange('objective', e.target.value)}
                            placeholder="Your professional objective..."
                            style={{ minHeight: '80px' }}
                        />
                    </div>
                </div>
            )}

            {activeTab === 'social' && (
                <div className="admin-animate-in" style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '1rem', padding: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                        <h3 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: '700', fontSize: '1rem', color: '#0f172a', margin: 0 }}>
                            Social Links
                        </h3>
                        <button onClick={addSocialLink} className="admin-btn admin-btn-secondary" style={{ fontSize: '0.75rem' }}>
                            <svg style={{ width: 14, height: 14 }} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                            Add Link
                        </button>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        {socialLinks.map((link, idx) => (
                            <div key={idx} style={{
                                display: 'flex', gap: '0.75rem', alignItems: 'center',
                                padding: '1rem', background: '#f8fafc',
                                borderRadius: '0.75rem', border: '1px solid #f1f5f9'
                            }}>
                                <div style={{
                                    width: '40px', height: '40px', borderRadius: '0.5rem',
                                    background: 'linear-gradient(135deg, #4f46e5, #6366f1)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    color: '#fff', fontSize: '0.875rem', fontWeight: '700',
                                    flexShrink: 0
                                }}>
                                    {(link.platform || '?').substring(0, 2).toUpperCase()}
                                </div>
                                <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem' }}>
                                    <input className="admin-input" value={link.platform} onChange={e => handleSocialChange(idx, 'platform', e.target.value)} placeholder="Platform" style={{ fontSize: '0.8125rem' }} />
                                    <input className="admin-input" value={link.url} onChange={e => handleSocialChange(idx, 'url', e.target.value)} placeholder="URL" style={{ fontSize: '0.8125rem' }} />
                                    <select className="admin-input admin-select" value={link.icon} onChange={e => handleSocialChange(idx, 'icon', e.target.value)} style={{ fontSize: '0.8125rem' }}>
                                        <option value="">Select Icon</option>
                                        {platformIcons.map(icon => (
                                            <option key={icon} value={icon}>{icon}</option>
                                        ))}
                                    </select>
                                </div>
                                <button onClick={() => removeSocialLink(idx)} style={{
                                    background: 'none', border: 'none', cursor: 'pointer', color: '#f87171', padding: '0.25rem'
                                }}>
                                    <svg style={{ width: 16, height: 16 }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {activeTab === 'seo' && (
                <div className="admin-animate-in" style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '1rem', padding: '1.5rem' }}>
                    <h3 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: '700', fontSize: '1rem', color: '#0f172a', marginBottom: '1.25rem' }}>
                        SEO Settings
                    </h3>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '600', color: '#475569', marginBottom: '0.375rem' }}>
                                Meta Title
                            </label>
                            <input
                                className="admin-input"
                                value={settings.meta_title || ''}
                                onChange={e => handleSettingChange('meta_title', e.target.value)}
                                placeholder="Page title for search engines"
                            />
                            <div style={{ fontSize: '0.6875rem', color: '#94a3b8', marginTop: '0.25rem' }}>
                                {(settings.meta_title || '').length}/60 characters
                            </div>
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '600', color: '#475569', marginBottom: '0.375rem' }}>
                                Meta Description
                            </label>
                            <textarea
                                className="admin-input admin-textarea"
                                value={settings.meta_description || ''}
                                onChange={e => handleSettingChange('meta_description', e.target.value)}
                                placeholder="Description for search engines..."
                                style={{ minHeight: '80px' }}
                            />
                            <div style={{ fontSize: '0.6875rem', color: '#94a3b8', marginTop: '0.25rem' }}>
                                {(settings.meta_description || '').length}/160 characters
                            </div>
                        </div>

                        {/* SEO Preview */}
                        <div style={{
                            marginTop: '0.5rem', padding: '1.25rem',
                            background: '#f8fafc', borderRadius: '0.75rem',
                            border: '1px solid #e2e8f0'
                        }}>
                            <div style={{ fontSize: '0.6875rem', fontWeight: '600', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>
                                Google Search Preview
                            </div>
                            <div style={{ fontFamily: 'Arial, sans-serif' }}>
                                <div style={{ fontSize: '1.125rem', color: '#1a0dab', fontWeight: '400', marginBottom: '0.25rem', cursor: 'pointer' }}>
                                    {settings.meta_title || 'Page Title'}
                                </div>
                                <div style={{ fontSize: '0.8125rem', color: '#006621', marginBottom: '0.25rem' }}>
                                    techmanish.in
                                </div>
                                <div style={{ fontSize: '0.8125rem', color: '#545454', lineHeight: '1.4' }}>
                                    {settings.meta_description || 'Page description will appear here...'}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Success toast */}
            {saved && (
                <div style={{
                    position: 'fixed', bottom: '1.5rem', right: '1.5rem',
                    background: '#0d9488', color: '#ffffff',
                    padding: '0.75rem 1.25rem', borderRadius: '0.75rem',
                    boxShadow: '0 10px 30px rgba(13, 148, 136, 0.3)',
                    display: 'flex', alignItems: 'center', gap: '0.5rem',
                    fontFamily: "'Inter', sans-serif", fontSize: '0.875rem', fontWeight: '600',
                    animation: 'admin-slide-up 0.3s ease', zIndex: 100
                }}>
                    <svg style={{ width: 18, height: 18 }} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    Settings saved successfully!
                </div>
            )}
        </div>
    );
}

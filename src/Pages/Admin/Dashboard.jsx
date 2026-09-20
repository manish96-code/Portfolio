import React from 'react';

// Mini chart component — simple SVG bar chart
const MiniBarChart = ({ data, color }) => {
    const max = Math.max(...data);
    return (
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '3px', height: '40px' }}>
            {data.map((val, i) => (
                <div
                    key={i}
                    className="chart-bar"
                    style={{
                        width: '6px',
                        height: `${(val / max) * 100}%`,
                        borderRadius: '2px',
                        background: color,
                        opacity: 0.4 + (val / max) * 0.6,
                        animationDelay: `${i * 0.05}s`
                    }}
                />
            ))}
        </div>
    );
};

// Stat card component
const StatCard = ({ icon, label, value, change, color, chartData, delay }) => (
    <div className={`admin-stat-card ${color} admin-animate-in admin-animate-in-${delay}`}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
                <div style={{
                    width: '42px', height: '42px', borderRadius: '0.75rem',
                    background: `linear-gradient(135deg, ${getColorGradient(color)})`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: '1rem',
                    boxShadow: `0 4px 12px ${getColorShadow(color)}`
                }}>
                    {icon}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: '500', marginBottom: '0.25rem' }}>
                    {label}
                </div>
                <div style={{ fontSize: '1.75rem', fontWeight: '800', color: '#0f172a', fontFamily: "'Outfit', sans-serif" }}>
                    {value}
                </div>
            </div>
            {chartData && <MiniBarChart data={chartData} color={getChartColor(color)} />}
        </div>
        {change && (
            <div style={{ marginTop: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                <span style={{
                    fontSize: '0.6875rem', fontWeight: '600',
                    color: change > 0 ? '#059669' : '#dc2626',
                    display: 'inline-flex', alignItems: 'center', gap: '2px'
                }}>
                    {change > 0 ? '↑' : '↓'} {Math.abs(change)}%
                </span>
                <span style={{ fontSize: '0.6875rem', color: '#94a3b8' }}>vs last month</span>
            </div>
        )}
    </div>
);

function getColorGradient(color) {
    switch (color) {
        case 'indigo': return '#4f46e5, #6366f1';
        case 'teal': return '#0d9488, #14b8a6';
        case 'violet': return '#7c3aed, #8b5cf6';
        case 'amber': return '#f59e0b, #fbbf24';
        case 'rose': return '#e11d48, #fb7185';
        case 'sky': return '#0284c7, #38bdf8';
        default: return '#4f46e5, #6366f1';
    }
}

function getColorShadow(color) {
    switch (color) {
        case 'indigo': return 'rgba(79, 70, 229, 0.2)';
        case 'teal': return 'rgba(13, 148, 136, 0.2)';
        case 'violet': return 'rgba(124, 58, 237, 0.2)';
        case 'amber': return 'rgba(245, 158, 11, 0.2)';
        case 'rose': return 'rgba(225, 29, 72, 0.2)';
        case 'sky': return 'rgba(2, 132, 199, 0.2)';
        default: return 'rgba(79, 70, 229, 0.2)';
    }
}

function getChartColor(color) {
    switch (color) {
        case 'indigo': return '#6366f1';
        case 'teal': return '#14b8a6';
        case 'violet': return '#8b5cf6';
        case 'amber': return '#fbbf24';
        case 'rose': return '#fb7185';
        case 'sky': return '#38bdf8';
        default: return '#6366f1';
    }
}

export default function Dashboard({ portfolioData, navigate }) {
    const { projects, blogs, skills, certificates, experiences, settings } = portfolioData;

    const totalSkills = Object.values(skills).flat().length;
    const featuredProjects = projects.filter(p => p.is_featured).length;

    // Quick action cards
    const quickActions = [
        { label: 'Add Project', icon: '📁', path: '/admin/projects', desc: 'Add a new project to showcase' },
        { label: 'Write Blog', icon: '✍️', path: '/admin/blogs', desc: 'Write a new blog post' },
        { label: 'Update Profile', icon: '👤', path: '/admin/settings', desc: 'Edit your personal info' },
        { label: 'Manage Skills', icon: '⚡', path: '/admin/skills', desc: 'Update your skill levels' },
    ];

    return (
        <div>
            {/* Welcome Banner */}
            <div className="admin-animate-in" style={{
                background: 'linear-gradient(135deg, #4f46e5, #7c3aed, #0d9488)',
                borderRadius: '1rem', padding: '2rem',
                marginBottom: '1.5rem', position: 'relative', overflow: 'hidden'
            }}>
                <div style={{
                    position: 'absolute', top: '-20px', right: '-20px',
                    width: '200px', height: '200px', borderRadius: '50%',
                    background: 'rgba(255,255,255,0.05)'
                }} />
                <div style={{
                    position: 'absolute', bottom: '-40px', right: '100px',
                    width: '150px', height: '150px', borderRadius: '50%',
                    background: 'rgba(255,255,255,0.03)'
                }} />
                <div style={{ position: 'relative', zIndex: 1 }}>
                    <h2 style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontSize: '1.5rem', fontWeight: '700',
                        color: '#ffffff', marginBottom: '0.375rem'
                    }}>
                        Welcome back, {settings.name?.split(' ')[0]}! 👋
                    </h2>
                    <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.875rem', maxWidth: '500px' }}>
                        Here's an overview of your portfolio. Manage your projects, blogs, and skills from this dashboard.
                    </p>
                </div>
            </div>

            {/* Stats Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '1rem', marginBottom: '1.5rem'
            }}>
                <StatCard
                    icon={<svg style={{ width: 20, height: 20, color: '#fff' }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" /></svg>}
                    label="Total Projects"
                    value={projects.length}
                    change={12}
                    color="indigo"
                    chartData={[3, 5, 2, 7, 4, 6, projects.length]}
                    delay={1}
                />
                <StatCard
                    icon={<svg style={{ width: 20, height: 20, color: '#fff' }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25H5.625a2.25 2.25 0 01-2.25-2.25V6.375c0-.621.504-1.125 1.125-1.125H8.25m8.25 0h.375a1.125 1.125 0 011.125 1.125v.375" /></svg>}
                    label="Blog Posts"
                    value={blogs.length}
                    change={8}
                    color="teal"
                    chartData={[1, 3, 2, 4, 2, 3, blogs.length]}
                    delay={2}
                />
                <StatCard
                    icon={<svg style={{ width: 20, height: 20, color: '#fff' }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>}
                    label="Total Skills"
                    value={totalSkills}
                    color="violet"
                    chartData={[8, 12, 10, 15, 14, 18, totalSkills]}
                    delay={3}
                />
                <StatCard
                    icon={<svg style={{ width: 20, height: 20, color: '#fff' }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" /></svg>}
                    label="Featured"
                    value={featuredProjects}
                    color="amber"
                    chartData={[2, 3, 2, 4, 3, 4, featuredProjects]}
                    delay={4}
                />
            </div>

            {/* Two Column Layout */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
                gap: '1.5rem'
            }}>
                {/* Quick Actions */}
                <div className="admin-animate-in admin-animate-in-5" style={{
                    background: '#ffffff', border: '1px solid #e2e8f0',
                    borderRadius: '1rem', padding: '1.5rem'
                }}>
                    <h3 style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontSize: '1rem', fontWeight: '700', color: '#0f172a',
                        marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem'
                    }}>
                        <svg style={{ width: 18, height: 18, color: '#4f46e5' }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                        </svg>
                        Quick Actions
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                        {quickActions.map((action, i) => (
                            <button
                                key={i}
                                onClick={() => navigate(action.path)}
                                style={{
                                    background: '#f8fafc',
                                    border: '1px solid #e2e8f0',
                                    borderRadius: '0.75rem',
                                    padding: '1rem',
                                    cursor: 'pointer',
                                    textAlign: 'left',
                                    transition: 'all 0.2s ease',
                                    fontFamily: "'Inter', sans-serif"
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.borderColor = '#c7d2fe';
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(79, 70, 229, 0.06)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.borderColor = '#e2e8f0';
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = 'none';
                                }}
                            >
                                <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{action.icon}</div>
                                <div style={{ fontWeight: '600', fontSize: '0.8125rem', color: '#0f172a', marginBottom: '0.25rem' }}>
                                    {action.label}
                                </div>
                                <div style={{ fontSize: '0.6875rem', color: '#94a3b8' }}>
                                    {action.desc}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Profile Summary */}
                <div className="admin-animate-in admin-animate-in-6" style={{
                    background: '#ffffff', border: '1px solid #e2e8f0',
                    borderRadius: '1rem', padding: '1.5rem'
                }}>
                    <h3 style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontSize: '1rem', fontWeight: '700', color: '#0f172a',
                        marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem'
                    }}>
                        <svg style={{ width: 18, height: 18, color: '#0d9488' }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                        </svg>
                        Profile Summary
                    </h3>

                    <div style={{
                        display: 'flex', alignItems: 'center', gap: '1rem',
                        padding: '1rem', background: '#f8fafc',
                        borderRadius: '0.75rem', marginBottom: '1rem'
                    }}>
                        <div style={{
                            width: '56px', height: '56px', borderRadius: '1rem',
                            background: 'linear-gradient(135deg, #4f46e5, #0d9488)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: '#fff', fontWeight: '800', fontSize: '1.25rem',
                            fontFamily: "'Outfit', sans-serif",
                            boxShadow: '0 4px 12px rgba(79, 70, 229, 0.2)',
                            flexShrink: 0
                        }}>
                            MK
                        </div>
                        <div>
                            <div style={{ fontWeight: '700', color: '#0f172a', fontSize: '0.9375rem' }}>
                                {settings.name}
                            </div>
                            <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.125rem' }}>
                                {settings.title}
                            </div>
                        </div>
                    </div>

                    {/* Info rows */}
                    {[
                        { label: 'Location', value: settings.location, icon: '📍' },
                        { label: 'Company', value: settings.current_company, icon: '🏢' },
                        { label: 'Education', value: settings.education, icon: '🎓' },
                        { label: 'Email', value: settings.email, icon: '📧' },
                    ].map((item, i) => (
                        <div key={i} style={{
                            display: 'flex', alignItems: 'center', gap: '0.75rem',
                            padding: '0.625rem 0',
                            borderBottom: i < 3 ? '1px solid #f1f5f9' : 'none'
                        }}>
                            <span style={{ fontSize: '0.875rem' }}>{item.icon}</span>
                            <div>
                                <div style={{ fontSize: '0.6875rem', color: '#94a3b8', fontWeight: '500' }}>{item.label}</div>
                                <div style={{ fontSize: '0.8125rem', color: '#334155', fontWeight: '500' }}>{item.value}</div>
                            </div>
                        </div>
                    ))}

                    <button
                        onClick={() => navigate('/admin/settings')}
                        className="admin-btn admin-btn-secondary"
                        style={{ width: '100%', justifyContent: 'center', marginTop: '1rem' }}
                    >
                        <svg style={{ width: 14, height: 14 }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125" />
                        </svg>
                        Edit Profile
                    </button>
                </div>
            </div>

            {/* Recent Projects Table */}
            <div className="admin-animate-in admin-animate-in-6" style={{
                background: '#ffffff', border: '1px solid #e2e8f0',
                borderRadius: '1rem', padding: '1.5rem', marginTop: '1.5rem'
            }}>
                <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    marginBottom: '1rem'
                }}>
                    <h3 style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontSize: '1rem', fontWeight: '700', color: '#0f172a',
                        display: 'flex', alignItems: 'center', gap: '0.5rem'
                    }}>
                        <svg style={{ width: 18, height: 18, color: '#6366f1' }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
                        </svg>
                        Recent Projects
                    </h3>
                    <button
                        onClick={() => navigate('/admin/projects')}
                        className="admin-btn admin-btn-primary"
                        style={{ fontSize: '0.75rem', padding: '0.375rem 0.75rem' }}
                    >
                        View All →
                    </button>
                </div>

                <div style={{ overflowX: 'auto' }}>
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Project</th>
                                <th>Status</th>
                                <th>Technologies</th>
                                <th>Featured</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projects.slice(0, 4).map((project, i) => (
                                <tr key={project.id}>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                            <div style={{
                                                width: '36px', height: '36px', borderRadius: '0.5rem',
                                                background: `linear-gradient(135deg, ${['#4f46e5', '#0d9488', '#7c3aed', '#f59e0b'][i % 4]}, ${['#6366f1', '#14b8a6', '#8b5cf6', '#fbbf24'][i % 4]})`,
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                color: '#fff', fontWeight: '700', fontSize: '0.6875rem',
                                                fontFamily: "'Outfit', sans-serif", flexShrink: 0
                                            }}>
                                                {project.title.substring(0, 2).toUpperCase()}
                                            </div>
                                            <div>
                                                <div style={{ fontWeight: '600', color: '#0f172a' }}>{project.title}</div>
                                                <div style={{ fontSize: '0.75rem', color: '#94a3b8', maxWidth: '250px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                    {project.description}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <span className={`admin-badge ${project.status === 'Completed' ? 'admin-badge-green' : 'admin-badge-amber'}`}>
                                            {project.status}
                                        </span>
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', gap: '0.375rem', flexWrap: 'wrap' }}>
                                            {project.technologies.slice(0, 3).map((tech, j) => (
                                                <span key={j} className="admin-badge admin-badge-indigo">
                                                    {tech}
                                                </span>
                                            ))}
                                            {project.technologies.length > 3 && (
                                                <span className="admin-badge admin-badge-indigo">
                                                    +{project.technologies.length - 3}
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                    <td>
                                        {project.is_featured ? (
                                            <span style={{ color: '#f59e0b', fontSize: '1.125rem' }}>★</span>
                                        ) : (
                                            <span style={{ color: '#cbd5e1', fontSize: '1.125rem' }}>☆</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Skills Overview */}
            <div className="admin-animate-in admin-animate-in-6" style={{
                background: '#ffffff', border: '1px solid #e2e8f0',
                borderRadius: '1rem', padding: '1.5rem', marginTop: '1.5rem'
            }}>
                <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    marginBottom: '1rem'
                }}>
                    <h3 style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontSize: '1rem', fontWeight: '700', color: '#0f172a',
                        display: 'flex', alignItems: 'center', gap: '0.5rem'
                    }}>
                        <svg style={{ width: 18, height: 18, color: '#7c3aed' }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                        </svg>
                        Skills Overview
                    </h3>
                    <button
                        onClick={() => navigate('/admin/skills')}
                        className="admin-btn admin-btn-primary"
                        style={{ fontSize: '0.75rem', padding: '0.375rem 0.75rem' }}
                    >
                        Manage →
                    </button>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '1rem'
                }}>
                    {Object.entries(skills).map(([category, skillList]) => (
                        <div key={category} style={{
                            padding: '1rem', background: '#f8fafc',
                            borderRadius: '0.75rem', border: '1px solid #f1f5f9'
                        }}>
                            <div style={{
                                fontSize: '0.75rem', fontWeight: '700', color: '#475569',
                                textTransform: 'uppercase', letterSpacing: '0.05em',
                                marginBottom: '0.75rem'
                            }}>
                                {category}
                            </div>
                            {skillList.slice(0, 3).map((skill, i) => (
                                <div key={i} style={{ marginBottom: i < 2 ? '0.5rem' : 0 }}>
                                    <div style={{
                                        display: 'flex', justifyContent: 'space-between',
                                        fontSize: '0.75rem', marginBottom: '0.25rem'
                                    }}>
                                        <span style={{ color: '#334155', fontWeight: '500' }}>{skill.name}</span>
                                        <span style={{ color: '#94a3b8' }}>{skill.level}%</span>
                                    </div>
                                    <div style={{
                                        height: '4px', background: '#e2e8f0',
                                        borderRadius: '9999px', overflow: 'hidden'
                                    }}>
                                        <div style={{
                                            height: '100%',
                                            width: `${skill.level}%`,
                                            background: 'linear-gradient(90deg, #4f46e5, #7c3aed)',
                                            borderRadius: '9999px',
                                            transition: 'width 1s cubic-bezier(0.16, 1, 0.3, 1)'
                                        }} />
                                    </div>
                                </div>
                            ))}
                            {skillList.length > 3 && (
                                <div style={{ fontSize: '0.6875rem', color: '#94a3b8', marginTop: '0.5rem' }}>
                                    +{skillList.length - 3} more
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

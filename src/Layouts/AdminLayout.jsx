import React, { useState } from 'react';

// Sidebar navigation items
const NAV_ITEMS = [
    { key: 'dashboard', label: 'Dashboard', path: '/admin', icon: 'dashboard' },
    { key: 'projects', label: 'Projects', path: '/admin/projects', icon: 'projects' },
    { key: 'blogs', label: 'Blogs', path: '/admin/blogs', icon: 'blogs' },
    { key: 'skills', label: 'Skills', path: '/admin/skills', icon: 'skills' },
    { key: 'experience', label: 'Experience', path: '/admin/experience', icon: 'experience' },
    { key: 'certificates', label: 'Certificates', path: '/admin/certificates', icon: 'certificates' },
    { key: 'settings', label: 'Settings', path: '/admin/settings', icon: 'settings' },
];

// SVG Icon components
const NavIcon = ({ name, size = 20 }) => {
    const s = { width: size, height: size };
    switch (name) {
        case 'dashboard':
            return <svg xmlns="http://www.w3.org/2000/svg" style={s} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" /></svg>;
        case 'projects':
            return <svg xmlns="http://www.w3.org/2000/svg" style={s} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" /></svg>;
        case 'blogs':
            return <svg xmlns="http://www.w3.org/2000/svg" style={s} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25H5.625a2.25 2.25 0 01-2.25-2.25V6.375c0-.621.504-1.125 1.125-1.125H8.25m8.25 0h.375a1.125 1.125 0 011.125 1.125v.375" /></svg>;
        case 'skills':
            return <svg xmlns="http://www.w3.org/2000/svg" style={s} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.1-5.1a3.012 3.012 0 010-4.26 3.012 3.012 0 014.26 0l.84.84.84-.84a3.012 3.012 0 014.26 0 3.012 3.012 0 010 4.26l-5.1 5.1z" /><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M5.25 18.75h13.5" /></svg>;
        case 'experience':
            return <svg xmlns="http://www.w3.org/2000/svg" style={s} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>;
        case 'certificates':
            return <svg xmlns="http://www.w3.org/2000/svg" style={s} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" /></svg>;
        case 'settings':
            return <svg xmlns="http://www.w3.org/2000/svg" style={s} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.241-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
        default:
            return null;
    }
};

const HamburgerIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" style={{ width: 22, height: 22 }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
);

const LogoutIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" style={{ width: 18, height: 18 }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
    </svg>
);

export default function AdminLayout({ children, currentPath, navigate, onLogout, settings }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const isActive = (path) => {
        if (path === '/admin') return currentPath === '/admin';
        return currentPath.startsWith(path);
    };

    const handleNav = (path) => {
        navigate(path);
        setSidebarOpen(false);
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh', fontFamily: "'Inter', sans-serif" }}>
            {/* Mobile overlay */}
            {sidebarOpen && (
                <div
                    onClick={() => setSidebarOpen(false)}
                    style={{
                        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
                        zIndex: 35, display: 'block'
                    }}
                    className="md:hidden"
                />
            )}

            {/* Sidebar */}
            <aside
                className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}
                style={{
                    width: '260px', minWidth: '260px',
                    display: 'flex', flexDirection: 'column',
                    padding: '0', height: '100vh',
                    position: 'sticky', top: 0,
                    ...(window.innerWidth <= 768 ? {
                        position: 'fixed', zIndex: 40,
                        transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
                        height: '100vh'
                    } : {})
                }}
            >
                {/* Brand */}
                <div style={{
                    padding: '1.5rem 1.25rem', borderBottom: '1px solid rgba(99, 102, 241, 0.08)',
                    display: 'flex', alignItems: 'center', gap: '0.75rem'
                }}>
                    <div style={{
                        width: '40px', height: '40px', borderRadius: '0.625rem',
                        background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: '0 4px 12px rgba(79, 70, 229, 0.3)',
                        flexShrink: 0
                    }}>
                        <span style={{ color: '#fff', fontWeight: '800', fontSize: '1rem', fontFamily: "'Outfit', sans-serif" }}>
                            MK
                        </span>
                    </div>
                    <div>
                        <div style={{ color: '#ffffff', fontWeight: '700', fontSize: '0.9375rem', fontFamily: "'Outfit', sans-serif" }}>
                            {settings?.name || 'Admin'}
                        </div>
                        <div style={{ color: 'rgba(148, 163, 184, 0.6)', fontSize: '0.6875rem' }}>
                            Portfolio Admin
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav style={{ flex: 1, padding: '1rem 0.75rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <div style={{ padding: '0 0.75rem', marginBottom: '0.5rem' }}>
                        <span style={{
                            fontSize: '0.625rem', fontWeight: '700',
                            textTransform: 'uppercase', letterSpacing: '0.1em',
                            color: 'rgba(100, 116, 139, 0.6)'
                        }}>
                            Menu
                        </span>
                    </div>
                    {NAV_ITEMS.map(item => (
                        <button
                            key={item.key}
                            onClick={() => handleNav(item.path)}
                            className={`admin-sidebar-link ${isActive(item.path) ? 'active' : ''}`}
                        >
                            <NavIcon name={item.icon} />
                            <span>{item.label}</span>
                        </button>
                    ))}
                </nav>

                {/* Sidebar Footer */}
                <div style={{
                    padding: '1rem 0.75rem',
                    borderTop: '1px solid rgba(99, 102, 241, 0.08)'
                }}>
                    <button
                        onClick={() => handleNav('/')}
                        className="admin-sidebar-link"
                        style={{ marginBottom: '0.25rem' }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" style={{ width: 20, height: 20 }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                        </svg>
                        <span>View Portfolio</span>
                    </button>
                    <button
                        onClick={onLogout}
                        className="admin-sidebar-link"
                        style={{ color: 'rgba(248, 113, 113, 0.8)' }}
                    >
                        <LogoutIcon />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main content area */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }} className="admin-content">
                {/* Top Header Bar */}
                <header style={{
                    padding: '0.875rem 1.5rem',
                    background: 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(12px)',
                    borderBottom: '1px solid #e2e8f0',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    position: 'sticky', top: 0, zIndex: 20
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        {/* Mobile hamburger */}
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            style={{
                                background: 'none', border: 'none', cursor: 'pointer',
                                color: '#475569', padding: '0.375rem',
                                display: window.innerWidth <= 768 ? 'block' : 'none'
                            }}
                        >
                            <HamburgerIcon />
                        </button>

                        <div>
                            <h1 style={{
                                fontFamily: "'Outfit', sans-serif",
                                fontSize: '1.125rem', fontWeight: '700', color: '#0f172a',
                                margin: 0
                            }}>
                                {NAV_ITEMS.find(item => isActive(item.path))?.label || 'Dashboard'}
                            </h1>
                            <p style={{ fontSize: '0.75rem', color: '#94a3b8', margin: 0 }}>
                                Manage your portfolio content
                            </p>
                        </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        {/* Notification bell */}
                        <button style={{
                            background: 'none', border: '1px solid #e2e8f0',
                            borderRadius: '0.5rem', padding: '0.5rem',
                            cursor: 'pointer', color: '#64748b',
                            transition: 'all 0.2s ease', position: 'relative'
                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" style={{ width: 18, height: 18 }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                            </svg>
                            <span style={{
                                position: 'absolute', top: '6px', right: '6px',
                                width: '6px', height: '6px', borderRadius: '50%',
                                background: '#4f46e5'
                            }} />
                        </button>

                        {/* Avatar */}
                        <div style={{
                            width: '36px', height: '36px', borderRadius: '0.5rem',
                            background: 'linear-gradient(135deg, #4f46e5, #0d9488)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: '#fff', fontWeight: '700', fontSize: '0.8125rem',
                            fontFamily: "'Outfit', sans-serif",
                            boxShadow: '0 2px 8px rgba(79, 70, 229, 0.2)'
                        }}>
                            MK
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main style={{ flex: 1, padding: '1.5rem' }}>
                    {children}
                </main>
            </div>
        </div>
    );
}

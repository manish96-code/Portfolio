import React, { useState } from 'react';

// Sidebar navigation items grouped
const NAV_SECTIONS = [
    {
        title: 'OVERVIEW',
        items: [
            { key: 'dashboard', label: 'Dashboard', path: '/admin', icon: 'dashboard' },
        ]
    },
    {
        title: 'PORTFOLIO CONTENT',
        items: [
            { key: 'projects', label: 'Projects', path: '/admin/projects', icon: 'projects' },
            { key: 'blogs', label: 'Blogs & Articles', path: '/admin/blogs', icon: 'blogs' },
            { key: 'skills', label: 'Skills & Tech', path: '/admin/skills', icon: 'skills' },
        ]
    },
    {
        title: 'EXPERIENCE & BIO',
        items: [
            { key: 'experience', label: 'Work Experience', path: '/admin/experience', icon: 'experience' },
            { key: 'certificates', label: 'Certifications', path: '/admin/certificates', icon: 'certificates' },
        ]
    },
    {
        title: 'SETTINGS',
        items: [
            { key: 'settings', label: 'Site Settings', path: '/admin/settings', icon: 'settings' },
        ]
    }
];

// SVG Icon components
const NavIcon = ({ name, size = 18 }) => {
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

export default function AdminLayout({ children, currentPath, navigate, onLogout, settings }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const isActive = (path) => {
        if (path === '/admin') return currentPath === '/admin' || currentPath === '/admin/';
        return currentPath.startsWith(path);
    };

    const handleNav = (path) => {
        navigate(path);
        setSidebarOpen(false);
    };

    return (
        <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900">
            {/* Mobile overlay */}
            {sidebarOpen && (
                <div
                    onClick={() => setSidebarOpen(false)}
                    className="fixed inset-0 bg-slate-900/50 z-30 lg:hidden"
                />
            )}

            {/* Sidebar (Clean Dark Slate like LearnSyntax Admin in Image 5) */}
            <aside
                className={`fixed lg:sticky top-0 left-0 h-screen w-64 min-w-64 bg-[#111827] text-slate-300 z-40 flex flex-col justify-between transition-transform duration-200 border-r border-slate-800/80 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
                    }`}
            >
                <div>
                    {/* Brand Header */}
                    <div className="p-4 border-b border-slate-800/80 flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                            <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-blue-600 text-white font-display font-extrabold text-xs flex items-center justify-center shadow-xs">
                                TM
                            </span>
                            <div>
                                <h2 className="font-display font-bold text-sm text-white leading-tight">
                                    TechManish
                                </h2>
                                <p className="text-[10px] text-slate-400 font-mono">
                                    Portfolio Core v2.0
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="lg:hidden text-slate-400 hover:text-white p-1"
                        >
                            ✕
                        </button>
                    </div>

                    {/* Grouped Nav Items */}
                    <nav className="p-3 space-y-4 overflow-y-auto max-h-[calc(100vh-160px)]">
                        {NAV_SECTIONS.map((section) => (
                            <div key={section.title}>
                                <p className="px-3 pb-1.5 text-[10px] font-bold tracking-wider uppercase text-slate-500">
                                    {section.title}
                                </p>
                                <div className="space-y-0.5">
                                    {section.items.map((item) => {
                                        const active = isActive(item.path);
                                        return (
                                            <button
                                                key={item.key}
                                                type="button"
                                                onClick={() => handleNav(item.path)}
                                                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-all text-left cursor-pointer ${active
                                                    ? 'bg-blue-600 text-white font-semibold shadow-xs'
                                                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                                                    }`}
                                            >
                                                <NavIcon name={item.icon} />
                                                <span>{item.label}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </nav>
                </div>

                {/* Sidebar Bottom Profile Card (Inspired by Image 5) */}
                <div className="p-3 border-t border-slate-800/80 space-y-1">
                    <button
                        type="button"
                        onClick={() => handleNav('/')}
                        className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors cursor-pointer"
                    >
                        <span className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                            View Public Site
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono">⌘P</span>
                    </button>

                    <div className="pt-1 flex items-center justify-between p-2 rounded-xl bg-slate-900/80 border border-slate-800">
                        <div className="flex items-center gap-2.5 min-w-0">
                            <div className="w-7 h-7 rounded-lg bg-blue-600/20 border border-blue-500/30 text-blue-400 font-display font-bold text-xs flex items-center justify-center shrink-0">
                                MK
                            </div>
                            <div className="min-w-0 truncate">
                                <p className="text-xs font-semibold text-white truncate">{settings?.name || 'Admin User'}</p>
                                <p className="text-[10px] text-slate-400 truncate">Super Admin</p>
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={onLogout}
                            title="Sign out"
                            className="p-1.5 text-slate-400 hover:text-rose-400 transition-colors cursor-pointer"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Admin Area */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Clean Topbar (Like LearnSyntax Admin Topbar in Image 5) */}
                <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={() => setSidebarOpen(true)}
                            className="lg:hidden p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                        <div>
                            <h1 className="font-display font-bold text-base text-slate-900 leading-tight">
                                {NAV_SECTIONS.flatMap(s => s.items).find(i => isActive(i.path))?.label || 'Dashboard'}
                            </h1>
                            <p className="text-[11px] text-slate-500">
                                System overview and real-time portfolio operations
                            </p>
                        </div>
                    </div>

                    {/* Topbar Search & Actions */}
                    <div className="flex items-center gap-2.5">
                        <div className="hidden sm:flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-400 w-48">
                            <svg className="w-3.5 h-3.5 text-slate-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="bg-transparent border-none outline-none text-xs text-slate-800 w-full"
                            />
                            <kbd className="px-1 py-0.2 rounded bg-white border border-slate-200 text-[9px] font-mono text-slate-400">Ctrl K</kbd>
                        </div>

                        {/* Bell icon */}
                        <div className="relative p-2 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer text-slate-600">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center">
                                4
                            </span>
                        </div>

                        {/* User pill */}
                        <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
                            <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-display font-bold text-xs flex items-center justify-center">
                                MK
                            </div>
                            <span className="hidden md:inline text-xs font-semibold text-slate-800">
                                {settings?.name || 'Manish'}
                            </span>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-4 sm:p-6 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}

import React from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function AdminLayout({ children }) {
    const { auth } = usePage().props;
    const { url } = usePage();

    const menuItems = [
        { name: 'Dashboard', path: '/admin/dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
        { name: 'Projects', path: '/admin/projects', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
        { name: 'Blogs & Articles', path: '/admin/blogs', icon: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z' },
        { name: 'Skills Stack', path: '/admin/skills', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
        { name: 'Experiences', path: '/admin/experiences', icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
        { name: 'Certificates', path: '/admin/certificates', icon: 'M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222' },
        { name: 'Contact Messages', path: '/admin/messages', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
        { name: 'Social Links', path: '/admin/social-links', icon: 'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1' },
        { name: 'Website Settings', path: '/admin/settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' },
        { name: 'Profile Settings', path: '/admin/profile', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' }
    ];

    return (
        <div className="min-h-screen bg-[#090d16] text-slate-100 font-sans flex flex-col md:flex-row selection:bg-[#FF2D20] selection:text-white">
            {/* Sidebar */}
            <aside className="w-full md:w-64 bg-[#0d121f] border-r border-slate-900 flex flex-col justify-between shrink-0">
                <div>
                    {/* Brand */}
                    <div className="h-16 px-6 border-b border-slate-900/60 flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-[#FF2D20] flex items-center justify-center font-bold text-white">
                            A
                        </div>
                        <span className="font-extrabold text-sm uppercase tracking-widest text-slate-200">
                            Admin Center
                        </span>
                    </div>

                    {/* Navigation */}
                    <nav className="p-4 space-y-1">
                        {menuItems.map((item, idx) => {
                            const isActive = url.startsWith(item.path);
                            return (
                                <Link
                                    key={idx}
                                    href={item.path}
                                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition ${
                                        isActive 
                                            ? 'bg-[#FF2D20]/15 text-[#FF2D20]' 
                                            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
                                    }`}
                                >
                                    <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
                                    </svg>
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                {/* User Status / Logout */}
                <div className="p-4 border-t border-slate-900/60 flex flex-col gap-3">
                    <div className="flex items-center gap-3 px-2">
                        <div className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center font-bold text-slate-200 uppercase">
                            {auth?.user?.name ? auth.user.name[0] : 'A'}
                        </div>
                        <div className="truncate">
                            <h5 className="text-xs font-semibold text-slate-200 truncate">{auth?.user?.name}</h5>
                            <span className="text-[10px] text-slate-500 truncate">{auth?.user?.email}</span>
                        </div>
                    </div>
                    
                    <Link
                        href="/logout"
                        method="post"
                        as="button"
                        type="button"
                        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-slate-800 hover:border-rose-900/50 text-slate-400 hover:text-rose-400 hover:bg-rose-950/10 text-sm font-semibold transition"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Sign Out
                    </Link>
                </div>
            </aside>

            {/* Main Section */}
            <div className="flex-grow flex flex-col min-w-0">
                {/* Header */}
                <header className="h-16 bg-[#0d121f]/55 backdrop-blur border-b border-slate-900/60 px-8 flex justify-between items-center">
                    <div>
                        <h2 className="text-slate-400 text-xs font-bold uppercase tracking-wider">Workspace Management</h2>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link href="/" className="text-xs text-slate-400 hover:text-[#FF2D20] transition border border-slate-800 hover:border-[#FF2D20]/30 px-3 py-1.5 rounded-lg">
                            Visit Live Website &rarr;
                        </Link>
                    </div>
                </header>

                {/* Panel Content */}
                <main className="flex-grow p-8 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}

import React from 'react';
import AdminLayout from '../../Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ stats }) {
    const statCards = [
        { name: 'Total Projects', value: stats.projectsCount, icon: '💼', color: 'text-blue-400 bg-blue-500/10 border-blue-500/20', path: '/admin/projects' },
        { name: 'Blogs & Articles', value: stats.blogsCount, icon: '📝', color: 'text-purple-400 bg-purple-500/10 border-purple-500/20', path: '/admin/blogs' },
        { name: 'Skills in Stack', value: stats.skillsCount, icon: '⚡', color: 'text-amber-400 bg-amber-500/10 border-amber-500/20', path: '/admin/skills' },
        { name: 'Certifications', value: stats.certificatesCount, icon: '🏆', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20', path: '/admin/certificates' },
        { name: 'Contact Messages', value: stats.messagesCount, icon: '✉️', color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20', path: '/admin/messages' },
    ];

    return (
        <AdminLayout>
            <Head title="Admin Dashboard" />

            <div className="space-y-8">
                {/* Greeting banner */}
                <div className="p-8 rounded-3xl bg-gradient-to-r from-slate-900 to-slate-950 border border-slate-900 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-[#FF2D20]/5 rounded-full blur-2xl"></div>
                    <div className="max-w-xl">
                        <h1 className="text-2xl md:text-3xl font-black text-slate-100">Welcome Back, Manish!</h1>
                        <p className="text-slate-400 text-xs mt-2 font-light leading-relaxed">
                            This is your centralized admin portal. Track inbox submissions, edit case studies, upload certificates, write technical blogs, and manage your stack dynamically.
                        </p>
                    </div>
                </div>

                {/* Info Statistics Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {statCards.map((card, idx) => (
                        <div key={idx} className="p-6 rounded-2xl bg-[#0d121f]/50 border border-slate-900 flex justify-between items-center group hover:border-slate-800 transition duration-300">
                            <div>
                                <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">{card.name}</span>
                                <h3 className="text-3xl font-black text-slate-100 mt-2 tracking-tight">{card.value}</h3>
                            </div>
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl border ${card.color}`}>
                                {card.icon}
                            </div>
                        </div>
                    ))}

                    {/* Unread inbox card */}
                    {stats.unreadMessagesCount > 0 && (
                        <div className="p-6 rounded-2xl bg-rose-950/10 border border-rose-900/30 flex justify-between items-center animate-pulse">
                            <div>
                                <span className="text-xs text-rose-400 font-bold uppercase tracking-wider">Unread Messages</span>
                                <h3 className="text-3xl font-black text-rose-200 mt-2 tracking-tight">{stats.unreadMessagesCount}</h3>
                            </div>
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl bg-rose-500/20 text-rose-400 border border-rose-500/30">
                                🚨
                            </div>
                        </div>
                    )}
                </div>

                {/* Quick actions panel */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
                    <div className="p-6 rounded-2xl bg-[#0d121f]/35 border border-slate-900 space-y-4">
                        <h3 className="font-extrabold text-sm text-slate-300 uppercase tracking-wider pb-2 border-b border-slate-900">
                            Quick Portfolio Actions
                        </h3>
                        <div className="grid grid-cols-2 gap-3.5 text-xs">
                            <Link href="/admin/projects" className="p-4 rounded-xl border border-slate-900 hover:border-slate-850 hover:bg-slate-900/40 text-center font-bold text-slate-300 transition duration-300">
                                💼 Create Project
                            </Link>
                            <Link href="/admin/blogs" className="p-4 rounded-xl border border-slate-900 hover:border-slate-850 hover:bg-slate-900/40 text-center font-bold text-slate-300 transition duration-300">
                                📝 Write Article
                            </Link>
                            <Link href="/admin/settings" className="p-4 rounded-xl border border-slate-900 hover:border-slate-850 hover:bg-slate-900/40 text-center font-bold text-slate-300 transition duration-300 col-span-2">
                                ⚙️ Update Biography & Settings
                            </Link>
                        </div>
                    </div>

                    <div className="p-6 rounded-2xl bg-[#0d121f]/35 border border-slate-900 flex flex-col justify-between">
                        <div>
                            <h3 className="font-extrabold text-sm text-slate-300 uppercase tracking-wider pb-2 border-b border-slate-900 mb-4">
                                Database Integration Status
                            </h3>
                            <p className="text-slate-400 text-xs leading-relaxed font-light">
                                Your application is running with active migrations for MySQL/SQLite. All CRUD changes on projects, blogs, and settings are written instantly and synced across both frontend and AI-integrated MCP servers.
                            </p>
                        </div>
                        <div className="pt-4 flex items-center justify-between text-[10px] text-slate-500 uppercase font-mono">
                            <span>Status: Online</span>
                            <span>DB Engine: Active</span>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

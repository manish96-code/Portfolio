import React from 'react';

export default function Dashboard({ portfolioData, navigate }) {
    const { projects, blogs, skills, certificates, experiences, settings } = portfolioData;

    const totalSkills = Object.values(skills).flat().length;
    const featuredProjects = projects.filter(p => p.is_featured).length;

    const statCards = [
        {
            label: 'Total Projects',
            value: projects.length,
            trend: '↗ Active Builds',
            trendColor: 'text-emerald-600',
            iconBg: 'bg-sky-50 text-sky-600 border-sky-100',
            path: '/admin/projects',
            icon: (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                </svg>
            )
        },
        {
            label: 'Featured Builds',
            value: featuredProjects,
            trend: '↗ Live Showcase',
            trendColor: 'text-emerald-600',
            iconBg: 'bg-blue-50 text-blue-600 border-blue-100',
            path: '/admin/projects',
            icon: (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
            )
        },
        {
            label: 'Published Articles',
            value: blogs.length,
            trend: '↗ Tech Insights',
            trendColor: 'text-emerald-600',
            iconBg: 'bg-emerald-50 text-emerald-600 border-emerald-100',
            path: '/admin/blogs',
            icon: (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
            )
        },
        {
            label: 'Technical Skills',
            value: totalSkills,
            trend: '↗ Stack Items',
            trendColor: 'text-emerald-600',
            iconBg: 'bg-violet-50 text-violet-600 border-violet-100',
            path: '/admin/skills',
            icon: (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
            )
        },
        {
            label: 'Certifications',
            value: certificates.length,
            trend: '↗ Credentials',
            trendColor: 'text-emerald-600',
            iconBg: 'bg-amber-50 text-amber-600 border-amber-100',
            path: '/admin/certificates',
            icon: (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
            )
        }
    ];

    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            {/* Page Title */}
            <div>
                <h2 className="font-display text-2xl font-bold text-slate-900 tracking-tight">
                    Admin Dashboard
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                    System overview and real-time portfolio content management
                </p>
            </div>

            {/* Top 5 Stat Cards Row (Inspired by Image 5) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {statCards.map((card) => (
                    <div
                        key={card.label}
                        onClick={() => navigate(card.path)}
                        className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 hover:border-blue-300 hover:shadow-sm transition-all cursor-pointer flex flex-col justify-between"
                    >
                        <div className="flex items-start justify-between gap-2">
                            <span className="text-xs font-medium text-slate-500">{card.label}</span>
                            <span className={`w-8 h-8 rounded-lg border ${card.iconBg} flex items-center justify-center shrink-0`}>
                                {card.icon}
                            </span>
                        </div>
                        <div className="mt-4 flex items-baseline justify-between gap-2">
                            <span className="font-display text-2xl font-extrabold text-slate-900">
                                {card.value}
                            </span>
                            <span className={`text-[11px] font-semibold ${card.trendColor}`}>
                                {card.trend}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Main Split Section (Left Manager Cards + Right Portfolio Overview) */}
            <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-5 items-start">

                {/* Left Column: Manager Cards */}
                <div className="space-y-4">
                    {/* Projects Manager Card */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-2xs">
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <span className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                                    </svg>
                                </span>
                                <div>
                                    <h3 className="font-display font-bold text-sm sm:text-base text-slate-900">
                                        Projects &amp; Case Studies
                                    </h3>
                                    <p className="text-xs text-slate-500">
                                        Featured applications, SaaS platforms, and GitHub repositories
                                    </p>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => navigate('/admin/projects')}
                                className="text-xs font-semibold text-blue-600 hover:text-blue-700 shrink-0 cursor-pointer"
                            >
                                Open Manager ›
                            </button>
                        </div>

                        <p className="text-xs text-slate-500 mt-4 leading-relaxed">
                            Organize project thumbnails, detailed case studies, tech stack tags, and live production URLs across Ciplon, GymMitra, KitabiAdda, and LinkUp.
                        </p>

                        <div className="mt-4">
                            <button
                                type="button"
                                onClick={() => navigate('/admin/projects')}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                            >
                                <span>Manage Projects ({projects.length})</span>
                            </button>
                        </div>
                    </div>

                    {/* Articles Manager Card */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-2xs">
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <span className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                </span>
                                <div>
                                    <h3 className="font-display font-bold text-sm sm:text-base text-slate-900">
                                        Technical Articles &amp; Insights
                                    </h3>
                                    <p className="text-xs text-slate-500">
                                        Engineering deep-dives on Laravel, React 19, and MySQL
                                    </p>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => navigate('/admin/blogs')}
                                className="text-xs font-semibold text-blue-600 hover:text-blue-700 shrink-0 cursor-pointer"
                            >
                                Open Manager ›
                            </button>
                        </div>

                        <p className="text-xs text-slate-500 mt-4 leading-relaxed">
                            Publish and organize technical blog posts, code snippets, and developer tutorials visible on the public Articles page.
                        </p>

                        <div className="mt-4">
                            <button
                                type="button"
                                onClick={() => navigate('/admin/blogs')}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                            >
                                <span>Manage Articles ({blogs.length})</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Column: Portfolio Overview Card (Inspired by Institute Overview in Image 5) */}
                <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-2xs">
                    <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
                        <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <h3 className="font-display font-bold text-sm sm:text-base text-slate-900">
                            Portfolio Overview
                        </h3>
                    </div>

                    <div className="divide-y divide-slate-100 text-xs mt-1">
                        <div className="py-3 flex items-center justify-between">
                            <span className="text-slate-500">Portfolio Owner</span>
                            <span className="font-semibold text-slate-900">{settings?.name}</span>
                        </div>
                        <div className="py-3 flex items-center justify-between">
                            <span className="text-slate-500">Current Company</span>
                            <span className="font-semibold text-slate-900">{settings?.current_company}</span>
                        </div>
                        <div className="py-3 flex items-center justify-between">
                            <span className="text-slate-500">Location</span>
                            <span className="font-semibold text-slate-900">{settings?.location}</span>
                        </div>
                        <div className="py-3 flex items-center justify-between">
                            <span className="text-slate-500">Shipped Projects</span>
                            <span className="font-semibold text-slate-900">{projects.length} Builds</span>
                        </div>
                        <div className="py-3 flex items-center justify-between">
                            <span className="text-slate-500">Work Experiences</span>
                            <span className="font-semibold text-slate-900">{experiences.length} Role</span>
                        </div>
                        <div className="py-3 flex items-center justify-between">
                            <span className="text-slate-500">System Health</span>
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-semibold text-[11px]">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                Operational
                            </span>
                        </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100">
                        <p className="text-[11px] text-slate-400">
                            Live portfolio synchronized with static data layer.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
}

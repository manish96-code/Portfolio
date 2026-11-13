import React, { useEffect, useState } from 'react';
import AppLayout, { IconExternal, IconGitHub } from '../../Layouts/AppLayout';
import SEO from '../../Components/SEO';
import { getPersonSchema, getWebsiteSchema } from '../../utils/seoSchemas';

const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
};

const ProjectPreviewBanner = ({ project }) => {
    const isEnterprise = project.slug === 'ciplon';
    const isSaaS = project.slug === 'gymmitra';
    const badgeLabel = isEnterprise
        ? 'Enterprise ERP'
        : isSaaS
            ? 'Live SaaS'
            : project.live_url
                ? 'Live Web App'
                : 'Full-Stack Build';

    if (project.thumbnail) {
        return (
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 border-b border-slate-100">
                <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover object-left-top group-hover:scale-[1.03] transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent pointer-events-none" />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-slate-900/80 backdrop-blur-sm text-white text-[10px] font-semibold tracking-wide">
                    {badgeLabel}
                </span>
                {project.live_url && (
                    <span className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-emerald-500 text-white text-[10px] font-semibold shadow-xs flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                        Live
                    </span>
                )}
            </div>
        );
    }

    return (
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-5 flex flex-col justify-between border-b border-slate-100">
            <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-md bg-white/10 text-slate-200 text-[10px] font-semibold backdrop-blur-xs border border-white/10">
                    {badgeLabel}
                </span>
                <span className="w-7 h-7 rounded-lg bg-white/10 text-white font-display font-bold text-xs flex items-center justify-center border border-white/10">
                    {project.title.substring(0, 2).toUpperCase()}
                </span>
            </div>
            <div>
                <p className="text-white font-display font-bold text-base tracking-tight">{project.title}</p>
                <p className="text-slate-400 text-[11px] mt-0.5 font-mono truncate">
                    {project.technologies?.slice(0, 3).join(' • ')}
                </p>
            </div>
        </div>
    );
};

export default function Home({ projects, skills, experiences, certificates, socialLinks, settings, navigate }) {
    const [activeDeckTab, setActiveDeckTab] = useState('overview');

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            },
            { threshold: 0.08 }
        );
        document.querySelectorAll('.fade-section').forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    const skillCategories = skills ? Object.keys(skills) : [];
    const activeExperience = experiences?.[0];

    const coreTechChips = [
        { name: 'Laravel 11', letter: 'L', bg: 'bg-rose-100 text-rose-600' },
        { name: 'React 19', letter: 'R', bg: 'bg-sky-100 text-sky-600' },
        { name: 'Inertia.js', letter: 'I', bg: 'bg-violet-100 text-violet-600' },
        { name: 'PHP 8.3', letter: 'P', bg: 'bg-indigo-100 text-indigo-600' },
        { name: 'MySQL', letter: 'M', bg: 'bg-amber-100 text-amber-600' },
        { name: 'Tailwind CSS', letter: 'T', bg: 'bg-teal-100 text-teal-600' },
        { name: 'REST APIs', letter: 'A', bg: 'bg-emerald-100 text-emerald-600' },
        { name: 'Git & GitHub', letter: 'G', bg: 'bg-slate-200 text-slate-700' },
    ];

    const categoryStyleMap = {
        Frontend: { letter: 'F', bg: 'bg-sky-100 text-sky-600' },
        Backend: { letter: 'B', bg: 'bg-violet-100 text-violet-600' },
        Database: { letter: 'D', bg: 'bg-amber-100 text-amber-600' },
        'Programming Languages': { letter: 'C', bg: 'bg-rose-100 text-rose-600' },
        Tools: { letter: 'T', bg: 'bg-emerald-100 text-emerald-600' },
    };

    const linkedinUrl = socialLinks?.find((l) => l.platform === 'LinkedIn')?.url || 'https://www.linkedin.com/in/manish-kumar-9661link';
    const githubUrl = socialLinks?.find((l) => l.platform === 'GitHub')?.url || 'https://github.com/manish96-code';
    const whatsappUrl = socialLinks?.find((l) => l.platform === 'WhatsApp')?.url || 'https://wa.me/918207593672';

    return (
        <AppLayout settings={settings} socialLinks={socialLinks} navigate={navigate}>
            <SEO
                title={settings?.meta_title || 'Manish Kumar | Full-Stack Software Engineer'}
                description={settings?.meta_description}
                schemaData={[getPersonSchema(settings, socialLinks), getWebsiteSchema(settings)]}
            />

            {/* 1. CLEAN HERO SECTION */}
            <section className="bg-white border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-14 xl:px-16 py-8 sm:py-12 lg:py-14">
                    <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] items-center">

                        {/* Left Column */}
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-medium mb-4">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                <span>Available for Full-Stack Roles • Purnea, Bihar</span>
                            </div>

                            <h1 className="font-display text-3xl sm:text-4xl lg:text-[46px] font-extrabold text-slate-900 tracking-tight leading-[1.15]">
                                Full-Stack{' '}
                                <span className="text-blue-600">Laravel &amp; React</span>
                                <br className="hidden sm:inline" /> Software Engineer.
                            </h1>

                            <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl">
                                I am <strong className="text-slate-900 font-semibold">{settings?.name || 'Manish Kumar'}</strong>, a full-stack engineer at{' '}
                                <strong className="text-slate-800 font-semibold">Comestro Techlabs</strong>. I build enterprise pharma ERPs (<strong className="text-slate-800">Ciplon</strong>), multi-tenant SaaS platforms (<strong className="text-slate-800">GymMitra</strong>), and marketplaces (<strong className="text-slate-800">KitabiAdda</strong>).
                            </p>

                            {/* Action Buttons */}
                            <div className="mt-6 flex flex-wrap items-center gap-3">
                                <button
                                    type="button"
                                    onClick={() => scrollToSection('projects')}
                                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-semibold shadow-xs transition-all cursor-pointer active:scale-[0.98]"
                                >
                                    <span>View Selected Works</span>
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </button>
                                <a
                                    href={settings?.resume_file || '/downloads/resume.pdf'}
                                    download
                                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-800 text-xs sm:text-sm font-semibold transition-all"
                                >
                                    <span>Download CV</span>
                                    <span className="text-slate-400">›</span>
                                </a>
                            </div>

                            {/* Core Stack Strip (like LearnSyntax Hero tech icons) */}
                            <div className="mt-8 pt-6 border-t border-slate-100">
                                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-3">
                                    Core Engineering Stack
                                </p>
                                <div className="flex flex-wrap items-center gap-2">
                                    {coreTechChips.map((chip) => (
                                        <span
                                            key={chip.name}
                                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200/80 text-xs font-medium text-slate-700"
                                        >
                                            <span className={`w-4 h-4 rounded-sm ${chip.bg} text-[9px] font-bold flex items-center justify-center`}>
                                                {chip.letter}
                                            </span>
                                            {chip.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Clean Standard Engineer Profile Card */}
                        <div className="bg-slate-50/70 border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs">
                            <div className="flex items-center justify-between pb-4 border-b border-slate-200/80">
                                <div className="flex items-center gap-3">
                                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white font-display font-extrabold text-sm flex items-center justify-center shadow-xs">
                                        MK
                                    </div>
                                    <div>
                                        <h2 className="font-display font-bold text-sm sm:text-base text-slate-900">
                                            {settings?.name || 'Manish Kumar'}
                                        </h2>
                                        <p className="text-xs text-slate-500">
                                            Laravel Developer • Comestro Techlabs
                                        </p>
                                    </div>
                                </div>
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-semibold">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                    Operational
                                </span>
                            </div>

                            {/* Clean Tab Switcher */}
                            <div className="flex gap-1 bg-slate-200/60 p-1 rounded-lg mt-4">
                                <button
                                    type="button"
                                    onClick={() => setActiveDeckTab('overview')}
                                    className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${activeDeckTab === 'overview'
                                        ? 'bg-white text-slate-900 shadow-xs'
                                        : 'text-slate-600 hover:text-slate-900'
                                        }`}
                                >
                                    Production Apps
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setActiveDeckTab('stack')}
                                    className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${activeDeckTab === 'stack'
                                        ? 'bg-white text-slate-900 shadow-xs'
                                        : 'text-slate-600 hover:text-slate-900'
                                        }`}
                                >
                                    developer.config.json
                                </button>
                            </div>

                            {activeDeckTab === 'overview' ? (
                                <div className="mt-4 space-y-2.5">
                                    {[
                                        { name: 'Ciplon Pharma ERP', tag: 'Enterprise • Laravel + React', status: 'Live', url: '/project/ciplon', badge: 'bg-blue-100 text-blue-600' },
                                        { name: 'GymMitra SaaS', tag: 'Multi-Tenant • QR & Billing', status: 'Live', url: '/project/gymmitra', badge: 'bg-violet-100 text-violet-600' },
                                        { name: 'KitabiAdda Marketplace', tag: '4 Role Portals • Inertia.js', status: 'Shipped', url: '/project/kitabi-adda', badge: 'bg-amber-100 text-amber-600' },
                                    ].map((item) => (
                                        <a
                                            key={item.name}
                                            href={item.url}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                navigate(item.url);
                                            }}
                                            className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200/80 hover:border-blue-300 hover:shadow-xs transition-all group"
                                        >
                                            <div className="flex items-center gap-3 min-w-0">
                                                <span className={`w-8 h-8 rounded-lg ${item.badge} font-display font-bold text-xs flex items-center justify-center shrink-0`}>
                                                    {item.name.charAt(0)}
                                                </span>
                                                <div className="min-w-0">
                                                    <p className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                                                        {item.name}
                                                    </p>
                                                    <p className="text-[11px] text-slate-500 truncate">{item.tag}</p>
                                                </div>
                                            </div>
                                            <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-semibold shrink-0 ml-2">
                                                {item.status}
                                            </span>
                                        </a>
                                    ))}
                                </div>
                            ) : (
                                <div className="mt-4 rounded-xl bg-slate-900 p-4 text-xs font-mono text-slate-300 leading-relaxed overflow-x-auto">
                                    <p>&#123;</p>
                                    <p className="pl-4"><span className="text-sky-300">"developer"</span>: <span className="text-emerald-300">"{settings?.name || 'Manish Kumar'}"</span>,</p>
                                    <p className="pl-4"><span className="text-sky-300">"degree"</span>: <span className="text-emerald-300">"BCA, Purnea University (2023-2026)"</span>,</p>
                                    <p className="pl-4"><span className="text-sky-300">"backend"</span>: [<span className="text-amber-300">"Laravel 11"</span>, <span className="text-amber-300">"PHP 8.3"</span>, <span className="text-amber-300">"MySQL"</span>],</p>
                                    <p className="pl-4"><span className="text-sky-300">"frontend"</span>: [<span className="text-amber-300">"React 19"</span>, <span className="text-amber-300">"Inertia.js"</span>, <span className="text-amber-300">"Tailwind"</span>],</p>
                                    <p className="pl-4"><span className="text-sky-300">"available"</span>: <span className="text-violet-300">true</span></p>
                                    <p>&#125;</p>
                                </div>
                            )}

                            <div className="mt-4 pt-3.5 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-500">
                                <span>BCA (2023–2026) • Purnea University</span>
                                <a href={githubUrl} target="_blank" rel="noreferrer" className="font-semibold text-blue-600 hover:underline">
                                    GitHub →
                                </a>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* 2. ALL PROJECTS SECTION (Clean Grid inspired by LearnSyntax Courses) */}
            <section id="projects" className="fade-section bg-slate-50/50 py-10 sm:py-12 border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-14 xl:px-16">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-7">
                        <div>
                            <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                                Selected projects
                            </h2>
                            <p className="text-xs sm:text-sm text-slate-500 mt-1">
                                Production-grade enterprise systems, SaaS platforms, and multi-vendor marketplaces.
                            </p>
                        </div>
                        <a
                            href={githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-blue-600 transition-colors self-start sm:self-auto"
                        >
                            <span>View GitHub</span>
                            <span>→</span>
                        </a>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {(projects || []).map((project) => (
                            <article
                                key={project.id}
                                className="bg-white border border-slate-200 rounded-2xl overflow-hidden flex flex-col hover:shadow-md hover:border-slate-300 transition-all duration-200 group"
                            >
                                <a
                                    href={`/project/${project.slug}`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        navigate(`/project/${project.slug}`);
                                    }}
                                    className="block"
                                >
                                    <ProjectPreviewBanner project={project} />
                                </a>

                                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                                    <div>
                                        <h3 className="font-display font-bold text-base text-slate-900 group-hover:text-blue-600 transition-colors">
                                            <a
                                                href={`/project/${project.slug}`}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    navigate(`/project/${project.slug}`);
                                                }}
                                            >
                                                {project.title}
                                            </a>
                                        </h3>

                                        <div className="flex items-center gap-2 mt-2">
                                            <span className="w-4 h-4 rounded-full bg-indigo-100 text-indigo-700 text-[8px] font-bold flex items-center justify-center">
                                                MK
                                            </span>
                                            <span className="text-[11px] font-medium text-slate-500">
                                                By Manish Kumar • {project.status}
                                            </span>
                                        </div>

                                        <p className="mt-2.5 text-xs text-slate-600 leading-relaxed line-clamp-2">
                                            {project.description}
                                        </p>

                                        <div className="mt-3 flex flex-wrap gap-1.5">
                                            {project.technologies?.slice(0, 4).map((tech) => (
                                                <span
                                                    key={tech}
                                                    className="px-2 py-0.5 rounded-md bg-slate-50 border border-slate-200/80 text-[10px] font-medium text-slate-600"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-center gap-2">
                                        <a
                                            href={`/project/${project.slug}`}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                navigate(`/project/${project.slug}`);
                                            }}
                                            className="flex-1 py-2 px-3 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 text-slate-800 text-xs font-semibold text-center transition-colors"
                                        >
                                            View Case Study
                                        </a>
                                        {project.live_url && (
                                            <a
                                                href={project.live_url}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="inline-flex items-center justify-center gap-1 px-3 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors"
                                                title="Live Website"
                                            >
                                                <span>Live</span>
                                                <IconExternal />
                                            </a>
                                        )}
                                        {project.github_url && (
                                            <a
                                                href={project.github_url}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="inline-flex items-center justify-center w-8 h-8 rounded-lg border border-slate-200 bg-white text-slate-600 hover:text-slate-900 hover:border-slate-300 transition-colors"
                                                title="GitHub Repository"
                                            >
                                                <IconGitHub />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. MILESTONES & WHY CHOOSE ME SECTION (Inspired by Image 1 & 3) */}
            <section className="fade-section bg-white py-10 sm:py-12 border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-14 xl:px-16">
                    <div className="mb-7">
                        <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                            Milestones &amp; engineering standards
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-500 mt-1">
                            Built around clean architecture, database integrity, and fast user interfaces.
                        </p>
                    </div>

                    {/* 4 Stat Cards Row */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        {[
                            { badge: 'P', badgeBg: 'bg-sky-100 text-sky-600', value: `${projects?.length || 6}+`, label: 'Production Builds', sub: 'SaaS, ERP & Marketplaces' },
                            { badge: 'L', badgeBg: 'bg-emerald-100 text-emerald-600', value: '3 Live', label: 'Deployed Platforms', sub: 'Ciplon, GymMitra, Recipes' },
                            { badge: 'B', badgeBg: 'bg-amber-100 text-amber-600', value: '2026', label: 'BCA Graduate', sub: 'Purnea University' },
                            { badge: 'Q', badgeBg: 'bg-violet-100 text-violet-600', value: '100%', label: 'Clean Architecture', sub: 'Laravel + React + MySQL' },
                        ].map((stat) => (
                            <div key={stat.label} className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5 shadow-2xs">
                                <span className={`w-9 h-9 rounded-xl ${stat.badgeBg} font-display font-bold text-sm flex items-center justify-center shrink-0`}>
                                    {stat.badge}
                                </span>
                                <div>
                                    <p className="font-display text-xl sm:text-2xl font-extrabold text-slate-900 leading-none">
                                        {stat.value}
                                    </p>
                                    <p className="text-xs font-semibold text-slate-800 mt-1.5">{stat.label}</p>
                                    <p className="text-[11px] text-slate-400 mt-0.5">{stat.sub}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* 2x2 Visual Engineering Cards (Directly inspired by Image 1) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {/* Card 1 */}
                        <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 flex flex-col justify-between">
                            <div>
                                <div className="flex items-center gap-2.5 mb-2">
                                    <span className="w-6 h-6 rounded-md bg-violet-100 text-violet-600 text-xs font-bold flex items-center justify-center">
                                        1
                                    </span>
                                    <h3 className="font-display font-bold text-sm sm:text-base text-slate-900">
                                        Production-ready multi-role systems
                                    </h3>
                                </div>
                                <p className="text-xs text-slate-500 leading-relaxed">
                                    Role-based dashboards, fine-grained RBAC permissions, and tenant isolation proven in Ciplon Pharma and GymMitra.
                                </p>
                            </div>
                            <div className="mt-5 p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
                                <div className="flex items-center justify-between text-[11px] font-medium text-slate-600">
                                    <span>Super Admin • Admin • MR / Staff</span>
                                    <span className="text-emerald-600 font-semibold">RBAC Active</span>
                                </div>
                                <div className="grid grid-cols-4 gap-1.5 h-2">
                                    <div className="rounded-full bg-sky-400" />
                                    <div className="rounded-full bg-blue-500" />
                                    <div className="rounded-full bg-slate-900" />
                                    <div className="rounded-full bg-indigo-400" />
                                </div>
                            </div>
                        </div>

                        {/* Card 2 */}
                        <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 flex flex-col justify-between">
                            <div>
                                <div className="flex items-center gap-2.5 mb-2">
                                    <span className="w-6 h-6 rounded-md bg-sky-100 text-sky-600 text-xs font-bold flex items-center justify-center">
                                        2
                                    </span>
                                    <h3 className="font-display font-bold text-sm sm:text-base text-slate-900">
                                        Unified Laravel + React + Inertia.js
                                    </h3>
                                </div>
                                <p className="text-xs text-slate-500 leading-relaxed">
                                    Single-page user experiences backed by Laravel controllers, Eloquent ORM, and seamless server-driven routing.
                                </p>
                            </div>
                            <div className="mt-5 p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
                                <div className="flex items-center justify-between text-[11px]">
                                    <span className="font-semibold text-slate-800">Inertia.js SPA Architecture</span>
                                    <span className="font-bold text-slate-900">100%</span>
                                </div>
                                <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                                    <div className="h-full w-full bg-slate-900 rounded-full" />
                                </div>
                                <div className="flex items-center justify-between text-[10px] text-slate-500">
                                    <span>● Zero CORS/API friction</span>
                                    <span>● Validation &amp; Auth</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. ENGINEERING WORKFLOW TIMELINE (Inspired by Image 2 "Today's timetable") */}
            <section id="workflow" className="fade-section bg-slate-50/50 py-10 sm:py-12 border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-14 xl:px-16">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
                        <div>
                            <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                                Engineering workflow
                            </h2>
                            <p className="text-xs sm:text-sm text-slate-500 mt-1">
                                Structured end-to-end delivery process from schema design to live deployment.
                            </p>
                        </div>
                        <span className="text-xs font-medium text-slate-500">
                            4 core delivery stages
                        </span>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 shadow-2xs overflow-x-auto">
                        <div className="min-w-[600px]">
                            {/* Timeline Markers */}
                            <div className="grid grid-cols-4 text-[11px] font-medium text-slate-400 pb-3 border-b border-slate-100">
                                <span>STAGE 01 • PLAN</span>
                                <span>STAGE 02 • BACKEND</span>
                                <span>STAGE 03 • FRONTEND</span>
                                <span className="flex items-center justify-between">
                                    <span>STAGE 04 • LAUNCH</span>
                                    <span className="px-2 py-0.5 rounded bg-slate-900 text-white text-[9px] font-bold">LIVE</span>
                                </span>
                            </div>

                            {/* Staggered Pastel Pill Cards */}
                            <div className="py-5 space-y-3">
                                <div className="w-[45%] ml-0 p-3 rounded-xl bg-sky-50/80 border border-sky-200/80 flex items-center justify-between">
                                    <div>
                                        <p className="text-xs font-bold text-slate-900">Relational Schema &amp; Migrations</p>
                                        <p className="text-[11px] text-slate-500 mt-0.5">MySQL indexing, foreign keys &amp; Eloquent models</p>
                                    </div>
                                    <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-semibold">Schema</span>
                                </div>

                                <div className="w-[48%] ml-[18%] p-3 rounded-xl bg-violet-50/80 border border-violet-200/80 flex items-center justify-between">
                                    <div>
                                        <p className="text-xs font-bold text-slate-900">Laravel Controllers, Auth &amp; RBAC</p>
                                        <p className="text-[11px] text-slate-500 mt-0.5">Role authorization, form validation &amp; REST APIs</p>
                                    </div>
                                    <span className="px-2 py-0.5 rounded bg-violet-100 text-violet-700 text-[10px] font-semibold">Backend</span>
                                </div>

                                <div className="w-[48%] ml-[36%] p-3 rounded-xl bg-emerald-50/80 border border-emerald-200/80 flex items-center justify-between">
                                    <div>
                                        <p className="text-xs font-bold text-slate-900">React 19 + Inertia.js + Tailwind UI</p>
                                        <p className="text-[11px] text-slate-500 mt-0.5">Responsive dashboards, forms &amp; interactive state</p>
                                    </div>
                                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-700 text-[10px] font-semibold">Frontend</span>
                                </div>

                                <div className="w-[44%] ml-[56%] p-3 rounded-xl bg-rose-50/80 border border-rose-200/80 flex items-center justify-between">
                                    <div>
                                        <p className="text-xs font-bold text-slate-900">Optimization, SEO &amp; Production Deploy</p>
                                        <p className="text-[11px] text-slate-500 mt-0.5">Vite bundle tuning, query checks &amp; cloud hosting</p>
                                    </div>
                                    <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-700 text-[10px] font-semibold">Ship</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. ABOUT, QUOTE & EXPERIENCE JOURNEY (Inspired by Image 3) */}
            <section id="about" className="fade-section bg-white py-10 sm:py-12 border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-14 xl:px-16 space-y-10">

                    {/* Quote Spotlight Card */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-2xs grid gap-6 lg:grid-cols-[0.8fr_1.5fr] items-center">
                        <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 flex flex-col items-center text-center">
                            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white font-display font-extrabold text-2xl flex items-center justify-center shadow-sm">
                                MK
                            </div>
                            <h3 className="font-display font-bold text-base text-slate-900 mt-4">
                                {settings?.name || 'Manish Kumar'}
                            </h3>
                            <p className="text-xs text-blue-600 font-semibold mt-0.5">
                                {activeExperience?.designation || 'Laravel Developer'}
                            </p>
                            <p className="text-[11px] text-slate-500 mt-1">
                                @ {activeExperience?.company || 'Comestro Techlabs Pvt Ltd'}
                            </p>
                            <span className="mt-3 px-2.5 py-0.5 rounded-full bg-white border border-slate-200 text-[10px] font-semibold text-slate-600">
                                {activeExperience?.duration || 'May 2026 - Present'}
                            </span>
                        </div>

                        <div>
                            <h2 className="font-display text-xl sm:text-2xl lg:text-[26px] font-extrabold text-slate-900 tracking-tight leading-snug">
                                &ldquo;We build problem solvers, not just syntax typers.&rdquo;
                            </h2>
                            <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                                {activeExperience?.description || settings?.bio}
                            </p>
                            <div className="mt-4 flex flex-wrap gap-1.5">
                                {activeExperience?.skills_used?.map((skill) => (
                                    <span key={skill} className="px-2.5 py-0.5 rounded-md bg-slate-50 border border-slate-200 text-[11px] font-medium text-slate-700">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                            <div className="mt-6 flex flex-wrap items-center gap-3">
                                <button
                                    type="button"
                                    onClick={() => scrollToSection('projects')}
                                    className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors cursor-pointer"
                                >
                                    ▸ Explore projects
                                </button>
                                <a
                                    href={linkedinUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="px-4 py-2 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 text-xs font-semibold transition-colors"
                                >
                                    Connect on LinkedIn
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Journey Timeline */}
                    <div>
                        <div className="mb-6">
                            <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                                My journey: 2023 to present
                            </h2>
                            <p className="text-xs sm:text-sm text-slate-500 mt-1">
                                From learning computer science fundamentals to shipping production Laravel &amp; React software.
                            </p>
                        </div>

                        <div className="bg-white border border-slate-200 rounded-2xl divide-y divide-slate-100">
                            {[
                                {
                                    step: '1',
                                    badgeBg: 'bg-sky-500',
                                    period: '2023 – 2026',
                                    title: 'BCA Program at Purnea University',
                                    desc: 'Built core software engineering foundations in C, C++, Python, DBMS, and relational database architecture.'
                                },
                                {
                                    step: '2',
                                    badgeBg: 'bg-violet-500',
                                    period: '2024 – 2026',
                                    title: 'Full-Stack SaaS & Product Engineering',
                                    desc: 'Designed and launched GymMitra SaaS, LinkUp social platform, and full-stack web tools using Laravel, React, and Tailwind CSS.'
                                },
                                {
                                    step: '3',
                                    badgeBg: 'bg-emerald-500',
                                    period: 'May 2026 – Present',
                                    title: 'Laravel Developer @ Comestro Techlabs Pvt Ltd',
                                    desc: 'Developing enterprise pharmaceutical ERPs (Ciplon), multi-vendor marketplaces (KitabiAdda), and campus portals (Campus Connect).'
                                }
                            ].map((item) => (
                                <div key={item.step} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
                                    <div className="flex items-center gap-3 sm:w-48 shrink-0">
                                        <span className={`w-6 h-6 rounded-md ${item.badgeBg} text-white text-xs font-bold flex items-center justify-center shrink-0`}>
                                            {item.step}
                                        </span>
                                        <span className="text-xs font-semibold text-slate-500">{item.period}</span>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-bold text-slate-900">{item.title}</h3>
                                        <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </section>

            {/* 6. TECHNICAL STACK & CREDENTIALS */}
            <section id="skills" className="fade-section bg-slate-50/50 py-10 sm:py-12 border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-14 xl:px-16">
                    <div className="mb-7">
                        <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                            Technical stack &amp; certifications
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-500 mt-1">
                            Frameworks, languages, databases, and developer tooling used in production.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                        {skillCategories.map((category) => {
                            const style = categoryStyleMap[category] || { letter: category.charAt(0), bg: 'bg-blue-100 text-blue-600' };
                            return (
                                <div key={category} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs">
                                    <div className="flex items-center gap-2.5 pb-3 mb-3 border-b border-slate-100">
                                        <span className={`w-7 h-7 rounded-lg ${style.bg} font-display font-bold text-xs flex items-center justify-center`}>
                                            {style.letter}
                                        </span>
                                        <h3 className="font-display font-bold text-sm text-slate-900">
                                            {category}
                                        </h3>
                                    </div>
                                    <div className="flex flex-wrap gap-1.5">
                                        {skills[category].map((skill) => (
                                            <span
                                                key={skill.name}
                                                className="px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200/80 text-xs font-medium text-slate-700"
                                            >
                                                {skill.name}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {certificates?.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {certificates.map((cert) => (
                                <div key={cert.id} className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
                                    <div className="flex items-center justify-between gap-2 mb-2">
                                        <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${cert.organization.includes('Completed')
                                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                                            }`}>
                                            {cert.issue_date}
                                        </span>
                                    </div>
                                    <p className="font-display font-bold text-xs sm:text-sm text-slate-900">{cert.title}</p>
                                    <p className="text-[11px] text-slate-500 mt-1">{cert.organization}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* 7. CLEAN CONTACT CTA BANNER (Inspired by Image 2 Bottom Card) */}
            <section id="contact" className="fade-section bg-white py-10 sm:py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-14 xl:px-16">
                    <div className="bg-slate-50/70 border border-slate-200 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                        <div>
                            <h2 className="font-display text-lg sm:text-xl font-bold text-slate-900">
                                Ready to build something great together?
                            </h2>
                            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
                                Available for full-stack software engineering roles, Laravel + React SaaS builds, and freelance collaborations.
                            </p>
                        </div>
                        <div className="flex flex-wrap items-center gap-3 shrink-0">
                            <a
                                href={`mailto:${settings?.email}`}
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-xs transition-colors"
                            >
                                <span>Email Manish</span>
                                <span>→</span>
                            </a>
                            <a
                                href={whatsappUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-800 text-xs font-semibold transition-colors"
                            >
                                <span>WhatsApp</span>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </AppLayout>
    );
}

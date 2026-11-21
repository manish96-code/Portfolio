import React, { useEffect, useState } from 'react';
import AppLayout, { IconExternal, IconGitHub } from '../../Layouts/AppLayout';
import SEO from '../../Components/SEO';
import GitHubCalendar from '../../Components/GitHubCalendar';
import { getPersonSchema, getWebsiteSchema } from '../../utils/seoSchemas';

const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
};

export default function Home({ projects, skills, experiences, certificates, socialLinks, settings, navigate }) {
    const [heroTab, setHeroTab] = useState('platforms');

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

    const linkedinUrl = socialLinks?.find((l) => l.platform === 'LinkedIn')?.url || 'https://www.linkedin.com/in/manish-kumar-9661link';
    const githubUrl = socialLinks?.find((l) => l.platform === 'GitHub')?.url || 'https://github.com/manish96-code';
    const whatsappUrl = socialLinks?.find((l) => l.platform === 'WhatsApp')?.url || 'https://wa.me/918207593672';

    const ciplonProject = projects?.find((p) => p.slug === 'ciplon');
    const learnSyntaxProject = projects?.find((p) => p.slug === 'learn-syntax');
    const gymmitraProject = projects?.find((p) => p.slug === 'gymmitra');
    const kitabiAddaProject = projects?.find((p) => p.slug === 'kitabi-adda');

    return (
        <AppLayout settings={settings} socialLinks={socialLinks} navigate={navigate}>
            <SEO
                title={settings?.meta_title || 'Manish Kumar | Full-Stack Software Engineer'}
                description={settings?.meta_description}
                schemaData={[getPersonSchema(settings, socialLinks), getWebsiteSchema(settings)]}
            />

            {/* 1. HERO SECTION (Minimalist Linear/Vercel Aesthetic + Top Bento Grid) */}
            <section id="top" className="fade-section bg-white border-b border-slate-100 scroll-mt-24 pt-4 sm:pt-6 pb-12 sm:pb-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-14 xl:px-16">

                    {/* Top Narrative Header */}
                    <div className="max-w-3xl mb-10 sm:mb-12">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/[0.04] border border-slate-200/80 text-slate-700 text-[11px] font-mono mb-5 shadow-2xs">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span>AVAILABLE FOR FULL-STACK ROLES • PURNEA, BIHAR</span>
                        </div>

                        <h1 className="font-display text-3xl sm:text-4xl lg:text-[50px] font-extrabold text-slate-900 tracking-tight leading-[1.15]">
                            Architecting resilient full-stack systems with{' '}
                            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
                                Laravel &amp; React.
                            </span>
                        </h1>

                        <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl font-normal">
                            I&apos;m <strong className="text-slate-900 font-semibold">{settings?.name || 'Manish Kumar'}</strong>, full-stack software engineer at <strong className="text-slate-900 font-semibold">{activeExperience?.company || 'Comestro Techlabs'}</strong>. I engineer cohort-based EdTech LMS platforms (<strong className="text-slate-800">Learn Syntax</strong>), enterprise pharmaceutical ERPs (<strong className="text-slate-800">Ciplon</strong>), multi-tenant SaaS tools (<strong className="text-slate-800">GymMitra</strong>), and marketplaces.
                        </p>

                        {/* Direct Action Links */}
                        <div className="mt-6 flex flex-wrap items-center gap-3">
                            <button
                                type="button"
                                onClick={() => scrollToSection('projects')}
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-semibold shadow-xs transition-all cursor-pointer active:scale-[0.98]"
                            >
                                <span>Explore Selected Work</span>
                                <span>↓</span>
                            </button>
                            <a
                                href={settings?.resume_file || '/downloads/resume.pdf'}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-800 text-xs sm:text-sm font-semibold transition-all shadow-2xs"
                            >
                                <span>View Resume / CV</span>
                                <span className="text-slate-400">↗</span>
                            </a>
                            <a
                                href={githubUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center justify-center w-10 h-10 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 transition-colors shadow-2xs"
                                title="GitHub Profile"
                            >
                                <IconGitHub />
                            </a>
                        </div>
                    </div>

                    {/* HERO BENTO GRID (Clean Linear-Style Architecture Deck) */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">

                        {/* Bento Card 1: Production Engineering Deck (7 cols) */}
                        <div className="md:col-span-7 bg-slate-50/70 border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-2xs flex flex-col justify-between">
                            <div className="flex items-center justify-between border-b border-slate-200/80 pb-3 mb-4">
                                <div className="flex items-center gap-2.5">
                                    <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                                    <span className="font-display font-bold text-xs sm:text-sm text-slate-900">
                                        Flagship Production Platforms
                                    </span>
                                </div>
                                <div className="flex items-center gap-1 bg-slate-200/70 p-0.5 rounded-lg text-[11px] font-semibold">
                                    <button
                                        type="button"
                                        onClick={() => setHeroTab('platforms')}
                                        className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${heroTab === 'platforms' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'}`}
                                    >
                                        Live Apps
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setHeroTab('config')}
                                        className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${heroTab === 'config' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'}`}
                                    >
                                        stack.config
                                    </button>
                                </div>
                            </div>

                            {heroTab === 'platforms' ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                    {[
                                        { name: 'Ciplon Pharma ERP', tag: 'Enterprise • Route Map & Telemetry', status: 'Live', slug: 'ciplon', color: 'border-blue-200 bg-white hover:border-blue-400' },
                                        { name: 'Learn Syntax LMS', tag: 'EdTech • WebSockets & Cohorts', status: 'Live', slug: 'learn-syntax', color: 'border-indigo-200 bg-white hover:border-indigo-400' },
                                        { name: 'GymMitra SaaS', tag: 'Multi-Tenant • QR Attendance & Invoices', status: 'Live', slug: 'gymmitra', color: 'border-violet-200 bg-white hover:border-violet-400' },
                                        { name: 'KitabiAdda', tag: 'Marketplace • 4 Role Portals', status: 'Shipped', slug: 'kitabi-adda', color: 'border-amber-200 bg-white hover:border-amber-400' },
                                    ].map((app) => (
                                        <a
                                            key={app.slug}
                                            href={`/project/${app.slug}`}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                navigate(`/project/${app.slug}`);
                                            }}
                                            className={`p-3 rounded-xl border ${app.color} transition-all duration-150 flex flex-col justify-between group shadow-2xs`}
                                        >
                                            <div className="flex items-center justify-between mb-1.5">
                                                <span className="font-display font-bold text-xs text-slate-900 group-hover:text-blue-600 transition-colors">
                                                    {app.name}
                                                </span>
                                                <span className="px-1.5 py-0.5 rounded text-[9px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                                    {app.status}
                                                </span>
                                            </div>
                                            <p className="text-[11px] text-slate-500 leading-tight truncate">{app.tag}</p>
                                        </a>
                                    ))}
                                </div>
                            ) : (
                                <div className="bg-slate-900 rounded-xl p-3.5 font-mono text-[11px] text-slate-300 leading-relaxed overflow-x-auto">
                                    <p><span className="text-slate-500">// Architecture runtime</span></p>
                                    <p><span className="text-sky-300">"backend"</span>: <span className="text-amber-300">"Laravel 13 (PHP 8.3, Eloquent, Reverb)"</span>,</p>
                                    <p><span className="text-sky-300">"frontend"</span>: <span className="text-amber-300">"React 19 + Inertia.js v3 + Tailwind v4"</span>,</p>
                                    <p><span className="text-sky-300">"database"</span>: <span className="text-amber-300">"MySQL 8 (Normalized, Indexed Constraints)"</span>,</p>
                                    <p><span className="text-sky-300">"testing"</span>: <span className="text-emerald-300">"PHPUnit (4,000+ Assertions, PSR-12)"</span></p>
                                </div>
                            )}

                            <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-center justify-between text-[11px] text-slate-500">
                                <span>Comestro Techlabs • Production Engineering</span>
                                <span className="font-mono text-slate-400">Laravel + React SPA</span>
                            </div>
                        </div>

                        {/* Bento Card 2: Verified Engineering Metrics (5 cols) */}
                        <div className="md:col-span-5 bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-2xs flex flex-col justify-between">
                            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                                <span className="font-display font-bold text-xs sm:text-sm text-slate-900 flex items-center gap-2">
                                    <span>⚡ Verified Engineering Standards</span>
                                </span>
                                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                                    PROD READY
                                </span>
                            </div>

                            <div className="grid grid-cols-2 gap-3 my-auto">
                                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                                    <p className="text-xl font-display font-black text-slate-900 leading-none">4,000+</p>
                                    <p className="text-xs font-semibold text-slate-800 mt-1">Test Assertions</p>
                                    <p className="text-[10px] text-emerald-600 font-medium mt-0.5">PHPUnit suites</p>
                                </div>
                                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                                    <p className="text-xl font-display font-black text-slate-900 leading-none">1,260+</p>
                                    <p className="text-xs font-semibold text-slate-800 mt-1">Yearly Commits</p>
                                    <p className="text-[10px] text-blue-600 font-medium mt-0.5">Continuous delivery</p>
                                </div>
                                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                                    <p className="text-xl font-display font-black text-slate-900 leading-none">4 Apps</p>
                                    <p className="text-xs font-semibold text-slate-800 mt-1">Enterprise Builds</p>
                                    <p className="text-[10px] text-slate-500 font-medium mt-0.5">ERP, LMS &amp; SaaS</p>
                                </div>
                                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                                    <p className="text-xl font-display font-black text-slate-900 leading-none">100%</p>
                                    <p className="text-xs font-semibold text-slate-800 mt-1">Code Standard</p>
                                    <p className="text-[10px] text-amber-600 font-medium mt-0.5">Laravel Pint / PSR-12</p>
                                </div>
                            </div>

                            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                                <span>BCA (2023–2026) • Purnea Univ</span>
                                <a href="#activity" onClick={(e) => { e.preventDefault(); scrollToSection('activity'); }} className="font-semibold text-blue-600 hover:underline">
                                    View Activity →
                                </a>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* 2. SELECTED PROJECTS (Modern Minimalist Asymmetric Bento Grid) */}
            <section id="projects" className="fade-section bg-slate-50/50 py-12 sm:py-16 border-b border-slate-100 scroll-mt-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-14 xl:px-16 space-y-8">

                    {/* Section Header */}
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                        <div>
                            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-[10px] font-bold tracking-wider uppercase font-mono mb-2">
                                SELECTED PRODUCTION BUILDS
                            </div>
                            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                                Enterprise ERPs, EdTech LMS &amp; SaaS Architectures
                            </h2>
                            <p className="text-xs sm:text-sm text-slate-500 mt-1">
                                Production-grade web applications engineered and shipped at Comestro Techlabs.
                            </p>
                        </div>
                        <a
                            href={githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-2xs transition-colors self-start sm:self-auto"
                        >
                            <IconGitHub />
                            <span>View All Repositories</span>
                            <span>↗</span>
                        </a>
                    </div>

                    {/* ASYMMETRIC BENTO GRID */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                        {/* FEATURED BENTO 1: CIPLON PHARMA ERP (12 cols Wide Split Card) */}
                        {ciplonProject && (
                            <div className="lg:col-span-12 bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-2xs hover:border-slate-300 transition-all duration-200">
                                <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
                                    {/* Left Narrative */}
                                    <div className="lg:col-span-6 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
                                        <div>
                                            <div className="flex items-center gap-2 mb-3">
                                                <span className="px-2.5 py-0.5 rounded-md bg-blue-50 border border-blue-200 text-blue-700 text-[10px] font-semibold font-mono uppercase">
                                                    Enterprise ERP
                                                </span>
                                                <span className="px-2 py-0.5 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-semibold">
                                                    Live Platform
                                                </span>
                                            </div>

                                            <h3 className="font-display text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                                                <a
                                                    href={`/project/${ciplonProject.slug}`}
                                                    onClick={(e) => { e.preventDefault(); navigate(`/project/${ciplonProject.slug}`); }}
                                                    className="hover:text-blue-600 transition-colors"
                                                >
                                                    Ciplon – Pharmaceutical Management System
                                                </a>
                                            </h3>

                                            <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                                                Web-based pharmaceutical ERP integrating Super Admin, Company Admin, and Medical Representative field operations. Features plan-versus-execution visit itineraries, Mapbox doctor route tracking, live GPS telemetry, and Daily Call Reports (DCR).
                                            </p>

                                            <div className="mt-4 flex flex-wrap gap-1.5">
                                                {['Laravel 13', 'React.js', 'Inertia.js', 'MySQL 8', 'Mapbox Route Map', 'RBAC Policies'].map((tag) => (
                                                    <span key={tag} className="px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200/80 text-[11px] font-medium text-slate-700 font-mono">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="mt-6 pt-5 border-t border-slate-100 flex flex-wrap items-center gap-3">
                                            <a
                                                href={`/project/${ciplonProject.slug}`}
                                                onClick={(e) => { e.preventDefault(); navigate(`/project/${ciplonProject.slug}`); }}
                                                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-xs transition-colors"
                                            >
                                                View Case Study →
                                            </a>
                                            {ciplonProject.live_url && (
                                                <a
                                                    href={ciplonProject.live_url}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors"
                                                >
                                                    <span>Live Demo</span>
                                                    <IconExternal />
                                                </a>
                                            )}
                                            {ciplonProject.github_url && (
                                                <a
                                                    href={ciplonProject.github_url}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="inline-flex items-center gap-1 px-3 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-900 text-xs font-medium transition-colors"
                                                    title="Source Code"
                                                >
                                                    <IconGitHub />
                                                </a>
                                            )}
                                        </div>
                                    </div>

                                    {/* Right Browser Mockup Showcase */}
                                    <div className="lg:col-span-6 p-4 sm:p-6 lg:p-8 bg-slate-100/70 border-t lg:border-t-0 lg:border-l border-slate-200/80 flex items-center justify-center">
                                        <div className="w-full rounded-2xl overflow-hidden border border-slate-200 bg-slate-950 shadow-md group">
                                            <div className="px-3 py-2 bg-slate-100 border-b border-slate-200 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                                                <div className="flex items-center gap-1.5">
                                                    <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                                                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                                                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                                                </div>
                                                <span className="truncate max-w-[200px] text-slate-600">ciplonpharma.in/mr/dashboard</span>
                                                <span className="text-[10px] text-slate-400">MR Portal</span>
                                            </div>
                                            <div className="aspect-[16/10] overflow-hidden bg-slate-900 relative">
                                                <img
                                                    src="/images/projects/ciplon-mr-dashboard.jpg"
                                                    alt="Ciplon MR Dashboard"
                                                    className="w-full h-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-300"
                                                    loading="lazy"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* FEATURED BENTO 2: LEARN SYNTAX LMS (12 cols Wide Split Card) */}
                        {learnSyntaxProject && (
                            <div className="lg:col-span-12 bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-2xs hover:border-slate-300 transition-all duration-200">
                                <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
                                    {/* Left Browser Mockup Showcase */}
                                    <div className="order-2 lg:order-1 lg:col-span-6 p-4 sm:p-6 lg:p-8 bg-slate-100/70 border-t lg:border-t-0 lg:border-r border-slate-200/80 flex items-center justify-center">
                                        <div className="w-full rounded-2xl overflow-hidden border border-slate-200 bg-slate-950 shadow-md group">
                                            <div className="px-3 py-2 bg-slate-100 border-b border-slate-200 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                                                <div className="flex items-center gap-1.5">
                                                    <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                                                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                                                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                                                </div>
                                                <span className="truncate max-w-[200px] text-slate-600">learnsyntax.com/admin</span>
                                                <span className="text-[10px] text-slate-400">Admin Portal</span>
                                            </div>
                                            <div className="aspect-[16/10] overflow-hidden bg-slate-900 relative">
                                                <img
                                                    src="/images/projects/learn-syntax-admin.jpg"
                                                    alt="Learn Syntax Admin Portal"
                                                    className="w-full h-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-300"
                                                    loading="lazy"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Narrative */}
                                    <div className="order-1 lg:order-2 lg:col-span-6 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
                                        <div>
                                            <div className="flex items-center gap-2 mb-3">
                                                <span className="px-2.5 py-0.5 rounded-md bg-indigo-50 border border-indigo-200 text-indigo-700 text-[10px] font-semibold font-mono uppercase">
                                                    EdTech LMS • Cohorts
                                                </span>
                                                <span className="px-2 py-0.5 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-semibold">
                                                    Production Live
                                                </span>
                                            </div>

                                            <h3 className="font-display text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                                                <a
                                                    href={`/project/${learnSyntaxProject.slug}`}
                                                    onClick={(e) => { e.preventDefault(); navigate(`/project/${learnSyntaxProject.slug}`); }}
                                                    className="hover:text-blue-600 transition-colors"
                                                >
                                                    Learn Syntax – Cohort-Based LMS Platform
                                                </a>
                                            </h3>

                                            <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                                                Enterprise-grade cohort Learning Management System (LMS) with live cohort timetable management, automated student certificate generation with public QR verification, and real-time WebSockets via Laravel Reverb.
                                            </p>

                                            <div className="mt-4 flex flex-wrap gap-1.5">
                                                {['Laravel 13', 'React 19', 'Inertia.js v3', 'Laravel Reverb', 'WebSockets', '489 Tests'].map((tag) => (
                                                    <span key={tag} className="px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200/80 text-[11px] font-medium text-slate-700 font-mono">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="mt-6 pt-5 border-t border-slate-100 flex flex-wrap items-center gap-3">
                                            <a
                                                href={`/project/${learnSyntaxProject.slug}`}
                                                onClick={(e) => { e.preventDefault(); navigate(`/project/${learnSyntaxProject.slug}`); }}
                                                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-xs transition-colors"
                                            >
                                                View Case Study →
                                            </a>
                                            {learnSyntaxProject.live_url && (
                                                <a
                                                    href={learnSyntaxProject.live_url}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors"
                                                >
                                                    <span>Live Demo</span>
                                                    <IconExternal />
                                                </a>
                                            )}
                                            {learnSyntaxProject.github_url && (
                                                <a
                                                    href={learnSyntaxProject.github_url}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="inline-flex items-center gap-1 px-3 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-900 text-xs font-medium transition-colors"
                                                    title="Source Code"
                                                >
                                                    <IconGitHub />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* COMPACT BENTO 3: GYMMITRA SAAS (6 cols) */}
                        {gymmitraProject && (
                            <div className="lg:col-span-6 bg-white border border-slate-200 rounded-3xl p-5 sm:p-7 shadow-2xs hover:border-slate-300 transition-all duration-200 flex flex-col justify-between">
                                <div>
                                    <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-950 shadow-xs mb-5 group">
                                        <div className="px-3 py-1.5 bg-slate-100 border-b border-slate-200 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                                            <span className="flex items-center gap-1">
                                                <span className="w-2 h-2 rounded-full bg-rose-400" />
                                                <span className="w-2 h-2 rounded-full bg-amber-400" />
                                                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                                            </span>
                                            <span>manish.echovel.com/admin</span>
                                            <span className="text-emerald-600 font-semibold">Live SaaS</span>
                                        </div>
                                        <div className="aspect-[16/10] overflow-hidden bg-slate-900">
                                            <img
                                                src="/images/projects/gymmitra-dashboard.png"
                                                alt="GymMitra SaaS Dashboard"
                                                className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-300"
                                                loading="lazy"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-violet-50 text-violet-700 border border-violet-200">
                                            Multi-Tenant SaaS
                                        </span>
                                        <span className="text-xs text-slate-400 font-mono">QR &amp; Billing</span>
                                    </div>

                                    <h3 className="font-display font-bold text-lg text-slate-900 group-hover:text-blue-600 transition-colors">
                                        <a
                                            href={`/project/${gymmitraProject.slug}`}
                                            onClick={(e) => { e.preventDefault(); navigate(`/project/${gymmitraProject.slug}`); }}
                                        >
                                            GymMitra – Gym Management SaaS Platform
                                        </a>
                                    </h3>

                                    <p className="mt-2 text-xs text-slate-600 leading-relaxed font-normal">
                                        Modern multi-gym management system with automated QR code attendance scanning, 1-click locker allocation grid, trainer assignment, and automated GST invoice billing.
                                    </p>

                                    <div className="mt-3 flex flex-wrap gap-1.5">
                                        {['Laravel', 'React', 'Inertia.js', 'MySQL', 'QR Scanner'].map((t) => (
                                            <span key={t} className="px-2 py-0.5 rounded-md bg-slate-50 border border-slate-200 text-[10px] font-mono text-slate-600">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                                    <a
                                        href={`/project/${gymmitraProject.slug}`}
                                        onClick={(e) => { e.preventDefault(); navigate(`/project/${gymmitraProject.slug}`); }}
                                        className="text-xs font-semibold text-blue-600 hover:underline"
                                    >
                                        View Case Study →
                                    </a>
                                    {gymmitraProject.live_url && (
                                        <a
                                            href={gymmitraProject.live_url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="inline-flex items-center gap-1 text-xs font-semibold text-slate-700 hover:text-slate-900"
                                        >
                                            <span>Live App</span>
                                            <IconExternal />
                                        </a>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* COMPACT BENTO 4: KITABIADDA MARKETPLACE (6 cols) */}
                        {kitabiAddaProject && (
                            <div className="lg:col-span-6 bg-white border border-slate-200 rounded-3xl p-5 sm:p-7 shadow-2xs hover:border-slate-300 transition-all duration-200 flex flex-col justify-between">
                                <div>
                                    <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-950 shadow-xs mb-5 group">
                                        <div className="px-3 py-1.5 bg-slate-100 border-b border-slate-200 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                                            <span className="flex items-center gap-1">
                                                <span className="w-2 h-2 rounded-full bg-rose-400" />
                                                <span className="w-2 h-2 rounded-full bg-amber-400" />
                                                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                                            </span>
                                            <span>github.com/manish96-code/KitabiAdda</span>
                                            <span className="text-amber-600 font-semibold">Marketplace</span>
                                        </div>
                                        <div className="aspect-[16/10] overflow-hidden bg-gradient-to-br from-slate-900 via-amber-950 to-slate-900 p-6 flex flex-col justify-between text-white">
                                            <div className="flex justify-between items-center">
                                                <span className="px-2.5 py-1 rounded-md bg-white/10 text-[10px] font-mono font-semibold">
                                                    4 ROLE-BASED PORTALS
                                                </span>
                                                <span className="text-xl">📚</span>
                                            </div>
                                            <div>
                                                <p className="font-display font-black text-xl tracking-tight">KitabiAdda Platform</p>
                                                <p className="text-xs text-amber-200/80 font-mono mt-0.5">Multi-Vendor Book Commerce &amp; Rider Delivery</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                                            Multi-Vendor E-Commerce
                                        </span>
                                        <span className="text-xs text-slate-400 font-mono">4 Role Portals</span>
                                    </div>

                                    <h3 className="font-display font-bold text-lg text-slate-900 group-hover:text-blue-600 transition-colors">
                                        <a
                                            href={`/project/${kitabiAddaProject.slug}`}
                                            onClick={(e) => { e.preventDefault(); navigate(`/project/${kitabiAddaProject.slug}`); }}
                                        >
                                            KitabiAdda – Multi-Vendor Book Marketplace
                                        </a>
                                    </h3>

                                    <p className="mt-2 text-xs text-slate-600 leading-relaxed font-normal">
                                        Connecting customers, local book vendors, and delivery riders through 4 dedicated role-based portals with inventory management, cart checkouts, and rider assignment.
                                    </p>

                                    <div className="mt-3 flex flex-wrap gap-1.5">
                                        {['Laravel', 'Inertia.js', 'React', 'MySQL', 'RBAC'].map((t) => (
                                            <span key={t} className="px-2 py-0.5 rounded-md bg-slate-50 border border-slate-200 text-[10px] font-mono text-slate-600">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                                    <a
                                        href={`/project/${kitabiAddaProject.slug}`}
                                        onClick={(e) => { e.preventDefault(); navigate(`/project/${kitabiAddaProject.slug}`); }}
                                        className="text-xs font-semibold text-blue-600 hover:underline"
                                    >
                                        View Case Study →
                                    </a>
                                    {kitabiAddaProject.github_url && (
                                        <a
                                            href={kitabiAddaProject.github_url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="inline-flex items-center gap-1 text-xs font-semibold text-slate-700 hover:text-slate-900"
                                        >
                                            <span>Repository</span>
                                            <IconGitHub />
                                        </a>
                                    )}
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </section>

            {/* 3. GITHUB ACTIVITY & VELOCITY (Exact GitHub Colors & Streak Metrics) */}
            <section id="activity" className="fade-section bg-white py-12 sm:py-16 border-b border-slate-100 scroll-mt-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-14 xl:px-16 space-y-7">

                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                        <div>
                            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-700 text-[10px] font-bold tracking-wider uppercase font-mono mb-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                <span>LIVE GITHUB TELEMETRY &amp; ACTIVITY</span>
                            </div>
                            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                                Continuous Code Delivery &amp; Consistency
                            </h2>
                            <p className="text-xs sm:text-sm text-slate-500 mt-1">
                                Real-time open source commits, pull requests, and production code delivery.
                            </p>
                        </div>
                        <a
                            href={githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-2xs transition-all self-start sm:self-auto hover:border-slate-300"
                        >
                            <IconGitHub />
                            <span>@manish96-code</span>
                            <span>↗</span>
                        </a>
                    </div>

                    {/* Interactive GitHub Calendar */}
                    <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-2xs">
                        <GitHubCalendar username="manish96-code" />
                    </div>

                    {/* Streak & Insights Bento Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {/* Streak Card */}
                        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs flex flex-col justify-between">
                            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5 mb-3">
                                <span className="text-xs font-bold text-slate-900 flex items-center gap-2">
                                    <span>🔥 Commit Streak &amp; Consistency</span>
                                </span>
                                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 border border-amber-200">
                                    Live Streak
                                </span>
                            </div>
                            <div className="flex items-center justify-center py-2 overflow-hidden">
                                <img
                                    src="https://github-readme-streak-stats.herokuapp.com/?user=manish96-code&theme=transparent&hide_border=true&stroke=22c55e&ring=22c55e&fire=f59e0b&currStreakLabel=16a34a&currStreakNum=0f172a&sideNums=0f172a&sideLabels=64748b&dates=94a3b8"
                                    alt="GitHub Streak Stats"
                                    className="w-full h-auto max-h-[195px] object-contain"
                                    loading="lazy"
                                />
                            </div>
                        </div>

                        {/* Verified Metric Card */}
                        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs flex flex-col justify-between">
                            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5 mb-3">
                                <span className="text-xs font-bold text-slate-900 flex items-center gap-2">
                                    <span>⚡ Verified Repository Insights</span>
                                </span>
                                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                    Verified
                                </span>
                            </div>

                            <div className="grid grid-cols-2 gap-3 my-auto py-1">
                                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                                    <p className="text-[11px] text-slate-500 font-medium">Annual Contributions</p>
                                    <p className="text-xl font-display font-extrabold text-slate-900 mt-0.5">1,261+</p>
                                    <p className="text-[10px] text-emerald-600 font-semibold mt-0.5">Top 1% Consistency</p>
                                </div>
                                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                                    <p className="text-[11px] text-slate-500 font-medium">Recent Commits</p>
                                    <p className="text-xl font-display font-extrabold text-slate-900 mt-0.5">147+</p>
                                    <p className="text-[10px] text-slate-500 mt-0.5">Across 4 Repositories</p>
                                </div>
                                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                                    <p className="text-[11px] text-slate-500 font-medium">Longest Streak</p>
                                    <p className="text-xl font-display font-extrabold text-slate-900 mt-0.5">156 Days</p>
                                    <p className="text-[10px] text-slate-500 mt-0.5">May 5 – Oct 7</p>
                                </div>
                                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                                    <p className="text-[11px] text-slate-500 font-medium">Current Streak</p>
                                    <p className="text-xl font-display font-extrabold text-slate-900 mt-0.5">24 Days</p>
                                    <p className="text-[10px] text-emerald-600 font-semibold mt-0.5">Active Daily Streak</p>
                                </div>
                            </div>

                            <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                                <span className="text-slate-500 font-mono">PHP 8.3 • React 19 • MySQL</span>
                                <a
                                    href="https://github.com/manish96-code?tab=repositories"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-blue-600 font-semibold hover:underline"
                                >
                                    View repositories →
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. ENGINEERING WORKFLOW (Linear-Style Systematic 4-Stage Pipeline) */}
            <section id="workflow" className="fade-section bg-slate-50/50 py-12 sm:py-16 border-b border-slate-100 scroll-mt-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-14 xl:px-16 space-y-7">
                    <div>
                        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-700 text-[10px] font-bold tracking-wider uppercase font-mono mb-2">
                            SYSTEMATIC PIPELINE
                        </div>
                        <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                            How I Architect, Build &amp; Ship
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-500 mt-1">
                            Structured 4-stage delivery process from relational modeling to production cloud hosting.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            {
                                step: '01',
                                phase: 'SCHEMA & PLAN',
                                title: 'Relational Modeling & Migrations',
                                desc: 'Normalized MySQL schemas, indexed foreign keys, constraints & Eloquent model relationships.',
                                tag: 'MySQL 8',
                                color: 'border-sky-200 bg-white'
                            },
                            {
                                step: '02',
                                phase: 'BACKEND CORE',
                                title: 'Controllers, Services & RBAC',
                                desc: 'Modular Laravel controllers, FormRequest validation, service layers & granular access policies.',
                                tag: 'Laravel 13',
                                color: 'border-indigo-200 bg-white'
                            },
                            {
                                step: '03',
                                phase: 'REACTIVE FRONTEND',
                                title: 'Inertia.js SPA & Tailwind UI',
                                desc: 'React 19 single-page interactivity without REST boilerplate, state management & responsive design.',
                                tag: 'React 19',
                                color: 'border-violet-200 bg-white'
                            },
                            {
                                step: '04',
                                phase: 'QUALITY & CLOUD',
                                title: 'Automated Tests & Production Deploy',
                                desc: '4,000+ PHPUnit assertions, Vite 8 bundling, PSR-12 Pint standards, and high-uptime hosting.',
                                tag: 'Vite 8 • Live',
                                color: 'border-emerald-200 bg-white'
                            }
                        ].map((stage) => (
                            <div key={stage.step} className={`p-5 rounded-2xl border ${stage.color} shadow-2xs flex flex-col justify-between group hover:border-slate-400 transition-all duration-150`}>
                                <div>
                                    <div className="flex items-center justify-between mb-3 text-[11px] font-mono">
                                        <span className="font-extrabold text-slate-400 group-hover:text-blue-600 transition-colors">
                                            STAGE {stage.step}
                                        </span>
                                        <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-semibold text-[10px]">
                                            {stage.tag}
                                        </span>
                                    </div>
                                    <h3 className="font-display font-bold text-sm text-slate-900 leading-snug">
                                        {stage.title}
                                    </h3>
                                    <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                                        {stage.desc}
                                    </p>
                                </div>
                                <div className="mt-4 pt-3 border-t border-slate-100 text-[10px] font-mono font-semibold text-slate-400">
                                    {stage.phase}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. ABOUT & JOURNEY (Modern 2-Column Bento Dossier) */}
            <section id="about" className="fade-section bg-white py-12 sm:py-16 border-b border-slate-100 scroll-mt-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-14 xl:px-16 space-y-7">
                    <div>
                        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-200/80 text-amber-700 text-[10px] font-bold tracking-wider uppercase font-mono mb-2">
                            EXPERIENCE &amp; BACKGROUND
                        </div>
                        <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                            From CS Foundations to Shipping Production Software
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-500 mt-1">
                            Engineering background, education at Purnea University, and work at Comestro Techlabs.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                        {/* Left Card: Dossier & Engineering Focus (5 cols) */}
                        <div className="lg:col-span-5 bg-slate-50/70 border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-2xs flex flex-col justify-between">
                            <div>
                                <div className="flex items-center gap-3.5 pb-5 border-b border-slate-200/80">
                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white font-display font-extrabold text-xl flex items-center justify-center shadow-xs">
                                        MK
                                    </div>
                                    <div>
                                        <h3 className="font-display font-bold text-base text-slate-900">
                                            {settings?.name || 'Manish Kumar'}
                                        </h3>
                                        <p className="text-xs text-blue-600 font-semibold mt-0.5">
                                            {activeExperience?.designation || 'Laravel Developer'}
                                        </p>
                                        <p className="text-[11px] text-slate-500">
                                            @ {activeExperience?.company || 'Comestro Techlabs Pvt Ltd'}
                                        </p>
                                    </div>
                                </div>

                                <div className="py-4 space-y-3 text-xs sm:text-[13px] text-slate-600 leading-relaxed font-normal">
                                    <blockquote className="font-display font-bold text-sm text-slate-900 italic border-l-2 border-blue-600 pl-3">
                                        &ldquo;We build problem solvers, not just syntax typers.&rdquo;
                                    </blockquote>
                                    <p>
                                        {activeExperience?.description || settings?.bio}
                                    </p>
                                    <p>
                                        Focusing on tightly-coupled single-page web monoliths using Laravel, React, and MySQL, with full-lifecycle ownership from relational database schema design to cloud deployment.
                                    </p>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-slate-200/80 flex flex-wrap items-center gap-3">
                                <a
                                    href={linkedinUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-xs transition-colors"
                                >
                                    Connect on LinkedIn ↗
                                </a>
                                <button
                                    type="button"
                                    onClick={() => scrollToSection('projects')}
                                    className="px-4 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 text-xs font-semibold transition-colors cursor-pointer"
                                >
                                    Explore Works ↓
                                </button>
                            </div>
                        </div>

                        {/* Right Card: Chronological Milestones Timeline (7 cols) */}
                        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-2xs flex flex-col justify-between">
                            <div>
                                <h3 className="font-display font-bold text-sm sm:text-base text-slate-900 border-b border-slate-100 pb-3 mb-4 flex items-center justify-between">
                                    <span>Engineering Timeline</span>
                                    <span className="text-[11px] font-mono text-slate-400">2023 — Present</span>
                                </h3>

                                <div className="space-y-4">
                                    {[
                                        {
                                            badge: '01',
                                            bg: 'bg-sky-500',
                                            period: '2023 – 2026',
                                            title: 'BCA Program at Purnea University',
                                            desc: 'Built core foundations in C, C++, Python, relational database architecture, SQL query tuning, and computer algorithms.'
                                        },
                                        {
                                            badge: '02',
                                            bg: 'bg-violet-500',
                                            period: '2024 – 2026',
                                            title: 'Full-Stack SaaS & Product Engineering',
                                            desc: 'Designed and deployed GymMitra SaaS, LinkUp social platform, and full-stack interactive applications using Laravel, React, and Tailwind.'
                                        },
                                        {
                                            badge: '03',
                                            bg: 'bg-emerald-500',
                                            period: 'May 2026 – Present',
                                            title: 'Laravel Developer @ Comestro Techlabs Pvt Ltd',
                                            desc: 'Developing enterprise pharmaceutical ERPs (Ciplon), cohort EdTech LMS platforms (Learn Syntax), and multi-vendor marketplaces (KitabiAdda).'
                                        }
                                    ].map((milestone) => (
                                        <div key={milestone.badge} className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4">
                                            <div className="flex items-center gap-2 sm:w-44 shrink-0">
                                                <span className={`w-6 h-6 rounded-md ${milestone.bg} text-white font-display font-bold text-xs flex items-center justify-center shrink-0`}>
                                                    {milestone.badge}
                                                </span>
                                                <span className="text-xs font-mono font-semibold text-slate-500">{milestone.period}</span>
                                            </div>
                                            <div>
                                                <h4 className="font-display font-bold text-xs sm:text-sm text-slate-900">{milestone.title}</h4>
                                                <p className="text-xs text-slate-500 mt-1 leading-relaxed">{milestone.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                                <span>Purnea, Bihar • India</span>
                                <span>Continuous Full-Stack Delivery</span>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* 6. TECHNICAL STACK & DISCIPLINES (`#skills`) */}
            <section id="skills" className="fade-section bg-slate-50/50 py-12 sm:py-16 border-b border-slate-100 scroll-mt-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-14 xl:px-16 space-y-7">

                    <div>
                        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-teal-50 border border-teal-200/80 text-teal-700 text-[10px] font-bold tracking-wider uppercase font-mono mb-2">
                            PRODUCTION TOOLING
                        </div>
                        <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                            Technical Stack &amp; Core Disciplines
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-500 mt-1">
                            Frameworks, languages, databases, and developer tooling used in live production systems.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {skillCategories.map((category) => {
                            const categoryLetters = {
                                Frontend: { letter: 'F', bg: 'bg-sky-100 text-sky-600' },
                                Backend: { letter: 'B', bg: 'bg-violet-100 text-violet-600' },
                                Database: { letter: 'D', bg: 'bg-amber-100 text-amber-600' },
                                'Programming Languages': { letter: 'C', bg: 'bg-rose-100 text-rose-600' },
                                Tools: { letter: 'T', bg: 'bg-emerald-100 text-emerald-600' },
                            };
                            const style = categoryLetters[category] || { letter: category.charAt(0), bg: 'bg-blue-100 text-blue-600' };

                            return (
                                <div key={category} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs hover:border-slate-300 transition-all duration-150">
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

                    {/* Certifications strip */}
                    {certificates?.length > 0 && (
                        <div className="pt-2">
                            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-3">
                                Verified Certifications &amp; Credentials
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                                {certificates.map((cert) => (
                                    <div key={cert.id} className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
                                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                            {cert.issue_date}
                                        </span>
                                        <p className="font-display font-bold text-xs sm:text-sm text-slate-900 mt-2">{cert.title}</p>
                                        <p className="text-[11px] text-slate-500 mt-0.5">{cert.organization}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* 7. MINIMALIST CONTACT CTA (High-Contrast Linear Style Banner) */}
            <section id="contact" className="fade-section bg-white py-12 sm:py-16 scroll-mt-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-14 xl:px-16">
                    <div className="bg-slate-950 text-white rounded-3xl p-7 sm:p-10 lg:p-12 relative overflow-hidden shadow-xl">
                        {/* Ambient subtle glow background */}
                        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
                        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

                        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div>
                                <span className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-white/10 text-emerald-400 text-[10px] font-mono font-semibold mb-3 border border-white/10">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                    ACCEPTING FULL-STACK OPPORTUNITIES
                                </span>
                                <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
                                    Ready to engineer something great together?
                                </h2>
                                <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-xl font-normal leading-relaxed">
                                    Available for full-time engineering roles, high-concurrency Laravel + React builds, and enterprise technical collaborations.
                                </p>
                            </div>

                            <div className="flex flex-wrap items-center gap-3 shrink-0">
                                <a
                                    href={`mailto:${settings?.email || 'manish966128@gmail.com'}`}
                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-slate-100 text-slate-950 text-xs sm:text-sm font-bold shadow-md transition-all active:scale-95"
                                >
                                    <span>Email Manish</span>
                                    <span>→</span>
                                </a>
                                <a
                                    href={whatsappUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/15 text-xs sm:text-sm font-semibold transition-all backdrop-blur-xs"
                                >
                                    <span>WhatsApp</span>
                                    <span className="text-slate-400">↗</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </AppLayout>
    );
}

import React, { useEffect } from 'react';
import AppLayout, { IconExternal, IconGitHub, IconMail, IconArrowRight } from '../../Layouts/AppLayout';
import SEO from '../../Components/SEO';
import { getPersonSchema, getWebsiteSchema } from '../../utils/seoSchemas';

// Reusable Section Header
const SectionHeader = ({ eyebrow, title, description, id }) => (
    <div className="mb-12 md:mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase mb-3"
            style={{
                backgroundColor: 'rgba(99, 102, 241, 0.08)',
                color: 'var(--color-accent)',
                border: '1px solid rgba(99, 102, 241, 0.2)'
            }}
        >
            <span>{eyebrow}</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight" style={{ color: 'var(--color-text)' }}>
                {title}
            </h2>
            {description && (
                <p className="text-sm sm:text-base max-w-xl leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                    {description}
                </p>
            )}
        </div>
    </div>
);

// Tech Badge Pill
const TechPill = ({ name, primary = false }) => (
    <span
        className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
            primary
                ? 'font-semibold'
                : ''
        }`}
        style={{
            backgroundColor: primary ? 'rgba(99, 102, 241, 0.12)' : 'var(--color-badge-bg)',
            color: primary ? 'var(--color-accent)' : 'var(--color-text-secondary)',
            border: primary ? '1px solid rgba(99, 102, 241, 0.28)' : '1px solid var(--color-border)',
        }}
    >
        {name}
    </span>
);

export default function Home({ projects = [], skills = {}, experiences = [], certificates = [], socialLinks = [], settings = {}, blogs = [], navigate }) {
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

    const handleNavigate = (path, e) => {
        if (e) e.preventDefault();
        if (navigate) {
            navigate(path);
        } else {
            window.location.href = path;
        }
    };

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Find specific projects
    const gymmitra = projects.find(p => p.slug === 'gymmitra') || projects[0];
    const kitabiAdda = projects.find(p => p.slug === 'kitabi-adda') || projects[1];
    const otherProjects = projects.filter(p => p.slug !== 'gymmitra' && p.slug !== 'kitabi-adda');

    const primaryStack = ['Laravel', 'React', 'PHP', 'Inertia.js', 'MySQL', 'Tailwind CSS'];
    const activeExperience = experiences?.[0];

    return (
        <AppLayout settings={settings} socialLinks={socialLinks} navigate={navigate}>
            <SEO
                title={`${settings?.name || 'Manish Kumar'} — Full-Stack Software Engineer`}
                description={settings?.meta_description || "Full-Stack Software Engineer specializing in Laravel, React, Inertia.js, and MySQL. Building production-grade SaaS platforms, marketplaces, and modern web applications."}
                keywords="Manish Kumar, Full-Stack Engineer, Laravel Developer, React Developer, Inertia.js, MySQL, Web Developer Portfolio, TechManish"
                schema={[getPersonSchema(settings, socialLinks), getWebsiteSchema(settings)]}
            />

            {/* ============================================================ */}
            {/* HERO SECTION */}
            {/* ============================================================ */}
            <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
                <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
                        
                        {/* Left Column: Headline & Action */}
                        <div className="lg:col-span-7 flex flex-col items-start text-left">
                            
                            {/* Availability Badge */}
                            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium mb-6 shadow-xs"
                                style={{
                                    backgroundColor: 'var(--color-surface)',
                                    border: '1px solid var(--color-border)',
                                    color: 'var(--color-text)'
                                }}
                            >
                                <span className="relative flex h-2 w-2">
                                    <span className="status-pulse-dot absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                </span>
                                <span>Open to Full-Stack Opportunities</span>
                            </div>

                            {/* Main Headline */}
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tight leading-[1.1] mb-6"
                                style={{ color: 'var(--color-text)' }}
                            >
                                From database schema to{' '}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-indigo-600 dark:from-indigo-400 dark:to-indigo-300">
                                    polished interface.
                                </span>
                            </h1>

                            {/* Subtitle / Bio */}
                            <p className="text-base sm:text-lg leading-relaxed mb-8 max-w-xl"
                                style={{ color: 'var(--color-text-secondary)' }}
                            >
                                I'm <strong style={{ color: 'var(--color-text)' }}>{settings?.name || 'Manish Kumar'}</strong>, a Full-Stack Software Engineer specializing in Laravel, React, Inertia.js, and MySQL. I build production-ready SaaS platforms, multi-vendor marketplaces, and high-performance web systems.
                            </p>

                            {/* CTAs */}
                            <div className="flex flex-wrap items-center gap-3.5 mb-10">
                                <button
                                    onClick={() => scrollToSection('projects')}
                                    className="btn-primary cursor-pointer"
                                >
                                    Explore My Work
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
                                    </svg>
                                </button>
                                
                                <a
                                    href={settings?.resume_file || '/downloads/resume.pdf'}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="btn-secondary"
                                >
                                    Download Resume
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                    </svg>
                                </a>
                            </div>

                            {/* Inline Stack Strip */}
                            <div className="flex flex-wrap items-center gap-2 pt-4 border-t w-full"
                                style={{ borderColor: 'var(--color-border)' }}
                            >
                                <span className="text-xs font-medium mr-1 uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>
                                    Primary Stack:
                                </span>
                                {primaryStack.map((tech) => (
                                    <TechPill key={tech} name={tech} primary />
                                ))}
                            </div>
                        </div>

                        {/* Right Column: Architectural Overview Card */}
                        <div className="lg:col-span-5">
                            <div className="relative rounded-2xl p-6 shadow-xl overflow-hidden transition-all duration-300"
                                style={{
                                    backgroundColor: 'var(--color-surface)',
                                    border: '1px solid var(--color-border)',
                                }}
                            >
                                {/* Card Header */}
                                <div className="flex items-center justify-between pb-4 mb-4 border-b"
                                    style={{ borderColor: 'var(--color-border)' }}
                                >
                                    <div className="flex items-center gap-2.5">
                                        <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs"
                                            style={{ backgroundColor: 'rgba(99, 102, 241, 0.12)', color: 'var(--color-accent)' }}
                                        >
                                            FS
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>
                                                Production Engineering
                                            </h3>
                                            <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                                                Monolith & SPA Architecture
                                            </p>
                                        </div>
                                    </div>
                                    <span className="text-[11px] px-2 py-0.5 rounded-full font-medium"
                                        style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10B981' }}
                                    >
                                        Live Stack
                                    </span>
                                </div>

                                {/* Stack Architecture Layers */}
                                <div className="space-y-3 text-xs">
                                    <div className="p-3 rounded-lg flex items-center justify-between"
                                        style={{ backgroundColor: 'var(--color-bg)', border: '1px solid var(--color-border)' }}
                                    >
                                        <div className="flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
                                            <span className="font-medium" style={{ color: 'var(--color-text)' }}>Frontend Layer</span>
                                        </div>
                                        <span className="font-mono text-[11px]" style={{ color: 'var(--color-text-secondary)' }}>
                                            React 19 · Inertia · Tailwind
                                        </span>
                                    </div>

                                    <div className="p-3 rounded-lg flex items-center justify-between"
                                        style={{ backgroundColor: 'var(--color-bg)', border: '1px solid var(--color-border)' }}
                                    >
                                        <div className="flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-red-500"></span>
                                            <span className="font-medium" style={{ color: 'var(--color-text)' }}>Backend Engine</span>
                                        </div>
                                        <span className="font-mono text-[11px]" style={{ color: 'var(--color-text-secondary)' }}>
                                            Laravel 11 · PHP 8.3
                                        </span>
                                    </div>

                                    <div className="p-3 rounded-lg flex items-center justify-between"
                                        style={{ backgroundColor: 'var(--color-bg)', border: '1px solid var(--color-border)' }}
                                    >
                                        <div className="flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                                            <span className="font-medium" style={{ color: 'var(--color-text)' }}>Relational DB</span>
                                        </div>
                                        <span className="font-mono text-[11px]" style={{ color: 'var(--color-text-secondary)' }}>
                                            MySQL · Indexing · RBAC
                                        </span>
                                    </div>

                                    <div className="p-3 rounded-lg flex items-center justify-between"
                                        style={{ backgroundColor: 'var(--color-bg)', border: '1px solid var(--color-border)' }}
                                    >
                                        <div className="flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                                            <span className="font-medium" style={{ color: 'var(--color-text)' }}>System Scope</span>
                                        </div>
                                        <span className="font-mono text-[11px]" style={{ color: 'var(--color-text-secondary)' }}>
                                            SaaS · Marketplaces · APIs
                                        </span>
                                    </div>
                                </div>

                                {/* Current Status Footer */}
                                <div className="mt-4 pt-3 flex items-center justify-between text-xs border-t"
                                    style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-muted)' }}
                                >
                                    <span>Current: Laravel Developer at Comestro</span>
                                    <span className="font-mono text-[11px]" style={{ color: 'var(--color-accent)' }}>
                                        5+ Systems Built
                                    </span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* ============================================================ */}
            {/* BRAND / TECH TICKER STRIP */}
            {/* ============================================================ */}
            <section className="py-6 border-y"
                style={{
                    backgroundColor: 'var(--color-surface)',
                    borderColor: 'var(--color-border)'
                }}
            >
                <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
                    <div className="flex flex-wrap items-center justify-center sm:justify-between gap-6 sm:gap-4 text-xs font-semibold tracking-wider uppercase"
                        style={{ color: 'var(--color-text-muted)' }}
                    >
                        <span>Laravel</span>
                        <span className="hidden sm:inline">·</span>
                        <span>React</span>
                        <span className="hidden sm:inline">·</span>
                        <span>Inertia.js</span>
                        <span className="hidden sm:inline">·</span>
                        <span>PHP</span>
                        <span className="hidden sm:inline">·</span>
                        <span>MySQL</span>
                        <span className="hidden sm:inline">·</span>
                        <span>Tailwind CSS</span>
                        <span className="hidden sm:inline">·</span>
                        <span>REST APIs</span>
                        <span className="hidden sm:inline">·</span>
                        <span>Git</span>
                    </div>
                </div>
            </section>

            {/* ============================================================ */}
            {/* FEATURED PROJECTS SECTION */}
            {/* ============================================================ */}
            <section id="projects" className="py-20 md:py-28 fade-section">
                <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
                    <SectionHeader
                        eyebrow="Featured Work"
                        title="Engineered for real-world operations."
                        description="Production applications designed with robust database schemas, secure authentication, multi-role dashboards, and responsive frontends."
                    />

                    {/* FEATURED PROJECT 1: GymMitra */}
                    {gymmitra && (
                        <div className="mb-16 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl"
                            style={{
                                backgroundColor: 'var(--color-surface)',
                                border: '1px solid var(--color-border)'
                            }}
                        >
                            <div className="grid lg:grid-cols-12 gap-0">
                                {/* Media / Screenshot */}
                                <div className="lg:col-span-7 relative bg-zinc-950 flex items-center justify-center p-4 sm:p-8 overflow-hidden group">
                                    {gymmitra.thumbnail ? (
                                        <img
                                            src={gymmitra.thumbnail}
                                            alt={gymmitra.title}
                                            className="w-full h-auto max-h-[420px] object-cover rounded-lg shadow-lg transition-transform duration-500 group-hover:scale-[1.02]"
                                        />
                                    ) : (
                                        <div className="h-64 sm:h-80 w-full flex items-center justify-center text-4xl font-display font-bold text-white/20">
                                            GYMMITRA
                                        </div>
                                    )}
                                    <div className="absolute top-4 left-4 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-black/60 backdrop-blur-md text-white border border-white/10">
                                        SaaS Platform
                                    </div>
                                </div>

                                {/* Content Details */}
                                <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
                                    <div>
                                        <div className="flex items-center gap-2 mb-3">
                                            <span className="text-xs font-mono font-semibold" style={{ color: 'var(--color-accent)' }}>
                                                01 — FEATURED PROJECT
                                            </span>
                                            <span className="text-xs px-2 py-0.5 rounded-full font-medium"
                                                style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10B981' }}
                                            >
                                                Live in Production
                                            </span>
                                        </div>

                                        <h3 className="text-2xl sm:text-3xl font-display font-bold mb-3" style={{ color: 'var(--color-text)' }}>
                                            {gymmitra.title}
                                        </h3>

                                        <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--color-text-secondary)' }}>
                                            {gymmitra.description}
                                        </p>

                                        {/* Key Feature Highlights */}
                                        <div className="space-y-2 mb-6">
                                            <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>
                                                Key Capabilities:
                                            </p>
                                            <div className="grid grid-cols-2 gap-2 text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                                                <div className="flex items-center gap-1.5">
                                                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--color-accent)' }}></span>
                                                    QR Attendance Scanner
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--color-accent)' }}></span>
                                                    Locker Allocation
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--color-accent)' }}></span>
                                                    GST Invoice Billing
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--color-accent)' }}></span>
                                                    Bulk Excel Import
                                                </div>
                                            </div>
                                        </div>

                                        {/* Tech Stack Pills */}
                                        <div className="flex flex-wrap gap-1.5 mb-8">
                                            {gymmitra.technologies?.map((tech) => (
                                                <TechPill key={tech} name={tech} />
                                            ))}
                                        </div>
                                    </div>

                                    {/* Action Links */}
                                    <div className="flex flex-wrap items-center gap-3 pt-4 border-t" style={{ borderColor: 'var(--color-border)' }}>
                                        <button
                                            onClick={(e) => handleNavigate(`/project/${gymmitra.slug}`, e)}
                                            className="btn-primary text-xs py-2 px-4 cursor-pointer"
                                        >
                                            View Case Study
                                            <IconArrowRight />
                                        </button>
                                        {gymmitra.live_url && (
                                            <a
                                                href={gymmitra.live_url}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="btn-secondary text-xs py-2 px-3.5"
                                            >
                                                Live Demo
                                                <IconExternal />
                                            </a>
                                        )}
                                        {gymmitra.github_url && (
                                            <a
                                                href={gymmitra.github_url}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="btn-secondary text-xs py-2 px-3"
                                                title="View on GitHub"
                                            >
                                                <IconGitHub />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* FEATURED PROJECT 2: KitabiAdda */}
                    {kitabiAdda && (
                        <div className="mb-16 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl"
                            style={{
                                backgroundColor: 'var(--color-surface)',
                                border: '1px solid var(--color-border)'
                            }}
                        >
                            <div className="grid lg:grid-cols-12 gap-0">
                                {/* Visual Card (Monogram/Architecture style) */}
                                <div className="lg:col-span-7 relative flex items-center justify-center p-8 sm:p-12 overflow-hidden bg-gradient-to-br from-indigo-950 via-slate-900 to-zinc-950 text-white group">
                                    <div className="relative z-10 w-full max-w-md p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md">
                                        <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
                                            <div className="flex items-center gap-2.5">
                                                <div className="w-10 h-10 rounded-lg bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center font-bold text-base text-indigo-300">
                                                    KA
                                                </div>
                                                <div>
                                                    <h4 className="text-sm font-semibold text-white">KitabiAdda Architecture</h4>
                                                    <p className="text-xs text-zinc-400">Multi-Vendor E-Commerce</p>
                                                </div>
                                            </div>
                                            <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                                                4 Portals
                                            </span>
                                        </div>

                                        <div className="grid grid-cols-2 gap-2 text-xs text-zinc-300">
                                            <div className="p-2.5 rounded bg-white/5 border border-white/5">
                                                <p className="font-semibold text-white">Customer App</p>
                                                <p className="text-[11px] text-zinc-400">Catalog, cart, orders, reviews</p>
                                            </div>
                                            <div className="p-2.5 rounded bg-white/5 border border-white/5">
                                                <p className="font-semibold text-white">Vendor Portal</p>
                                                <p className="text-[11px] text-zinc-400">Books, inventory, sales orders</p>
                                            </div>
                                            <div className="p-2.5 rounded bg-white/5 border border-white/5">
                                                <p className="font-semibold text-white">Rider Portal</p>
                                                <p className="text-[11px] text-zinc-400">Deliveries, status updates</p>
                                            </div>
                                            <div className="p-2.5 rounded bg-white/5 border border-white/5">
                                                <p className="font-semibold text-white">Admin Hub</p>
                                                <p className="text-[11px] text-zinc-400">RBAC, categories, payouts</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="absolute top-4 left-4 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-black/60 backdrop-blur-md text-white border border-white/10">
                                        Marketplace
                                    </div>
                                </div>

                                {/* Content Details */}
                                <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
                                    <div>
                                        <div className="flex items-center gap-2 mb-3">
                                            <span className="text-xs font-mono font-semibold" style={{ color: 'var(--color-accent)' }}>
                                                02 — FEATURED PROJECT
                                            </span>
                                            <span className="text-xs px-2 py-0.5 rounded-full font-medium"
                                                style={{ backgroundColor: 'rgba(99, 102, 241, 0.1)', color: 'var(--color-accent)' }}
                                            >
                                                Multi-Vendor
                                            </span>
                                        </div>

                                        <h3 className="text-2xl sm:text-3xl font-display font-bold mb-3" style={{ color: 'var(--color-text)' }}>
                                            {kitabiAdda.title}
                                        </h3>

                                        <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--color-text-secondary)' }}>
                                            {kitabiAdda.description}
                                        </p>

                                        {/* Highlights */}
                                        <div className="space-y-2 mb-6">
                                            <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>
                                                Architecture Highlights:
                                            </p>
                                            <div className="space-y-1.5 text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                                                <div className="flex items-center gap-2">
                                                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--color-accent)' }}></span>
                                                    <span>Role-based access: Customer, Vendor, Rider & Admin modules</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--color-accent)' }}></span>
                                                    <span>Complete dispatch: Order placement → Vendor packaging → Rider fulfillment</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--color-accent)' }}></span>
                                                    <span>Inertia.js bridge between Laravel backend and React UI</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Tech Stack Pills */}
                                        <div className="flex flex-wrap gap-1.5 mb-8">
                                            {kitabiAdda.technologies?.map((tech) => (
                                                <TechPill key={tech} name={tech} />
                                            ))}
                                        </div>
                                    </div>

                                    {/* Action Links */}
                                    <div className="flex flex-wrap items-center gap-3 pt-4 border-t" style={{ borderColor: 'var(--color-border)' }}>
                                        <button
                                            onClick={(e) => handleNavigate(`/project/${kitabiAdda.slug}`, e)}
                                            className="btn-primary text-xs py-2 px-4 cursor-pointer"
                                        >
                                            View Case Study
                                            <IconArrowRight />
                                        </button>
                                        {kitabiAdda.github_url && (
                                            <a
                                                href={kitabiAdda.github_url}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="btn-secondary text-xs py-2 px-3.5"
                                            >
                                                <IconGitHub />
                                                Source Code
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* OTHER PROJECTS GRID */}
                    <div className="grid md:grid-cols-3 gap-6">
                        {otherProjects.map((project, idx) => (
                            <div
                                key={project.id || idx}
                                className="rounded-xl p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                                style={{
                                    backgroundColor: 'var(--color-surface)',
                                    border: '1px solid var(--color-border)'
                                }}
                            >
                                <div>
                                    {/* Project Header */}
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm"
                                            style={{ backgroundColor: 'var(--color-badge-bg)', color: 'var(--color-accent)' }}
                                        >
                                            {project.title.substring(0, 2).toUpperCase()}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {project.live_url && (
                                                <a
                                                    href={project.live_url}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="p-1.5 rounded transition-colors"
                                                    style={{ color: 'var(--color-text-muted)' }}
                                                    title="Live Demo"
                                                >
                                                    <IconExternal />
                                                </a>
                                            )}
                                            {project.github_url && (
                                                <a
                                                    href={project.github_url}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="p-1.5 rounded transition-colors"
                                                    style={{ color: 'var(--color-text-muted)' }}
                                                    title="GitHub Repository"
                                                >
                                                    <IconGitHub />
                                                </a>
                                            )}
                                        </div>
                                    </div>

                                    {/* Project Details */}
                                    <h4 className="text-lg font-display font-bold mb-2 cursor-pointer transition-colors"
                                        style={{ color: 'var(--color-text)' }}
                                        onClick={(e) => handleNavigate(`/project/${project.slug}`, e)}
                                    >
                                        {project.title}
                                    </h4>
                                    <p className="text-xs leading-relaxed mb-4 line-clamp-3" style={{ color: 'var(--color-text-secondary)' }}>
                                        {project.description}
                                    </p>

                                    {/* Tech Stack */}
                                    <div className="flex flex-wrap gap-1 mb-6">
                                        {project.technologies?.slice(0, 4).map((tech) => (
                                            <span
                                                key={tech}
                                                className="px-2 py-0.5 rounded text-[10px] font-medium"
                                                style={{
                                                    backgroundColor: 'var(--color-badge-bg)',
                                                    color: 'var(--color-text-secondary)',
                                                    border: '1px solid var(--color-border)'
                                                }}
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Link to Project */}
                                <button
                                    onClick={(e) => handleNavigate(`/project/${project.slug}`, e)}
                                    className="flex items-center gap-1.5 text-xs font-semibold pt-3 border-t cursor-pointer transition-colors"
                                    style={{
                                        borderColor: 'var(--color-border)',
                                        color: 'var(--color-accent)'
                                    }}
                                >
                                    Read Case Study
                                    <IconArrowRight />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ============================================================ */}
            {/* WHAT I BUILD / ENGINEERING CAPABILITIES */}
            {/* ============================================================ */}
            <section className="py-20 md:py-28 border-y fade-section"
                style={{
                    backgroundColor: 'var(--color-surface)',
                    borderColor: 'var(--color-border)'
                }}
            >
                <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
                    <SectionHeader
                        eyebrow="Capabilities"
                        title="What I build & architect."
                        description="Specialized in building full-lifecycle software products from schema design to frontend delivery."
                    />

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Capability 1 */}
                        <div className="p-6 rounded-xl transition-all duration-300 hover:shadow-md"
                            style={{
                                backgroundColor: 'var(--color-bg)',
                                border: '1px solid var(--color-border)'
                            }}
                        >
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                                style={{ backgroundColor: 'rgba(99, 102, 241, 0.1)', color: 'var(--color-accent)' }}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                                </svg>
                            </div>
                            <h3 className="text-base font-display font-bold mb-2" style={{ color: 'var(--color-text)' }}>
                                SaaS Platforms
                            </h3>
                            <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                                Multi-branch systems, member management, automated QR attendance, GST billing, and role-based permissions.
                            </p>
                        </div>

                        {/* Capability 2 */}
                        <div className="p-6 rounded-xl transition-all duration-300 hover:shadow-md"
                            style={{
                                backgroundColor: 'var(--color-bg)',
                                border: '1px solid var(--color-border)'
                            }}
                        >
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                                style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10B981' }}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                </svg>
                            </div>
                            <h3 className="text-base font-display font-bold mb-2" style={{ color: 'var(--color-text)' }}>
                                Multi-Vendor Marketplaces
                            </h3>
                            <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                                Distributed seller stores, centralized catalogs, multi-stage order dispatch, rider workflows, and payout tracking.
                            </p>
                        </div>

                        {/* Capability 3 */}
                        <div className="p-6 rounded-xl transition-all duration-300 hover:shadow-md"
                            style={{
                                backgroundColor: 'var(--color-bg)',
                                border: '1px solid var(--color-border)'
                            }}
                        >
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                                style={{ backgroundColor: 'rgba(245, 158, 11, 0.1)', color: '#F59E0B' }}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
                                </svg>
                            </div>
                            <h3 className="text-base font-display font-bold mb-2" style={{ color: 'var(--color-text)' }}>
                                Modern SPAs & Dashboards
                            </h3>
                            <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                                Monolithic Single Page Applications via Inertia.js + React. Fast interactions with no redundant REST overhead.
                            </p>
                        </div>

                        {/* Capability 4 */}
                        <div className="p-6 rounded-xl transition-all duration-300 hover:shadow-md"
                            style={{
                                backgroundColor: 'var(--color-bg)',
                                border: '1px solid var(--color-border)'
                            }}
                        >
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                                style={{ backgroundColor: 'rgba(236, 72, 153, 0.1)', color: '#EC4899' }}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 5.625c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
                                </svg>
                            </div>
                            <h3 className="text-base font-display font-bold mb-2" style={{ color: 'var(--color-text)' }}>
                                Relational DB & Backend APIs
                            </h3>
                            <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                                Normalized MySQL schemas, query optimization, indexing, eager-loading to resolve N+1, and clean Eloquent models.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ============================================================ */}
            {/* ABOUT & EXPERIENCE SECTION */}
            {/* ============================================================ */}
            <section id="about" className="py-20 md:py-28 fade-section">
                <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
                        
                        {/* About Story */}
                        <div className="lg:col-span-6">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase mb-3"
                                style={{
                                    backgroundColor: 'rgba(99, 102, 241, 0.08)',
                                    color: 'var(--color-accent)',
                                    border: '1px solid rgba(99, 102, 241, 0.2)'
                                }}
                            >
                                <span>About Me</span>
                            </div>

                            <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight mb-6" style={{ color: 'var(--color-text)' }}>
                                Building software from the database up.
                            </h2>

                            <div className="space-y-4 text-sm sm:text-base leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                                <p>
                                    I am a software engineer focused on building production-grade web applications. My philosophy centers on clean relational database design, performant backend controllers, and crisp, responsive frontend user interfaces.
                                </p>
                                <p>
                                    Currently working as a <strong style={{ color: 'var(--color-text)' }}>Laravel Developer</strong> at <strong style={{ color: 'var(--color-text)' }}>Comestro Techlabs Pvt Ltd</strong> in Jaipur, where I architect complex multi-vendor platforms, campus networking portals, and internal business engines.
                                </p>
                                <p>
                                    Whether it's configuring multi-tier role authorization, optimizing MySQL queries with eager loading, or composing dynamic React interfaces with Inertia.js, I care deeply about both architectural rigor and user experience.
                                </p>
                            </div>

                            {/* Quick Stats Grid */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-8 pt-8 border-t" style={{ borderColor: 'var(--color-border)' }}>
                                <div>
                                    <p className="text-2xl font-display font-bold" style={{ color: 'var(--color-accent)' }}>5+</p>
                                    <p className="text-xs font-medium" style={{ color: 'var(--color-text-muted)' }}>Projects Built</p>
                                </div>
                                <div>
                                    <p className="text-2xl font-display font-bold" style={{ color: 'var(--color-accent)' }}>BCA</p>
                                    <p className="text-xs font-medium" style={{ color: 'var(--color-text-muted)' }}>Purnea University (2023-26)</p>
                                </div>
                                <div>
                                    <p className="text-2xl font-display font-bold" style={{ color: 'var(--color-accent)' }}>Jaipur</p>
                                    <p className="text-xs font-medium" style={{ color: 'var(--color-text-muted)' }}>Rajasthan, India</p>
                                </div>
                            </div>
                        </div>

                        {/* Experience Timeline */}
                        <div id="experience" className="lg:col-span-6">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase mb-3"
                                style={{
                                    backgroundColor: 'rgba(99, 102, 241, 0.08)',
                                    color: 'var(--color-accent)',
                                    border: '1px solid rgba(99, 102, 241, 0.2)'
                                }}
                            >
                                <span>Experience</span>
                            </div>

                            <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight mb-6" style={{ color: 'var(--color-text)' }}>
                                Professional journey.
                            </h2>

                            <div className="space-y-6">
                                {experiences?.map((exp, idx) => (
                                    <div
                                        key={idx}
                                        className="p-6 rounded-xl transition-all duration-300"
                                        style={{
                                            backgroundColor: 'var(--color-surface)',
                                            border: '1px solid var(--color-border)'
                                        }}
                                    >
                                        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                                            <h3 className="text-lg font-display font-bold" style={{ color: 'var(--color-text)' }}>
                                                {exp.designation}
                                            </h3>
                                            <span className="text-xs px-2.5 py-0.5 rounded-full font-medium"
                                                style={{
                                                    backgroundColor: 'rgba(99, 102, 241, 0.1)',
                                                    color: 'var(--color-accent)'
                                                }}
                                            >
                                                {exp.duration}
                                            </span>
                                        </div>

                                        <p className="text-sm font-semibold mb-3" style={{ color: 'var(--color-text-secondary)' }}>
                                            {exp.company}
                                        </p>

                                        <p className="text-xs sm:text-sm leading-relaxed mb-4" style={{ color: 'var(--color-text-secondary)' }}>
                                            {exp.description}
                                        </p>

                                        <div className="flex flex-wrap gap-1.5 pt-3 border-t" style={{ borderColor: 'var(--color-border)' }}>
                                            {exp.skills_used?.map((skill) => (
                                                <span
                                                    key={skill}
                                                    className="px-2 py-0.5 rounded text-[11px] font-medium"
                                                    style={{
                                                        backgroundColor: 'var(--color-badge-bg)',
                                                        color: 'var(--color-text-secondary)',
                                                        border: '1px solid var(--color-border)'
                                                    }}
                                                >
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}

                                {/* Education Card */}
                                <div className="p-6 rounded-xl"
                                    style={{
                                        backgroundColor: 'var(--color-surface)',
                                        border: '1px solid var(--color-border)'
                                    }}
                                >
                                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                                        <h3 className="text-lg font-display font-bold" style={{ color: 'var(--color-text)' }}>
                                            Bachelor of Computer Applications (BCA)
                                        </h3>
                                        <span className="text-xs px-2.5 py-0.5 rounded-full font-medium"
                                            style={{
                                                backgroundColor: 'var(--color-badge-bg)',
                                                color: 'var(--color-text-muted)'
                                            }}
                                        >
                                            2023 – 2026
                                        </span>
                                    </div>
                                    <p className="text-sm font-semibold" style={{ color: 'var(--color-text-secondary)' }}>
                                        Purnea University
                                    </p>
                                    <p className="text-xs sm:text-sm leading-relaxed mt-2" style={{ color: 'var(--color-text-muted)' }}>
                                        Core focus on Computer Science fundamentals, Object-Oriented Programming, Database Management Systems (DBMS), and Data Structures.
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* ============================================================ */}
            {/* TECHNICAL SKILLS SECTION */}
            {/* ============================================================ */}
            <section className="py-20 md:py-28 border-y fade-section"
                style={{
                    backgroundColor: 'var(--color-surface)',
                    borderColor: 'var(--color-border)'
                }}
            >
                <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
                    <SectionHeader
                        eyebrow="Technical Stack"
                        title="Technologies & toolchain."
                        description="Hands-on expertise across frontend interfaces, server-side frameworks, relational databases, and developer tooling."
                    />

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Object.entries(skills).map(([category, items]) => (
                            <div
                                key={category}
                                className="p-6 rounded-xl"
                                style={{
                                    backgroundColor: 'var(--color-bg)',
                                    border: '1px solid var(--color-border)'
                                }}
                            >
                                <h3 className="text-base font-display font-bold mb-4 pb-2 border-b flex items-center justify-between"
                                    style={{
                                        color: 'var(--color-text)',
                                        borderColor: 'var(--color-border)'
                                    }}
                                >
                                    <span>{category}</span>
                                    <span className="text-xs font-mono font-normal" style={{ color: 'var(--color-text-muted)' }}>
                                        {items.length} skills
                                    </span>
                                </h3>

                                <div className="flex flex-wrap gap-2">
                                    {items.map((skill) => {
                                        const isKeyStack = ['Laravel', 'React', 'PHP', 'MySQL', 'Tailwind CSS'].includes(skill.name);
                                        return (
                                            <span
                                                key={skill.name}
                                                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                                                    isKeyStack ? 'font-semibold' : ''
                                                }`}
                                                style={{
                                                    backgroundColor: isKeyStack ? 'rgba(99, 102, 241, 0.12)' : 'var(--color-surface)',
                                                    color: isKeyStack ? 'var(--color-accent)' : 'var(--color-text)',
                                                    border: isKeyStack ? '1px solid rgba(99, 102, 241, 0.3)' : '1px solid var(--color-border)'
                                                }}
                                            >
                                                {skill.name}
                                            </span>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ============================================================ */}
            {/* WRITING / LATEST ARTICLES */}
            {/* ============================================================ */}
            {blogs && blogs.length > 0 && (
                <section className="py-20 md:py-28 fade-section">
                    <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
                        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
                            <div>
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase mb-3"
                                    style={{
                                        backgroundColor: 'rgba(99, 102, 241, 0.08)',
                                        color: 'var(--color-accent)',
                                        border: '1px solid rgba(99, 102, 241, 0.2)'
                                    }}
                                >
                                    <span>Writing</span>
                                </div>
                                <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight" style={{ color: 'var(--color-text)' }}>
                                    Engineering thoughts & guides.
                                </h2>
                            </div>
                            <button
                                onClick={(e) => handleNavigate('/blogs', e)}
                                className="mt-4 sm:mt-0 inline-flex items-center gap-1.5 text-sm font-semibold cursor-pointer"
                                style={{ color: 'var(--color-accent)' }}
                            >
                                View all articles
                                <IconArrowRight />
                            </button>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            {blogs.slice(0, 2).map((blog) => (
                                <div
                                    key={blog.id || blog.slug}
                                    className="p-6 sm:p-8 rounded-xl flex flex-col justify-between transition-all duration-300 hover:shadow-lg cursor-pointer group"
                                    style={{
                                        backgroundColor: 'var(--color-surface)',
                                        border: '1px solid var(--color-border)'
                                    }}
                                    onClick={(e) => handleNavigate(`/blog/${blog.slug}`, e)}
                                >
                                    <div>
                                        <div className="flex items-center gap-2.5 mb-3 text-xs">
                                            <span className="px-2 py-0.5 rounded font-medium"
                                                style={{
                                                    backgroundColor: 'rgba(99, 102, 241, 0.1)',
                                                    color: 'var(--color-accent)'
                                                }}
                                            >
                                                {blog.category}
                                            </span>
                                            <span style={{ color: 'var(--color-text-muted)' }}>
                                                {blog.created_at}
                                            </span>
                                        </div>

                                        <h3 className="text-xl font-display font-bold mb-3 transition-colors group-hover:text-indigo-500"
                                            style={{ color: 'var(--color-text)' }}
                                        >
                                            {blog.title}
                                        </h3>

                                        <p className="text-xs sm:text-sm leading-relaxed mb-6" style={{ color: 'var(--color-text-secondary)' }}>
                                            {blog.summary}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-1 text-xs font-semibold pt-4 border-t"
                                        style={{
                                            borderColor: 'var(--color-border)',
                                            color: 'var(--color-accent)'
                                        }}
                                    >
                                        <span>Read article</span>
                                        <IconArrowRight />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ============================================================ */}
            {/* CALL TO ACTION / CONTACT */}
            {/* ============================================================ */}
            <section className="py-20 md:py-28 border-t fade-section"
                style={{
                    backgroundColor: 'var(--color-surface)',
                    borderColor: 'var(--color-border)'
                }}
            >
                <div className="max-w-4xl mx-auto px-5 sm:px-6 lg:px-8 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase mb-4"
                        style={{
                            backgroundColor: 'rgba(99, 102, 241, 0.08)',
                            color: 'var(--color-accent)',
                            border: '1px solid rgba(99, 102, 241, 0.2)'
                        }}
                    >
                        <span>Let's Build</span>
                    </div>

                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight mb-6" style={{ color: 'var(--color-text)' }}>
                        Have a project in mind or looking for a full-stack engineer?
                    </h2>

                    <p className="text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-8" style={{ color: 'var(--color-text-secondary)' }}>
                        I'm currently available for full-time engineering roles, high-impact freelance projects, and software consultation in Laravel and React ecosystems.
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-4">
                        <a
                            href={`mailto:${settings?.email || 'manish966128@gmail.com'}`}
                            className="btn-primary"
                        >
                            <IconMail />
                            <span>Email Me Directly</span>
                        </a>

                        <a
                            href="https://www.linkedin.com/in/manish-kumar-9661link"
                            target="_blank"
                            rel="noreferrer"
                            className="btn-secondary"
                        >
                            LinkedIn Profile
                            <IconExternal />
                        </a>

                        <a
                            href="https://github.com/manish96-code"
                            target="_blank"
                            rel="noreferrer"
                            className="btn-secondary"
                        >
                            <IconGitHub />
                            GitHub
                        </a>
                    </div>
                </div>
            </section>
        </AppLayout>
    );
}

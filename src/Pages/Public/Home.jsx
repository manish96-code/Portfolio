import React, { useEffect, useState } from 'react';
import AppLayout, { IconExternal } from '../../Layouts/AppLayout';
import SEO from '../../Components/SEO';
import { getPersonSchema, getWebsiteSchema } from '../../utils/seoSchemas';

const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
};

const SectionHeader = ({ eyebrow, title, copy, centered = false }) => (
    <div className={`mb-10 font-sans ${centered ? 'text-center max-w-2xl mx-auto' : 'grid gap-4 md:grid-cols-[0.65fr_1fr] md:items-end'}`}>
        <div>
            <div className={`section-accent mb-3 ${centered ? 'mx-auto' : ''}`}></div>
            {eyebrow && (
                <span className="inline-block px-3 py-1 font-mono text-[11px] font-semibold tracking-wider text-indigo-600 bg-indigo-50 border border-indigo-200 rounded-full mb-2">
                    {eyebrow}
                </span>
            )}
            <h2 className="font-display text-2xl font-bold tracking-tight text-zinc-900 md:text-3xl leading-snug">
                {title}
            </h2>
        </div>
        {copy && (
            <p className={`text-xs sm:text-sm leading-relaxed text-zinc-600 ${centered ? 'mt-3' : 'md:ml-auto border-l border-zinc-200 pl-5 max-w-2xl'}`}>
                {copy}
            </p>
        )}
    </div>
);

const ProjectMonogram = ({ title, thumbnail }) => (
    <div className="project-visual relative flex aspect-[16/10] items-center justify-center overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50 transition-all duration-300 group-hover:border-indigo-500/20 group-hover:bg-zinc-100 w-full h-full">
        {thumbnail ? (
            <img
                src={thumbnail}
                alt={title}
                className="w-full h-full object-cover object-left-top group-hover:scale-105 transition-transform duration-300"
            />
        ) : (
            <>
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:14px_24px] opacity-30"></div>
                <div className="relative flex h-16 w-16 items-center justify-center rounded-xl border border-zinc-200 bg-white text-2xl font-display font-bold text-indigo-600 shadow-sm group-hover:scale-105 group-hover:text-indigo-700 transition-all duration-300">
                    {title.substring(0, 2).toUpperCase()}
                </div>
            </>
        )}
    </div>
);

export default function Home({ projects, skills, experiences, certificates, socialLinks, settings, navigate }) {

    const [activeTab, setActiveTab] = useState('developer.js');
    const [copied, setCopied] = useState(false);
    const [isExecuting, setIsExecuting] = useState(false);
    const [terminalOutput, setTerminalOutput] = useState(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            },
            { threshold: 0.1 }
        );

        document.querySelectorAll('.fade-section').forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    const handleCopySnippet = () => {
        const codeText = activeTab === 'developer.js'
            ? `const developer = {\n  name: '${settings?.name || 'Manish Kumar'}',\n  role: 'Full Stack Software Engineer',\n  location: 'Jaipur, India',\n  coreSkills: ['Laravel 11', 'React 19', 'PHP 8.3', 'MySQL', 'Tailwind CSS'],\n  availableForRoles: true\n};`
            : `{\n  "name": "${settings?.name || 'Manish Kumar'}",\n  "company": "${settings?.current_company || 'Comestro Techlabs'}",\n  "stack": {\n    "frontend": ["React 19", "JavaScript", "Tailwind CSS", "Inertia.js"],\n    "backend": ["Laravel 11", "PHP 8.3", "REST APIs"],\n    "database": ["MySQL", "Eloquent ORM"]\n  }\n}`;
        navigator.clipboard.writeText(codeText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleRunCode = () => {
        setIsExecuting(true);
        setTerminalOutput(['Executing runtime build verification...']);

        setTimeout(() => {
            setTerminalOutput(prev => [
                ...prev,
                '[OK] Compiling Laravel 11 backend routes...',
                '[OK] Mounting React 19 interactive components...'
            ]);
        }, 400);

        setTimeout(() => {
            setTerminalOutput(prev => [
                ...prev,
                `[SUCCESS] System status: Ready for full-stack deployment.`,
                `[RESULT] 5+ projects built & active!`
            ]);
            setIsExecuting(false);
        }, 900);
    };

    const skillCategories = skills ? Object.keys(skills) : [];
    const activeExperience = experiences?.[0];

    // Comestro-inspired 8-card expertise list
    const expertiseList = [
        {
            title: 'SaaS Product Architecture',
            category: 'Architecture',
            desc: 'Building multi-tenant SaaS platforms with automated tenant provisioning, subscription lifecycles, and RBAC permission models (e.g. GymMitra).',
            tech: ['Laravel 11', 'Multi-Tenant', 'MySQL', 'Stripe'],
            colorClass: 'icon-box-indigo',
            icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
            )
        },
        {
            title: 'Full-Stack Web Development',
            category: 'Web Apps',
            desc: 'Delivering end-to-end production web applications connecting high-performance Laravel APIs with dynamic React user interfaces.',
            tech: ['Laravel', 'React 19', 'Inertia.js', 'Vite'],
            colorClass: 'icon-box-sky',
            icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            )
        },
        {
            title: 'RESTful APIs & Microservices',
            category: 'Backend',
            desc: 'Crafting clean, documented RESTful endpoints, API resources, token authentication with Laravel Sanctum, and external service webhooks.',
            tech: ['REST', 'Sanctum', 'JSON API', 'Webhooks'],
            colorClass: 'icon-box-teal',
            icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            )
        },
        {
            title: 'Relational Database Engineering',
            category: 'Database',
            desc: 'Designing normalized MySQL database schemas, foreign key constraints, indexing strategies, and eliminating N+1 Eloquent bottlenecks.',
            tech: ['MySQL', 'Eloquent ORM', 'Indexing', 'Query Optimization'],
            colorClass: 'icon-box-violet',
            icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                </svg>
            )
        },
        {
            title: 'Multi-Vendor Marketplaces',
            category: 'E-Commerce',
            desc: 'Building multi-store e-commerce systems with product catalogs, shopping cart logic, order fulfillment states, and payment flows (KitabiAdda).',
            tech: ['E-Commerce', 'Cart Logic', 'Order State Machine', 'Razorpay'],
            colorClass: 'icon-box-emerald',
            icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
            )
        },
        {
            title: 'Modern Reactive SPAs',
            category: 'Frontend',
            desc: 'Creating fluid, responsive single-page interfaces with React 19, Tailwind CSS, custom hooks, smooth transitions, and instant user feedback.',
            tech: ['React 19', 'Tailwind CSS', 'State Management', 'UI/UX'],
            colorClass: 'icon-box-sky',
            icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
            )
        },
        {
            title: 'Authentication & Security (RBAC)',
            category: 'Security',
            desc: 'Implementing multi-guard user authentication, email verifications, password resets, role-permission matrix, and CSRF protection.',
            tech: ['Bcrypt', 'RBAC', 'Middleware', 'Sanctum'],
            colorClass: 'icon-box-amber',
            icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            )
        },
        {
            title: 'Real-Time Systems & WebSockets',
            category: 'Interactive',
            desc: 'Deploying real-time notifications, event broadcasting, live status indicators, and interactive communication channels.',
            tech: ['Event Broadcasting', 'WebSockets', 'Pusher', 'Polling'],
            colorClass: 'icon-box-indigo',
            icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            )
        }
    ];

    // Engineering process workflow steps
    const processSteps = [
        {
            step: '01',
            title: 'Discovery & System Specs',
            desc: 'Unpacking business logic into exact user stories, entity-relationship diagrams, edge cases, and architectural milestones.',
            icon: '📋'
        },
        {
            step: '02',
            title: 'Database Schema Modeling',
            desc: 'Drafting normalized MySQL migrations, foreign key cascading rules, indexes, and Eloquent relationships before touching UI.',
            icon: '🗄️'
        },
        {
            step: '03',
            title: 'Backend & API Layer',
            desc: 'Implementing secure Laravel controllers, form requests, policies, business service layers, and RESTful resources.',
            icon: '⚡'
        },
        {
            step: '04',
            title: 'Reactive Frontend Experience',
            desc: 'Building responsive React 19 components with Tailwind CSS and Inertia.js for seamless single-page interactivity.',
            icon: '🎨'
        },
        {
            step: '05',
            title: 'Verification & Production Launch',
            desc: 'End-to-end testing, query optimization, SSL/environment verification, and continuous maintenance in production.',
            icon: '🚀'
        }
    ];

    // Value pillars for "Why Work With Me"
    const valuePillars = [
        {
            title: 'Enterprise-Grade Clean Code',
            desc: 'I write organized Laravel services, single-responsibility controllers, and modular React components that any engineer can maintain and scale.',
            colorClass: 'icon-box-indigo',
            icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
            )
        },
        {
            title: 'Production-First Reliability',
            desc: 'Every endpoint and screen is built with schema integrity, robust form request validations, exception handling, and device responsiveness.',
            colorClass: 'icon-box-emerald',
            icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            )
        },
        {
            title: 'Fast Execution & Clear Delivery',
            desc: 'Experienced with rapid agile iteration, breaking complex product specs into achievable milestones, and communicating proactively.',
            colorClass: 'icon-box-sky',
            icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            )
        },
        {
            title: 'Full-Cycle Engineering Mindset',
            desc: 'From initial database ER diagrams and REST APIs to pixel-accurate UI styling and deployment, I take ownership of the whole cycle.',
            colorClass: 'icon-box-violet',
            icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
            )
        }
    ];

    // Client and team endorsements
    const testimonials = [
        {
            quote: 'Manish demonstrated exceptional proficiency in structuring multi-tenant database schemas and developing smooth reactive interfaces. His commitment to code quality and delivery speed is outstanding.',
            author: 'Engineering Lead',
            role: 'Comestro Techlabs Pvt Ltd',
            avatar: 'CL',
            stars: 5
        },
        {
            quote: 'The GymMitra SaaS platform built by Manish is robust, fast, and handles member attendance and billing with zero hiccups. The code is modular, well-commented, and reliable.',
            author: 'Product Stakeholder',
            role: 'GymMitra Management',
            avatar: 'GM',
            stars: 5
        },
        {
            quote: 'Strong problem-solving capability in full-stack Laravel and React ecosystems. He designs clean database models and writes predictable, clean APIs.',
            author: 'Senior Developer',
            role: 'Peer Review & Collaboration',
            avatar: 'SD',
            stars: 5
        }
    ];

    return (
        <AppLayout settings={settings} socialLinks={socialLinks} navigate={navigate}>
            <SEO
                title={`${settings?.name || 'Manish Kumar'} | Full-Stack Software Engineer`}
                description={settings?.meta_description || "Full-Stack Software Engineer specializing in Laravel, React, Inertia.js, and MySQL. Building scalable SaaS applications, e-commerce marketplaces, and production web platforms."}
                canonicalUrl="/"
            />

            {/* HERO SECTION */}
            <section className="relative pt-12 pb-6 sm:pt-16 sm:pb-8 lg:pt-20 overflow-hidden font-sans">
                <div className="w-full max-w-full grid gap-8 sm:gap-10 lg:grid-cols-[1.15fr_0.85fr] items-center relative z-10 min-w-0">

                    {/* Left Column - Main Intro & CTAs */}
                    <div className="text-center sm:text-left w-full min-w-0 overflow-hidden px-1 sm:px-0">
                        {/* Status & Role Eyebrow Badges */}
                        <div className="mb-4 flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-2.5 w-full min-w-0">
                            <span className="inline-flex items-center justify-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 font-mono text-[10px] sm:text-[11px] font-semibold text-indigo-700 shadow-xs max-w-full">
                                <span className="relative flex h-2 w-2 shrink-0">
                                    <span className="status-pulse-dot absolute inline-flex h-full w-full rounded-full bg-indigo-500 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600"></span>
                                </span>
                                <span className="truncate">🚀 Full-Stack Engineer • Laravel & React Specialist</span>
                            </span>
                            <span className="inline-flex items-center justify-center gap-1 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 font-mono text-[10px] sm:text-[11px] font-semibold text-zinc-700 max-w-full">
                                <span className="text-indigo-600 font-bold">$</span> php artisan serve
                            </span>
                        </div>

                        {/* Comestro-Inspired Two-Tone Headline */}
                        <h1 className="max-w-3xl mx-auto sm:mx-0 font-display text-2xl sm:text-3xl lg:text-[42px] font-extrabold leading-snug sm:leading-[1.22] tracking-tight text-zinc-900 break-words min-w-0">
                            I Build Software <span className="text-indigo-600 font-extrabold block sm:inline">That Powers</span> Scalable Web Products
                        </h1>

                        {/* Bio Summary */}
                        <p className="mt-3.5 max-w-xl mx-auto sm:mx-0 text-xs sm:text-sm leading-relaxed text-zinc-600 break-words min-w-0">
                            I am <strong className="text-zinc-900 font-semibold">{settings?.name || 'Manish Kumar'}</strong>, a full-stack software engineer based in Jaipur. I specialize in building multi-tenant SaaS platforms (GymMitra), e-commerce marketplaces (KitabiAdda), and reactive single-page user interfaces with solid Laravel backends and MySQL database engines.
                        </p>

                        {/* Comestro Trust Badges */}
                        <div className="mt-4 flex flex-wrap items-center justify-center sm:justify-start gap-2 text-xs text-zinc-600 font-medium">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-100/90 border border-zinc-200">
                                <span className="text-indigo-600 font-bold">🛡️</span> Clean DB Schemas
                            </span>
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-100/90 border border-zinc-200">
                                <span className="text-indigo-600 font-bold">⚡</span> High-Throughput APIs
                            </span>
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-100/90 border border-zinc-200">
                                <span className="text-indigo-600 font-bold">💼</span> Production-Ready Code
                            </span>
                        </div>

                        {/* Core Stack Pills */}
                        <div className="mt-4 flex flex-wrap items-center justify-center sm:justify-start gap-1 sm:gap-1.5 font-mono text-[10px] sm:text-[11px] w-full min-w-0">
                            <span className="font-semibold text-zinc-500 mr-1 text-[10px] w-full sm:w-auto text-center sm:text-left">// Core Stack:</span>
                            {['Laravel 11', 'React 19', 'Inertia.js', 'MySQL', 'PHP 8.3', 'Tailwind CSS'].map((tech) => (
                                <span key={tech} className="px-2 py-0.5 rounded-md bg-zinc-100 border border-zinc-200 text-zinc-800 font-semibold shrink-0">
                                    {tech}
                                </span>
                            ))}
                        </div>

                        {/* Action Buttons */}
                        <div className="mt-5 sm:mt-6 flex flex-wrap gap-2.5 sm:gap-3 items-center justify-center sm:justify-start w-full max-w-md mx-auto sm:mx-0 min-w-0">
                            <button
                                type="button"
                                onClick={() => scrollToSection('projects')}
                                className="w-full sm:w-auto group relative inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm shadow-indigo-600/20 active:scale-95 transition-all duration-200 cursor-pointer"
                            >
                                <span>View Selected Works</span>
                                <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </button>
                            <button
                                type="button"
                                onClick={() => scrollToSection('contact')}
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold rounded-lg text-zinc-800 bg-white border border-zinc-300 hover:border-zinc-400 hover:bg-zinc-50 shadow-sm active:scale-95 transition-all duration-200 cursor-pointer font-mono"
                            >
                                <span>$ contact --email</span>
                            </button>
                            {settings?.resume_file && (
                                <a
                                    href={settings.resume_file}
                                    download
                                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-lg text-indigo-700 bg-indigo-50 border border-indigo-200 hover:bg-indigo-100 transition-all cursor-pointer font-sans"
                                >
                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                    </svg>
                                    <span>Resume (PDF)</span>
                                </a>
                            )}
                        </div>

                        {/* Metric Highlights */}
                        <div className="mt-6 sm:mt-8 grid max-w-xl mx-auto sm:mx-0 grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5 border-t border-zinc-200 pt-4 sm:pt-5 w-full min-w-0">
                            {[
                                { value: '5+', title: 'Shipped Builds', tag: 'Repos' },
                                { value: '2026', title: 'BCA Graduate', tag: 'Academic' },
                                { value: '100%', title: 'Code Quality', tag: 'Standard' },
                                { value: 'Comestro', title: 'Techlabs Dev', tag: 'Experience' },
                            ].map((item) => (
                                <div key={item.title} className="p-2 sm:p-2.5 rounded-lg border border-zinc-200 bg-white hover:border-indigo-500/40 shadow-xs transition-all duration-200 text-center sm:text-left overflow-hidden min-w-0">
                                    <div className="flex items-center justify-between gap-0.5">
                                        <p className="font-display text-xs sm:text-base font-bold text-zinc-900">{item.value}</p>
                                        <span className="text-[8px] font-mono font-semibold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-1 py-0.5 rounded border border-indigo-100 hidden sm:inline-block">{item.tag}</span>
                                    </div>
                                    <p className="mt-0.5 text-[10px] sm:text-[11px] font-medium text-zinc-500 truncate">{item.title}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column - Interactive Terminal Visual Deck */}
                    <div className="relative min-w-0">
                        <div className="glass-terminal rounded-xl sm:rounded-2xl relative overflow-hidden text-zinc-300 font-mono text-xs border border-zinc-800 shadow-2xl bg-zinc-950">

                            {/* Window Topbar */}
                            <div className="flex flex-wrap items-center justify-between gap-2 px-3 sm:px-4 py-2.5 sm:py-3 bg-zinc-900/90 border-b border-zinc-800">
                                <div className="flex items-center gap-1.5 sm:gap-2">
                                    <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#ff5f56] inline-block"></span>
                                    <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#ffbd2e] inline-block"></span>
                                    <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#27c93f] inline-block"></span>
                                </div>

                                {/* File Tab Switcher */}
                                <div className="flex items-center bg-zinc-950 p-0.5 rounded-lg border border-zinc-800 overflow-x-auto max-w-full">
                                    <button
                                        type="button"
                                        onClick={() => setActiveTab('developer.js')}
                                        className={`px-2.5 sm:px-3 py-1 text-[10px] sm:text-[11px] font-medium rounded-md transition-all cursor-pointer flex items-center gap-1 whitespace-nowrap ${activeTab === 'developer.js'
                                            ? 'bg-indigo-600 text-white shadow-sm'
                                            : 'text-zinc-400 hover:text-zinc-200'
                                            }`}
                                    >
                                        <span className="text-yellow-400 font-bold">JS</span> developer.config.js
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setActiveTab('tech-stack.json')}
                                        className={`px-2.5 sm:px-3 py-1 text-[10px] sm:text-[11px] font-medium rounded-md transition-all cursor-pointer flex items-center gap-1 whitespace-nowrap ${activeTab === 'tech-stack.json'
                                            ? 'bg-indigo-600 text-white shadow-sm'
                                            : 'text-zinc-400 hover:text-zinc-200'
                                            }`}
                                    >
                                        <span className="text-cyan-400 font-bold">{ }</span> stack.json
                                    </button>
                                </div>

                                {/* Copy snippet button */}
                                <button
                                    type="button"
                                    onClick={handleCopySnippet}
                                    className="p-1 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded transition-colors hidden sm:block"
                                    title="Copy Code"
                                >
                                    {copied ? (
                                        <span className="text-[10px] text-emerald-400 font-sans font-medium">Copied!</span>
                                    ) : (
                                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                        </svg>
                                    )}
                                </button>
                            </div>

                            {/* Active Environment Pill Bar */}
                            <div className="px-3 sm:px-5 py-2 bg-zinc-900/40 border-b border-zinc-800 flex flex-wrap items-center justify-between gap-2 text-[10px] sm:text-[11px]">
                                <div className="flex flex-wrap items-center gap-1.5">
                                    <span className="text-zinc-500 uppercase tracking-wider text-[8px] sm:text-[9px] font-bold">Runtime:</span>
                                    <span className="px-1.5 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20 text-indigo-300">Laravel 11</span>
                                    <span className="px-1.5 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20 text-cyan-300">React 19</span>
                                </div>
                                <button
                                    type="button"
                                    onClick={handleRunCode}
                                    disabled={isExecuting}
                                    className="px-2 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/25 transition-all text-[10px] font-medium flex items-center gap-1 cursor-pointer disabled:opacity-50"
                                >
                                    {isExecuting ? (
                                        <>
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block"></span>
                                            <span>Building...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>Run Code</span>
                                            <span className="text-[10px]">▶</span>
                                        </>
                                    )}
                                </button>
                            </div>

                            {/* Code Area */}
                            <div className="p-4 sm:p-6 overflow-x-auto min-h-[200px] text-[11px] sm:text-xs">
                                {activeTab === 'developer.js' ? (
                                    <div className="leading-6 sm:leading-7 whitespace-pre-wrap break-all sm:break-normal">
                                        <p><span className="text-pink-400">const</span> <span className="text-blue-300">developer</span> <span className="text-zinc-500">=</span> &#123;</p>
                                        <p className="pl-4 sm:pl-6">name<span className="text-zinc-500">:</span> <span className="text-emerald-300">'{settings?.name || 'Manish Kumar'}'</span>,</p>
                                        <p className="pl-4 sm:pl-6">title<span className="text-zinc-500">:</span> <span className="text-emerald-300">'Full Stack Software Engineer'</span>,</p>
                                        <p className="pl-4 sm:pl-6">company<span className="text-zinc-500">:</span> <span className="text-indigo-400">'{settings?.current_company || 'Comestro Techlabs'}'</span>,</p>
                                        <p className="pl-4 sm:pl-6">location<span className="text-zinc-500">:</span> <span className="text-emerald-300">'Jaipur, Rajasthan, India'</span>,</p>
                                        <p className="pl-4 sm:pl-6">featuredApps<span className="text-zinc-500">:</span> [<span className="text-cyan-300">'GymMitra SaaS'</span>, <span className="text-cyan-300">'KitabiAdda'</span>, <span className="text-cyan-300">'LinkUp'</span>],</p>
                                        <p className="pl-4 sm:pl-6">openForRoles<span className="text-zinc-500">:</span> <span className="text-amber-400">true</span></p>
                                        <p>&#125;;</p>
                                        <p className="mt-2 text-zinc-500">// Engineering clean, scalable web systems</p>
                                        <p><span className="text-purple-400">export default</span> developer;</p>
                                    </div>
                                ) : (
                                    <div className="leading-6 sm:leading-7 whitespace-pre-wrap break-all sm:break-normal">
                                        <p>&#123;</p>
                                        <p className="pl-4 sm:pl-6"><span className="text-cyan-300">"developer"</span>: <span className="text-emerald-300">"{settings?.name || 'Manish Kumar'}"</span>,</p>
                                        <p className="pl-4 sm:pl-6"><span className="text-cyan-300">"degree"</span>: <span className="text-emerald-300">"BCA (Purnea University)"</span>,</p>
                                        <p className="pl-4 sm:pl-6"><span className="text-cyan-300">"frontend"</span>: [<span className="text-amber-300">"React 19"</span>, <span className="text-amber-300">"Tailwind CSS"</span>, <span className="text-amber-300">"Inertia.js"</span>],</p>
                                        <p className="pl-4 sm:pl-6"><span className="text-cyan-300">"backend"</span>: [<span className="text-amber-300">"Laravel 11"</span>, <span className="text-amber-300">"PHP 8.3"</span>, <span className="text-amber-300">"REST APIs"</span>],</p>
                                        <p className="pl-4 sm:pl-6"><span className="text-cyan-300">"database"</span>: [<span className="text-amber-300">"MySQL"</span>, <span className="text-amber-300">"Eloquent ORM"</span>]</p>
                                        <p>&#125;</p>
                                    </div>
                                )}
                            </div>

                            {/* Live Output Console Drawer */}
                            {terminalOutput && (
                                <div className="border-t border-zinc-800 bg-zinc-950 p-3 sm:p-4 font-mono text-[10px] sm:text-[11px] space-y-1 animate-fadeIn">
                                    <div className="flex items-center justify-between text-zinc-500 mb-1 border-b border-zinc-800/60 pb-1">
                                        <span className="uppercase text-[9px] font-bold tracking-wider text-emerald-400 flex items-center gap-1.5">
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-ping"></span>
                                            Execution Console
                                        </span>
                                        <button
                                            onClick={() => setTerminalOutput(null)}
                                            className="text-zinc-600 hover:text-zinc-400 text-xs"
                                        >
                                            ✕ Clear
                                        </button>
                                    </div>
                                    {terminalOutput.map((line, i) => (
                                        <p key={i} className={line.includes('[SUCCESS]') || line.includes('[OK]') ? 'text-emerald-400' : 'text-zinc-400'}>
                                            {line}
                                        </p>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* FEATURED SAAS SPOTLIGHT BANNER */}
            <div className="my-6 p-4 rounded-xl border border-indigo-200 bg-indigo-50/60 flex flex-col sm:flex-row items-center justify-between gap-4 font-sans shadow-xs text-center sm:text-left">
                <div className="flex flex-col sm:flex-row items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600 text-white font-mono text-xs font-bold shadow-sm shrink-0">
                        SaaS
                    </span>
                    <div>
                        <div className="flex items-center justify-center sm:justify-start gap-2">
                            <span className="font-bold text-zinc-900 text-sm">GymMitra SaaS Platform</span>
                            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-100 text-emerald-700 border border-emerald-200">LIVE PRODUCTION</span>
                        </div>
                        <p className="text-xs text-zinc-600 mt-0.5">Multi-tenant Gym Management software with QR attendance, automated billing, and locker allocation.</p>
                    </div>
                </div>
                <a
                    href="https://manish.echovel.com"
                    target="_blank"
                    rel="noreferrer"
                    className="w-full sm:w-auto justify-center px-4 py-2 text-xs font-semibold font-mono rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer shadow-sm active:scale-95"
                >
                    <span>Visit Live Platform</span>
                    <IconExternal />
                </a>
            </div>

            {/* COMESTRO-STYLE SECTION 1: MY EXPERTISE (8-CARD GRID) */}
            <section id="expertise" className="fade-section py-8 md:py-12 border-t border-zinc-200">
                <SectionHeader
                    eyebrow="// 01. CAPABILITIES & DOMAINS"
                    title={
                        <span>
                            My <span className="text-indigo-600">Expertise</span>
                        </span>
                    }
                    copy="Specialized engineering capabilities refined through real production systems: multi-tenant SaaS, marketplace engines, REST APIs, and responsive web platforms."
                />

                <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                    {expertiseList.map((item, idx) => (
                        <div
                            key={idx}
                            className="group p-5 rounded-xl border border-zinc-200 bg-white hover:border-indigo-400 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                        >
                            <div>
                                <div className="flex items-center justify-between mb-3">
                                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${item.colorClass}`}>
                                        {item.icon}
                                    </div>
                                    <span className="font-mono text-[10px] font-semibold text-zinc-500 uppercase tracking-wider bg-zinc-100 px-2 py-0.5 rounded border border-zinc-200">
                                        {item.category}
                                    </span>
                                </div>
                                <h3 className="font-display text-base font-bold text-zinc-900 group-hover:text-indigo-600 transition-colors">
                                    {item.title}
                                </h3>
                                <p className="mt-2 text-xs text-zinc-600 leading-relaxed">
                                    {item.desc}
                                </p>
                            </div>

                            <div className="mt-4 pt-3 border-t border-zinc-100 flex flex-wrap gap-1">
                                {item.tech.map((t) => (
                                    <span key={t} className="text-[10px] font-mono font-medium text-zinc-600 bg-zinc-50 border border-zinc-200 px-1.5 py-0.5 rounded">
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* COMESTRO-STYLE SECTION 2: WHY WORK WITH ME (2-COLUMN) */}
            <section id="why-me" className="fade-section py-8 md:py-12 border-t border-zinc-200">
                <SectionHeader
                    eyebrow="// 02. VALUE PROPOSITION"
                    title={
                        <span>
                            Why <span className="text-indigo-600">Work With Me?</span>
                        </span>
                    }
                    copy="Combining modern software engineering rigour with a strong product mindset to ship reliable web platforms on schedule."
                />

                <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] items-center">
                    {/* Left: 4 Value Pillars */}
                    <div className="grid gap-4 sm:grid-cols-2">
                        {valuePillars.map((pillar, idx) => (
                            <div key={idx} className="p-4 rounded-xl border border-zinc-200 bg-white hover:border-indigo-300 hover:shadow-sm transition-all duration-300">
                                <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-3 ${pillar.colorClass}`}>
                                    {pillar.icon}
                                </div>
                                <h4 className="font-display text-sm font-bold text-zinc-900">
                                    {pillar.title}
                                </h4>
                                <p className="mt-1.5 text-xs text-zinc-600 leading-relaxed">
                                    {pillar.desc}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Right: 2x3 Statistics Grid */}
                    <div className="border border-zinc-200 bg-zinc-50/70 p-5 sm:p-6 rounded-2xl shadow-xs">
                        <h4 className="font-display text-xs font-bold text-zinc-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
                            Performance & Engineering Metrics
                        </h4>
                        <div className="grid grid-cols-2 gap-3 sm:gap-4">
                            {[
                                { value: '5+', label: 'Delivered Projects', sub: 'Production builds' },
                                { value: '100%', label: 'Clean Standards', sub: 'PSR & ESLint rules' },
                                { value: '15+', label: 'DB Tables Modeled', sub: 'Normalized MySQL' },
                                { value: '99.9%', label: 'Uptime Focus', sub: 'Reliable backend code' },
                                { value: '< 24h', label: 'Issue Turnaround', sub: 'Prompt responses' },
                                { value: '1 yr+', label: 'Industry Internship', sub: 'Comestro Techlabs' }
                            ].map((stat, idx) => (
                                <div key={idx} className="p-3 bg-white border border-zinc-200 rounded-xl shadow-xs">
                                    <p className="font-display text-lg sm:text-xl font-bold text-indigo-600">{stat.value}</p>
                                    <p className="text-xs font-semibold text-zinc-900 mt-0.5">{stat.label}</p>
                                    <p className="text-[10px] text-zinc-500 font-mono mt-0.5">{stat.sub}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* COMESTRO-STYLE SECTION 3: FEATURED PROJECTS */}
            <section id="projects" className="fade-section py-8 md:py-12 border-t border-zinc-200">
                <SectionHeader
                    eyebrow="// 03. FEATURED CODE REPOSITORIES"
                    title={
                        <span>
                            Selected <span className="text-indigo-600">Projects</span>
                        </span>
                    }
                    copy="A curated portfolio of SaaS applications, e-commerce marketplaces, and community platforms built with Laravel, React, and MySQL."
                />

                <div className="grid gap-6">
                    {(projects || []).map((project) => (
                        <article key={project.id} className="grid gap-5 border border-zinc-200 bg-white p-4 sm:p-5 shadow-sm rounded-xl hover:border-zinc-350 hover:shadow-md transition-all duration-300 lg:grid-cols-[0.85fr_1.15fr] group">
                            <a
                                href={`/project/${project.slug}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    navigate(`/project/${project.slug}`);
                                }}
                                className="block"
                            >
                                <ProjectMonogram title={project.title} thumbnail={project.thumbnail} />
                            </a>

                            <div className="flex flex-col justify-between font-sans">
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="font-mono text-[11px] text-zinc-500 font-semibold">
                                            manish96-code / <strong className="text-zinc-900">{project.slug}</strong>
                                        </span>
                                        {project.is_featured ? (
                                            <span className="inline-block border border-indigo-200 bg-indigo-50 text-indigo-600 px-2.5 py-0.5 text-[10px] font-semibold font-mono rounded-full">
                                                FEATURED BUILD 🚀
                                            </span>
                                        ) : (
                                            <span className="inline-block border border-cyan-200 bg-cyan-50 text-cyan-700 px-2.5 py-0.5 text-[10px] font-semibold font-mono rounded-full">
                                                PROJECT BUILD 🚀
                                            </span>
                                        )}
                                    </div>
                                    <h3 className="font-display text-xl font-bold text-zinc-900">
                                        <a
                                            href={`/project/${project.slug}`}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                navigate(`/project/${project.slug}`);
                                            }}
                                            className="transition hover:text-indigo-600"
                                        >
                                            {project.title}
                                        </a>
                                    </h3>
                                    <p className="mt-2 text-xs sm:text-sm leading-relaxed text-zinc-600 pr-2">{project.description}</p>
                                </div>

                                <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between border-t border-zinc-200 pt-4">
                                    <div className="flex flex-wrap gap-1.5">
                                        {project.technologies?.map((tech) => (
                                            <span key={tech} className="font-mono text-[10px] font-semibold text-zinc-600 border border-zinc-200 bg-zinc-50 px-2 py-0.5 rounded">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="flex items-center gap-2.5 text-zinc-500">
                                        {project.live_url && (
                                            <a
                                                href={project.live_url}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="flex items-center justify-center gap-1 px-2.5 h-7 border border-indigo-200 bg-indigo-50 text-indigo-600 font-mono text-[11px] font-semibold rounded-lg shadow-sm hover:bg-indigo-600 hover:text-white transition-all duration-200"
                                                title="Live Demo"
                                                aria-label={`${project.title} Live Demo`}
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
                                                className="flex items-center justify-center w-7 h-7 border border-zinc-200 bg-white rounded-lg shadow-sm hover:bg-zinc-50 hover:text-zinc-900 transition-all duration-200"
                                                aria-label={`${project.title} GitHub`}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                                                </svg>
                                            </a>
                                        )}
                                        <a
                                            href={`/project/${project.slug}`}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                navigate(`/project/${project.slug}`);
                                            }}
                                            className="flex items-center justify-center w-7 h-7 border border-zinc-200 bg-white rounded-lg shadow-sm hover:bg-zinc-50 hover:text-zinc-900 transition-all duration-200"
                                            aria-label={`${project.title} details`}
                                        >
                                            <IconExternal />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            {/* COMESTRO-STYLE SECTION 4: MY ENGINEERING PROCESS */}
            <section id="process" className="fade-section py-8 md:py-12 border-t border-zinc-200">
                <SectionHeader
                    eyebrow="// 04. METHODOLOGY & WORKFLOW"
                    title={
                        <span>
                            My Engineering <span className="text-indigo-600">Process</span>
                        </span>
                    }
                    copy="How I take a software idea from business requirements to a reliable, maintainable, and deployed web product."
                />

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                    {processSteps.map((p, idx) => (
                        <div key={idx} className="relative p-5 rounded-xl border border-zinc-200 bg-white hover:border-indigo-400 hover:shadow-md transition-all duration-300 flex flex-col justify-between">
                            <div>
                                <div className="flex items-center justify-between mb-3">
                                    <span className="font-mono text-sm font-extrabold text-indigo-600 bg-indigo-50 border border-indigo-200 px-2.5 py-1 rounded-lg">
                                        {p.step}
                                    </span>
                                    <span className="text-xl">{p.icon}</span>
                                </div>
                                <h4 className="font-display text-sm font-bold text-zinc-900">
                                    {p.title}
                                </h4>
                                <p className="mt-2 text-xs text-zinc-600 leading-relaxed">
                                    {p.desc}
                                </p>
                            </div>
                            <div className="mt-4 pt-2 border-t border-zinc-100 flex items-center text-[10px] font-mono text-zinc-400 font-medium">
                                <span>Phase {idx + 1} of 5</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* COMESTRO-STYLE SECTION 5: TESTIMONIALS & ENDORSEMENTS */}
            <section id="testimonials" className="fade-section py-8 md:py-12 border-t border-zinc-200">
                <SectionHeader
                    eyebrow="// 05. ENDORSEMENTS & FEEDBACK"
                    title={
                        <span>
                            Team & Client <span className="text-indigo-600">Endorsements</span>
                        </span>
                    }
                    copy="What teammates, mentors, and project stakeholders say about code execution, database structuring, and turnaround speed."
                />

                <div className="grid gap-5 md:grid-cols-3">
                    {testimonials.map((t, idx) => (
                        <div key={idx} className="p-5 rounded-xl border border-zinc-200 bg-white hover:border-indigo-300 hover:shadow-sm transition-all duration-300 flex flex-col justify-between">
                            <div>
                                <div className="flex items-center gap-1 text-amber-400 mb-3 text-sm">
                                    {[...Array(t.stars)].map((_, i) => (
                                        <span key={i}>★</span>
                                    ))}
                                </div>
                                <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed italic">
                                    "{t.quote}"
                                </p>
                            </div>
                            <div className="mt-5 pt-3 border-t border-zinc-100 flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 font-mono text-xs font-bold flex items-center justify-center">
                                    {t.avatar}
                                </div>
                                <div>
                                    <p className="font-display text-xs font-bold text-zinc-900">{t.author}</p>
                                    <p className="text-[11px] text-zinc-500 font-sans">{t.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ABOUT & EXPERIENCE SECTION */}
            <section id="about" className="fade-section py-8 md:py-12 border-t border-zinc-200">
                <SectionHeader
                    eyebrow="// 06. CAREER & BACKGROUND"
                    title={
                        <span>
                            About <span className="text-indigo-600">The Engineer</span>
                        </span>
                    }
                    copy="Practical software engineering with deep database foundations and a dedication to writing clean, maintainable web applications."
                />

                <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
                    <div className="space-y-4 text-xs sm:text-sm leading-relaxed text-zinc-700 font-sans">
                        <p>
                            My development journey started during my BCA program at Purnea University (2023-2026), where relational database design, data structures, and web development converged into a passion for software craftsmanship.
                        </p>
                        <p>
                            At{' '}
                            <a href="https://comestro.com" target="_blank" rel="noreferrer" className="text-indigo-600 hover:text-indigo-700 transition-colors font-semibold underline decoration-indigo-500/30 decoration-2 underline-offset-4">
                                Comestro Techlabs Pvt Ltd
                            </a>
                            , I focus on engineering multi-tenant SaaS applications, e-commerce bookstore platforms, social networks, and campus systems using Laravel 11, React 19, Inertia.js, Tailwind CSS, and MySQL database engines.
                        </p>
                        <p>
                            I prioritize writing readable code, enforcing schema-level constraints, avoiding N+1 query traps, and delivering responsive, accessible web interfaces that users love.
                        </p>
                    </div>

                    {/* Developer Class Definition Card */}
                    <div className="border border-zinc-800 bg-zinc-950 p-5 shadow-xl rounded-xl font-mono text-xs text-zinc-300">
                        <div className="flex items-center justify-between border-b border-zinc-800 pb-3 mb-3 text-[11px] text-zinc-500">
                            <span>App/Engineer/ManishKumar.php</span>
                            <span className="text-indigo-400 font-bold">PHP 8.3</span>
                        </div>
                        <div className="leading-6">
                            <p><span className="text-pink-400">namespace</span> App\Engineer;</p>
                            <p className="mt-2"><span className="text-blue-400">class</span> <span className="text-yellow-300">ManishKumar</span> &#123;</p>
                            <p className="pl-4"><span className="text-indigo-300">public string</span> <span className="text-zinc-400">$role</span> = <span className="text-emerald-300">'Full-Stack Engineer'</span>;</p>
                            <p className="pl-4"><span className="text-indigo-300">public string</span> <span className="text-zinc-400">$company</span> = <span className="text-emerald-300">'Comestro Techlabs'</span>;</p>
                            <p className="pl-4"><span className="text-indigo-300">public string</span> <span className="text-zinc-400">$location</span> = <span className="text-emerald-300">'Jaipur, India'</span>;</p>
                            <p className="pl-4"><span className="text-indigo-300">public array</span> <span className="text-zinc-400">$stack</span> = [<span className="text-cyan-300">'Laravel 11'</span>, <span className="text-cyan-300">'React 19'</span>, <span className="text-cyan-300">'MySQL'</span>];</p>
                            <p className="pl-4"><span className="text-indigo-300">public bool</span> <span className="text-zinc-400">$available</span> = <span className="text-amber-400">true</span>;</p>
                            <p>&#125;</p>
                        </div>
                    </div>
                </div>

                {/* EXPERIENCE TIMELINE CARD */}
                <div id="experience" className="mt-8 border border-zinc-200 bg-white p-5 md:p-6 shadow-sm rounded-xl hover:border-zinc-300 transition-all duration-300 font-sans">
                    <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between border-b border-zinc-200 pb-4">
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="font-mono text-xs text-indigo-600 font-bold">commit #comestro-2024</span>
                                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">MAIN BRANCH</span>
                            </div>
                            <p className="font-display text-xl font-bold text-zinc-900 mt-1">{activeExperience?.designation || 'Laravel Developer'}</p>
                            <p className="mt-0.5 text-xs sm:text-sm font-semibold text-indigo-600">@ {activeExperience?.company || settings?.current_company}</p>
                        </div>
                        <p className="font-mono text-[11px] font-semibold text-zinc-600 border border-zinc-200 bg-zinc-50 px-2.5 py-0.5 rounded-full">
                            {activeExperience?.duration || 'May 2024 - Present'}
                        </p>
                    </div>
                    <p className="mt-4 text-xs sm:text-sm leading-relaxed text-zinc-600 pr-4">{activeExperience?.description}</p>
                    <div className="mt-6 flex flex-wrap gap-2">
                        {activeExperience?.skills_used?.map((skill) => (
                            <span key={skill} className="border border-indigo-200 bg-indigo-50 text-indigo-600 px-2.5 py-0.5 font-mono text-[10px] font-semibold rounded-full">
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* SKILLS SECTION */}
            <section id="skills" className="fade-section py-8 md:py-12 border-t border-zinc-200">
                <SectionHeader
                    eyebrow="// 07. TECHNICAL STACK & TOOLING"
                    title={
                        <span>
                            Technical <span className="text-indigo-600">Stack</span>
                        </span>
                    }
                    copy="Languages, database engines, backend structures, and frontend frameworks."
                />

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {skillCategories.map((category) => (
                        <div key={category} className="border border-zinc-200 bg-white p-5 shadow-sm rounded-xl hover:border-zinc-300 transition-all duration-300">
                            <div className="flex items-center justify-between border-b border-zinc-200 pb-2 mb-3">
                                <h3 className="font-display text-base font-bold text-zinc-900">
                                    {category}
                                </h3>
                                <span className="font-mono text-[10px] text-zinc-400">config.json</span>
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                                {skills[category].map((skill) => (
                                    <span key={skill.name} className="border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-xs font-semibold text-zinc-700 hover:border-indigo-500/20 hover:text-indigo-600 transition-all duration-200 rounded-lg font-sans">
                                        {skill.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CREDENTIALS SECTION */}
            {certificates?.length > 0 && (
                <section className="fade-section py-8 md:py-12 border-t border-zinc-200">
                    <SectionHeader
                        eyebrow="// 08. CERTIFICATIONS & LEARNING"
                        title={
                            <span>
                                Certifications & <span className="text-indigo-600">Credentials</span>
                            </span>
                        }
                    />
                    <div className="grid gap-4 md:grid-cols-2">
                        {certificates.map((certificate) => (
                            <a
                                key={certificate.id}
                                href={certificate.credential_url}
                                target="_blank"
                                rel="noreferrer"
                                className="border border-zinc-200 bg-white p-5 shadow-sm rounded-xl hover:border-indigo-500/30 transition-all duration-300 block font-sans"
                            >
                                <p className="font-display text-base font-bold text-zinc-900">{certificate.title}</p>
                                <p className="mt-1 text-xs font-semibold text-indigo-600">{certificate.organization}</p>
                                <p className="mt-3 font-mono text-[10px] font-semibold text-zinc-500 border border-zinc-200 bg-zinc-50 px-2.5 py-0.5 rounded inline-block">
                                    {certificate.issue_date}
                                </p>
                            </a>
                        ))}
                    </div>
                </section>
            )}

            {/* CONTACT CTA BANNER */}
            <section id="contact" className="fade-section py-10 md:py-16 border-t border-zinc-200 text-center max-w-2xl mx-auto font-sans relative">
                <div className="section-accent mb-3 mx-auto"></div>
                <span className="inline-block px-3 py-1 font-mono text-[11px] font-semibold tracking-wider text-indigo-600 bg-indigo-50 border border-indigo-200 rounded-full mb-4">
                    // 09. CONNECT & START A PROJECT
                </span>
                <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight text-zinc-900 leading-snug">
                    Let's Build Something <span className="text-indigo-600">Exceptional Together</span>
                </h2>
                <p className="mt-3 text-xs sm:text-sm leading-relaxed text-zinc-600 max-w-xl mx-auto">
                    I am actively open to full-stack software engineering roles, multi-tenant SaaS collaborations, and client projects. Feel free to reach out directly.
                </p>

                <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                    <a
                        href={`mailto:${settings?.email || 'manish966128@gmail.com'}`}
                        className="px-6 py-3 text-xs sm:text-sm font-semibold font-mono rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-600/20 active:scale-95 transition-all duration-200 inline-flex items-center gap-2"
                    >
                        <span>$ sendmail --to={settings?.email || 'manish966128@gmail.com'}</span>
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </a>
                    <a
                        href="https://wa.me/918207593672?text=Hello%20Manish%2C%20I%20visited%20your%20portfolio%20and%20wanted%20to%20connect!"
                        target="_blank"
                        rel="noreferrer"
                        className="px-5 py-3 text-xs sm:text-sm font-semibold rounded-lg text-emerald-800 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 transition-all inline-flex items-center gap-2"
                    >
                        <span>WhatsApp Chat</span>
                        <IconExternal />
                    </a>
                </div>

                <div className="mt-8 p-4 rounded-xl border border-zinc-200 bg-white/70 max-w-md mx-auto text-left flex items-start gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 mt-1.5 shrink-0 animate-pulse"></span>
                    <div className="text-xs text-zinc-600">
                        <strong className="text-zinc-900 font-semibold">Immediate Availability</strong>: Ready for interviews, full-time engineering positions, or contract MVP builds. Usually responds within 2 hours.
                    </div>
                </div>
            </section>
        </AppLayout>
    );
}

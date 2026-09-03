import React, { useEffect } from 'react';
import AppLayout, { IconExternal } from '../../Layouts/AppLayout';
import SEO from '../../Components/SEO';
import { getPersonSchema, getWebsiteSchema } from '../../utils/seoSchemas';

const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
};

const SectionHeader = ({ eyebrow, title, copy }) => (
    <div className="mb-10 grid gap-4 md:grid-cols-[0.65fr_1fr] md:items-end font-sans">
        <div>
            <span className="inline-block px-3 py-1 font-mono text-[11px] font-semibold tracking-wider text-indigo-600 bg-indigo-50 border border-indigo-200 rounded-full">
                {eyebrow}
            </span>
            <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-zinc-900 md:text-3xl leading-snug">
                {title}
            </h2>
        </div>
        {copy && (
            <p className="max-w-2xl text-xs sm:text-sm leading-relaxed text-zinc-600 md:ml-auto border-l border-zinc-200 pl-5">
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
                <div className="relative flex h-16 w-16 items-center justify-center rounded-xl border border-zinc-200 bg-white text-2xl font-display font-bold text-indigo-600 shadow-sm group-hover:scale-105 group-hover:text-cyan-600 transition-all duration-300">
                    {title.substring(0, 2).toUpperCase()}
                </div>
            </>
        )}
    </div>
);

export default function Home({ projects, skills, experiences, certificates, socialLinks, settings, navigate }) {

    const [activeTab, setActiveTab] = React.useState('developer.js');
    const [copied, setCopied] = React.useState(false);
    const [isExecuting, setIsExecuting] = React.useState(false);
    const [terminalOutput, setTerminalOutput] = React.useState(null);

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
            ? `const developer = {\n  name: '${settings?.name || 'Manish Kumar'}',\n  role: 'Full Stack Web Developer',\n  location: 'Jaipur, India',\n  coreSkills: ['Laravel', 'React', 'PHP', 'MySQL', 'Tailwind CSS'],\n  availableForRoles: true\n};`
            : `{\n  "name": "${settings?.name || 'Manish Kumar'}",\n  "stack": {\n    "frontend": ["React", "JavaScript", "Tailwind CSS"],\n    "backend": ["Laravel", "PHP", "REST APIs"],\n    "database": ["MySQL"]\n  }\n}`;
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
    const primarySkills = skills ? Object.values(skills).flat().map((skill) => skill.name).slice(0, 10) : [];
    const activeExperience = experiences?.[0];

    return (
        <AppLayout settings={settings} socialLinks={socialLinks} navigate={navigate}>

            {/* HERO SECTION */}
            <section className="relative pt-20 pb-6 sm:pt-24 sm:pb-8 lg:pt-28 overflow-hidden font-sans">
                <div className="w-full max-w-full grid gap-8 sm:gap-10 lg:grid-cols-[1.1fr_0.9fr] items-center relative z-10 min-w-0">

                    {/* Left Column - Main Intro & CTAs */}
                    <div className="text-center sm:text-left w-full min-w-0 overflow-hidden px-1 sm:px-0">
                        {/* Status & Terminal Badges - Vertically Stacked on Mobile to Prevent Flex Overflow */}
                        <div className="mb-4 flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-2 sm:gap-2.5 w-full min-w-0">
                            <span className="inline-flex items-center justify-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 font-mono text-[10px] sm:text-[11px] font-semibold text-emerald-700 shadow-xs max-w-full">
                                <span className="relative flex h-2 w-2 shrink-0">
                                    <span className="status-pulse-dot absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
                                </span>
                                <span className="truncate">Available for full-stack roles</span>
                            </span>
                            <span className="inline-flex items-center justify-center gap-1 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 font-mono text-[10px] sm:text-[11px] font-semibold text-zinc-700 max-w-full">
                                <span className="text-indigo-600 font-bold">$</span> php artisan serve
                            </span>
                        </div>

                        {/* Main Headline */}
                        <h1 className="max-w-3xl mx-auto sm:mx-0 font-display text-xl sm:text-3xl lg:text-[40px] font-extrabold leading-snug sm:leading-[1.25] tracking-tight text-zinc-900 break-words min-w-0">
                            Full-Stack Software Engineer building scalable{' '}
                            <span className="text-indigo-600 font-extrabold block sm:inline">
                                SaaS Apps & Web Products
                            </span>
                        </h1>

                        {/* Bio Summary */}
                        <p className="mt-3.5 max-w-xl mx-auto sm:mx-0 text-xs sm:text-sm leading-relaxed text-zinc-600 break-words min-w-0">
                            I am <strong className="text-zinc-900 font-semibold">{settings?.name || 'Manish Kumar'}</strong>, a full-stack software engineer based in Jaipur. I specialize in building multi-tenant SaaS platforms (GymMitra), e-commerce marketplaces (KitabiAdda), and reactive single-page user interfaces with solid Laravel backends and MySQL database engines.
                        </p>

                        {/* Core Stack Pills */}
                        <div className="mt-4 sm:mt-5 flex flex-wrap items-center justify-center sm:justify-start gap-1 sm:gap-1.5 font-mono text-[10px] sm:text-[11px] w-full min-w-0">
                            <span className="font-semibold text-zinc-500 mr-1 text-[10px] w-full sm:w-auto text-center sm:text-left">// Core Stack:</span>
                            {['Laravel 11', 'React 19', 'Inertia.js', 'MySQL', 'PHP 8.3', 'Tailwind CSS'].map((tech) => (
                                <span key={tech} className="px-2 py-0.5 rounded-md bg-zinc-100 border border-zinc-200 text-zinc-800 font-semibold shrink-0">
                                    {tech}
                                </span>
                            ))}
                        </div>

                        {/* Action Buttons */}
                        <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row gap-2.5 sm:gap-3 items-center justify-center sm:justify-start w-full max-w-md mx-auto sm:mx-0 min-w-0">
                            <button
                                type="button"
                                onClick={() => scrollToSection('projects')}
                                className="w-full sm:w-auto max-w-xs sm:max-w-none group relative inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm shadow-indigo-600/20 active:scale-95 transition-all duration-200 cursor-pointer"
                            >
                                <span>View Selected Works</span>
                                <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </button>
                            <button
                                type="button"
                                onClick={() => scrollToSection('contact')}
                                className="w-full sm:w-auto max-w-xs sm:max-w-none inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold rounded-lg text-zinc-800 bg-white border border-zinc-300 hover:border-zinc-400 hover:bg-zinc-50 shadow-sm active:scale-95 transition-all duration-200 cursor-pointer font-mono"
                            >
                                <span>$ contact --email</span>
                            </button>
                        </div>

                        {/* Metric Highlights */}
                        <div className="mt-6 sm:mt-8 grid max-w-xl mx-auto sm:mx-0 grid-cols-3 gap-1.5 sm:gap-3 border-t border-zinc-200 pt-4 sm:pt-5 w-full min-w-0">
                            {[
                                { value: '2026', title: 'BCA Graduate', tag: 'Academic' },
                                { value: '5+', title: 'Shipped Builds', tag: 'Repos' },
                                { value: 'Full Stack', title: 'Laravel + React', tag: 'Stack' },
                            ].map((item) => (
                                <div key={item.title} className="p-1.5 sm:p-3 rounded-lg border border-zinc-200 bg-white hover:border-indigo-500/40 shadow-xs transition-all duration-200 text-center sm:text-left overflow-hidden min-w-0">
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-0.5">
                                        <p className="font-display text-xs sm:text-lg font-bold text-zinc-900">{item.value}</p>
                                        <span className="text-[7px] sm:text-[9px] font-mono font-semibold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-1 py-0.5 rounded border border-indigo-100 self-center sm:self-auto hidden xs:inline-block">{item.tag}</span>
                                    </div>
                                    <p className="mt-0.5 text-[9px] sm:text-[11px] font-medium text-zinc-500 truncate">{item.title}</p>
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
                                        <p className="pl-4 sm:pl-6">location<span className="text-zinc-500">:</span> <span className="text-emerald-300">'Jaipur, Rajasthan, India'</span>,</p>
                                        <p className="pl-4 sm:pl-6">featuredApps<span className="text-zinc-500">:</span> [<span className="text-cyan-300">'GymMitra SaaS'</span>, <span className="text-cyan-300">'KitabiAdda'</span>, <span className="text-cyan-300">'LinkUp'</span>],</p>
                                        <p className="pl-4 sm:pl-6">openForRoles<span className="text-zinc-500">:</span> <span className="text-amber-400">true</span></p>
                                        <p>&#125;;</p>
                                        <p className="mt-2 text-zinc-500">// Engineering clean web applications</p>
                                        <p><span className="text-purple-400">export default</span> developer;</p>
                                    </div>
                                ) : (
                                    <div className="leading-6 sm:leading-7 whitespace-pre-wrap break-all sm:break-normal">
                                        <p>&#123;</p>
                                        <p className="pl-4 sm:pl-6"><span className="text-cyan-300">"developer"</span>: <span className="text-emerald-300">"{settings?.name || 'Manish Kumar'}"</span>,</p>
                                        <p className="pl-4 sm:pl-6"><span className="text-cyan-300">"degree"</span>: <span className="text-emerald-300">"BCA (Purnea University)"</span>,</p>
                                        <p className="pl-4 sm:pl-6"><span className="text-cyan-300">"frontend"</span>: [<span className="text-amber-300">"React 19"</span>, <span className="text-amber-300">"Tailwind CSS"</span>, <span className="text-amber-300">"Inertia.js"</span>],</p>
                                        <p className="pl-4 sm:pl-6"><span className="text-cyan-300">"backend"</span>: [<span className="text-amber-300">"Laravel 11"</span>, <span className="text-amber-300">"PHP"</span>, <span className="text-amber-300">"REST APIs"</span>],</p>
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
            <div className="my-5 sm:my-6 p-3.5 sm:p-4 rounded-xl border border-indigo-200 bg-indigo-50/50 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 font-sans shadow-xs text-center sm:text-left">
                <div className="flex flex-col sm:flex-row items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 text-white font-mono text-xs font-bold shadow-sm shrink-0">
                        SaaS
                    </span>
                    <div>
                        <div className="flex items-center justify-center sm:justify-start gap-2">
                            <span className="font-bold text-zinc-900 text-xs sm:text-sm">GymMitra SaaS Platform</span>
                            <span className="px-2 py-0.5 rounded text-[9px] sm:text-[10px] font-mono font-bold bg-emerald-100 text-emerald-700 border border-emerald-200">LIVE</span>
                        </div>
                        <p className="text-[11px] sm:text-xs text-zinc-600 mt-0.5">Multi-tenant Gym Management software with QR attendance, locker allocation & billing.</p>
                    </div>
                </div>
                <a
                    href="https://manish.echovel.com"
                    target="_blank"
                    rel="noreferrer"
                    className="w-full sm:w-auto justify-center px-4 py-2 text-xs font-semibold font-mono rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer shadow-sm active:scale-95"
                >
                    <span>Visit GymMitra</span>
                    <IconExternal />
                </a>
            </div>

            {/* ABOUT SECTION */}
            <section id="about" className="fade-section py-6 md:py-8 border-t border-zinc-200">
                <SectionHeader
                    eyebrow="// 01. ABOUT THE ENGINEER"
                    title="Practical engineering with product sense."
                    copy="I like web apps that feel calm on the surface and solid underneath: clear database relationships, predictable APIs, and interfaces that are pleasant to navigate."
                />

                <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
                    <div className="space-y-4 text-xs sm:text-sm leading-relaxed text-zinc-650 font-sans">
                        <p>
                            My development journey started during my BCA program at Purnea University, where database design, web application development, and systems programming clicked together into one discipline.
                        </p>
                        <p>
                            At{' '}
                            <a href="https://comestro.com" target="_blank" rel="noreferrer" className="text-indigo-600 hover:text-indigo-500 transition-colors font-semibold underline decoration-indigo-500/30 decoration-2 underline-offset-4">
                                Comestro Techlabs Pvt Ltd
                            </a>
                            , I focus on engineering multi-tenant SaaS applications, e-commerce bookstore platforms, social networks, and campus systems using Laravel, React, Inertia, Tailwind CSS, and MySQL database engines, while actively building and learning advanced SaaS software architecture.
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
                            <p className="pl-4"><span className="text-indigo-300">public string</span> <span className="text-zinc-400">$location</span> = <span className="text-emerald-300">'Jaipur, India'</span>;</p>
                            <p className="pl-4"><span className="text-indigo-300">public array</span> <span className="text-zinc-400">$stack</span> = [<span className="text-cyan-300">'Laravel'</span>, <span className="text-cyan-300">'React'</span>, <span className="text-cyan-300">'MySQL'</span>];</p>
                            <p className="pl-4"><span className="text-indigo-300">public bool</span> <span className="text-zinc-400">$available</span> = <span className="text-amber-400">true</span>;</p>
                            <p>&#125;</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* EXPERIENCE SECTION */}
            <section id="experience" className="fade-section py-6 md:py-8 border-t border-zinc-200">
                <SectionHeader
                    eyebrow="// 02. WORK EXPERIENCE & CONTRIBUTIONS"
                    title="Work History"
                    copy="Internship experience building production-level features, database optimizations, and integrating client side frameworks with Laravel backends."
                />

                <div className="border border-zinc-200 bg-white p-5 md:p-6 shadow-sm rounded-xl hover:border-zinc-300 transition-all duration-300 font-sans">
                    <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between border-b border-zinc-200 pb-4">
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="font-mono text-xs text-indigo-600 font-bold">commit #comestro-2024</span>
                                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">MAIN</span>
                            </div>
                            <p className="font-display text-xl font-bold text-zinc-900 mt-1">{activeExperience?.designation || 'Laravel Developer'}</p>
                            <p className="mt-0.5 text-xs sm:text-sm font-semibold text-indigo-600">@ {activeExperience?.company || settings?.current_company}</p>
                        </div>
                        <p className="font-mono text-[11px] font-semibold text-zinc-550 border border-zinc-200 bg-zinc-50 px-2.5 py-0.5 rounded-full">
                            {activeExperience?.duration || 'May 2024 - Present'}
                        </p>
                    </div>
                    <p className="mt-4 text-xs sm:text-sm leading-relaxed text-zinc-650 pr-4">{activeExperience?.description}</p>
                    <div className="mt-6 flex flex-wrap gap-2">
                        {activeExperience?.skills_used?.map((skill) => (
                            <span key={skill} className="border border-indigo-200 bg-indigo-50 text-indigo-600 px-2.5 py-0.5 font-mono text-[10px] font-semibold rounded-full">
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* PROJECTS SECTION */}
            <section id="projects" className="fade-section py-6 md:py-8 border-t border-zinc-200">
                <SectionHeader
                    eyebrow="// 03. FEATURED CODE REPOSITORIES"
                    title="Selected Works"
                    copy="A curated selection of social, marketplace, educational, and utility projects, built primarily with React and Laravel."
                />

                <div className="grid gap-6">
                    {(projects || []).map((project) => (
                        <article key={project.id} className="grid gap-5 border border-zinc-200 bg-white p-4 sm:p-5 shadow-sm rounded-xl hover:border-zinc-350 hover:shadow-md transition-all duration-300 lg:grid-cols-[0.8fr_1.2fr] group">
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

            {/* SKILLS SECTION */}
            <section id="skills" className="fade-section py-6 md:py-8 border-t border-zinc-200">
                <SectionHeader
                    eyebrow="// 04. TECHNICAL STACK & TOOLING"
                    title="Technical Stack"
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
                                    <span key={skill.name} className="border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-xs font-semibold text-zinc-650 hover:border-indigo-500/20 hover:text-indigo-650 transition-all duration-200 rounded-lg font-sans">
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
                <section className="fade-section py-6 md:py-8 border-t border-zinc-200">
                    <SectionHeader eyebrow="// 05. CERTIFICATIONS & LEARNING" title="Certifications" />
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

            {/* CONTACT SECTION */}
            <section id="contact" className="fade-section py-8 md:py-10 border-t border-zinc-200 text-center max-w-xl mx-auto font-sans relative">
                <span className="inline-block px-3 py-1 font-mono text-[11px] font-semibold tracking-wider text-indigo-600 bg-indigo-50 border border-indigo-200 rounded-full mb-4">
                    // 06. CONTACT & CONNECT
                </span>
                <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight text-zinc-900 leading-snug">
                    Let us build something useful.
                </h2>
                <p className="mt-3 text-xs sm:text-sm leading-relaxed text-zinc-600">
                    I am currently open to full stack software engineering roles, SaaS collaborations, and projects. Feel free to reach out and I will reply as soon as possible.
                </p>
                <a href={`mailto:${settings?.email}`} className="btn-hand-primary mt-8 inline-block text-sm px-6 py-3.5 font-bold shadow-lg font-mono">
                    $ sendmail --to={settings?.email}
                </a>
            </section>
        </AppLayout>
    );
}

import React, { useEffect } from 'react';
import AppLayout, { IconExternal } from '../../Layouts/AppLayout';

const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
};

const SectionHeader = ({ eyebrow, title, copy }) => (
    <div className="mb-12 grid gap-6 md:grid-cols-[0.65fr_1fr] md:items-end font-sans">
        <div>
            <span className="inline-block px-3 py-1 font-mono text-xs font-semibold tracking-wider text-indigo-650 bg-indigo-500/10 border border-indigo-500/20 rounded-full">
                {eyebrow}
            </span>
            <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-zinc-900 md:text-4xl leading-tight">
                {title}
            </h2>
        </div>
        {copy && (
            <p className="max-w-2xl text-base leading-relaxed text-zinc-600 md:ml-auto border-l border-zinc-200 pl-6">
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
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
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
        document.title = settings?.meta_title || 'Manish Kumar | Full Stack Developer';

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
    }, [settings?.meta_title]);

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
            <section className="relative min-h-[90vh] flex items-center pt-28 pb-16 lg:pt-32 overflow-hidden">
                <div className="w-full grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center relative z-10">
                    
                    {/* Left Content */}
                    <div>
                        <div className="mb-6 flex flex-wrap items-center gap-3">
                            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 font-mono text-xs font-semibold text-emerald-700 shadow-sm">
                                <span className="relative flex h-2.5 w-2.5">
                                    <span className="status-pulse-dot absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600"></span>
                                </span>
                                Available for full-stack roles
                            </span>
                        </div>

                        <h1 className="max-w-4xl font-display text-4xl font-black leading-[1.1] tracking-tight text-zinc-900 sm:text-5xl lg:text-6xl">
                            Building high-performance web products with{' '}
                            <span className="text-indigo-600 font-extrabold block sm:inline">
                                Laravel & React
                            </span>
                        </h1>

                        <p className="mt-6 max-w-xl font-sans text-base leading-relaxed text-zinc-600">
                            I am <strong className="text-zinc-900 font-semibold">{settings?.name || 'Manish Kumar'}</strong>, a full-stack developer based in Jaipur. I specialize in shipping clean Laravel backends, interactive React interfaces, and robust database solutions that scale cleanly.
                        </p>

                        {/* CTA Buttons */}
                        <div className="mt-8 flex flex-wrap gap-4 items-center">
                            <button
                                type="button"
                                onClick={() => scrollToSection('projects')}
                                className="group relative inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-600/20 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer"
                            >
                                <span>View Projects</span>
                                <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </button>
                            <button
                                type="button"
                                onClick={() => scrollToSection('contact')}
                                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold rounded-xl text-zinc-800 bg-white border border-zinc-300 hover:border-zinc-400 hover:bg-zinc-50 shadow-sm hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer"
                            >
                                <span>Contact Me</span>
                                <svg className="w-4 h-4 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </button>
                        </div>

                        {/* Interactive Metric Cards */}
                        <div className="mt-12 grid max-w-2xl grid-cols-3 gap-4">
                            {[
                                { value: '2026', title: 'BCA Graduate', tag: 'Academic' },
                                { value: '5+', title: 'Projects Built', tag: 'Shipped' },
                                { value: 'Full Stack', title: 'Laravel & React', tag: 'Core Stack' },
                            ].map((item) => (
                                <div key={item.title} className="p-4 rounded-xl border border-zinc-200 bg-white hover:border-indigo-500/40 hover:shadow-md transition-all duration-300 group">
                                    <div className="flex items-center justify-between">
                                        <p className="font-display text-xl font-black text-zinc-900 sm:text-2xl group-hover:text-indigo-600 transition-colors">{item.value}</p>
                                        <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-200">{item.tag}</span>
                                    </div>
                                    <p className="mt-1 text-xs font-semibold text-zinc-500">{item.title}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Interactive IDE Visual Deck */}
                    <div className="relative">
                        <div className="glass-terminal rounded-xl relative overflow-hidden text-zinc-300 font-mono text-xs border border-zinc-800 shadow-2xl">
                            
                            {/* Window Topbar */}
                            <div className="flex items-center justify-between px-4 py-3 bg-zinc-950/70 border-b border-zinc-800/80">
                                <div className="flex items-center gap-2">
                                    <span className="w-3 h-3 rounded-full bg-[#ff5f56] inline-block shadow-inner"></span>
                                    <span className="w-3 h-3 rounded-full bg-[#ffbd2e] inline-block shadow-inner"></span>
                                    <span className="w-3 h-3 rounded-full bg-[#27c93f] inline-block shadow-inner"></span>
                                </div>

                                {/* File Tab Switcher */}
                                <div className="flex items-center bg-zinc-900/80 p-0.5 rounded-lg border border-zinc-800">
                                    <button
                                        type="button"
                                        onClick={() => setActiveTab('developer.js')}
                                        className={`px-3 py-1 text-[11px] font-medium rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${
                                            activeTab === 'developer.js'
                                                ? 'bg-indigo-600 text-white shadow-sm'
                                                : 'text-zinc-400 hover:text-zinc-200'
                                        }`}
                                    >
                                        <span className="text-yellow-400 font-bold">JS</span> developer.js
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setActiveTab('tech-stack.json')}
                                        className={`px-3 py-1 text-[11px] font-medium rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${
                                            activeTab === 'tech-stack.json'
                                                ? 'bg-indigo-600 text-white shadow-sm'
                                                : 'text-zinc-400 hover:text-zinc-200'
                                        }`}
                                    >
                                        <span className="text-cyan-400 font-bold">{}</span> tech-stack.json
                                    </button>
                                </div>

                                {/* Copy snippet button */}
                                <button
                                    type="button"
                                    onClick={handleCopySnippet}
                                    className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded transition-colors"
                                    title="Copy Code"
                                >
                                    {copied ? (
                                        <span className="text-[10px] text-emerald-400 font-sans font-medium">Copied!</span>
                                    ) : (
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                        </svg>
                                    )}
                                </button>
                            </div>

                            {/* Active Environment Pill Bar */}
                            <div className="px-5 py-2.5 bg-zinc-950/40 border-b border-zinc-800/40 flex flex-wrap items-center justify-between text-[11px]">
                                <div className="flex items-center gap-2">
                                    <span className="text-zinc-500 uppercase tracking-wider text-[9px] font-bold">Stack:</span>
                                    <span className="px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20 text-indigo-300">React 19</span>
                                    <span className="px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20 text-cyan-300">Laravel 11</span>
                                    <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">MySQL</span>
                                </div>
                                <button
                                    type="button"
                                    onClick={handleRunCode}
                                    disabled={isExecuting}
                                    className="px-2.5 py-1 rounded bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/25 transition-all text-[10px] font-medium flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                                >
                                    {isExecuting ? (
                                        <>
                                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block"></span>
                                            <span>Building...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>Run Code</span>
                                            <span className="text-xs">▶</span>
                                        </>
                                    )}
                                </button>
                            </div>

                            {/* Code Area */}
                            <div className="p-6 overflow-x-auto min-h-[220px]">
                                {activeTab === 'developer.js' ? (
                                    <div className="leading-7">
                                        <p><span className="text-pink-400">const</span> <span className="text-blue-300">developer</span> <span className="text-zinc-500">=</span> &#123;</p>
                                        <p className="pl-6">name<span className="text-zinc-500">:</span> <span className="text-emerald-300">'{settings?.name || 'Manish Kumar'}'</span>,</p>
                                        <p className="pl-6">role<span className="text-zinc-500">:</span> <span className="text-emerald-300">'Full Stack Developer'</span>,</p>
                                        <p className="pl-6">location<span className="text-zinc-500">:</span> <span className="text-emerald-300">'Jaipur, India'</span>,</p>
                                        <p className="pl-6">coreSkills<span className="text-zinc-500">:</span> [<span className="text-cyan-300">'Laravel'</span>, <span className="text-cyan-300">'React'</span>, <span className="text-cyan-300">'PHP'</span>, <span className="text-cyan-300">'MySQL'</span>],</p>
                                        <p className="pl-6">openForRoles<span className="text-zinc-500">:</span> <span className="text-amber-400">true</span></p>
                                        <p>&#125;;</p>
                                        <p className="mt-3 text-zinc-500">// Engineering clean web applications</p>
                                        <p><span className="text-purple-400">export default</span> developer;</p>
                                    </div>
                                ) : (
                                    <div className="leading-7">
                                        <p>&#123;</p>
                                        <p className="pl-6"><span className="text-cyan-300">"developer"</span>: <span className="text-emerald-300">"{settings?.name || 'Manish Kumar'}"</span>,</p>
                                        <p className="pl-6"><span className="text-cyan-300">"degree"</span>: <span className="text-emerald-300">"BCA (Purnea University)"</span>,</p>
                                        <p className="pl-6"><span className="text-cyan-300">"frontend"</span>: [<span className="text-amber-300">"React 19"</span>, <span className="text-amber-300">"Tailwind CSS"</span>, <span className="text-amber-300">"JavaScript"</span>],</p>
                                        <p className="pl-6"><span className="text-cyan-300">"backend"</span>: [<span className="text-amber-300">"Laravel 11"</span>, <span className="text-amber-300">"PHP"</span>, <span className="text-amber-300">"REST APIs"</span>],</p>
                                        <p className="pl-6"><span className="text-cyan-300">"database"</span>: [<span className="text-amber-300">"MySQL"</span>, <span className="text-amber-300">"Eloquent ORM"</span>]</p>
                                        <p>&#125;</p>
                                    </div>
                                )}
                            </div>

                            {/* Live Output Console Drawer */}
                            {terminalOutput && (
                                <div className="border-t border-zinc-800 bg-zinc-950/90 p-4 font-mono text-[11px] space-y-1 animate-fadeIn">
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

            {/* ABOUT SECTION */}
            <section id="about" className="fade-section py-20 border-t border-zinc-200">
                <SectionHeader
                    eyebrow="About"
                    title="Practical engineering with product sense."
                    copy="I like web apps that feel calm on the surface and solid underneath: clear database relationships, predictable APIs, and interfaces that are pleasant to navigate."
                />

                <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
                    <div className="space-y-6 text-base leading-relaxed text-zinc-650 font-sans">
                        <p>
                            My development journey started during my BCA program at Purnea University, where database design, web application development, and systems programming clicked together into one discipline.
                        </p>
                        <p>
                            At{' '}
                            <a href="https://comestro.com" target="_blank" rel="noreferrer" className="text-indigo-600 hover:text-indigo-500 transition-colors font-semibold underline decoration-indigo-500/30 decoration-2 underline-offset-4">
                                Comestro Techlabs Pvt Ltd
                            </a>
                            , I focus on engineering e-commerce bookstore platforms, social networks, and campus systems using Laravel, React, Inertia, Tailwind CSS, and MySQL database engines.
                        </p>
                    </div>

                    <div className="border border-zinc-200 bg-white p-6 shadow-sm rounded-xl hover:border-zinc-300 transition-all duration-300">
                        <p className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-500 border-b border-zinc-200 pb-3">Core Stack Focus</p>
                        <div className="mt-6 flex flex-wrap gap-2">
                            {(primarySkills.length ? primarySkills : ['Laravel', 'React', 'PHP', 'MySQL', 'Tailwind CSS', 'Git']).map((tech) => (
                                <span key={tech} className="border border-zinc-200 bg-zinc-50 rounded-lg px-3 py-1.5 text-xs font-semibold text-zinc-650 hover:border-indigo-500/30 hover:text-indigo-650 hover:bg-indigo-50/50 transition-all duration-200">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* EXPERIENCE SECTION */}
            <section id="experience" className="fade-section py-20 border-t border-zinc-200">
                <SectionHeader
                    eyebrow="Experience"
                    title="Work History"
                    copy="Internship experience building production-level features, database optimizations, and integrating client side frameworks with Laravel backends."
                />

                <div className="border border-zinc-200 bg-white p-6 md:p-8 shadow-md rounded-xl hover:border-zinc-300 transition-all duration-300 font-sans">
                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between border-b border-zinc-200 pb-6">
                        <div>
                            <p className="font-display text-2xl font-bold text-zinc-900">{activeExperience?.designation || 'Laravel Developer'}</p>
                            <p className="mt-1 text-sm font-semibold text-indigo-600">@ {activeExperience?.company || settings?.current_company}</p>
                        </div>
                        <p className="font-mono text-xs font-semibold text-zinc-550 border border-zinc-200 bg-zinc-50 px-3 py-1 rounded-full">
                            {activeExperience?.duration || 'May 2024 - Present'}
                        </p>
                    </div>
                    <p className="mt-6 text-sm leading-relaxed text-zinc-650 pr-4">{activeExperience?.description}</p>
                    <div className="mt-8 flex flex-wrap gap-2">
                        {activeExperience?.skills_used?.map((skill) => (
                            <span key={skill} className="border border-indigo-200 bg-indigo-50 text-indigo-600 px-3 py-1 font-mono text-[10px] font-semibold rounded-full">
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* PROJECTS SECTION */}
            <section id="projects" className="fade-section py-20 border-t border-zinc-200">
                <SectionHeader
                    eyebrow="Projects"
                    title="Selected Works"
                    copy="A curated selection of social, marketplace, educational, and utility projects, built primarily with React and Laravel."
                />

                <div className="grid gap-8">
                    {(projects || []).map((project) => (
                        <article key={project.id} className="grid gap-6 border border-zinc-200 bg-white p-5 md:p-6 shadow-md rounded-xl hover:border-zinc-350 hover:shadow-xl transition-all duration-300 lg:grid-cols-[0.8fr_1.2fr] group">
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
                                    {project.is_featured ? (
                                        <span className="inline-block border border-indigo-200 bg-indigo-50 text-indigo-600 px-2.5 py-0.5 text-[10px] font-semibold font-mono rounded-full">
                                            FEATURED BUILD 🚀
                                        </span>
                                    ) : (
                                        <span className="inline-block border border-cyan-200 bg-cyan-50 text-cyan-700 px-2.5 py-0.5 text-[10px] font-semibold font-mono rounded-full">
                                            PROJECT BUILD 🚀
                                        </span>
                                    )}
                                    <h3 className="mt-3 font-display text-2xl font-bold text-zinc-900">
                                        <a
                                            href={`/project/${project.slug}`}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                navigate(`/project/${project.slug}`);
                                            }}
                                            className="transition hover:text-cyan-700"
                                        >
                                            {project.title}
                                        </a>
                                    </h3>
                                    <p className="mt-4 text-sm leading-relaxed text-zinc-600 pr-4">{project.description}</p>
                                </div>

                                <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between border-t border-zinc-200 pt-6">
                                    <div className="flex flex-wrap gap-1.5">
                                        {project.technologies?.map((tech) => (
                                            <span key={tech} className="font-mono text-[10px] font-medium text-zinc-550 border border-zinc-200 bg-zinc-50 px-2.5 py-0.5 rounded">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="flex items-center gap-3 text-zinc-500">
                                        {project.live_url && (
                                            <a
                                                href={project.live_url}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="flex items-center justify-center gap-1 px-2.5 h-8 border border-indigo-200 bg-indigo-50 text-indigo-600 font-mono text-[11px] font-semibold rounded-lg shadow-sm hover:bg-indigo-600 hover:text-white transition-all duration-200"
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
                                                className="flex items-center justify-center w-8 h-8 border border-zinc-200 bg-white rounded-lg shadow-sm hover:bg-zinc-50 hover:text-zinc-900 transition-all duration-200"
                                                aria-label={`${project.title} GitHub`}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
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
                                            className="flex items-center justify-center w-8 h-8 border border-zinc-200 bg-white rounded-lg shadow-sm hover:bg-zinc-50 hover:text-zinc-900 transition-all duration-200"
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
            <section id="skills" className="fade-section py-20 border-t border-zinc-200">
                <SectionHeader
                    eyebrow="Skills"
                    title="Technical Stack"
                    copy="Languages, database engines, backend structures, and frontend frameworks."
                />

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {skillCategories.map((category) => (
                        <div key={category} className="border border-zinc-200 bg-white p-6 shadow-md rounded-xl hover:border-zinc-300 hover:bg-zinc-50/20 transition-all duration-300">
                            <h3 className="font-display text-lg font-bold text-zinc-900 mb-4 border-b border-zinc-200 pb-3">
                                {category}
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {skills[category].map((skill) => (
                                    <span key={skill.name} className="border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-xs font-semibold text-zinc-650 hover:border-indigo-500/20 hover:text-indigo-650 transition-all duration-200 rounded-lg font-sans">
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
                <section className="fade-section py-20 border-t border-zinc-200">
                    <SectionHeader eyebrow="Credentials" title="Certifications" />
                    <div className="grid gap-6 md:grid-cols-2">
                        {certificates.map((certificate) => (
                            <a
                                key={certificate.id}
                                href={certificate.credential_url}
                                target="_blank"
                                rel="noreferrer"
                                className="border border-zinc-200 bg-white p-6 shadow-md rounded-xl hover:border-indigo-500/30 hover:bg-indigo-50/20 transition-all duration-300 block font-sans"
                            >
                                <p className="font-display text-lg font-bold text-zinc-900">{certificate.title}</p>
                                <p className="mt-2 text-xs font-semibold text-indigo-650">{certificate.organization}</p>
                                <p className="mt-4 font-mono text-[10px] font-semibold text-zinc-500 border border-zinc-200 bg-zinc-50 px-2.5 py-1 rounded inline-block">
                                    {certificate.issue_date}
                                </p>
                            </a>
                        ))}
                    </div>
                </section>
            )}

            {/* CONTACT SECTION */}
            <section id="contact" className="fade-section py-20 border-t border-zinc-200 text-center max-w-xl mx-auto font-sans relative">
                <div className="absolute inset-0 bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none -z-10"></div>
                <span className="inline-block px-3 py-1 font-mono text-xs font-semibold tracking-wider text-indigo-650 bg-indigo-500/10 border border-indigo-500/20 rounded-full mb-6">
                    Contact
                </span>
                <h2 className="font-display text-3xl font-black tracking-tight text-zinc-900 md:text-4xl leading-tight">
                    Let us build something useful.
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-zinc-650">
                    I am currently open to full stack roles, collaborations, and projects. Feel free to reach out and I will reply as soon as possible.
                </p>
                <a href={`mailto:${settings?.email}`} className="btn-hand-primary mt-8 inline-block text-sm px-6 py-3.5 font-bold shadow-lg">
                    Email me: {settings?.email}
                </a>
            </section>
        </AppLayout>
    );
}

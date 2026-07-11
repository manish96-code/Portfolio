import React, { useEffect, useMemo, useState } from 'react';
import AppLayout, { IconExternal, IconFolder, IconGitHub } from '../../Layouts/AppLayout';

const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
};

const SectionHeader = ({ eyebrow, title, copy }) => (
    <div className="mb-12 grid gap-6 md:grid-cols-[0.65fr_1fr] md:items-end font-sans">
        <div>
            <span className="inline-flex items-center gap-1.5 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[11px] font-bold uppercase tracking-[0.2em] px-3.5 py-1.5 rounded-full font-mono">
                <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse-glow" /> {eyebrow}
            </span>
            <h2 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-white md:text-5xl leading-tight">
                {title}
            </h2>
        </div>
        {copy && (
            <p className="max-w-2xl text-[16px] leading-relaxed text-slate-400 md:ml-auto border-l-2 border-slate-800 pl-6">
                {copy}
            </p>
        )}
    </div>
);

const ProjectMonogram = ({ title }) => (
    <div className="project-visual relative flex aspect-[16/10] items-center justify-center overflow-hidden rounded-xl border border-white/5 bg-slate-900/60 transition-all duration-300 group-hover:border-cyan-500/40">
        <div className="absolute inset-0 grid grid-cols-6 grid-rows-4 opacity-10">
            {Array.from({ length: 24 }).map((_, idx) => (
                <span key={idx} className="border-b border-r border-slate-500/30" />
            ))}
        </div>
        <div className="relative flex h-16 w-16 items-center justify-center rounded-xl border border-white/10 bg-slate-950 text-2xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 shadow-[0_4px_15px_rgba(0,0,0,0.5)] group-hover:scale-115 transition-all duration-300">
            {title.substring(0, 2)}
        </div>
    </div>
);

export default function Home({ projects, skills, experiences, certificates, socialLinks, settings, navigate }) {
    const [nameVal, setNameVal] = useState('');
    const [emailVal, setEmailVal] = useState('');
    const [messageVal, setMessageVal] = useState('');
    const [processing, setProcessing] = useState(false);
    const [wasSuccessful, setWasSuccessful] = useState(false);

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
            { threshold: 0.08 }
        );

        document.querySelectorAll('.fade-section').forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, [settings?.meta_title]);

    const handleContactSubmit = (e) => {
        e.preventDefault();
        setProcessing(true);
        setTimeout(() => {
            setProcessing(false);
            setWasSuccessful(true);
            setNameVal('');
            setEmailVal('');
            setMessageVal('');
            setTimeout(() => setWasSuccessful(false), 5000);
        }, 1000);
    };

    const featuredProjects = useMemo(() => (projects || []).filter((project) => project.is_featured), [projects]);
    const otherProjects = useMemo(() => (projects || []).filter((project) => !project.is_featured), [projects]);
    const skillCategories = skills ? Object.keys(skills) : [];
    const primarySkills = skills ? Object.values(skills).flat().map((skill) => skill.name).slice(0, 10) : [];
    const activeExperience = experiences?.[0];

    return (
        <AppLayout settings={settings} socialLinks={socialLinks} navigate={navigate}>
            
            {/* HERO SECTION */}
            <section className="relative grid min-h-[92vh] items-center gap-12 pt-28 pb-16 lg:grid-cols-[1.1fr_0.9fr] lg:pt-32">
                
                {/* Visual mesh light decoration */}
                <div className="absolute top-20 right-0 w-72 h-72 bg-cyan-500/10 rounded-full filter blur-[100px] pointer-events-none -z-10"></div>
                <div className="absolute bottom-20 left-0 w-80 h-80 bg-purple-600/10 rounded-full filter blur-[120px] pointer-events-none -z-10"></div>

                <div className="relative">
                    <div className="mb-7 flex flex-wrap items-center gap-3">
                        <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 relative">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        </span>
                        <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-cyan-400">
                            Available for full-stack developer roles
                        </p>
                    </div>

                    <h1 className="max-w-4xl font-display text-5xl font-black leading-[1.1] tracking-tight text-white sm:text-6xl lg:text-7xl">
                        Building high-performance <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">Laravel & React</span> web applications
                    </h1>

                    <p className="mt-8 max-w-2xl font-sans text-lg md:text-xl leading-relaxed text-slate-400">
                        I am {settings?.name || 'Manish Kumar'}, a full-stack engineer in Jaipur focused on clean Laravel backends, interactive React interfaces, and robust database architectures.
                    </p>

                    <div className="mt-10 flex flex-wrap gap-4 items-center relative z-20">
                        <button
                            type="button"
                            onClick={() => scrollToSection('projects')}
                            className="btn-hand-primary px-8 py-3.5 text-base font-bold"
                        >
                            View projects ➜
                        </button>
                        <button
                            type="button"
                            onClick={() => scrollToSection('contact')}
                            className="btn-hand-secondary px-8 py-3.5 text-base font-bold"
                        >
                            Contact me
                        </button>
                    </div>

                    {/* Stats Layout - Bento Statistics Grid */}
                    <div className="mt-16 grid max-w-2xl grid-cols-3 border-y border-white/5">
                        {[
                            ['2024', 'BCA graduate'],
                            ['5+', 'Core Projects'],
                            ['Full Stack', 'Laravel & React'],
                        ].map(([value, label], idx) => (
                            <div key={label} className="border-r border-white/5 py-6 pr-4 last:border-r-0 last:pl-6 sm:px-6 sm:first:pl-0 font-sans">
                                <p className="font-display text-2xl md:text-3xl font-extrabold text-white text-transparent bg-clip-text bg-gradient-to-r from-slate-100 to-slate-300">{value}</p>
                                <p className="mt-1 text-xs font-bold text-slate-500 uppercase tracking-wider">{label}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Hero Visual Panel - Futuristic Stack Bento */}
                <div className="relative">
                    <div className="absolute -inset-1.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 opacity-20 blur-xl"></div>
                    
                    <div className="relative developer-panel border border-white/10 bg-slate-900/60 p-6 shadow-2xl rounded-2xl backdrop-blur-md">
                        <div className="flex items-center justify-between border-b border-white/5 pb-5">
                            <div>
                                <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Current stack</p>
                                <p className="mt-1 font-display text-2xl font-bold text-white">Product build room</p>
                            </div>
                            <span className="flex items-center gap-1.5 border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 px-3.5 py-1 font-mono text-xs font-bold rounded-full shadow-[0_0_12px_rgba(6,182,212,0.2)]">
                                <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse-glow" /> active
                            </span>
                        </div>

                        <div className="grid gap-4 py-6 sm:grid-cols-2">
                            {['Laravel APIs', 'React SPA', 'MySQL schemas', 'Inertia routers'].map((item, idx) => (
                                <div key={item} className="rounded-xl border border-white/5 bg-slate-950/60 p-4 transition-all duration-300 hover:border-cyan-500/30 hover:bg-slate-950/90">
                                    <p className="font-mono text-xs font-bold text-cyan-400">0{idx + 1}.</p>
                                    <p className="mt-2 text-base font-semibold text-slate-300 font-sans">{item}</p>
                                </div>
                            ))}
                        </div>

                        {/* Faux Code Terminal */}
                        <div className="rounded-xl border border-white/5 bg-slate-950 p-5 font-mono text-xs leading-6 text-slate-300 shadow-inner">
                            <p><span className="text-cyan-400">const</span> developer = &#123;</p>
                            <p className="pl-4">name: <span className="text-purple-400">'Manish Kumar'</span>,</p>
                            <p className="pl-4">focus: <span className="text-purple-400">'building performant web apps'</span>,</p>
                            <p className="pl-4">stack: [<span className="text-cyan-400">'Laravel'</span>, <span className="text-cyan-400">'React'</span>]</p>
                            <p>&#125;;</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ABOUT SECTION */}
            <section id="about" className="fade-section py-20 border-t border-white/5">
                <SectionHeader
                    eyebrow="About"
                    title="Practical engineering with a product-first mindset."
                    copy="I like building applications that are fast on the surface and organized underneath: clean databases, clean code architecture, and optimized queries that perform at scale."
                />

                <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
                    <div className="space-y-6 text-lg leading-relaxed text-slate-400 font-sans">
                        <p>
                            My development journey started during my BCA program at Purnea University, where logic, clean code design, and user interfaces clicked into a single, cohesive discipline.
                        </p>
                        <p>
                            At{' '}
                            <a href="https://comestro.com" target="_blank" rel="noreferrer" className="link-underline-wavy font-bold text-cyan-400">
                                Comestro Techlabs Pvt Ltd
                            </a>
                            , I write backends for marketplaces, colleges, and social networks using Laravel, React, Inertia, and relational database query tuning.
                        </p>
                    </div>

                    <div className="border border-white/10 bg-slate-900/50 p-8 shadow-2xl rounded-2xl relative">
                        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent"></div>
                        <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-slate-500 border-b border-white/5 pb-2">Core tools</p>
                        <div className="mt-6 flex flex-wrap gap-2.5">
                            {(primarySkills.length ? primarySkills : ['Laravel', 'React', 'PHP', 'MySQL', 'Tailwind CSS', 'Git']).map((tech) => (
                                <span key={tech} className="border border-white/5 bg-slate-950/60 rounded-lg px-3.5 py-1.5 text-sm font-bold text-slate-300 shadow-md hover:border-cyan-500/30 hover:text-cyan-400 transition-all duration-300">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* EXPERIENCE SECTION */}
            <section id="experience" className="fade-section py-20 border-t border-white/5">
                <SectionHeader
                    eyebrow="Experience"
                    title="Professional journey"
                    copy="Hands-on internship experiences building web apps, managing enterprise directories, and linking React hooks to PHP backends."
                />

                <div className="border border-white/10 bg-slate-900/50 p-6 md:p-8 shadow-2xl rounded-2xl relative transition-all duration-300 hover:border-purple-500/40 font-sans">
                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/40 to-transparent"></div>
                    
                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between border-b border-white/5 pb-6">
                        <div>
                            <p className="font-display text-3xl font-extrabold text-white">{activeExperience?.designation || 'Laravel Developer'}</p>
                            <p className="mt-2 text-base font-bold text-cyan-400">@ {activeExperience?.company || settings?.current_company}</p>
                        </div>
                        <p className="font-mono text-sm font-bold text-purple-400 border border-purple-500/30 bg-purple-500/10 px-4.5 py-1.5 rounded-full inline-block">
                            {activeExperience?.duration || 'May 2024 - Present'}
                        </p>
                    </div>
                    <p className="mt-6 text-base leading-relaxed text-slate-300 pr-4">{activeExperience?.description}</p>
                    <div className="mt-8 flex flex-wrap gap-2.5">
                        {activeExperience?.skills_used?.map((skill) => (
                            <span key={skill} className="border border-white/10 bg-slate-950/60 text-slate-300 px-3.5 py-1.5 font-mono text-xs font-bold rounded-md hover:border-cyan-500/30 hover:text-cyan-400 transition-all duration-300">
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* PROJECTS SECTION */}
            <section id="projects" className="fade-section py-20 border-t border-white/5">
                <SectionHeader
                    eyebrow="Projects"
                    title="Selected builds"
                    copy="A curated mix of social networks, multi-vendor marketplaces, and administration portals."
                />

                {/* Featured Projects list */}
                <div className="grid gap-8">
                    {featuredProjects.map((project) => (
                        <article key={project.id} className="grid gap-6 border border-white/10 bg-slate-900/40 p-5 md:p-6 shadow-2xl rounded-2xl hover:border-cyan-500/30 hover:bg-slate-900/60 hover:-translate-y-1 transition-all duration-300 lg:grid-cols-[0.85fr_1.15fr]">
                            <a
                                href={`/project/${project.slug}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    navigate(`/project/${project.slug}`);
                                }}
                                className="block group"
                            >
                                <ProjectMonogram title={project.title} />
                            </a>

                            <div className="flex flex-col justify-between font-sans">
                                <div>
                                    <span className="inline-flex items-center gap-1.5 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 px-3.5 py-1 text-xs font-bold font-mono rounded-full">
                                        FEATURED BUILD 🚀
                                    </span>
                                    <h3 className="mt-3 font-display text-3xl font-extrabold text-white">
                                        <a
                                            href={`/project/${project.slug}`}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                navigate(`/project/${project.slug}`);
                                            }}
                                            className="transition hover:text-cyan-400"
                                        >
                                            {project.title}
                                        </a>
                                    </h3>
                                    <p className="mt-4 text-base leading-relaxed text-slate-400 pr-4">{project.description}</p>
                                </div>

                                <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between border-t border-white/5 pt-6">
                                    <div className="flex flex-wrap gap-2.5">
                                        {project.technologies?.map((tech) => (
                                            <span key={tech} className="font-mono text-xs font-semibold text-slate-400 border border-white/5 bg-slate-950/60 px-2.5 py-1 rounded">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="flex items-center gap-3">
                                        {project.github_url && (
                                            <a 
                                                href={project.github_url} 
                                                target="_blank" 
                                                rel="noreferrer" 
                                                className="flex items-center justify-center w-9 h-9 border border-white/10 bg-slate-950/60 text-slate-300 rounded-full hover:bg-cyan-500 hover:text-slate-950 transition-all duration-300" 
                                                aria-label={`${project.title} GitHub`}
                                            >
                                                <IconGitHub />
                                            </a>
                                        )}
                                        <a
                                            href={`/project/${project.slug}`}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                navigate(`/project/${project.slug}`);
                                            }}
                                            className="flex items-center justify-center w-9 h-9 border border-white/10 bg-slate-950/60 text-slate-300 rounded-full hover:bg-cyan-500 hover:text-slate-950 transition-all duration-300"
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

                {/* Bento layout for other projects */}
                {otherProjects.length > 0 && (
                    <div className="mt-10 grid gap-6 sm:grid-cols-2">
                        {otherProjects.map((project) => (
                            <article key={project.id} className="border border-white/10 bg-slate-900/40 p-6 shadow-2xl rounded-2xl hover:border-cyan-500/30 hover:bg-slate-900/60 hover:-translate-y-1 transition-all duration-300">
                                <div className="mb-5 flex items-center justify-between">
                                    <span className="text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 p-2.5 rounded-lg inline-block">
                                        <IconFolder />
                                    </span>
                                    <a
                                        href={`/project/${project.slug}`}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            navigate(`/project/${project.slug}`);
                                        }}
                                        className="flex items-center justify-center w-8 h-8 border border-white/10 bg-slate-950/60 text-slate-300 rounded-full hover:bg-cyan-500 hover:text-slate-950 transition-all duration-300"
                                        aria-label={`${project.title} details`}
                                    >
                                        <IconExternal />
                                    </a>
                                </div>
                                <h3 className="font-display text-2xl font-bold text-white">{project.title}</h3>
                                <p className="mt-3 text-base leading-relaxed text-slate-400 font-sans">{project.description}</p>
                                <div className="mt-5 flex flex-wrap gap-2 pt-4 border-t border-white/5">
                                    {project.technologies?.slice(0, 4).map((tech) => (
                                        <span key={tech} className="font-mono text-xs font-semibold text-slate-400 border border-white/5 bg-slate-950/60 px-2.5 py-1 rounded">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </section>

            {/* SKILLS SECTION */}
            <section id="skills" className="fade-section py-20 border-t border-white/5">
                <SectionHeader
                    eyebrow="Skills"
                    title="Expertise matrix"
                    copy="Frontend frameworks, database systems, APIs, and project workflows."
                />

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {skillCategories.map((category) => (
                        <div key={category} className="border border-white/10 bg-slate-900/40 p-6 shadow-2xl rounded-2xl hover:border-cyan-500/30 hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300">
                            <h3 className="font-display text-2xl font-bold text-white mb-4 border-b border-white/5 pb-2 flex items-center gap-2">
                                <span className="w-2.5 h-2.5 bg-cyan-500 rounded-full animate-pulse-glow" /> {category}
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {skills[category].map((skill) => (
                                    <span key={skill.name} className="border border-white/5 bg-slate-950/60 px-3.5 py-1.5 text-sm font-bold text-slate-300 rounded-lg hover:border-cyan-500/30 hover:text-cyan-400 transition-all duration-300 font-sans">
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
                <section className="fade-section py-20 border-t border-white/5">
                    <SectionHeader eyebrow="Credentials" title="Certifications" />
                    <div className="grid gap-6 md:grid-cols-2">
                        {certificates.map((certificate) => (
                            <a
                                key={certificate.id}
                                href={certificate.credential_url}
                                target="_blank"
                                rel="noreferrer"
                                className="border border-white/10 bg-slate-900/40 p-6 shadow-2xl rounded-2xl hover:border-cyan-500/30 hover:bg-slate-900/60 hover:-translate-y-1 transition-all duration-300 block font-sans"
                            >
                                <p className="font-display text-2xl font-extrabold text-white">{certificate.title}</p>
                                <p className="mt-3 text-base font-bold text-cyan-400">🎗️ {certificate.organization}</p>
                                <p className="mt-3.5 font-mono text-xs font-bold text-slate-400 border border-white/15 bg-slate-950/60 px-3.5 py-1.5 rounded inline-block">
                                    {certificate.issue_date}
                                </p>
                            </a>
                        ))}
                    </div>
                </section>
            )}

            {/* CONTACT SECTION */}
            <section id="contact" className="fade-section py-20 border-t border-white/5">
                <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
                    <div className="font-sans">
                        <span className="inline-flex items-center gap-1.5 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[11px] font-bold uppercase tracking-[0.2em] px-3.5 py-1.5 rounded-full font-mono mb-4">
                            📬 Contact
                        </span>
                        <h2 className="font-display text-4xl font-extrabold tracking-tight text-white md:text-5xl leading-tight">
                            Start a project discussion.
                        </h2>
                        <p className="mt-6 text-lg leading-relaxed text-slate-400 pr-4">
                            I am open to developer roles, client projects, backend integration assignments, or database consultations.
                        </p>
                        <a href={`mailto:${settings?.email}`} className="link-underline-wavy mt-6 inline-block text-lg font-bold text-cyan-400">
                            {settings?.email}
                        </a>
                    </div>

                    <form onSubmit={handleContactSubmit} className="border border-white/10 bg-slate-900/40 p-6 md:p-8 shadow-2xl rounded-2xl relative transition-all duration-300 hover:border-cyan-500/20 font-sans">
                        {wasSuccessful && (
                            <div className="mb-6 border border-cyan-500/20 bg-cyan-500/10 p-4 text-base font-bold text-cyan-400 rounded-xl">
                                📬 Message sent successfully! I will get back to you soon.
                            </div>
                        )}

                        <div className="grid gap-5 sm:grid-cols-2">
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-slate-300" htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    value={nameVal}
                                    onChange={(e) => setNameVal(e.target.value)}
                                    className="w-full border border-white/10 bg-slate-950/50 px-4 py-3 text-base text-white rounded-xl outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/20 font-sans placeholder:text-slate-600 transition-all duration-300"
                                    placeholder="Your name"
                                    required
                                />
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-slate-300" htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={emailVal}
                                    onChange={(e) => setEmailVal(e.target.value)}
                                    className="w-full border border-white/10 bg-slate-950/50 px-4 py-3 text-base text-white rounded-xl outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/20 font-sans placeholder:text-slate-600 transition-all duration-300"
                                    placeholder="your@email.com"
                                    required
                                />
                            </div>
                        </div>

                        <div className="mt-5">
                            <label className="mb-2 block text-sm font-semibold text-slate-300" htmlFor="message">Message</label>
                            <textarea
                                id="message"
                                rows="5"
                                value={messageVal}
                                onChange={(e) => setMessageVal(e.target.value)}
                                className="w-full resize-none border border-white/10 bg-slate-950/50 px-4 py-3 text-base text-white rounded-xl outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/20 font-sans placeholder:text-slate-600 transition-all duration-300"
                                placeholder="Describe the role or project scope"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="btn-hand-primary mt-6 inline-flex w-full items-center justify-center px-8 py-3.5 text-base font-bold disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                        >
                            {processing ? 'Sending...' : 'Send message'}
                        </button>
                    </form>
                </div>
            </section>
        </AppLayout>
    );
}

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

    const skillCategories = skills ? Object.keys(skills) : [];
    const primarySkills = skills ? Object.values(skills).flat().map((skill) => skill.name).slice(0, 10) : [];
    const activeExperience = experiences?.[0];

    return (
        <AppLayout settings={settings} socialLinks={socialLinks} navigate={navigate}>

            {/* HERO SECTION */}
            <section className="relative grid min-h-[90vh] items-center gap-12 pt-28 pb-16 lg:grid-cols-[1.1fr_0.9fr] lg:pt-32">
                
                {/* Left Content */}
                <div className="relative z-10">
                    <div className="mb-6 flex flex-wrap items-center gap-3">
                        <span className="relative flex h-3 w-3">
                            <span className="status-pulse-dot absolute inline-flex h-full w-full rounded-full bg-emerald-550 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-600"></span>
                        </span>
                        <p className="font-mono text-xs font-semibold uppercase tracking-wider text-emerald-700 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
                            Available for full-stack roles
                        </p>
                    </div>

                    <h1 className="max-w-4xl font-display text-4xl font-black leading-[1.1] tracking-tight text-zinc-900 sm:text-5xl lg:text-6xl">
                        Building useful web products with{' '}
                        <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
                            Laravel & React
                        </span>
                    </h1>

                    <p className="mt-6 max-w-xl font-sans text-base leading-relaxed text-zinc-650">
                        I am {settings?.name || 'Manish Kumar'}, a full-stack developer based in Jaipur. I specialize in shipping clean Laravel backends, interactive React interfaces, and database-driven solutions that are easy to maintain and scale.
                    </p>

                    <div className="mt-8 flex flex-wrap gap-4 items-center">
                        <button
                            type="button"
                            onClick={() => scrollToSection('projects')}
                            className="btn-hand-primary px-6 py-3 text-sm font-semibold rounded-lg"
                        >
                            View Projects
                        </button>
                        <button
                            type="button"
                            onClick={() => scrollToSection('contact')}
                            className="btn-hand-secondary px-6 py-3 text-sm font-semibold rounded-lg"
                        >
                            Contact Me
                        </button>
                    </div>

                    {/* Stats Counter */}
                    <div className="mt-14 grid max-w-2xl grid-cols-3 border-y border-zinc-200 py-2">
                        {[
                            ['2026', 'BCA Graduate'],
                            ['5+', 'Projects Built'],
                            ['Full Stack', 'Laravel & React'],
                        ].map(([value, label], idx) => (
                            <div key={label} className="border-r border-zinc-200 py-4 pr-4 last:border-r-0 last:pl-6 sm:px-6 sm:first:pl-0 font-sans">
                                <p className="font-display text-xl font-extrabold text-zinc-900 sm:text-2xl">{value}</p>
                                <p className="mt-1 text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">{label}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Hero Visual Panel - Sleek IDE / Terminal Mockup */}
                <div className="relative">
                    <div className="absolute inset-0 bg-indigo-500/5 rounded-2xl blur-3xl -z-10 scale-95"></div>
                    <div className="border border-zinc-800 bg-zinc-900 p-0 shadow-2xl rounded-xl relative overflow-hidden group hover:border-zinc-700 transition-all duration-300">
                        {/* Terminal Header */}
                        <div className="flex items-center justify-between border-b border-zinc-800/80 px-4 py-3 bg-zinc-950/40">
                            <div className="flex items-center gap-1.5">
                                <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444] inline-block"></span>
                                <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b] inline-block"></span>
                                <span className="w-2.5 h-2.5 rounded-full bg-[#10b981] inline-block"></span>
                            </div>
                            <span className="font-mono text-[10px] text-zinc-500">developer.js — manish-kumar</span>
                            <span className="w-4 h-4"></span>
                        </div>

                        {/* Current Stack Badges */}
                        <div className="px-6 py-3 border-b border-zinc-800/40 bg-zinc-950/30 flex flex-wrap gap-2 items-center">
                            <span className="font-mono text-[9px] uppercase text-zinc-550 font-bold tracking-wider">Environment:</span>
                            <span className="px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-mono">React 19</span>
                            <span className="px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-mono">Laravel 11</span>
                            <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono">MySQL</span>
                        </div>

                        {/* Terminal Code Body */}
                        <div className="p-6 font-mono text-xs leading-6 text-zinc-300 overflow-x-auto">
                            <p><span className="text-pink-400">const</span> developer <span className="text-zinc-500">=</span> &#123;</p>
                            <p className="pl-6">name<span className="text-zinc-500">:</span> <span className="text-emerald-300">'Manish Kumar'</span>,</p>
                            <p className="pl-6">role<span className="text-zinc-500">:</span> <span className="text-emerald-300">'Full Stack Web Developer'</span>,</p>
                            <p className="pl-6">focus<span className="text-zinc-500">:</span> <span className="text-emerald-300">'Shipping clean & robust code'</span>,</p>
                            <p className="pl-6">coreSkills<span className="text-zinc-500">:</span> [<span className="text-indigo-400">'Laravel'</span>, <span className="text-indigo-400">'React'</span>, <span className="text-indigo-400">'PHP'</span>, <span className="text-indigo-400">'MySQL'</span>],</p>
                            <p className="pl-6">isAvailableForRoles<span className="text-zinc-500">:</span> <span className="text-amber-400">true</span></p>
                            <p>&#125;;</p>
                            <p className="mt-4"><span className="text-pink-400">function</span> <span className="text-blue-400">buildFuture</span>(developer) &#123;</p>
                            <p className="pl-6 text-zinc-500">// Building applications that scale</p>
                            <p className="pl-6"><span className="text-pink-400">return</span> developer.coreSkills</p>
                            <p className="pl-12">.filter(skill =&gt; skill === <span className="text-emerald-300">'Laravel'</span> || skill === <span className="text-emerald-300">'React'</span>)</p>
                            <p className="pl-12">.map(skill =&gt; <span className="text-emerald-300">{"`Optimized ${skill} app`"}</span>);</p>
                            <p>&#125;</p>
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

import React, { useEffect } from 'react';
import AppLayout, { IconExternal, IconGitHub } from '../../Layouts/AppLayout';

const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
};

/* ─── Reusable Section Label ─── */
const SectionLabel = ({ children }) => (
    <span className="section-label mb-4 inline-block">{children}</span>
);

/* ─── Project Thumbnail ─── */
const ProjectThumb = ({ title, thumbnail }) => (
    <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden rounded-lg bg-zinc-100 border border-zinc-200 w-full h-full group-hover:border-zinc-300 transition-all duration-300">
        {thumbnail ? (
            <img
                src={thumbnail}
                alt={title}
                className="w-full h-full object-cover object-left-top group-hover:scale-[1.03] transition-transform duration-500"
            />
        ) : (
            <>
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:14px_24px] opacity-30"></div>
                <div className="relative flex h-14 w-14 items-center justify-center rounded-xl border border-zinc-200 bg-white text-xl font-display font-bold text-indigo-600 shadow-sm">
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
                    if (entry.isIntersecting) entry.target.classList.add('visible');
                });
            },
            { threshold: 0.08 }
        );

        document.querySelectorAll('.fade-section').forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, [settings?.meta_title]);

    const skillCategories = skills ? Object.keys(skills) : [];
    const activeExperience = experiences?.[0];

    return (
        <AppLayout settings={settings} socialLinks={socialLinks} navigate={navigate}>

            {/* ═══════════════════════════════════════════════
                HERO — Bento Grid Intro
            ═══════════════════════════════════════════════ */}
            <section className="pt-20 pb-4 sm:pt-24 sm:pb-6 lg:pt-28">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 auto-rows-auto">

                    {/* ── Main Intro Card (spans 2–3 cols) ── */}
                    <div className="bento-card sm:col-span-2 lg:col-span-3 p-5 sm:p-7 flex flex-col justify-between min-h-[240px]">
                        <div>
                            {/* Status Badge */}
                            <div className="flex items-center gap-2 mb-4">
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 font-mono text-[10px] sm:text-[11px] font-semibold text-emerald-700">
                                    <span className="relative flex h-2 w-2 shrink-0">
                                        <span className="status-pulse-dot absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
                                    </span>
                                    Open to work
                                </span>
                            </div>

                            {/* Headline */}
                            <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-snug tracking-tight text-zinc-900">
                                Hi, I'm {settings?.name || 'Manish Kumar'}
                                <span className="text-indigo-600">.</span>
                            </h1>
                            <p className="mt-2 text-sm sm:text-base leading-relaxed text-zinc-600 max-w-2xl">
                                Full-stack software engineer building scalable SaaS platforms, e-commerce marketplaces, and reactive web applications with <strong className="text-zinc-800 font-semibold">Laravel</strong>, <strong className="text-zinc-800 font-semibold">React</strong>, and <strong className="text-zinc-800 font-semibold">MySQL</strong>.
                            </p>
                        </div>

                        {/* CTA Buttons */}
                        <div className="mt-5 flex flex-wrap gap-2.5">
                            <button type="button" onClick={() => scrollToSection('projects')} className="btn-primary cursor-pointer">
                                View Projects
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                            </button>
                            <button type="button" onClick={() => scrollToSection('contact')} className="btn-secondary cursor-pointer font-mono">
                                $ contact --email
                            </button>
                        </div>
                    </div>

                    {/* ── Location + Stats Card ── */}
                    <div className="bento-card flex flex-col justify-between p-5 min-h-[180px]">
                        <div>
                            <div className="flex items-center gap-1.5 text-zinc-500 mb-3">
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                <span className="font-mono text-[11px] font-semibold">Jaipur, India</span>
                            </div>
                            <p className="text-xs text-zinc-500 leading-relaxed">BCA Graduate · Purnea University · 2026</p>
                        </div>
                        <div className="mt-4 grid grid-cols-2 gap-2">
                            <div className="text-center p-2 rounded-lg bg-zinc-50 border border-zinc-100">
                                <p className="font-display text-lg font-bold text-zinc-900">5+</p>
                                <p className="text-[10px] text-zinc-500 font-medium">Projects</p>
                            </div>
                            <div className="text-center p-2 rounded-lg bg-indigo-50 border border-indigo-100">
                                <p className="font-display text-lg font-bold text-indigo-600">SaaS</p>
                                <p className="text-[10px] text-indigo-500 font-medium">GymMitra</p>
                            </div>
                        </div>
                    </div>

                    {/* ── Tech Stack Card ── */}
                    <div className="bento-card sm:col-span-2 p-5">
                        <p className="font-mono text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-3">// Core Stack</p>
                        <div className="flex flex-wrap gap-1.5">
                            {['Laravel 11', 'React 19', 'Inertia.js', 'PHP 8.3', 'MySQL', 'Tailwind CSS', 'JavaScript', 'Vite'].map((tech) => (
                                <span key={tech} className="skill-pill">{tech}</span>
                            ))}
                        </div>
                    </div>

                    {/* ── Code Snippet Card (Dark) ── */}
                    <div className="bento-card-dark sm:col-span-2 p-0 overflow-hidden">
                        <div className="flex items-center justify-between px-4 py-2.5 border-b border-zinc-800">
                            <div className="flex items-center gap-1.5">
                                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56] inline-block"></span>
                                <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e] inline-block"></span>
                                <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f] inline-block"></span>
                            </div>
                            <span className="font-mono text-[10px] text-zinc-500">developer.config.js</span>
                        </div>
                        <div className="p-4 sm:p-5 font-mono text-[11px] sm:text-xs leading-6 sm:leading-7 text-zinc-400 overflow-x-auto">
                            <p><span className="text-pink-400">const</span> <span className="text-blue-300">developer</span> <span className="text-zinc-600">=</span> {'{'}</p>
                            <p className="pl-4">name<span className="text-zinc-600">:</span> <span className="text-emerald-300">'{settings?.name || 'Manish Kumar'}'</span>,</p>
                            <p className="pl-4">title<span className="text-zinc-600">:</span> <span className="text-emerald-300">'Full Stack Software Engineer'</span>,</p>
                            <p className="pl-4">stack<span className="text-zinc-600">:</span> [<span className="text-cyan-300">'Laravel'</span>, <span className="text-cyan-300">'React'</span>, <span className="text-cyan-300">'MySQL'</span>],</p>
                            <p className="pl-4">available<span className="text-zinc-600">:</span> <span className="text-amber-400">true</span></p>
                            <p>{'}'}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── GymMitra Spotlight ── */}
            <div className="bento-card my-4 sm:my-5 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-l-4 border-l-indigo-500">
                <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 text-white font-mono text-[10px] font-bold shrink-0">SaaS</span>
                    <div>
                        <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-bold text-zinc-900 text-sm">GymMitra</span>
                            <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-emerald-100 text-emerald-700 border border-emerald-200">LIVE</span>
                        </div>
                        <p className="text-[11px] sm:text-xs text-zinc-500 mt-0.5">Multi-tenant Gym Management SaaS — QR attendance, billing, locker management</p>
                    </div>
                </div>
                <a
                    href="https://manish.echovel.com"
                    target="_blank"
                    rel="noreferrer"
                    className="btn-primary text-xs shrink-0 cursor-pointer"
                >
                    Visit <IconExternal />
                </a>
            </div>

            {/* ═══════════════════════════════════════════════
                ABOUT
            ═══════════════════════════════════════════════ */}
            <section id="about" className="fade-section py-6 md:py-8 border-t border-zinc-200">
                <SectionLabel>01 · About</SectionLabel>
                <h2 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 mb-5">Practical engineering with product sense.</h2>

                <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
                    <div className="space-y-3 text-sm leading-relaxed text-zinc-600">
                        <p>
                            My development journey started during my BCA program at Purnea University, where database design, web application development, and systems programming clicked together into one discipline.
                        </p>
                        <p>
                            At{' '}
                            <a href="https://comestro.com" target="_blank" rel="noreferrer" className="text-indigo-600 hover:text-indigo-500 transition-colors font-semibold underline decoration-indigo-300/40 decoration-2 underline-offset-4">
                                Comestro Techlabs Pvt Ltd
                            </a>
                            , I focus on engineering multi-tenant SaaS applications, e-commerce bookstore platforms, social networks, and campus systems using Laravel, React, Inertia, Tailwind CSS, and MySQL database engines, while actively building and learning advanced SaaS software architecture.
                        </p>
                    </div>

                    {/* PHP Class Card */}
                    <div className="code-block p-4 sm:p-5 text-zinc-400">
                        <div className="flex items-center justify-between border-b border-zinc-800 pb-2.5 mb-3 text-[10px] text-zinc-500">
                            <span>App/Engineer/ManishKumar.php</span>
                            <span className="text-indigo-400 font-bold">PHP 8.3</span>
                        </div>
                        <div className="leading-6 text-[11px]">
                            <p><span className="text-pink-400">namespace</span> App\Engineer;</p>
                            <p className="mt-1.5"><span className="text-blue-400">class</span> <span className="text-yellow-300">ManishKumar</span> {'{'}</p>
                            <p className="pl-4"><span className="text-indigo-300">public string</span> <span className="text-zinc-500">$role</span> = <span className="text-emerald-300">'Full-Stack Engineer'</span>;</p>
                            <p className="pl-4"><span className="text-indigo-300">public string</span> <span className="text-zinc-500">$location</span> = <span className="text-emerald-300">'Jaipur, India'</span>;</p>
                            <p className="pl-4"><span className="text-indigo-300">public array</span> <span className="text-zinc-500">$stack</span> = [<span className="text-cyan-300">'Laravel'</span>, <span className="text-cyan-300">'React'</span>, <span className="text-cyan-300">'MySQL'</span>];</p>
                            <p className="pl-4"><span className="text-indigo-300">public bool</span> <span className="text-zinc-500">$available</span> = <span className="text-amber-400">true</span>;</p>
                            <p>{'}'}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════
                EXPERIENCE
            ═══════════════════════════════════════════════ */}
            <section id="experience" className="fade-section py-6 md:py-8 border-t border-zinc-200">
                <SectionLabel>02 · Experience</SectionLabel>
                <h2 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 mb-5">Work History</h2>

                <div className="bento-card p-5 sm:p-6">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between border-b border-zinc-100 pb-4">
                        <div>
                            <div className="flex items-center gap-2 flex-wrap">
                                <span className="font-mono text-[11px] text-indigo-600 font-bold">commit #comestro-2024</span>
                                <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-indigo-50 text-indigo-600 border border-indigo-100">MAIN</span>
                            </div>
                            <p className="font-display text-lg sm:text-xl font-bold text-zinc-900 mt-1">{activeExperience?.designation || 'Laravel Developer'}</p>
                            <p className="text-sm font-semibold text-indigo-600 mt-0.5">@ {activeExperience?.company || settings?.current_company}</p>
                        </div>
                        <span className="font-mono text-[11px] font-semibold text-zinc-500 bg-zinc-50 border border-zinc-200 px-2.5 py-1 rounded-full shrink-0">
                            {activeExperience?.duration || 'May 2024 - Present'}
                        </span>
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-zinc-600">{activeExperience?.description}</p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                        {activeExperience?.skills_used?.map((skill) => (
                            <span key={skill} className="skill-pill text-indigo-600 bg-indigo-50 border-indigo-200">{skill}</span>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════
                PROJECTS
            ═══════════════════════════════════════════════ */}
            <section id="projects" className="fade-section py-6 md:py-8 border-t border-zinc-200">
                <SectionLabel>03 · Projects</SectionLabel>
                <h2 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 mb-5">Selected Works</h2>

                <div className="grid gap-4 md:grid-cols-2">
                    {(projects || []).map((project) => (
                        <article key={project.id} className="bento-card p-0 overflow-hidden group">
                            {/* Thumbnail */}
                            <a
                                href={`/project/${project.slug}`}
                                onClick={(e) => { e.preventDefault(); navigate(`/project/${project.slug}`); }}
                                className="block"
                            >
                                <ProjectThumb title={project.title} thumbnail={project.thumbnail} />
                            </a>

                            {/* Content */}
                            <div className="p-4 sm:p-5">
                                <div className="flex items-center justify-between mb-2 gap-2">
                                    <span className="font-mono text-[10px] text-zinc-400 font-semibold truncate">
                                        manish96-code / <strong className="text-zinc-700">{project.slug}</strong>
                                    </span>
                                    {project.is_featured && (
                                        <span className="shrink-0 px-2 py-0.5 text-[9px] font-mono font-bold bg-indigo-50 text-indigo-600 border border-indigo-100 rounded-full">FEATURED</span>
                                    )}
                                </div>

                                <h3 className="font-display text-base sm:text-lg font-bold text-zinc-900">
                                    <a
                                        href={`/project/${project.slug}`}
                                        onClick={(e) => { e.preventDefault(); navigate(`/project/${project.slug}`); }}
                                        className="hover:text-indigo-600 transition-colors"
                                    >
                                        {project.title}
                                    </a>
                                </h3>
                                <p className="mt-1.5 text-xs sm:text-sm text-zinc-500 leading-relaxed line-clamp-2">{project.description}</p>

                                {/* Tech + Actions */}
                                <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between border-t border-zinc-100 pt-3">
                                    <div className="flex flex-wrap gap-1">
                                        {project.technologies?.slice(0, 4).map((tech) => (
                                            <span key={tech} className="font-mono text-[10px] font-semibold text-zinc-500 bg-zinc-50 border border-zinc-200 px-1.5 py-0.5 rounded">{tech}</span>
                                        ))}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {project.live_url && (
                                            <a href={project.live_url} target="_blank" rel="noreferrer" className="flex items-center gap-1 px-2.5 h-7 border border-indigo-200 bg-indigo-50 text-indigo-600 font-mono text-[10px] font-semibold rounded-md hover:bg-indigo-600 hover:text-white transition-all" aria-label={`${project.title} Live`}>
                                                Live <IconExternal />
                                            </a>
                                        )}
                                        {project.github_url && (
                                            <a href={project.github_url} target="_blank" rel="noreferrer" className="flex items-center justify-center w-7 h-7 border border-zinc-200 bg-white rounded-md text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50 transition-all" aria-label={`${project.title} GitHub`}>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" /></svg>
                                            </a>
                                        )}
                                        <a
                                            href={`/project/${project.slug}`}
                                            onClick={(e) => { e.preventDefault(); navigate(`/project/${project.slug}`); }}
                                            className="flex items-center justify-center w-7 h-7 border border-zinc-200 bg-white rounded-md text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50 transition-all"
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

            {/* ═══════════════════════════════════════════════
                SKILLS
            ═══════════════════════════════════════════════ */}
            <section id="skills" className="fade-section py-6 md:py-8 border-t border-zinc-200">
                <SectionLabel>04 · Stack</SectionLabel>
                <h2 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 mb-5">Technical Stack</h2>

                <div className="grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {skillCategories.map((category) => (
                        <div key={category} className="bento-card p-4 sm:p-5">
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="font-display text-sm font-bold text-zinc-900">{category}</h3>
                                <span className="font-mono text-[9px] text-zinc-400 uppercase tracking-wider">module</span>
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                                {skills[category].map((skill) => (
                                    <span key={skill.name} className="skill-pill">{skill.name}</span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ═══════════════════════════════════════════════
                CERTIFICATIONS
            ═══════════════════════════════════════════════ */}
            {certificates?.length > 0 && (
                <section className="fade-section py-6 md:py-8 border-t border-zinc-200">
                    <SectionLabel>05 · Learning</SectionLabel>
                    <h2 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 mb-5">Certifications & Learning</h2>

                    <div className="grid gap-3 sm:grid-cols-2">
                        {certificates.map((cert) => {
                            const isCompleted = cert.organization?.toLowerCase().includes('completed');
                            return (
                                <div key={cert.id} className="bento-card p-4 sm:p-5 flex items-start gap-3">
                                    {/* Status Icon */}
                                    <div className={`flex items-center justify-center w-8 h-8 rounded-lg shrink-0 ${isCompleted ? 'bg-emerald-50 border border-emerald-200' : 'bg-amber-50 border border-amber-200'}`}>
                                        {isCompleted ? (
                                            <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg>
                                        ) : (
                                            <svg className="w-4 h-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                        )}
                                    </div>
                                    <div className="min-w-0">
                                        <p className="font-display text-sm font-bold text-zinc-900">{cert.title}</p>
                                        <div className="mt-1 flex items-center gap-2 flex-wrap">
                                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${isCompleted ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'}`}>
                                                {isCompleted ? 'Completed' : 'Learning'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>
            )}

            {/* ═══════════════════════════════════════════════
                CONTACT
            ═══════════════════════════════════════════════ */}
            <section id="contact" className="fade-section py-8 md:py-10 border-t border-zinc-200">
                <div className="max-w-lg mx-auto text-center">
                    <SectionLabel>06 · Contact</SectionLabel>
                    <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 leading-snug mt-1">
                        Let's build something useful.
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-zinc-500">
                        I'm currently open to full-stack software engineering roles, SaaS collaborations, and projects. Feel free to reach out.
                    </p>
                    <a href={`mailto:${settings?.email}`} className="btn-primary mt-6 inline-flex text-sm px-6 py-3 font-bold font-mono">
                        $ sendmail --to={settings?.email}
                    </a>
                </div>
            </section>
        </AppLayout>
    );
}

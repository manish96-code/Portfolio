import React, { useEffect, useMemo, useState } from 'react';
import AppLayout, { IconExternal, IconFolder, IconGitHub } from '../../Layouts/AppLayout';

const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
};

const SectionHeader = ({ eyebrow, title, copy }) => (
    <div className="mb-12 grid gap-6 md:grid-cols-[0.65fr_1fr] md:items-end font-sans">
        <div>
            <span className="inline-block sticky-note-tag text-stone text-xs font-bold uppercase tracking-[0.2em] px-3.5 py-1.5 font-mono">
                📌 {eyebrow}
            </span>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-stone md:text-5xl leading-tight rotate-[-0.5deg]">
                {title}
            </h2>
        </div>
        {copy && (
            <p className="max-w-2xl text-lg leading-relaxed text-body-light md:ml-auto border-l-3 border-dashed border-stone pl-6 rotate-[0.5deg]">
                {copy}
            </p>
        )}
    </div>
);

const ProjectMonogram = ({ title }) => (
    <div className="project-visual relative flex aspect-[16/10] items-center justify-center overflow-hidden rounded-wobbly-md border-3 border-stone bg-white shadow-hard-muted transition-hand group-hover:rotate-1">
        <div className="absolute inset-0 grid grid-cols-6 grid-rows-4 opacity-30">
            {Array.from({ length: 24 }).map((_, idx) => (
                <span key={idx} className="border-b-2 border-r-2 border-stone/50 border-dashed" />
            ))}
        </div>
        <div className="relative flex h-20 w-20 items-center justify-center rounded-wobbly border-3 border-stone bg-stone text-3xl font-display font-bold text-white shadow-hard rotate-3 group-hover:-rotate-3 transition-hand">
            {title.substring(0, 2)}
        </div>
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
            { threshold: 0.12 }
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
            <section className="relative grid min-h-[92vh] items-center gap-12 pt-28 pb-16 lg:grid-cols-[1.1fr_0.9fr] lg:pt-32">

                {/* Sketchy floating accent top right of text */}
                <div className="hidden md:block absolute top-28 left-[40%] text-coral animate-float-sketchy z-10 opacity-70">
                    <svg className="w-12 h-12" viewBox="0 0 50 50" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M10,10 Q25,0 40,10 Q50,25 40,40 Q25,50 10,40 Z" strokeDasharray="3,4" />
                    </svg>
                </div>

                <div className="relative">
                    <div className="mb-7 flex flex-wrap items-center gap-3">
                        <span className="inline-flex h-3.5 w-3.5 rounded-full bg-sage border-2 border-stone shadow-hard" />
                        <p className="font-mono text-sm font-bold uppercase tracking-[0.2em] text-stone">
                            ✏️ Available for full-stack roles
                        </p>
                    </div>

                    <h1 className="max-w-4xl font-display text-5xl font-bold leading-[1.05] tracking-tight text-stone sm:text-6xl lg:text-7xl rotate-[-1deg]">
                        Laravel and React developer building useful web products<span className="text-coral inline-block rotate-12 ml-1">!</span>
                    </h1>

                    <p className="mt-8 max-w-2xl font-sans text-xl leading-relaxed text-body-light rotate-[0.5deg]">
                        I am {settings?.name || 'Manish Kumar'}, a full-stack developer in Jaipur focused on clean Laravel
                        backends, responsive React interfaces, and database-backed products that are easy to maintain.
                    </p>

                    <div className="mt-10 flex flex-wrap gap-4 items-center relative z-20">
                        <button
                            type="button"
                            onClick={() => scrollToSection('projects')}
                            className="btn-hand-primary px-8 py-3.5 text-lg font-bold"
                        >
                            View projects ➜
                        </button>
                        <button
                            type="button"
                            onClick={() => scrollToSection('contact')}
                            className="btn-hand-secondary px-8 py-3.5 text-lg font-bold"
                        >
                            Contact me
                        </button>

                        {/* Hand-Drawn Arrow decoration pointing to CTA */}
                        <div className="hidden md:block absolute -bottom-24 left-[15%] text-coral animate-float-sketchy">
                            <svg className="w-20 h-20" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3">
                                <path d="M15,15 C45,5 75,25 80,55" strokeDasharray="4,4" />
                                <path d="M70,48 L82,56 L76,42" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span className="font-display text-base font-bold block -mt-3 ml-6 rotate-[15deg]">Check these out!</span>
                        </div>
                    </div>

                    <div className="mt-14 grid max-w-2xl grid-cols-3 border-y-3 border-dashed border-stone">
                        {[
                            ['2024', 'BCA graduate'],
                            ['5+', 'Built projects'],
                            ['Full stack', 'Laravel & React'],
                        ].map(([value, label], idx) => (
                            <div key={label} className="border-r-3 border-dashed border-stone py-6 pr-4 last:border-r-0 last:pl-6 sm:px-6 sm:first:pl-0 font-sans">
                                <p className="font-display text-2xl font-bold text-stone sm:text-3xl rotate-[-2deg]">{value}</p>
                                <p className="mt-1 text-xs font-bold text-body-light uppercase tracking-wider">{label}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Hero Visual Panel */}
                <div className="relative">
                    {/* Scribbled decoration surrounding card */}
                    <div className="hidden md:block absolute -top-8 -right-8 text-coral animate-float-sketchy z-10">
                        <svg className="w-16 h-16" viewBox="0 0 50 50" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M5,25 C5,10 45,10 45,25 C45,40 5,40 5,25" strokeDasharray="3,4" />
                        </svg>
                    </div>

                    <div className="developer-panel border-3 border-stone bg-white p-6 shadow-hard rounded-wobbly-md card-tape relative rotate-1 hover:rotate-0 transition-hand">
                        <div className="flex items-center justify-between border-b-3 border-dashed border-stone pb-5">
                            <div>
                                <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-body-light">Current stack</p>
                                <p className="mt-1 font-display text-2xl font-bold text-stone">Product build room</p>
                            </div>
                            <span className="border-2 border-stone bg-sage text-white px-3 py-1 font-mono text-xs font-bold rounded-wobbly rotate-[-2deg] shadow-hard-muted">
                                active ✒️
                            </span>
                        </div>

                        <div className="grid gap-4 py-6 sm:grid-cols-2">
                            {['Laravel APIs', 'React UI', 'MySQL schemas', 'Git workflow'].map((item, idx) => (
                                <div key={item} className="rounded-wobbly-md border-3 border-stone bg-cream p-4 shadow-hard-muted rotate-[1deg] hover:rotate-[-1deg] transition-hand">
                                    <p className="font-mono text-xs font-bold text-coral">0{idx + 1}.</p>
                                    <p className="mt-2 text-base font-bold text-stone font-sans">{item}</p>
                                </div>
                            ))}
                        </div>

                        <div className="rounded-wobbly-md border-3 border-stone bg-stone p-5 font-mono text-xs leading-6 text-cream shadow-hard rotate-[-1deg]">
                            <p><span className="text-coral">const</span> developer = &#123;</p>
                            <p className="pl-4">name: <span className="text-sage-light">'Manish Kumar'</span>,</p>
                            <p className="pl-4">focus: <span className="text-sage-light">'shipping clean web apps'</span>,</p>
                            <p className="pl-4">tools: [<span className="text-sage-light">'Laravel'</span>, <span className="text-sage-light">'React'</span>]</p>
                            <p>&#125;;</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ABOUT SECTION */}
            <section id="about" className="fade-section py-20 border-t-3 border-dashed border-stone">
                <SectionHeader
                    eyebrow="About"
                    title="Practical engineering with product sense."
                    copy="I like web apps that feel calm on the surface and solid underneath: clear data models, predictable interfaces, and code that another developer can pick up without a treasure map."
                />

                <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
                    <div className="space-y-6 text-lg leading-relaxed text-stone font-sans">
                        <p>
                            My development journey started during my BCA program at Purnea University, where database
                            design, interface building, and problem solving clicked into one discipline.
                        </p>
                        <p>
                            At{' '}
                            <a href="https://comestro.com" target="_blank" rel="noreferrer" className="link-underline-wavy font-bold text-coral">
                                Comestro Techlabs Pvt Ltd
                            </a>
                            , I work on e-commerce, campus systems, and social products using Laravel, React, Inertia,
                            Tailwind CSS, and MySQL.
                        </p>
                    </div>

                    <div className="border-3 border-stone bg-white p-8 shadow-hard rounded-wobbly-md card-tape relative rotate-[-1deg] hover:rotate-0 transition-hand">
                        <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-body-light border-b-2 border-dashed border-stone pb-2">Core tools</p>
                        <div className="mt-6 flex flex-wrap gap-2.5">
                            {(primarySkills.length ? primarySkills : ['Laravel', 'React', 'PHP', 'MySQL', 'Tailwind CSS', 'Git']).map((tech) => (
                                <span key={tech} className="border-2 border-stone bg-cream rounded-wobbly px-3.5 py-1.5 text-sm font-bold text-stone shadow-hard-muted hover:bg-postit transition-hand">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* EXPERIENCE SECTION */}
            <section id="experience" className="fade-section py-20 border-t-3 border-dashed border-stone">
                <SectionHeader
                    eyebrow="Experience"
                    title="Recent work"
                    copy="Hands-on internship experience building production-style modules, managing repositories, and connecting front-end flows to Laravel backends."
                />

                <div className="border-3 border-stone bg-white p-6 md:p-8 shadow-hard rounded-wobbly-lg card-tack relative rotate-1 hover:rotate-0 transition-hand font-sans">
                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between border-b-2 border-dashed border-stone pb-6">
                        <div>
                            <p className="font-display text-3xl font-bold text-stone">{activeExperience?.designation || 'Laravel Developer'}</p>
                            <p className="mt-2 text-base font-bold text-coral">@ {activeExperience?.company || settings?.current_company}</p>
                        </div>
                        <p className="font-mono text-sm font-bold text-stone border-2 border-stone bg-cream px-3 py-1 rounded-wobbly rotate-[2deg]">
                            {activeExperience?.duration || 'May 2024 - Present'}
                        </p>
                    </div>
                    <p className="mt-6 text-base leading-relaxed text-stone pr-4">{activeExperience?.description}</p>
                    <div className="mt-8 flex flex-wrap gap-2.5">
                        {activeExperience?.skills_used?.map((skill) => (
                            <span key={skill} className="border-2 border-stone bg-sage-tint text-sage px-3 py-1 font-mono text-xs font-bold rounded-wobbly shadow-hard-muted rotate-[-1deg]">
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* PROJECTS SECTION */}
            <section id="projects" className="fade-section py-20 border-t-3 border-dashed border-stone">
                <SectionHeader
                    eyebrow="Projects"
                    title="Selected builds"
                    copy="A mix of social, marketplace, education, and utility projects, with Laravel and React doing most of the heavy lifting."
                />

                <div className="grid gap-8">
                    {(projects || []).map((project, idx) => (
                        <article key={project.id} className={`grid gap-6 border-3 border-stone bg-white p-5 md:p-6 shadow-hard rounded-wobbly-md hover:rotate-0 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-hard-lg transition-hand lg:grid-cols-[0.85fr_1.15fr] ${
                            idx % 2 === 0 ? 'rotate-[-0.5deg]' : 'rotate-[0.5deg]'
                        }`}>
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
                                    {project.is_featured ? (
                                        <span className="inline-block border-2 border-stone bg-coral text-white px-2.5 py-0.5 text-xs font-bold font-mono rounded-wobbly rotate-[-2deg] shadow-hard-muted">
                                            FEATURED BUILD 🚀
                                        </span>
                                    ) : (
                                        <span className="inline-block border-2 border-stone bg-sage text-white px-2.5 py-0.5 text-xs font-bold font-mono rounded-wobbly rotate-[2deg] shadow-hard-muted">
                                            PROJECT BUILD 🚀
                                        </span>
                                    )}
                                    <h3 className="mt-3 font-display text-3xl font-bold text-stone">
                                        <a
                                            href={`/project/${project.slug}`}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                navigate(`/project/${project.slug}`);
                                            }}
                                            className="transition hover:text-coral hover:link-underline-wavy"
                                        >
                                            {project.title}
                                        </a>
                                    </h3>
                                    <p className="mt-4 text-base leading-relaxed text-stone pr-4">{project.description}</p>
                                </div>

                                <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between border-t-2 border-dashed border-stone pt-6">
                                    <div className="flex flex-wrap gap-2.5">
                                        {project.technologies?.map((tech) => (
                                            <span key={tech} className="font-mono text-xs font-bold text-stone-dark border border-stone bg-cream px-2 py-0.5 rounded-wobbly">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="flex items-center gap-4 text-stone">
                                        {project.github_url && (
                                            <a
                                                href={project.github_url}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="flex items-center justify-center w-9 h-9 border-2 border-stone bg-white rounded-wobbly shadow-hard-muted hover:bg-coral hover:text-white hover:rotate-6 transition-hand"
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
                                            className="flex items-center justify-center w-9 h-9 border-2 border-stone bg-white rounded-wobbly shadow-hard-muted hover:bg-coral hover:text-white hover:-rotate-6 transition-hand"
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
            <section id="skills" className="fade-section py-20 border-t-3 border-dashed border-stone">
                <SectionHeader
                    eyebrow="Skills"
                    title="Stack coverage"
                    copy="Frontend, backend, database, and tooling skills grouped by where they show up in a real build."
                />

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {skillCategories.map((category, idx) => (
                        <div key={category} className={`border-3 border-stone bg-postit p-6 shadow-hard rounded-wobbly hover:rotate-0 hover:scale-[1.02] transition-hand ${idx % 3 === 0 ? 'rotate-1' : idx % 3 === 1 ? '-rotate-1.5' : 'rotate-[1.5deg]'
                            }`}>
                            <h3 className="font-display text-2xl font-bold text-stone mb-4 border-b-2 border-dashed border-stone pb-2">
                                📌 {category}
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {skills[category].map((skill) => (
                                    <span key={skill.name} className="border-2 border-stone bg-white px-3 py-1.5 text-sm font-bold text-stone shadow-hard-muted rounded-wobbly hover:bg-coral hover:text-white transition-hand font-sans">
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
                <section className="fade-section py-20 border-t-3 border-dashed border-stone">
                    <SectionHeader eyebrow="Credentials" title="Learning milestones" />
                    <div className="grid gap-6 md:grid-cols-2">
                        {certificates.map((certificate, idx) => (
                            <a
                                key={certificate.id}
                                href={certificate.credential_url}
                                target="_blank"
                                rel="noreferrer"
                                className={`border-3 border-stone bg-white p-6 shadow-hard rounded-wobbly hover:-translate-y-1 hover:border-coral hover:shadow-hard-lg transition-hand block font-sans ${idx % 2 === 0 ? 'rotate-1' : '-rotate-1'
                                    }`}
                            >
                                <p className="font-display text-2xl font-bold text-stone rotate-[-1deg]">{certificate.title}</p>
                                <p className="mt-3 text-base font-bold text-coral">🎗️ {certificate.organization}</p>
                                <p className="mt-2 font-mono text-xs font-bold text-stone-dark border border-stone bg-cream px-2.5 py-1 rounded-wobbly inline-block">
                                    {certificate.issue_date}
                                </p>
                            </a>
                        ))}
                    </div>
                </section>
            )}

            {/* CONTACT SECTION */}
            <section id="contact" className="fade-section py-20 border-t-3 border-dashed border-stone text-center max-w-2xl mx-auto font-sans">
                <span className="inline-block sticky-note-tag text-stone text-xs font-bold uppercase tracking-[0.2em] px-3.5 py-1.5 font-mono mb-6">
                    📬 Contact
                </span>
                <h2 className="font-display text-4xl font-bold tracking-tight text-stone md:text-5xl leading-tight rotate-[-1deg]">
                    Let us build something useful.
                </h2>
                <p className="mt-6 text-lg leading-relaxed text-stone">
                    I am open to developer roles, internships, collaborations, and practical web projects.
                    Send a note and I will get back to you.
                </p>
                <a href={`mailto:${settings?.email}`} className="btn-hand-primary mt-8 inline-block px-8 py-3.5 text-lg font-bold">
                    Email me: {settings?.email} ✉️
                </a>
            </section>
        </AppLayout>
    );
}

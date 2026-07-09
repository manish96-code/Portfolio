import React, { useEffect, useMemo, useState } from 'react';
import AppLayout, { IconExternal, IconFolder, IconGitHub } from '../../Layouts/AppLayout';

const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
};

const SectionHeader = ({ eyebrow, title, copy }) => (
    <div className="mb-10 grid gap-4 md:grid-cols-[0.65fr_1fr] md:items-end">
        <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-coral">{eyebrow}</p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-charcoal md:text-4xl">{title}</h2>
        </div>
        {copy && <p className="max-w-2xl text-sm leading-7 text-body md:ml-auto">{copy}</p>}
    </div>
);

const ProjectMonogram = ({ title }) => (
    <div className="project-visual relative flex aspect-[16/10] items-center justify-center overflow-hidden rounded-lg border border-stone-light bg-white">
        <div className="absolute inset-0 grid grid-cols-6 grid-rows-4 opacity-70">
            {Array.from({ length: 24 }).map((_, idx) => (
                <span key={idx} className="border-b border-r border-stone-light/70" />
            ))}
        </div>
        <div className="relative flex h-24 w-24 items-center justify-center rounded-lg border border-charcoal/10 bg-charcoal text-3xl font-bold text-white shadow-warm-lg">
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
            { threshold: 0.12 }
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
            <section className="grid min-h-[92vh] items-center gap-12 pt-28 pb-16 lg:grid-cols-[1.05fr_0.95fr] lg:pt-24">
                <div>
                    <div className="mb-7 flex flex-wrap items-center gap-3">
                        <span className="inline-flex h-2.5 w-2.5 rounded-full bg-sage shadow-[0_0_0_6px_rgba(139,158,139,0.16)]" />
                        <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-body-light">
                            Available for full-stack roles
                        </p>
                    </div>

                    <h1 className="max-w-4xl font-display text-5xl font-bold leading-[0.98] tracking-tight text-charcoal sm:text-6xl lg:text-7xl">
                        Laravel and React developer building useful web products.
                    </h1>

                    <p className="mt-7 max-w-2xl text-base leading-8 text-body md:text-lg">
                        I am {settings?.name || 'Manish Kumar'}, a full-stack developer in Jaipur focused on clean Laravel
                        backends, responsive React interfaces, and database-backed products that are easy to maintain.
                    </p>

                    <div className="mt-9 flex flex-wrap gap-3">
                        <button
                            type="button"
                            onClick={() => scrollToSection('projects')}
                            className="inline-flex items-center gap-2 rounded-lg bg-charcoal px-5 py-3 text-sm font-semibold text-white shadow-warm transition hover:-translate-y-0.5 hover:bg-coral"
                        >
                            View projects
                            <span aria-hidden="true">-&gt;</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => scrollToSection('contact')}
                            className="inline-flex items-center rounded-lg border border-stone bg-white px-5 py-3 text-sm font-semibold text-charcoal transition hover:-translate-y-0.5 hover:border-coral hover:text-coral"
                        >
                            Contact me
                        </button>
                    </div>

                    <div className="mt-10 grid max-w-2xl grid-cols-3 border-y border-stone-light">
                        {[
                            ['2024', 'BCA graduate'],
                            ['5+', 'Built projects'],
                            ['Full stack', 'Laravel, React, MySQL'],
                        ].map(([value, label]) => (
                            <div key={label} className="border-r border-stone-light py-5 pr-4 last:border-r-0 last:pl-4 sm:px-5 sm:first:pl-0">
                                <p className="font-display text-xl font-bold text-charcoal sm:text-2xl">{value}</p>
                                <p className="mt-1 text-xs leading-5 text-body-light">{label}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="relative">
                    <div className="developer-panel rounded-lg border border-stone-light bg-white p-4 shadow-warm-lg">
                        <div className="flex items-center justify-between border-b border-stone-light pb-4">
                            <div>
                                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-body-light">Current stack</p>
                                <p className="mt-1 font-display text-xl font-semibold text-charcoal">Product build room</p>
                            </div>
                            <span className="rounded-lg bg-sage-tint px-3 py-1.5 font-mono text-xs font-semibold text-sage">online</span>
                        </div>

                        <div className="grid gap-3 py-4 sm:grid-cols-2">
                            {['Laravel APIs', 'React UI', 'MySQL schemas', 'Git workflow'].map((item, idx) => (
                                <div key={item} className="rounded-lg border border-stone-light bg-cream p-4">
                                    <p className="font-mono text-xs text-coral">0{idx + 1}</p>
                                    <p className="mt-3 text-sm font-semibold text-charcoal">{item}</p>
                                </div>
                            ))}
                        </div>

                        <div className="rounded-lg bg-charcoal p-5 font-mono text-xs leading-6 text-stone-light">
                            <p><span className="text-coral">const</span> developer = &#123;</p>
                            <p className="pl-4">name: <span className="text-sage-light">'Manish Kumar'</span>,</p>
                            <p className="pl-4">focus: <span className="text-sage-light">'shipping clean web apps'</span>,</p>
                            <p className="pl-4">tools: [<span className="text-sage-light">'Laravel'</span>, <span className="text-sage-light">'React'</span>]</p>
                            <p>&#125;;</p>
                        </div>
                    </div>
                </div>
            </section>

            <section id="about" className="fade-section py-16 md:py-20">
                <SectionHeader
                    eyebrow="About"
                    title="Practical engineering with product sense."
                    copy="I like web apps that feel calm on the surface and solid underneath: clear data models, predictable interfaces, and code that another developer can pick up without a treasure map."
                />

                <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr]">
                    <div className="space-y-5 text-base leading-8 text-body">
                        <p>
                            My development journey started during my BCA program at Purnea University, where database
                            design, interface building, and problem solving clicked into one discipline.
                        </p>
                        <p>
                            At{' '}
                            <a href="https://comestro.com" target="_blank" rel="noreferrer" className="link-underline font-semibold text-coral">
                                Comestro Techlabs Pvt Ltd
                            </a>
                            , I work on e-commerce, campus systems, and social products using Laravel, React, Inertia,
                            Tailwind CSS, and MySQL.
                        </p>
                    </div>

                    <div className="rounded-lg border border-stone-light bg-white p-6 shadow-warm">
                        <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-body-light">Core tools</p>
                        <div className="mt-5 flex flex-wrap gap-2">
                            {(primarySkills.length ? primarySkills : ['Laravel', 'React', 'PHP', 'MySQL', 'Tailwind CSS', 'Git']).map((tech) => (
                                <span key={tech} className="rounded-lg border border-stone-light bg-cream px-3 py-2 text-xs font-semibold text-charcoal">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section id="experience" className="fade-section py-16 md:py-20">
                <SectionHeader
                    eyebrow="Experience"
                    title="Recent work"
                    copy="Hands-on internship experience building production-style modules, managing repositories, and connecting front-end flows to Laravel backends."
                />

                <div className="rounded-lg border border-stone-light bg-white p-6 shadow-warm md:p-8">
                    <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                        <div>
                            <p className="font-display text-2xl font-bold text-charcoal">{activeExperience?.designation || 'Laravel Developer'}</p>
                            <p className="mt-2 text-sm font-semibold text-coral">@ {activeExperience?.company || settings?.current_company}</p>
                        </div>
                        <p className="font-mono text-sm text-body-light">{activeExperience?.duration || 'May 2024 - Present'}</p>
                    </div>
                    <p className="mt-6 max-w-4xl text-sm leading-7 text-body">{activeExperience?.description}</p>
                    <div className="mt-6 flex flex-wrap gap-2">
                        {activeExperience?.skills_used?.map((skill) => (
                            <span key={skill} className="rounded-lg bg-sage-tint px-3 py-1.5 font-mono text-xs font-semibold text-sage">
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            <section id="projects" className="fade-section py-16 md:py-20">
                <SectionHeader
                    eyebrow="Projects"
                    title="Selected builds"
                    copy="A mix of social, marketplace, education, and utility projects, with Laravel and React doing most of the heavy lifting."
                />

                <div className="grid gap-6">
                    {featuredProjects.map((project) => (
                        <article key={project.id} className="grid gap-6 rounded-lg border border-stone-light bg-white p-5 shadow-warm transition hover:-translate-y-1 hover:shadow-warm-lg lg:grid-cols-[0.85fr_1.15fr] lg:p-6">
                            <a
                                href={`/project/${project.slug}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    navigate(`/project/${project.slug}`);
                                }}
                                className="block"
                            >
                                <ProjectMonogram title={project.title} />
                            </a>

                            <div className="flex flex-col justify-between">
                                <div>
                                    <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-coral">Featured</p>
                                    <h3 className="mt-2 font-display text-2xl font-bold text-charcoal">
                                        <a
                                            href={`/project/${project.slug}`}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                navigate(`/project/${project.slug}`);
                                            }}
                                            className="transition hover:text-coral"
                                        >
                                            {project.title}
                                        </a>
                                    </h3>
                                    <p className="mt-4 text-sm leading-7 text-body">{project.description}</p>
                                </div>

                                <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                                    <div className="flex flex-wrap gap-2">
                                        {project.technologies?.map((tech) => (
                                            <span key={tech} className="font-mono text-xs text-body-light">{tech}</span>
                                        ))}
                                    </div>
                                    <div className="flex items-center gap-3 text-charcoal">
                                        {project.github_url && (
                                            <a href={project.github_url} target="_blank" rel="noreferrer" className="transition hover:text-coral" aria-label={`${project.title} GitHub`}>
                                                <IconGitHub />
                                            </a>
                                        )}
                                        <a
                                            href={`/project/${project.slug}`}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                navigate(`/project/${project.slug}`);
                                            }}
                                            className="transition hover:text-coral"
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

                {otherProjects.length > 0 && (
                    <div className="mt-10 grid gap-4 sm:grid-cols-2">
                        {otherProjects.map((project) => (
                            <article key={project.id} className="rounded-lg border border-stone-light bg-white p-6 shadow-warm transition hover:-translate-y-1 hover:shadow-warm-lg">
                                <div className="mb-5 flex items-center justify-between text-coral">
                                    <IconFolder />
                                    <a
                                        href={`/project/${project.slug}`}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            navigate(`/project/${project.slug}`);
                                        }}
                                        className="text-charcoal transition hover:text-coral"
                                        aria-label={`${project.title} details`}
                                    >
                                        <IconExternal />
                                    </a>
                                </div>
                                <h3 className="font-display text-xl font-bold text-charcoal">{project.title}</h3>
                                <p className="mt-3 text-sm leading-7 text-body">{project.description}</p>
                                <div className="mt-5 flex flex-wrap gap-2">
                                    {project.technologies?.slice(0, 4).map((tech) => (
                                        <span key={tech} className="font-mono text-xs text-body-light">{tech}</span>
                                    ))}
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </section>

            <section id="skills" className="fade-section py-16 md:py-20">
                <SectionHeader
                    eyebrow="Skills"
                    title="Stack coverage"
                    copy="Frontend, backend, database, and tooling skills grouped by where they show up in a real build."
                />

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {skillCategories.map((category) => (
                        <div key={category} className="rounded-lg border border-stone-light bg-white p-6 shadow-warm">
                            <h3 className="font-display text-lg font-bold text-charcoal mb-4">{category}</h3>
                            <div className="flex flex-wrap gap-2">
                                {skills[category].map((skill) => (
                                    <span key={skill.name} className="rounded-lg border border-stone-light bg-cream px-3 py-2 text-xs font-semibold text-charcoal">
                                        {skill.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {certificates?.length > 0 && (
                <section className="fade-section py-16 md:py-20">
                    <SectionHeader eyebrow="Credentials" title="Learning milestones" />
                    <div className="grid gap-4 md:grid-cols-2">
                        {certificates.map((certificate) => (
                            <a
                                key={certificate.id}
                                href={certificate.credential_url}
                                target="_blank"
                                rel="noreferrer"
                                className="rounded-lg border border-stone-light bg-white p-6 shadow-warm transition hover:-translate-y-1 hover:border-coral-light hover:shadow-warm-lg"
                            >
                                <p className="font-display text-lg font-bold text-charcoal">{certificate.title}</p>
                                <p className="mt-3 text-sm text-body">{certificate.organization}</p>
                                <p className="mt-2 font-mono text-xs text-body-light">{certificate.issue_date}</p>
                            </a>
                        ))}
                    </div>
                </section>
            )}

            <section id="contact" className="fade-section py-16 md:py-24">
                <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
                    <div>
                        <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-coral">Contact</p>
                        <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-charcoal">Let us build something useful.</h2>
                        <p className="mt-5 text-sm leading-7 text-body">
                            I am open to developer roles, internships, collaborations, and practical web projects.
                            Send a note and I will get back to you.
                        </p>
                        <a href={`mailto:${settings?.email}`} className="link-underline mt-6 inline-block text-sm font-semibold text-coral">
                            {settings?.email}
                        </a>
                    </div>

                    <form onSubmit={handleContactSubmit} className="rounded-lg border border-stone-light bg-white p-6 shadow-warm md:p-8">
                        {wasSuccessful && (
                            <div className="mb-6 rounded-lg border border-sage/30 bg-sage-tint p-4 text-sm font-semibold text-sage">
                                Message sent successfully. I will get back to you soon.
                            </div>
                        )}

                        <div className="grid gap-5 sm:grid-cols-2">
                            <div>
                                <label className="mb-2 block text-xs font-semibold text-charcoal-light" htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    value={nameVal}
                                    onChange={(e) => setNameVal(e.target.value)}
                                    className="w-full rounded-lg border border-stone bg-cream px-4 py-3 text-sm text-charcoal outline-none transition focus:border-coral focus:bg-white"
                                    placeholder="Your name"
                                    required
                                />
                            </div>
                            <div>
                                <label className="mb-2 block text-xs font-semibold text-charcoal-light" htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={emailVal}
                                    onChange={(e) => setEmailVal(e.target.value)}
                                    className="w-full rounded-lg border border-stone bg-cream px-4 py-3 text-sm text-charcoal outline-none transition focus:border-coral focus:bg-white"
                                    placeholder="your@email.com"
                                    required
                                />
                            </div>
                        </div>

                        <div className="mt-5">
                            <label className="mb-2 block text-xs font-semibold text-charcoal-light" htmlFor="message">Message</label>
                            <textarea
                                id="message"
                                rows="5"
                                value={messageVal}
                                onChange={(e) => setMessageVal(e.target.value)}
                                className="w-full resize-none rounded-lg border border-stone bg-cream px-4 py-3 text-sm text-charcoal outline-none transition focus:border-coral focus:bg-white"
                                placeholder="Tell me about the project or role"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="mt-6 inline-flex w-full items-center justify-center rounded-lg bg-coral px-5 py-3 text-sm font-semibold text-white transition hover:bg-coral-dark disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                        >
                            {processing ? 'Sending...' : 'Send message'}
                        </button>
                    </form>
                </div>
            </section>
        </AppLayout>
    );
}

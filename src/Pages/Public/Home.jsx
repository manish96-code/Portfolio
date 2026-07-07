import React, { useState, useEffect, useRef } from 'react';
import AppLayout, { IconGitHub, IconExternal, IconFolder } from '../../Layouts/AppLayout';

export default function Home({ projects, skills, experiences, certificates, socialLinks, settings }) {
    const [nameVal, setNameVal] = useState('');
    const [emailVal, setEmailVal] = useState('');
    const [messageVal, setMessageVal] = useState('');
    const [processing, setProcessing] = useState(false);
    const [wasSuccessful, setWasSuccessful] = useState(false);

    useEffect(() => {
        document.title = 'Manish Kumar | Full Stack Developer';
        
        // Initialize fade-in observer
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            },
            { threshold: 0.1 }
        );
        document.querySelectorAll('.fade-section').forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, []);

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

    const name = settings?.name || 'Manish Kumar';
    const skillCategories = skills ? Object.keys(skills) : [];

    // Featured projects (first 3) and other projects
    const featuredProjects = (projects || []).filter(p => p.is_featured);
    const otherProjects = (projects || []).filter(p => !p.is_featured);

    return (
        <AppLayout settings={settings} socialLinks={socialLinks}>
            
            {/* ═══════════════════════════════════════════
                HERO SECTION
            ═══════════════════════════════════════════ */}
            <section className="min-h-screen flex flex-col justify-center py-24 md:py-0">
                <div className="space-y-5">
                    <p className="font-mono text-green text-sm md:text-base">
                        Hi, my name is
                    </p>
                    
                    <h1 className="text-slate-lightest text-4xl sm:text-5xl md:text-7xl font-bold leading-tight tracking-tight">
                        Manish Kumar.
                    </h1>
                    
                    <h2 className="text-slate text-3xl sm:text-4xl md:text-6xl font-bold leading-tight tracking-tight">
                        I build things for the web.
                    </h2>
                    
                    <p className="text-slate max-w-xl text-base md:text-lg leading-relaxed">
                        I'm a full-stack developer currently interning at{' '}
                        <a href="#experience" className="text-green link-underline">Comestro Techlabs</a>,
                        specializing in building exceptional web applications with Laravel, React, and modern databases.
                    </p>

                    <div className="pt-6">
                        <a 
                            href="#projects" 
                            className="inline-block px-7 py-4 rounded border border-green text-green font-mono text-sm hover:bg-green-tint transition-all duration-200"
                        >
                            Check out my work!
                        </a>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════
                ABOUT SECTION
            ═══════════════════════════════════════════ */}
            <section id="about" className="py-24 fade-section">
                <div className="flex items-center gap-4 mb-10">
                    <h2 className="text-slate-lightest text-2xl md:text-3xl font-bold whitespace-nowrap">
                        <span className="text-green font-mono text-xl mr-2">01.</span>
                        About Me
                    </h2>
                    <div className="h-px bg-navy-lighter flex-grow max-w-[300px]"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div className="md:col-span-2 space-y-4 text-base leading-relaxed">
                        <p>
                            Hello! I'm Manish, a passionate software developer from Jaipur, India.
                            I enjoy building web applications that are structured, scalable, and solve
                            real-world problems. My interest in web development started during my
                            BCA program at Purnea University, where I discovered the joy of turning
                            database schemas into live, interactive products.
                        </p>
                        <p>
                            Currently, I'm interning at{' '}
                            <a href="https://comestro.com" target="_blank" rel="noreferrer" className="text-green link-underline">
                                Comestro Techlabs Pvt Ltd
                            </a>
                            {' '}where I build multi-vendor e-commerce platforms, campus management
                            systems, and social networking applications using modern full-stack tooling.
                        </p>
                        <p>Here are a few technologies I've been working with recently:</p>
                        
                        <ul className="grid grid-cols-2 gap-x-4 gap-y-2 mt-4 font-mono text-sm">
                            {['Laravel', 'React', 'PHP', 'MySQL', 'Inertia.js', 'Tailwind CSS', 'JavaScript', 'Git & GitHub'].map((tech, idx) => (
                                <li key={idx} className="flex items-center gap-2">
                                    <span className="text-green text-xs">▹</span>
                                    {tech}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Profile Image Placeholder */}
                    <div className="relative group mx-auto md:mx-0">
                        <div className="relative w-64 h-64 rounded overflow-hidden">
                            {/* Tinted overlay */}
                            <div className="absolute inset-0 bg-green/20 group-hover:bg-transparent transition-all duration-300 z-10 rounded"></div>
                            {/* Placeholder avatar */}
                            <div className="w-full h-full bg-navy-lighter flex items-center justify-center text-green">
                                <svg className="w-24 h-24 opacity-40" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                        </div>
                        {/* Border frame offset */}
                        <div className="absolute top-4 left-4 w-64 h-64 rounded border-2 border-green -z-10 group-hover:top-2 group-hover:left-2 transition-all duration-200"></div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════
                EXPERIENCE SECTION
            ═══════════════════════════════════════════ */}
            <section id="experience" className="py-24 fade-section">
                <div className="flex items-center gap-4 mb-10">
                    <h2 className="text-slate-lightest text-2xl md:text-3xl font-bold whitespace-nowrap">
                        <span className="text-green font-mono text-xl mr-2">02.</span>
                        Where I've Worked
                    </h2>
                    <div className="h-px bg-navy-lighter flex-grow max-w-[300px]"></div>
                </div>

                <div className="max-w-2xl space-y-8">
                    {experiences?.map((exp, idx) => (
                        <div key={idx} className="bg-navy-light/50 border border-navy-lighter/30 rounded-lg p-6 md:p-8 hover:border-green/20 transition-all duration-300">
                            <h3 className="text-slate-lightest text-lg md:text-xl font-semibold">
                                {exp.designation}{' '}
                                <span className="text-green">@ {exp.company}</span>
                            </h3>
                            <p className="font-mono text-sm text-slate mt-1">{exp.duration}</p>
                            <p className="mt-4 text-slate leading-relaxed text-sm">
                                {exp.description}
                            </p>
                            <div className="flex flex-wrap gap-2 mt-4">
                                {exp.skills_used?.map((skill, sIdx) => (
                                    <span key={sIdx} className="px-2.5 py-1 rounded-full bg-green-tint text-green text-xs font-mono">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ═══════════════════════════════════════════
                FEATURED PROJECTS SECTION
            ═══════════════════════════════════════════ */}
            <section id="projects" className="py-24 fade-section">
                <div className="flex items-center gap-4 mb-10">
                    <h2 className="text-slate-lightest text-2xl md:text-3xl font-bold whitespace-nowrap">
                        <span className="text-green font-mono text-xl mr-2">03.</span>
                        Some Things I've Built
                    </h2>
                    <div className="h-px bg-navy-lighter flex-grow max-w-[300px]"></div>
                </div>

                {/* Featured projects — alternating left/right */}
                <div className="space-y-24">
                    {featuredProjects.map((project, idx) => (
                        <div key={project.id} className={`relative grid grid-cols-1 md:grid-cols-12 items-center gap-4`}>
                            
                            {/* Project Image / Visual Area */}
                            <div className={`md:col-span-7 ${idx % 2 !== 0 ? 'md:col-start-6' : ''} relative rounded-lg overflow-hidden group`}>
                                <a href={`#/project/${project.slug}`} className="block">
                                    <div className="bg-navy-lighter aspect-video rounded-lg flex items-center justify-center relative overflow-hidden group-hover:opacity-100 opacity-80 transition-opacity">
                                        <div className="absolute inset-0 bg-green/10 group-hover:bg-transparent transition-all duration-300"></div>
                                        <span className="text-6xl md:text-8xl font-bold text-green/10 select-none font-mono">
                                            {project.title.substring(0, 2)}
                                        </span>
                                    </div>
                                </a>
                            </div>

                            {/* Project Text Details */}
                            <div className={`md:col-span-7 md:row-start-1 ${idx % 2 !== 0 ? 'md:col-start-1 md:text-left' : 'md:col-start-6 md:text-right'} relative z-10`}>
                                <p className="font-mono text-green text-xs mb-2">Featured Project</p>
                                <h3 className="text-slate-lightest text-xl md:text-2xl font-bold mb-4">
                                    <a href={`#/project/${project.slug}`} className="hover:text-green transition-colors">
                                        {project.title}
                                    </a>
                                </h3>
                                
                                <div className="bg-navy-light p-6 rounded-lg shadow-xl text-sm text-slate leading-relaxed mb-4">
                                    {project.description}
                                </div>

                                <ul className={`flex flex-wrap gap-3 font-mono text-xs text-slate-light mb-4 ${idx % 2 !== 0 ? 'justify-start' : 'md:justify-end'}`}>
                                    {project.technologies?.map((tech, tIdx) => (
                                        <li key={tIdx}>{tech}</li>
                                    ))}
                                </ul>

                                <div className={`flex items-center gap-4 ${idx % 2 !== 0 ? 'justify-start' : 'md:justify-end'}`}>
                                    {project.github_url && (
                                        <a href={project.github_url} target="_blank" rel="noreferrer" className="text-slate-lightest hover:text-green transition-colors">
                                            <IconGitHub />
                                        </a>
                                    )}
                                    {project.live_url && (
                                        <a href={project.live_url} target="_blank" rel="noreferrer" className="text-slate-lightest hover:text-green transition-colors">
                                            <IconExternal />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Other Noteworthy Projects */}
                {otherProjects.length > 0 && (
                    <div className="mt-24">
                        <h3 className="text-slate-lightest text-2xl font-bold text-center mb-2">Other Noteworthy Projects</h3>
                        <p className="text-center text-sm font-mono text-green mb-12">
                            <a href="#/blogs" className="link-underline">view the archive</a>
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {otherProjects.map((project) => (
                                <div 
                                    key={project.id}
                                    className="bg-navy-light rounded-lg p-6 flex flex-col justify-between h-full hover:-translate-y-1 transition-all duration-200 group border border-transparent hover:border-green/10"
                                >
                                    <div>
                                        <div className="flex justify-between items-center mb-6">
                                            <span className="text-green"><IconFolder /></span>
                                            <div className="flex items-center gap-3">
                                                {project.github_url && (
                                                    <a href={project.github_url} target="_blank" rel="noreferrer" className="text-slate hover:text-green transition-colors">
                                                        <IconGitHub />
                                                    </a>
                                                )}
                                                <a href={`#/project/${project.slug}`} className="text-slate hover:text-green transition-colors">
                                                    <IconExternal />
                                                </a>
                                            </div>
                                        </div>

                                        <h3 className="text-slate-lightest text-lg font-semibold mb-2 group-hover:text-green transition-colors">
                                            <a href={`#/project/${project.slug}`}>{project.title}</a>
                                        </h3>
                                        <p className="text-sm text-slate leading-relaxed line-clamp-4">
                                            {project.description}
                                        </p>
                                    </div>

                                    <div className="flex flex-wrap gap-2 mt-6 font-mono text-xs text-slate-light">
                                        {project.technologies?.slice(0, 3).map((tech, tIdx) => (
                                            <span key={tIdx}>{tech}</span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </section>

            {/* ═══════════════════════════════════════════
                SKILLS SECTION
            ═══════════════════════════════════════════ */}
            <section id="skills" className="py-24 fade-section">
                <div className="flex items-center gap-4 mb-10">
                    <h2 className="text-slate-lightest text-2xl md:text-3xl font-bold whitespace-nowrap">
                        <span className="text-green font-mono text-xl mr-2">04.</span>
                        Skills & Expertise
                    </h2>
                    <div className="h-px bg-navy-lighter flex-grow max-w-[300px]"></div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {skillCategories.map((category, idx) => (
                        <div key={idx} className="bg-navy-light/50 border border-navy-lighter/30 rounded-lg p-6 hover:border-green/20 transition-all duration-300">
                            <h3 className="text-green font-mono text-sm font-semibold mb-5 flex items-center gap-2">
                                <span className="text-green/50">&#123;</span>
                                {category}
                                <span className="text-green/50">&#125;</span>
                            </h3>
                            <div className="space-y-3">
                                {skills[category].map((skill, sIdx) => (
                                    <div key={sIdx} className="space-y-1.5">
                                        <div className="flex justify-between items-center text-xs">
                                            <span className="text-slate-light font-medium">{skill.name}</span>
                                            <span className="font-mono text-slate/60">{skill.level}%</span>
                                        </div>
                                        <div className="h-1 bg-navy-lighter rounded-full overflow-hidden">
                                            <div 
                                                className="h-full bg-green/60 rounded-full transition-all duration-700 ease-out"
                                                style={{ width: `${skill.level}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ═══════════════════════════════════════════
                CONTACT SECTION
            ═══════════════════════════════════════════ */}
            <section id="contact" className="py-24 fade-section text-center max-w-xl mx-auto">
                <p className="font-mono text-green text-sm mb-4">05. What's Next?</p>
                <h2 className="text-slate-lightest text-4xl md:text-5xl font-bold mb-6">Get In Touch</h2>
                <p className="text-slate text-base leading-relaxed mb-10">
                    I'm currently looking for new opportunities to grow as a developer. Whether you have a project, 
                    a question, or just want to say hi, feel free to reach out — my inbox is always open!
                </p>

                {wasSuccessful && (
                    <div className="p-4 mb-8 rounded-lg bg-green-tint border border-green/30 text-green text-sm font-mono text-center">
                        Message sent successfully! I'll get back to you soon.
                    </div>
                )}

                <form onSubmit={handleContactSubmit} className="space-y-5 text-left">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                            <label className="block font-mono text-xs text-green mb-2" htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                value={nameVal}
                                onChange={e => setNameVal(e.target.value)}
                                className="w-full bg-navy-light border border-navy-lighter focus:border-green rounded-lg px-4 py-3 text-sm text-slate-lightest outline-none transition-colors placeholder:text-slate/40"
                                placeholder="Your name"
                                required
                            />
                        </div>
                        <div>
                            <label className="block font-mono text-xs text-green mb-2" htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                value={emailVal}
                                onChange={e => setEmailVal(e.target.value)}
                                className="w-full bg-navy-light border border-navy-lighter focus:border-green rounded-lg px-4 py-3 text-sm text-slate-lightest outline-none transition-colors placeholder:text-slate/40"
                                placeholder="your@email.com"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block font-mono text-xs text-green mb-2" htmlFor="message">Message</label>
                        <textarea
                            id="message"
                            rows="5"
                            value={messageVal}
                            onChange={e => setMessageVal(e.target.value)}
                            className="w-full bg-navy-light border border-navy-lighter focus:border-green rounded-lg px-4 py-3 text-sm text-slate-lightest outline-none transition-colors resize-none placeholder:text-slate/40"
                            placeholder="What's on your mind?"
                            required
                        ></textarea>
                    </div>

                    <div className="text-center pt-2">
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-8 py-3 rounded border border-green text-green font-mono text-sm hover:bg-green-tint transition-all duration-200 cursor-pointer disabled:opacity-50"
                        >
                            {processing ? 'Sending...' : 'Say Hello'}
                        </button>
                    </div>
                </form>
            </section>

            {/* Bottom padding */}
            <div className="h-24"></div>
        </AppLayout>
    );
}

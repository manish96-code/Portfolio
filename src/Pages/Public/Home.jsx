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
                <div className="space-y-6 max-w-2xl">
                    <p className="font-mono text-coral text-sm tracking-wide">
                        Hello, I'm
                    </p>
                    
                    <h1 className="font-display text-charcoal text-5xl sm:text-6xl md:text-8xl font-bold leading-[0.95] tracking-tight">
                        Manish
                        <br />
                        <span className="text-body-light">Kumar.</span>
                    </h1>
                    
                    <p className="text-body max-w-lg text-base md:text-lg leading-relaxed">
                        A full-stack developer currently at{' '}
                        <a href="#experience" className="text-coral link-underline font-medium">Comestro Techlabs</a>,
                        building exceptional web applications with Laravel, React, and modern databases.
                    </p>

                    <div className="pt-4 flex items-center gap-4">
                        <a 
                            href="#projects" 
                            className="inline-block px-7 py-3.5 rounded-full bg-coral text-white font-medium text-sm hover:bg-coral-dark transition-all duration-200 shadow-warm"
                        >
                            View my work
                        </a>
                        <a 
                            href="#contact" 
                            className="inline-block px-7 py-3.5 rounded-full border border-stone text-body font-medium text-sm hover:border-coral hover:text-coral transition-all duration-200"
                        >
                            Get in touch
                        </a>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════
                ABOUT SECTION
            ═══════════════════════════════════════════ */}
            <section id="about" className="py-28 fade-section">
                <div className="flex items-center gap-4 mb-12">
                    <p className="text-xs font-mono text-coral uppercase tracking-[0.2em]">About</p>
                    <div className="section-divider"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                    <div className="md:col-span-2 space-y-5 text-base leading-relaxed">
                        <p>
                            Hello! I'm Manish, a passionate software developer from Jaipur, India.
                            I enjoy building web applications that are structured, scalable, and solve
                            real-world problems. My interest in web development started during my
                            BCA program at Purnea University, where I discovered the joy of turning
                            database schemas into live, interactive products.
                        </p>
                        <p>
                            Currently, I'm interning at{' '}
                            <a href="https://comestro.com" target="_blank" rel="noreferrer" className="text-coral link-underline font-medium">
                                Comestro Techlabs Pvt Ltd
                            </a>
                            {' '}where I build multi-vendor e-commerce platforms, campus management
                            systems, and social networking applications using modern full-stack tooling.
                        </p>
                        <p className="text-body-light">Technologies I work with:</p>
                        
                        <ul className="grid grid-cols-2 gap-x-6 gap-y-2 mt-4 font-mono text-sm">
                            {(skills ? Object.values(skills).flat().map(s => s.name).slice(0, 8) : ['Laravel', 'React', 'PHP', 'MySQL', 'Inertia.js', 'Tailwind CSS', 'JavaScript', 'Git & GitHub']).map((tech, idx) => (
                                <li key={idx} className="flex items-center gap-2.5">
                                    <span className="text-coral text-xs">▸</span>
                                    <span className="text-charcoal-light">{tech}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Profile Image Placeholder */}
                    <div className="relative group mx-auto md:mx-0">
                        <div className="relative w-64 h-64 rounded-2xl overflow-hidden shadow-warm-lg border border-stone-light group-hover:border-coral-light transition-all duration-300">
                            {/* Placeholder avatar */}
                            <div className="w-full h-full bg-cream-dark flex items-center justify-center text-stone-dark">
                                <svg className="w-24 h-24 opacity-30" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════
                EXPERIENCE SECTION
            ═══════════════════════════════════════════ */}
            <section id="experience" className="py-28 fade-section">
                <div className="flex items-center gap-4 mb-12">
                    <p className="text-xs font-mono text-coral uppercase tracking-[0.2em]">Experience</p>
                    <div className="section-divider"></div>
                </div>

                <div className="max-w-2xl space-y-6">
                    {experiences?.map((exp, idx) => (
                        <div key={idx} className="bg-white rounded-xl p-7 md:p-8 shadow-warm border border-stone-light/60 hover:border-coral-light/40 transition-all duration-300 relative">
                            {/* Left accent bar */}
                            <div className="absolute left-0 top-6 bottom-6 w-[3px] rounded-full bg-coral/60"></div>
                            
                            <div className="pl-4">
                                <h3 className="font-display text-charcoal text-lg md:text-xl font-semibold">
                                    {exp.designation}{' '}
                                    <span className="text-coral">@ {exp.company}</span>
                                </h3>
                                <p className="font-mono text-sm text-body-light mt-1">{exp.duration}</p>
                                <p className="mt-4 text-body leading-relaxed text-sm">
                                    {exp.description}
                                </p>
                                <div className="flex flex-wrap gap-2 mt-4">
                                    {exp.skills_used?.map((skill, sIdx) => (
                                        <span key={sIdx} className="px-2.5 py-1 rounded-full bg-sage-tint text-sage text-xs font-mono font-medium">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ═══════════════════════════════════════════
                FEATURED PROJECTS SECTION
            ═══════════════════════════════════════════ */}
            <section id="projects" className="py-28 fade-section">
                <div className="flex items-center gap-4 mb-12">
                    <p className="text-xs font-mono text-coral uppercase tracking-[0.2em]">Projects</p>
                    <div className="section-divider"></div>
                </div>

                {/* Featured projects — alternating left/right */}
                <div className="space-y-20">
                    {featuredProjects.map((project, idx) => (
                        <div key={project.id} className={`relative grid grid-cols-1 md:grid-cols-12 items-center gap-4`}>
                            
                            {/* Project Image / Visual Area */}
                            <div className={`md:col-span-7 ${idx % 2 !== 0 ? 'md:col-start-6' : ''} relative rounded-xl overflow-hidden group`}>
                                <a href={`#/project/${project.slug}`} className="block">
                                    <div className="bg-cream-dark aspect-video rounded-xl flex items-center justify-center relative overflow-hidden group-hover:shadow-warm-lg transition-all duration-300 border border-stone-light">
                                        <span className="text-6xl md:text-8xl font-display font-bold text-stone/30 select-none">
                                            {project.title.substring(0, 2)}
                                        </span>
                                    </div>
                                </a>
                            </div>

                            {/* Project Text Details */}
                            <div className={`md:col-span-7 md:row-start-1 ${idx % 2 !== 0 ? 'md:col-start-1 md:text-left' : 'md:col-start-6 md:text-right'} relative z-10`}>
                                <p className="font-mono text-coral text-xs mb-2 uppercase tracking-wider">Featured Project</p>
                                <h3 className="font-display text-charcoal text-xl md:text-2xl font-bold mb-4">
                                    <a href={`#/project/${project.slug}`} className="hover:text-coral transition-colors">
                                        {project.title}
                                    </a>
                                </h3>
                                
                                <div className="bg-white p-6 rounded-xl shadow-warm-lg text-sm text-body leading-relaxed mb-4 border border-stone-light/50">
                                    {project.description}
                                </div>

                                <ul className={`flex flex-wrap gap-3 font-mono text-xs text-body-light mb-4 ${idx % 2 !== 0 ? 'justify-start' : 'md:justify-end'}`}>
                                    {project.technologies?.map((tech, tIdx) => (
                                        <li key={tIdx}>{tech}</li>
                                    ))}
                                </ul>

                                <div className={`flex items-center gap-4 ${idx % 2 !== 0 ? 'justify-start' : 'md:justify-end'}`}>
                                    {project.github_url && (
                                        <a href={project.github_url} target="_blank" rel="noreferrer" className="text-charcoal hover:text-coral transition-colors">
                                            <IconGitHub />
                                        </a>
                                    )}
                                    {project.live_url && (
                                        <a href={project.live_url} target="_blank" rel="noreferrer" className="text-charcoal hover:text-coral transition-colors">
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
                    <div className="mt-28">
                        <h3 className="font-display text-charcoal text-2xl font-bold text-center mb-2">Other Noteworthy Projects</h3>
                        <p className="text-center text-sm text-body-light mb-12">
                            <a href="#/blogs" className="text-coral link-underline">view the archive</a>
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            {otherProjects.map((project) => (
                                <div 
                                    key={project.id}
                                    className="bg-white rounded-xl p-6 flex flex-col justify-between h-full card-lift group border border-stone-light/60 shadow-warm"
                                >
                                    <div>
                                        <div className="flex justify-between items-center mb-6">
                                            <span className="text-coral"><IconFolder /></span>
                                            <div className="flex items-center gap-3">
                                                {project.github_url && (
                                                    <a href={project.github_url} target="_blank" rel="noreferrer" className="text-body-light hover:text-coral transition-colors">
                                                        <IconGitHub />
                                                    </a>
                                                )}
                                                <a href={`#/project/${project.slug}`} className="text-body-light hover:text-coral transition-colors">
                                                    <IconExternal />
                                                </a>
                                            </div>
                                        </div>

                                        <h3 className="font-display text-charcoal text-lg font-semibold mb-2 group-hover:text-coral transition-colors">
                                            <a href={`#/project/${project.slug}`}>{project.title}</a>
                                        </h3>
                                        <p className="text-sm text-body leading-relaxed line-clamp-4">
                                            {project.description}
                                        </p>
                                    </div>

                                    <div className="flex flex-wrap gap-2 mt-6 font-mono text-xs text-body-light">
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
            <section id="skills" className="py-28 fade-section">
                <div className="flex items-center gap-4 mb-12">
                    <p className="text-xs font-mono text-coral uppercase tracking-[0.2em]">Skills</p>
                    <div className="section-divider"></div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {skillCategories.map((category, idx) => (
                        <div key={idx} className="bg-white rounded-xl p-6 border border-stone-light/60 shadow-warm hover:border-coral-light/30 transition-all duration-300">
                            <h3 className="text-coral font-mono text-sm font-semibold mb-5 flex items-center gap-2">
                                <span className="text-coral/40">&#123;</span>
                                {category}
                                <span className="text-coral/40">&#125;</span>
                            </h3>
                            <div className="space-y-3.5">
                                {skills[category].map((skill, sIdx) => (
                                    <div key={sIdx} className="space-y-1.5">
                                        <div className="flex justify-between items-center text-xs">
                                            <span className="text-charcoal-light font-medium">{skill.name}</span>
                                            <span className="font-mono text-body-light/60">{skill.level}%</span>
                                        </div>
                                        <div className="h-1.5 bg-cream-dark rounded-full overflow-hidden">
                                            <div 
                                                className="h-full bg-sage rounded-full skill-bar"
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
            <section id="contact" className="py-28 fade-section text-center max-w-xl mx-auto">
                <p className="font-mono text-coral text-xs uppercase tracking-[0.2em] mb-4">Contact</p>
                <h2 className="font-display text-charcoal text-4xl md:text-5xl font-bold mb-6">Let's Talk</h2>
                <p className="text-body text-base leading-relaxed mb-12">
                    I'm currently looking for new opportunities to grow as a developer. Whether you have a project, 
                    a question, or just want to say hi — my inbox is always open.
                </p>

                {wasSuccessful && (
                    <div className="p-4 mb-8 rounded-xl bg-sage-tint border border-sage/30 text-sage text-sm font-mono text-center">
                        Message sent successfully! I'll get back to you soon.
                    </div>
                )}

                <form onSubmit={handleContactSubmit} className="space-y-5 text-left">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                            <label className="block text-xs font-medium text-charcoal-light mb-2" htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                value={nameVal}
                                onChange={e => setNameVal(e.target.value)}
                                className="w-full bg-white border border-stone focus:border-coral rounded-xl px-4 py-3 text-sm text-charcoal outline-none transition-colors placeholder:text-stone-dark/50"
                                placeholder="Your name"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-charcoal-light mb-2" htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                value={emailVal}
                                onChange={e => setEmailVal(e.target.value)}
                                className="w-full bg-white border border-stone focus:border-coral rounded-xl px-4 py-3 text-sm text-charcoal outline-none transition-colors placeholder:text-stone-dark/50"
                                placeholder="your@email.com"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-charcoal-light mb-2" htmlFor="message">Message</label>
                        <textarea
                            id="message"
                            rows="5"
                            value={messageVal}
                            onChange={e => setMessageVal(e.target.value)}
                            className="w-full bg-white border border-stone focus:border-coral rounded-xl px-4 py-3 text-sm text-charcoal outline-none transition-colors resize-none placeholder:text-stone-dark/50"
                            placeholder="What's on your mind?"
                            required
                        ></textarea>
                    </div>

                    <div className="text-center pt-2">
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-8 py-3.5 rounded-full bg-coral text-white font-medium text-sm hover:bg-coral-dark transition-all duration-200 cursor-pointer disabled:opacity-50 shadow-warm"
                        >
                            {processing ? 'Sending...' : 'Send Message'}
                        </button>
                    </div>
                </form>
            </section>

            {/* Bottom padding */}
            <div className="h-24"></div>
        </AppLayout>
    );
}

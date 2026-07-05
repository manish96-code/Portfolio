import React, { useState, useEffect } from 'react';
import AppLayout from '../../Layouts/AppLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Home({ projects, skills, experiences, certificates, socialLinks, settings }) {
    const { data, setData, post, processing, errors, reset, wasSuccessful } = useForm({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const [typingText, setTypingText] = useState('');
    const [activeTab, setActiveTab] = useState('all');

    const designations = [
        'Full Stack Laravel Developer',
        'Backend Developer',
        'React Developer',
        'Problem Solver'
    ];

    // Typing Designation Effect
    useEffect(() => {
        let currentIdx = 0;
        let charIdx = 0;
        let isDeleting = false;
        let timeout;

        const type = () => {
            const currentString = designations[currentIdx];
            if (!isDeleting) {
                setTypingText(currentString.substring(0, charIdx + 1));
                charIdx++;

                if (charIdx === currentString.length) {
                    isDeleting = true;
                    timeout = setTimeout(type, 1500); // Wait at end of string
                } else {
                    timeout = setTimeout(type, 80);
                }
            } else {
                setTypingText(currentString.substring(0, charIdx - 1));
                charIdx--;

                if (charIdx === 0) {
                    isDeleting = false;
                    currentIdx = (currentIdx + 1) % designations.length;
                    timeout = setTimeout(type, 500);
                } else {
                    timeout = setTimeout(type, 40);
                }
            }
        };

        type();
        return () => clearTimeout(timeout);
    }, []);

    const handleContactSubmit = (e) => {
        e.preventDefault();
        post('/contact', {
            onSuccess: () => reset(),
        });
    };

    // Skills processing
    const skillKeys = Object.keys(skills || {});

    // Filter projects
    const allProjects = projects || [];
    const filteredProjects = activeTab === 'all'
        ? allProjects
        : allProjects.filter(project => {
            const tags = Array.isArray(project.technologies) ? project.technologies : JSON.parse(project.technologies || '[]');
            return tags.some(tag => tag.toLowerCase() === activeTab.toLowerCase());
        });

    const uniqueTags = ['all', ...new Set(allProjects.flatMap(project => {
        return Array.isArray(project.technologies) ? project.technologies : JSON.parse(project.technologies || '[]');
    }))];

    return (
        <AppLayout settings={settings} socialLinks={socialLinks}>
            <Head>
                <title>Home - मनीष कुमार</title>
                <meta name="description" content={settings?.meta_description || 'Manish Kumar Professional Portfolio'} />
                <meta name="title" content={settings?.meta_title} />
            </Head>

            {/* Hero Section */}
            <section className="max-w-6xl mx-auto px-6 py-20 md:py-32 grid grid-cols-1 md:grid-cols-12 gap-12 items-center relative">
                <div className="md:col-span-7 flex flex-col justify-center space-y-6">
                    <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-[#FF2D20]/10 border border-[#FF2D20]/20 text-[#FF2D20] text-xs font-semibold w-fit">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                        {settings?.current_company || 'Comestro Techlabs Pvt Ltd'} Intern
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black text-slate-100 tracking-tight leading-none">
                        Hi, I am <br />
                        <span className="bg-gradient-to-r from-[#FF2D20] via-[#FF5F56] to-purple-500 bg-clip-text text-transparent">
                            {settings?.name || 'Manish Kumar'}
                        </span>
                    </h1>

                    <div className="h-10 flex items-center">
                        <p className="text-xl md:text-2xl font-mono text-slate-400">
                            &gt; <span className="text-cyan-400 font-bold">{typingText}</span>
                            <span className="animate-ping ml-1 text-[#FF2D20]">|</span>
                        </p>
                    </div>

                    <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-xl font-light">
                        {settings?.bio || 'Full Stack Developer Intern specializing in high performance web applications using Laravel, React, and MySQL.'}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 pt-4">
                        <a href="#projects" className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#FF2D20] to-purple-600 hover:from-[#e0241b] hover:to-purple-500 text-white font-bold transition shadow-lg shadow-[#FF2D20]/20 hover:scale-[1.02] duration-300">
                            Explore Projects
                        </a>
                        <a 
                            href="/resume/download" 
                            target="_blank"
                            className="px-6 py-3.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 hover:text-white font-bold hover:bg-slate-850 hover:border-slate-700 transition duration-300 flex items-center gap-2"
                        >
                            Download Resume
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                        </a>
                    </div>
                </div>

                {/* Avatar Shield */}
                <div className="md:col-span-5 flex justify-center relative">
                    <div className="absolute inset-0 bg-[#FF2D20]/10 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
                    <div className="w-72 h-72 md:w-80 md:h-80 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-850 p-4 shadow-2xl relative overflow-hidden group">
                        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-30"></div>
                        <div className="w-full h-full rounded-2xl bg-gradient-to-br from-[#FF2D20]/5 to-purple-950/15 border border-slate-800 flex flex-col items-center justify-center text-center p-6 space-y-4">
                            <div className="w-24 h-24 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center relative shadow-inner overflow-hidden">
                                <span className="text-4xl font-extrabold text-white">MK</span>
                                <div className="absolute inset-0 bg-gradient-to-t from-[#FF2D20]/20 to-transparent"></div>
                            </div>
                            <div>
                                <h3 className="font-extrabold text-xl text-slate-100">{settings?.name || 'Manish Kumar'}</h3>
                                <p className="text-xs text-[#FF2D20] font-semibold mt-1 tracking-wider uppercase">{settings?.title || 'Full Stack Developer'}</p>
                            </div>
                            <p className="text-xs text-slate-400 leading-relaxed font-light">
                                Education: {settings?.education || 'BCA'}<br />
                                Location: {settings?.location || 'India'}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="max-w-6xl mx-auto px-6 py-20 border-t border-slate-900 grid grid-cols-1 md:grid-cols-12 gap-12">
                <div className="md:col-span-5 space-y-4">
                    <h4 className="text-xs text-[#FF2D20] font-black uppercase tracking-widest">Biography</h4>
                    <h2 className="text-3xl font-extrabold text-slate-100">Career Objective & Background</h2>
                    <p className="text-slate-400 text-sm leading-relaxed font-light">
                        {settings?.objective || 'Passionate engineer focused on crafting complete full-stack web applications.'}
                    </p>
                    <div className="pt-4 space-y-3.5">
                        <div className="flex items-center gap-3">
                            <span className="w-6 h-6 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-xs text-[#FF2D20]">🏢</span>
                            <span className="text-sm text-slate-300">Interning at <strong className="text-white">{settings?.current_company || 'Comestro Techlabs'}</strong></span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="w-6 h-6 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-xs text-[#FF2D20]">🎓</span>
                            <span className="text-sm text-slate-300">Degree: <strong className="text-white">{settings?.education || 'BCA'}</strong></span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="w-6 h-6 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-xs text-[#FF2D20]">📍</span>
                            <span className="text-sm text-slate-300">Based in <strong className="text-white">{settings?.location || 'India'}</strong></span>
                        </div>
                    </div>
                </div>

                <div className="md:col-span-7 bg-slate-900/40 border border-slate-900 p-8 rounded-2xl relative overflow-hidden backdrop-blur-sm">
                    <h3 className="font-bold text-slate-200 mb-6 text-sm uppercase tracking-wider">Experience & Internships Timeline</h3>
                    <div className="relative border-l border-slate-800 pl-6 space-y-8">
                        {experiences?.map((exp, idx) => {
                            const tech = Array.isArray(exp.skills_used) ? exp.skills_used : JSON.parse(exp.skills_used || '[]');
                            return (
                                <div key={idx} className="relative">
                                    <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-[#020617] border-2 border-[#FF2D20] flex items-center justify-center">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#FF2D20]"></div>
                                    </div>
                                    <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-2 mb-2">
                                        <h4 className="font-extrabold text-base text-slate-100">{exp.designation}</h4>
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF2D20] px-2 py-0.5 rounded bg-[#FF2D20]/15">
                                            {exp.duration}
                                        </span>
                                    </div>
                                    <span className="text-xs text-slate-400 font-semibold mb-3 block">{exp.company}</span>
                                    <p className="text-xs text-slate-400 leading-relaxed font-light mb-4">
                                        {exp.description}
                                    </p>
                                    <div className="flex flex-wrap gap-1.5">
                                        {tech.map((t, index) => (
                                            <span key={index} className="px-2 py-0.5 rounded bg-slate-950 text-slate-500 border border-slate-850 text-[9px] uppercase tracking-wider font-bold">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Skills Section */}
            <section id="skills" className="max-w-6xl mx-auto px-6 py-20 border-t border-slate-900">
                <div className="text-center mb-12">
                    <h4 className="text-xs text-[#FF2D20] font-black uppercase tracking-widest">Stack</h4>
                    <h2 className="text-3xl font-extrabold text-slate-100 mt-2">Technical Skills & Ecosystem</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {skillKeys.map((category, idx) => (
                        <div key={idx} className="bg-slate-900/20 border border-slate-900/60 p-6 rounded-2xl">
                            <h3 className="font-extrabold text-sm text-[#FF2D20] uppercase tracking-wider mb-6 pb-2 border-b border-slate-900">
                                {category}
                            </h3>
                            <div className="space-y-4">
                                {skills[category].map((skill, sIdx) => (
                                    <div key={sIdx} className="space-y-2">
                                        <div className="flex justify-between items-center text-xs">
                                            <span className="font-bold text-slate-200">{skill.name}</span>
                                            <span className="text-slate-500 font-semibold">{skill.level}%</span>
                                        </div>
                                        <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                                            <div 
                                                className="bg-gradient-to-r from-[#FF2D20] to-purple-600 h-full rounded-full"
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

            {/* Projects Grid */}
            <section id="projects" className="max-w-6xl mx-auto px-6 py-20 border-t border-slate-900">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
                    <div>
                        <h4 className="text-xs text-[#FF2D20] font-black uppercase tracking-widest">Showcase</h4>
                        <h2 className="text-3xl font-extrabold text-slate-100 mt-2">Selected Case Studies</h2>
                    </div>

                    {/* Filter Tabs */}
                    <div className="flex flex-wrap gap-2.5">
                        {uniqueTags.map((tag, idx) => (
                            <button
                                key={idx}
                                onClick={() => setActiveTab(tag)}
                                className={`px-4 py-1.5 rounded-xl text-xs font-semibold capitalize transition ${
                                    activeTab === tag 
                                        ? 'bg-[#FF2D20] text-white shadow-lg shadow-[#FF2D20]/25' 
                                        : 'bg-slate-900/50 hover:bg-slate-800 text-slate-400 border border-slate-850'
                                }`}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {filteredProjects.map((project) => {
                        const tags = Array.isArray(project.technologies) ? project.technologies : JSON.parse(project.technologies || '[]');
                        return (
                            <article key={project.id} className="group bg-slate-900/30 border border-slate-900 hover:border-slate-850 p-6 rounded-2xl flex flex-col justify-between hover:bg-slate-900/50 transition duration-300 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-[#FF2D20]/5 rounded-full blur-xl group-hover:bg-[#FF2D20]/10 transition-all duration-300"></div>
                                <div>
                                    <div className="flex justify-between items-center gap-2 mb-4">
                                        <div className="flex flex-wrap gap-1.5">
                                            {tags.map((t, idx) => (
                                                <span key={idx} className="px-2 py-0.5 rounded bg-slate-950 text-cyan-400 border border-slate-850 text-[9px] uppercase tracking-wider font-bold">
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                        {project.is_featured && (
                                            <span className="px-2 py-0.5 rounded bg-[#FF2D20]/10 text-[#FF2D20] border border-[#FF2D20]/30 text-[9px] font-bold uppercase tracking-wider">
                                                Featured
                                            </span>
                                        )}
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-100 group-hover:text-[#FF2D20] transition duration-300 mb-3">
                                        {project.title}
                                    </h3>
                                    <p className="text-slate-400 text-xs leading-relaxed mb-6 font-light">
                                        {project.description}
                                    </p>
                                </div>
                                <div className="flex items-center justify-between pt-4 border-t border-slate-900">
                                    <a 
                                        href={project.github_url} 
                                        target="_blank" 
                                        rel="noreferrer" 
                                        className="text-xs text-slate-500 hover:text-slate-200 transition"
                                    >
                                        GitHub Link &rarr;
                                    </a>
                                    <Link 
                                        href={`/project/${project.slug}`}
                                        className="text-xs text-[#FF2D20] font-bold hover:underline transition"
                                    >
                                        View Case Study
                                    </Link>
                                </div>
                            </article>
                        );
                    })}
                </div>
            </section>

            {/* Certificates Section */}
            <section className="max-w-6xl mx-auto px-6 py-20 border-t border-slate-900">
                <div className="text-center mb-12">
                    <h4 className="text-xs text-[#FF2D20] font-black uppercase tracking-widest">Achievements</h4>
                    <h2 className="text-3xl font-extrabold text-slate-100 mt-2">Certifications & Awards</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {certificates?.map((cert) => (
                        <div key={cert.id} className="p-6 rounded-2xl bg-slate-900/30 border border-slate-900 flex gap-6 items-center hover:border-slate-800 transition">
                            <div className="w-12 h-12 rounded-xl bg-[#FF2D20]/10 flex items-center justify-center font-bold text-lg text-[#FF2D20]">
                                🏆
                            </div>
                            <div className="flex-grow">
                                <h3 className="font-bold text-slate-200">{cert.title}</h3>
                                <div className="flex justify-between items-center text-xs text-slate-500 mt-1">
                                    <span>{cert.organization}</span>
                                    <span>{cert.issue_date}</span>
                                </div>
                            </div>
                            {cert.credential_url && (
                                <a 
                                    href={cert.credential_url} 
                                    target="_blank" 
                                    rel="noreferrer"
                                    className="px-3 py-1.5 rounded-lg border border-slate-800 text-xs text-slate-400 hover:text-white hover:border-slate-700 transition"
                                >
                                    Verify
                                </a>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="max-w-6xl mx-auto px-6 py-20 border-t border-slate-900 relative">
                <div className="max-w-3xl mx-auto text-center mb-12">
                    <h4 className="text-xs text-[#FF2D20] font-black uppercase tracking-widest">Connect</h4>
                    <h2 className="text-3xl font-extrabold text-slate-100 mt-2">Let's Work Together</h2>
                    <p className="text-slate-400 text-xs mt-2">Submit details directly to save a message in my secure database.</p>
                </div>

                <div className="max-w-xl mx-auto">
                    {wasSuccessful && (
                        <div className="p-4 mb-6 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs text-center font-semibold">
                            Success! Your message was submitted to my SQLite/MySQL backend database.
                        </div>
                    )}

                    <form onSubmit={handleContactSubmit} className="space-y-5 p-8 rounded-2xl bg-slate-950/60 border border-slate-900 backdrop-blur-sm shadow-xl">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2" htmlFor="name">Your Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                    className="w-full bg-slate-900/60 border border-slate-900 focus:border-[#FF2D20]/60 focus:ring-1 focus:ring-[#FF2D20]/20 rounded-xl px-4 py-2.5 text-xs text-slate-200 transition"
                                    placeholder="Jane Doe"
                                    required
                                />
                                {errors.name && <p className="text-[10px] text-rose-500 mt-1">{errors.name}</p>}
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2" htmlFor="email">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={data.email}
                                    onChange={e => setData('email', e.target.value)}
                                    className="w-full bg-slate-900/60 border border-slate-900 focus:border-[#FF2D20]/60 focus:ring-1 focus:ring-[#FF2D20]/20 rounded-xl px-4 py-2.5 text-xs text-slate-200 transition"
                                    placeholder="jane@example.com"
                                    required
                                />
                                {errors.email && <p className="text-[10px] text-rose-500 mt-1">{errors.email}</p>}
                            </div>
                        </div>

                        <div>
                            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2" htmlFor="subject">Subject</label>
                            <input
                                type="text"
                                id="subject"
                                value={data.subject}
                                onChange={e => setData('subject', e.target.value)}
                                className="w-full bg-slate-900/60 border border-slate-900 focus:border-[#FF2D20]/60 focus:ring-1 focus:ring-[#FF2D20]/20 rounded-xl px-4 py-2.5 text-xs text-slate-200 transition"
                                placeholder="Consulting/Project Collaboration"
                                required
                            />
                            {errors.subject && <p className="text-[10px] text-rose-500 mt-1">{errors.subject}</p>}
                        </div>

                        <div>
                            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2" htmlFor="message">Message</label>
                            <textarea
                                id="message"
                                rows="5"
                                value={data.message}
                                onChange={e => setData('message', e.target.value)}
                                className="w-full bg-slate-900/60 border border-slate-900 focus:border-[#FF2D20]/60 focus:ring-1 focus:ring-[#FF2D20]/20 rounded-xl px-4 py-2.5 text-xs text-slate-200 transition resize-none"
                                placeholder="Details of your request..."
                                required
                            ></textarea>
                            {errors.message && <p className="text-[10px] text-rose-500 mt-1">{errors.message}</p>}
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full py-3 rounded-xl bg-[#FF2D20] hover:bg-[#e0241b] text-white font-bold transition shadow-lg shadow-[#FF2D20]/20 disabled:opacity-50"
                        >
                            {processing ? 'Sending details...' : 'Submit Message'}
                        </button>
                    </form>
                </div>
            </section>
        </AppLayout>
    );
}

import React, { useState, useEffect } from 'react';
import AppLayout from '../../Layouts/AppLayout';

export default function Home({ projects, skills, experiences, certificates, socialLinks, settings }) {
    // Local Contact Form States (replacing useForm)
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [processing, setProcessing] = useState(false);
    const [wasSuccessful, setWasSuccessful] = useState(false);

    const [activeTab, setActiveTab] = useState('all');

    useEffect(() => {
        document.title = `${settings?.name || 'Manish Kumar'} | Portfolio`;
    }, [settings]);

    const handleContactSubmit = (e) => {
        e.preventDefault();
        setProcessing(true);
        
        // Simulate local messaging store
        setTimeout(() => {
            setProcessing(false);
            setWasSuccessful(true);
            setName('');
            setEmail('');
            setSubject('');
            setMessage('');
            setTimeout(() => setWasSuccessful(false), 5000);
        }, 1000);
    };

    const skillCategories = Object.keys(skills || {});
    const allProjects = projects || [];
    
    const filteredProjects = activeTab === 'all'
        ? allProjects
        : allProjects.filter(project => {
            return project.technologies.some(tag => tag.toLowerCase() === activeTab.toLowerCase());
        });

    const uniqueTags = ['all', ...new Set(allProjects.flatMap(project => project.technologies))];

    return (
        <AppLayout settings={settings} socialLinks={socialLinks}>
            {/* 1. Hero Section (White Background) */}
            <section className="bg-white py-24 md:py-36 border-b border-[#E5E7EB]">
                <div className="max-w-[1280px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                    <div className="lg:col-span-8 space-y-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-[#E5E7EB] text-[#6B7280] text-xs font-medium">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                            {settings?.current_company || 'Comestro Techlabs Pvt Ltd'} Intern
                        </div>

                        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[#111827] leading-none">
                            {settings?.name || 'Manish Kumar'}<br />
                            <span className="text-[#6B7280] text-3xl sm:text-5xl font-medium block mt-3">
                                {settings?.title || 'Full Stack Web Developer'}
                            </span>
                        </h1>

                        <p className="text-[#6B7280] text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
                            {settings?.bio || 'I build clean, minimal, and high-performance web applications using Laravel, React, and MySQL.'}
                        </p>

                        <div className="flex flex-wrap items-center gap-4 pt-4">
                            <a 
                                href="#projects" 
                                className="px-5 py-2.5 rounded-lg bg-[#2563EB] hover:bg-[#1d4ed8] text-white text-sm font-semibold transition duration-150 shadow-sm"
                            >
                                View Projects
                            </a>
                            <a 
                                href={settings?.resume_file || '#'} 
                                target="_blank"
                                rel="noreferrer"
                                className="px-5 py-2.5 rounded-lg bg-white border border-[#2563EB] text-[#2563EB] text-sm font-semibold hover:bg-[#2563EB]/5 transition duration-150"
                            >
                                Download Resume
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. About & Experience Section (Soft Gray Background) */}
            <section id="about" className="bg-[#F8FAFC] py-24 border-b border-[#E5E7EB]">
                <div id="experience" className="max-w-[1280px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16">
                    <div className="lg:col-span-5 space-y-6">
                        <div className="space-y-2">
                            <span className="text-xs font-semibold text-[#2563EB] uppercase tracking-wider">About Me</span>
                            <h2 className="text-3xl font-bold tracking-tight text-[#111827]">Background & Direction</h2>
                        </div>
                        <p className="text-[#6B7280] text-sm leading-relaxed">
                            {settings?.objective || 'Highly motivated developer seeking to leverage modern frameworks to deliver robust client applications.'}
                        </p>
                        
                        <div className="space-y-4 pt-4 border-t border-[#E5E7EB]">
                            <div className="flex items-center gap-3 text-sm text-[#6B7280]">
                                <span className="font-semibold text-[#111827]">Education:</span>
                                <span>{settings?.education || 'BCA, Purnea University'}</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-[#6B7280]">
                                <span className="font-semibold text-[#111827]">Current Location:</span>
                                <span>{settings?.location || 'Jaipur, Rajasthan, India'}</span>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-7 space-y-8">
                        <h3 className="text-xs font-bold text-[#6B7280] uppercase tracking-wider pb-2 border-b border-[#E5E7EB]">Timeline</h3>
                        <div className="space-y-8">
                            {experiences?.map((exp, idx) => (
                                <div key={idx} className="bg-white border border-[#E5E7EB] rounded-xl p-6 shadow-sm transition hover:border-[#2563EB]/40">
                                    <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-2 mb-3">
                                        <div>
                                            <h4 className="font-bold text-base text-[#111827]">{exp.designation}</h4>
                                            <span className="text-xs text-[#6B7280]">{exp.company}</span>
                                        </div>
                                        <span className="text-[11px] font-semibold text-[#2563EB] px-2.5 py-1 rounded bg-[#2563EB]/5 border border-[#2563EB]/10">
                                            {exp.duration}
                                        </span>
                                    </div>
                                    <p className="text-xs text-[#6B7280] leading-relaxed mb-4">
                                        {exp.description}
                                    </p>
                                    <div className="flex flex-wrap gap-1.5">
                                        {exp.skills_used?.map((t, index) => (
                                            <span key={index} className="px-2 py-0.5 rounded bg-[#F3F4F6] text-[#4B5563] text-[10px] font-medium">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Skills Section (White Background) */}
            <section id="skills" className="bg-white py-24 border-b border-[#E5E7EB]">
                <div className="max-w-[1280px] mx-auto px-6">
                    <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
                        <span className="text-xs font-semibold text-[#2563EB] uppercase tracking-wider">Expertise</span>
                        <h2 className="text-3xl font-bold tracking-tight text-[#111827]">Skills Ecosystem</h2>
                        <p className="text-[#6B7280] text-sm">Categorized list of key languages, frameworks, and workflow tools.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {skillCategories.map((category, idx) => (
                            <div key={idx} className="bg-white border border-[#E5E7EB] rounded-xl p-6 shadow-sm">
                                <h3 className="font-bold text-sm text-[#111827] uppercase tracking-wider pb-3 border-b border-[#E5E7EB] mb-4">
                                    {category}
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {skills[category].map((skill, sIdx) => (
                                        <span 
                                            key={sIdx}
                                            className="px-3 py-1.5 rounded-lg bg-[#F8FAFC] border border-[#E5E7EB] text-[#111827] text-xs font-medium hover:border-[#2563EB]/40 transition duration-150"
                                        >
                                            {skill.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. Projects Grid (Soft Gray Background) */}
            <section id="projects" className="bg-[#F8FAFC] py-24 border-b border-[#E5E7EB]">
                <div className="max-w-[1280px] mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
                        <div className="space-y-2">
                            <span className="text-xs font-semibold text-[#2563EB] uppercase tracking-wider">Showcase</span>
                            <h2 className="text-3xl font-bold tracking-tight text-[#111827]">Case Studies & Projects</h2>
                        </div>

                        {/* Filter Tabs */}
                        <div className="flex flex-wrap gap-2">
                            {uniqueTags.map((tag, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveTab(tag)}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition ${
                                        activeTab === tag 
                                            ? 'bg-[#2563EB] text-white' 
                                            : 'bg-white text-[#6B7280] border border-[#E5E7EB] hover:bg-slate-50'
                                    }`}
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProjects.map((project) => (
                            <article key={project.id} className="group bg-white border border-[#E5E7EB] rounded-xl overflow-hidden flex flex-col justify-between hover:border-[#2563EB]/40 transition-all duration-200 shadow-sm hover:-translate-y-1">
                                <div>
                                    {/* Realistic Browser Mockup Frame */}
                                    <div className="border-b border-[#E5E7EB] bg-[#F8FAFC] px-4 py-2.5 flex items-center gap-2">
                                        <div className="flex gap-1.5">
                                            <span className="w-2.5 h-2.5 rounded-full bg-[#E5E7EB]"></span>
                                            <span className="w-2.5 h-2.5 rounded-full bg-[#E5E7EB]"></span>
                                            <span className="w-2.5 h-2.5 rounded-full bg-[#E5E7EB]"></span>
                                        </div>
                                        <div className="bg-white border border-[#E5E7EB] text-[10px] text-[#6B7280] rounded px-3 py-0.5 text-center flex-grow max-w-[160px] truncate font-mono">
                                            {project.slug}.local
                                        </div>
                                    </div>

                                    <div className="p-6 space-y-4">
                                        <div className="flex justify-between items-center">
                                            <div className="flex flex-wrap gap-1">
                                                {project.technologies?.slice(0, 3).map((t, idx) => (
                                                    <span key={idx} className="px-2 py-0.5 rounded bg-[#F3F4F6] text-[#6B7280] text-[9px] uppercase tracking-wider font-bold">
                                                        {t}
                                                    </span>
                                                ))}
                                            </div>
                                            {project.is_featured && (
                                                <span className="text-[9px] font-bold text-[#2563EB] uppercase tracking-wider">
                                                    ★ Featured
                                                </span>
                                            )}
                                        </div>

                                        <h3 className="text-lg font-bold text-[#111827]">
                                            {project.title}
                                        </h3>
                                        
                                        <p className="text-[#6B7280] text-xs leading-relaxed line-clamp-3">
                                            {project.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Action Links */}
                                <div className="px-6 pb-6 pt-4 border-t border-[#E5E7EB]/60 flex items-center justify-between gap-3">
                                    <div className="flex gap-2">
                                        {project.github_url && (
                                            <a 
                                                href={project.github_url} 
                                                target="_blank" 
                                                rel="noreferrer" 
                                                className="p-1.5 rounded-md border border-[#E5E7EB] hover:border-[#2563EB]/40 text-[#6B7280] hover:text-[#2563EB] transition"
                                                title="GitHub Repository"
                                            >
                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                                </svg>
                                            </a>
                                        )}
                                        {project.live_url && (
                                            <a 
                                                href={project.live_url} 
                                                target="_blank" 
                                                rel="noreferrer" 
                                                className="p-1.5 rounded-md border border-[#E5E7EB] hover:border-[#2563EB]/40 text-[#6B7280] hover:text-[#2563EB] transition"
                                                title="Live Demo"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                                                </svg>
                                            </a>
                                        )}
                                    </div>
                                    <a 
                                        href={`#/project/${project.slug}`}
                                        className="px-3 py-1.5 rounded-lg border border-[#2563EB] text-[#2563EB] text-xs font-semibold hover:bg-[#2563EB]/5 transition"
                                    >
                                        View Details
                                    </a>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. Certificates Section (White Background) */}
            <section className="bg-white py-24 border-b border-[#E5E7EB]">
                <div className="max-w-[1280px] mx-auto px-6">
                    <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
                        <span className="text-xs font-semibold text-[#2563EB] uppercase tracking-wider">Achievements</span>
                        <h2 className="text-3xl font-bold tracking-tight text-[#111827]">Certifications & Awards</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {certificates?.map((cert) => (
                            <div key={cert.id} className="p-6 rounded-xl bg-white border border-[#E5E7EB] flex justify-between items-center shadow-sm hover:border-[#2563EB]/40 transition">
                                <div className="space-y-1">
                                    <h3 className="font-bold text-sm text-[#111827]">{cert.title}</h3>
                                    <div className="flex gap-4 text-xs text-[#6B7280]">
                                        <span>{cert.organization}</span>
                                        <span>{cert.issue_date}</span>
                                    </div>
                                </div>
                                {cert.credential_url && (
                                    <a 
                                        href={cert.credential_url} 
                                        target="_blank" 
                                        rel="noreferrer"
                                        className="px-3 py-1.5 rounded-lg border border-[#E5E7EB] text-xs text-[#6B7280] hover:text-[#2563EB] hover:border-[#2563EB]/40 transition"
                                    >
                                        Verify
                                    </a>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 6. Contact Section (Soft Gray Background) */}
            <section id="contact" className="bg-[#F8FAFC] py-24">
                <div className="max-w-[1280px] mx-auto px-6">
                    <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
                        <span className="text-xs font-semibold text-[#2563EB] uppercase tracking-wider">Connect</span>
                        <h2 className="text-3xl font-bold tracking-tight text-[#111827]">Get in Touch</h2>
                        <p className="text-[#6B7280] text-sm">Have a project proposal? Drop a direct message below.</p>
                    </div>

                    <div className="max-w-lg mx-auto">
                        {wasSuccessful && (
                            <div className="p-4 mb-6 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs text-center font-medium">
                                Message sent successfully! I will get back to you soon.
                            </div>
                        )}

                        <form onSubmit={handleContactSubmit} className="space-y-4 bg-white border border-[#E5E7EB] p-8 rounded-xl shadow-sm">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[11px] font-semibold text-[#6B7280] mb-1.5" htmlFor="name">Your Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                        className="w-full bg-white border border-[#E5E7EB] focus:border-[#2563EB] rounded-lg px-3 py-2 text-xs text-[#111827] outline-none transition"
                                        placeholder="Jane Doe"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-[11px] font-semibold text-[#6B7280] mb-1.5" htmlFor="email">Email Address</label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        className="w-full bg-white border border-[#E5E7EB] focus:border-[#2563EB] rounded-lg px-3 py-2 text-xs text-[#111827] outline-none transition"
                                        placeholder="jane@example.com"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-[11px] font-semibold text-[#6B7280] mb-1.5" htmlFor="subject">Subject</label>
                                <input
                                    type="text"
                                    id="subject"
                                    value={subject}
                                    onChange={e => setSubject(e.target.value)}
                                    className="w-full bg-white border border-[#E5E7EB] focus:border-[#2563EB] rounded-lg px-3 py-2 text-xs text-[#111827] outline-none transition"
                                    placeholder="Collaboration Proposal"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-[11px] font-semibold text-[#6B7280] mb-1.5" htmlFor="message">Message</label>
                                <textarea
                                    id="message"
                                    rows="5"
                                    value={message}
                                    onChange={e => setMessage(e.target.value)}
                                    className="w-full bg-white border border-[#E5E7EB] focus:border-[#2563EB] rounded-lg px-3 py-2 text-xs text-[#111827] outline-none transition resize-none"
                                    placeholder="Message details..."
                                    required
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full py-2.5 rounded-lg bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-semibold text-xs transition duration-150"
                            >
                                {processing ? 'Submitting...' : 'Send Message'}
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </AppLayout>
    );
}

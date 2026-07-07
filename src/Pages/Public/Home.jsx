import React, { useState, useEffect } from 'react';
import AppLayout from '../../Layouts/AppLayout';

export default function Home({ projects, skills, experiences, certificates, socialLinks, settings }) {
    const [nameVal, setNameVal] = useState('');
    const [emailVal, setEmailVal] = useState('');
    const [subjectVal, setSubjectVal] = useState('');
    const [messageVal, setMessageVal] = useState('');
    const [processing, setProcessing] = useState(false);
    const [wasSuccessful, setWasSuccessful] = useState(false);

    useEffect(() => {
        document.title = 'Manish Kumar | Full Stack Developer';
    }, []);

    const handleContactSubmit = (e) => {
        e.preventDefault();
        setProcessing(true);
        setTimeout(() => {
            setProcessing(false);
            setWasSuccessful(true);
            setNameVal('');
            setEmailVal('');
            setSubjectVal('');
            setMessageVal('');
            setTimeout(() => setWasSuccessful(false), 5000);
        }, 1000);
    };

    const name = settings?.name || 'Manish Kumar';
    
    // Group skills manually to ensure order & categorization
    const skillCategories = skills ? Object.keys(skills) : [];

    return (
        <AppLayout settings={settings} socialLinks={socialLinks}>
            
            {/* Inline CSS for Dot Grid Background & key animations */}
            <style dangerouslySetInnerHTML={{__html: `
                .dot-grid {
                    background-image: radial-gradient(#E2E8F0 1.5px, transparent 1.5px);
                    background-size: 24px 24px;
                }
                .font-code {
                    font-family: 'JetBrains Mono', monospace;
                }
            `}} />

            {/* 1. Hero Section (Vercel style clean tech header with Dot Grid) */}
            <section className="dot-grid bg-white py-20 md:py-32 border-b border-[#F1F5F9] relative overflow-hidden">
                <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    
                    {/* Hero Left Content */}
                    <div className="lg:col-span-7 space-y-6 text-left">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3B82F6]/5 border border-[#3B82F6]/10 text-[#3B82F6] text-xs font-semibold uppercase tracking-wider font-code">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] animate-pulse"></span>
                            Developer Intern
                        </div>

                        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-[#0F172A] leading-[1.1]">
                            Building web systems with <span className="text-[#3B82F6]">clean code</span>.
                        </h1>
                        
                        <p className="text-[#475569] text-base md:text-lg leading-relaxed max-w-xl font-normal">
                            Hi, I'm Manish, a Full-Stack developer interning at Comestro Techlabs. I specialize in designing scalable backend APIs in Laravel and modular user interfaces in React.
                        </p>

                        <div className="flex flex-wrap items-center gap-4 pt-2">
                            <a 
                                href="#projects" 
                                className="px-6 py-2.5 rounded-lg bg-[#3B82F6] hover:bg-[#2563EB] text-white text-xs font-semibold tracking-wide transition-all duration-150 shadow-sm"
                            >
                                View Projects
                            </a>
                            <a 
                                href={settings?.resume_file || '#'} 
                                target="_blank"
                                rel="noreferrer"
                                className="px-6 py-2.5 rounded-lg bg-white border border-[#E2E8F0] hover:bg-slate-50 text-[#0F172A] text-xs font-semibold tracking-wide transition-all"
                            >
                                Get Resume
                            </a>
                        </div>
                    </div>

                    {/* Hero Right Content: Tech Code Terminal Mockup */}
                    <div className="lg:col-span-5">
                        <div className="w-full bg-[#0B0F19] border border-[#1E293B] rounded-xl overflow-hidden shadow-xl font-code">
                            {/* Terminal Top Bar */}
                            <div className="bg-[#1E293B]/40 px-4 py-3 flex items-center justify-between border-b border-[#1E293B]/60 select-none">
                                <div className="flex gap-1.5">
                                    <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]"></span>
                                    <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]"></span>
                                    <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]"></span>
                                </div>
                                <span className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold">manish-kumar ~ bash</span>
                                <div className="w-6"></div>
                            </div>
                            
                            {/* Terminal Body */}
                            <div className="p-6 text-xs text-[#E2E8F0] leading-relaxed space-y-4">
                                <div className="flex items-center gap-2">
                                    <span className="text-[#3B82F6]">$</span>
                                    <span className="text-white">cat profile.json</span>
                                </div>
                                <div className="text-gray-400 pl-4 space-y-1">
                                    <p>&#123;</p>
                                    <p className="pl-4">"name": <span className="text-[#10B981]">"Manish Kumar"</span>,</p>
                                    <p className="pl-4">"role": <span className="text-[#10B981]">"Laravel / React Intern"</span>,</p>
                                    <p className="pl-4">"location": <span className="text-[#10B981]">"Jaipur, India"</span>,</p>
                                    <p className="pl-4">"stack": [<span className="text-[#3B82F6]">"PHP"</span>, <span className="text-[#3B82F6]">"Laravel"</span>, <span className="text-[#3B82F6]">"React"</span>, <span className="text-[#3B82F6]">"MySQL"</span>],</p>
                                    <p className="pl-4">"currently_seeding": <span className="text-[#10B981]">"kitabiadda.com"</span></p>
                                    <p>&#125;</p>
                                </div>
                                <div className="flex items-center gap-2 pt-2 border-t border-[#1E293B]/40">
                                    <span className="text-[#3B82F6]">$</span>
                                    <span className="text-white animate-pulse">npm run dev_</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* 2. Selected Works (GitHub repository board style Bento Grid) */}
            <section id="projects" className="bg-[#FFFFFF] py-24 border-b border-[#F1F5F9]">
                <div className="max-w-[1200px] mx-auto px-6">
                    
                    {/* Header */}
                    <div className="flex justify-between items-end mb-12">
                        <div className="space-y-2">
                            <span className="text-xs font-semibold text-[#3B82F6] uppercase tracking-wider block font-code">Repository Showcase</span>
                            <h2 className="text-3xl font-extrabold tracking-tight text-[#0F172A]">Selected Projects</h2>
                        </div>
                        <a href="#/blogs" className="text-xs font-semibold text-[#3B82F6] hover:text-[#2563EB] transition-colors duration-150 flex items-center gap-1 font-code">
                            View All &rarr;
                        </a>
                    </div>

                    {/* 3-Column Projects Bento Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects?.map((project) => (
                            <div 
                                key={project.id}
                                className="group bg-white border border-[#E2E8F0] hover:border-[#3B82F6]/40 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-150 flex flex-col justify-between"
                            >
                                {/* Top info banner resembling a Git repository block */}
                                <div className="p-6 space-y-4">
                                    <div className="flex justify-between items-center text-xs">
                                        <div className="flex items-center gap-1.5 text-gray-500 font-code text-[11px]">
                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
                                            </svg>
                                            manish96 / {project.slug}
                                        </div>
                                        {project.is_featured && (
                                            <span className="px-2 py-0.5 rounded bg-[#3B82F6]/5 border border-[#3B82F6]/10 text-[#3B82F6] font-bold text-[9px] uppercase tracking-wider font-code">
                                                ★ featured
                                            </span>
                                        )}
                                    </div>

                                    <h3 className="text-lg font-bold text-[#0F172A] group-hover:text-[#3B82F6] transition-colors duration-150">
                                        {project.title}
                                    </h3>

                                    <p className="text-[#475569] text-xs leading-relaxed line-clamp-3">
                                        {project.description}
                                    </p>
                                </div>

                                {/* Card Footer: Tags & links */}
                                <div className="px-6 pb-6 pt-4 border-t border-[#F1F5F9] flex items-center justify-between">
                                    <div className="flex flex-wrap gap-1">
                                        {project.technologies?.slice(0, 2).map((tech, idx) => (
                                            <span key={idx} className="px-2 py-0.5 rounded bg-[#F8FAFC] border border-[#E2E8F0] text-[#64748B] text-[10px] font-medium font-code">
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
                                                className="text-gray-400 hover:text-[#3B82F6] transition-colors"
                                                title="Code Repo"
                                            >
                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                                </svg>
                                            </a>
                                        )}
                                        <a 
                                            href={`#/project/${project.slug}`}
                                            className="text-xs font-semibold text-[#3B82F6] hover:underline"
                                        >
                                            Read Case &rarr;
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. About Section (Clean details) */}
            <section id="about" className="bg-[#F8FAFC] py-24 border-b border-[#F1F5F9]">
                <div className="max-w-[960px] mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
                    
                    <div className="md:col-span-8 space-y-6">
                        <span className="text-xs font-semibold text-[#3B82F6] uppercase tracking-wider block font-code">About Me</span>
                        <h2 className="text-3xl font-extrabold tracking-tight text-[#0F172A]">
                            Developer at Comestro Techlabs
                        </h2>
                        
                        <p className="text-[#475569] text-sm leading-relaxed font-normal">
                            I am a software developer interning at Comestro Techlabs. My daily work revolves around building robust database systems, writing migrations, building REST APIs in Laravel, and structuring user interfaces using React.
                        </p>
                        
                        <p className="text-[#475569] text-sm leading-relaxed font-normal">
                            I focus on writing clean, readable, and highly maintainable code. I have a BCA degree from Purnea University (2021-2024) and look forward to scaling my skills in cloud deployment and system design.
                        </p>
                    </div>
                    
                    <div className="md:col-span-4 border-l border-[#E2E8F0] pl-8 space-y-6 font-code text-xs">
                        <div>
                            <h4 className="font-bold text-[#0F172A] uppercase">Degree</h4>
                            <p className="text-gray-500 mt-1">{settings?.education || 'BCA, Purnea University'}</p>
                        </div>
                        <div>
                            <h4 className="font-bold text-[#0F172A] uppercase">Base</h4>
                            <p className="text-gray-500 mt-1">{settings?.location || 'Jaipur, India'}</p>
                        </div>
                        <div>
                            <h4 className="font-bold text-[#0F172A] uppercase">Email</h4>
                            <a href={`mailto:${settings?.email}`} className="text-[#3B82F6] hover:underline mt-1 block truncate">{settings?.email || 'manish96611311@gmail.com'}</a>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. Skills Section (Structured Bento Grid) */}
            <section id="skills" className="bg-[#FFFFFF] py-24 border-b border-[#F1F5F9]">
                <div className="max-w-[1200px] mx-auto px-6">
                    <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
                        <span className="text-xs font-semibold text-[#3B82F6] uppercase tracking-wider block font-code">Expertise Matrix</span>
                        <h2 className="text-3xl font-extrabold tracking-tight text-[#0F172A]">Core Technologies</h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {skillCategories.map((category, idx) => (
                            <div key={idx} className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm">
                                <h3 className="font-mono text-xs font-bold text-[#0F172A] uppercase tracking-wider pb-3 border-b border-[#F1F5F9] mb-4 flex items-center gap-1.5">
                                    <span className="text-[#3B82F6]">#</span>
                                    {category}
                                </h3>
                                <div className="space-y-3">
                                    {skills[category].map((skill, sIdx) => (
                                        <div key={sIdx} className="flex justify-between items-center text-xs">
                                            <span className="text-[#475569] font-medium">{skill.name}</span>
                                            <span className="font-code text-[10px] text-gray-400">{skill.level || 90}%</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. Experience Section (Git commit history timeline) */}
            <section id="experience" className="bg-[#F8FAFC] py-24 border-b border-[#F1F5F9]">
                <div className="max-w-[800px] mx-auto px-6">
                    <div className="text-center mb-16 space-y-2">
                        <span className="text-xs font-semibold text-[#3B82F6] uppercase tracking-wider block font-code">Commit History</span>
                        <h2 className="text-3xl font-extrabold tracking-tight text-[#0F172A]">Work Timeline</h2>
                    </div>

                    {/* Timeline Log */}
                    <div className="relative border-l border-[#E2E8F0] ml-4 md:ml-32 pl-8 space-y-12">
                        {experiences?.map((exp, idx) => (
                            <div key={idx} className="relative">
                                {/* Dot Indicator */}
                                <span className="absolute -left-[38px] top-1.5 w-4.5 h-4.5 rounded-full bg-[#FFFFFF] border-4 border-[#3B82F6] shadow-sm"></span>
                                
                                {/* Date on left for desktops */}
                                <span className="hidden md:block absolute -left-[160px] top-1 font-code text-xs text-gray-400 text-right w-28">
                                    {exp.duration}
                                </span>

                                <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm space-y-3">
                                    <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-1.5">
                                        <div>
                                            <h4 className="font-bold text-base text-[#0F172A]">{exp.designation}</h4>
                                            <span className="text-xs text-[#3B82F6] font-semibold">{exp.company}</span>
                                        </div>
                                        <span className="md:hidden font-code text-[10px] text-gray-400">{exp.duration}</span>
                                    </div>
                                    <p className="text-xs text-[#475569] leading-relaxed">
                                        {exp.description}
                                    </p>
                                    <div className="flex flex-wrap gap-1.5 pt-2">
                                        {exp.skills_used?.map((t, index) => (
                                            <span key={index} className="px-2 py-0.5 rounded bg-[#F8FAFC] border border-[#E2E8F0] text-[#64748B] text-[10px] font-code">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 6. Client References */}
            <section className="bg-white py-24 border-b border-[#F1F5F9]">
                <div className="max-w-[1200px] mx-auto px-6 space-y-12">
                    <div className="text-center space-y-2">
                        <span className="text-xs font-semibold text-[#3B82F6] uppercase tracking-wider block font-code">Kind Words</span>
                        <h2 className="text-3xl font-extrabold tracking-tight text-[#0F172A]">References & Testimonials</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        <div className="border border-[#E2E8F0] p-8 rounded-xl bg-[#F8FAFC]/50 flex flex-col justify-between space-y-6">
                            <p className="text-[#475569] text-xs sm:text-sm leading-relaxed font-light italic">
                                "Manish is an exceptionally focused developer. He helped us restructure the database schema for our e-commerce book marketplace and deliver a flawless Inertia integration."
                            </p>
                            <div className="flex items-center gap-3 pt-4 border-t border-[#E2E8F0]">
                                <div className="w-8 h-8 rounded-full bg-[#3B82F6]/10 flex items-center justify-center font-bold text-[10px] text-[#3B82F6]">
                                    TL
                                </div>
                                <div>
                                    <h4 className="font-bold text-xs text-[#0F172A]">Product Lead</h4>
                                    <p className="text-[10px] text-[#64748B]">Comestro Techlabs Pvt Ltd</p>
                                </div>
                            </div>
                        </div>

                        <div className="border border-[#E2E8F0] p-8 rounded-xl bg-[#F8FAFC]/50 flex flex-col justify-between space-y-6">
                            <p className="text-[#475569] text-xs sm:text-sm leading-relaxed font-light italic">
                                "A fast learner who writes clean, readable, and performant code. Manish is a great asset to any modern product team looking to build structured web tools."
                            </p>
                            <div className="flex items-center gap-3 pt-4 border-t border-[#E2E8F0]">
                                <div className="w-8 h-8 rounded-full bg-[#3B82F6]/10 flex items-center justify-center font-bold text-[10px] text-[#3B82F6]">
                                    SE
                                </div>
                                <div>
                                    <h4 className="font-bold text-xs text-[#0F172A]">Senior Engineer</h4>
                                    <p className="text-[10px] text-[#64748B]">Comestro Techlabs</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 7. Contact Section (Developer message form) */}
            <section id="contact" className="bg-[#F8FAFC] py-24">
                <div className="max-w-[1200px] mx-auto px-6">
                    <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
                        <span className="text-xs font-semibold text-[#3B82F6] uppercase tracking-wider block font-code">Contact API</span>
                        <h2 className="text-3xl font-bold tracking-tight text-[#0F172A]">Get in Touch</h2>
                        <p className="text-[#64748B] text-sm">Drop a line below to initiate collaboration.</p>
                    </div>

                    <div className="max-w-lg mx-auto">
                        {wasSuccessful && (
                            <div className="p-4 mb-6 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs text-center font-medium font-code">
                                Success! Your message was submitted locally in React.
                            </div>
                        )}

                        <form onSubmit={handleContactSubmit} className="space-y-6 bg-white border border-[#E2E8F0] p-8 rounded-xl shadow-sm">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="space-y-1.5">
                                    <label className="block text-[11px] font-bold text-[#475569] uppercase font-code" htmlFor="name">Your Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        value={nameVal}
                                        onChange={e => setNameVal(e.target.value)}
                                        className="w-full bg-white border border-[#E2E8F0] focus:border-[#3B82F6] rounded-lg px-3 py-2 text-xs text-[#0F172A] outline-none transition"
                                        placeholder="Jane Doe"
                                        required
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="block text-[11px] font-bold text-[#475569] uppercase font-code" htmlFor="email">Email Address</label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={emailVal}
                                        onChange={e => setEmailVal(e.target.value)}
                                        className="w-full bg-white border border-[#E2E8F0] focus:border-[#3B82F6] rounded-lg px-3 py-2 text-xs text-[#0F172A] outline-none transition"
                                        placeholder="jane@example.com"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="block text-[11px] font-bold text-[#475569] uppercase font-code" htmlFor="subject">Subject</label>
                                <input
                                    type="text"
                                    id="subject"
                                    value={subjectVal}
                                    onChange={e => setSubjectVal(e.target.value)}
                                    className="w-full bg-white border border-[#E2E8F0] focus:border-[#3B82F6] rounded-lg px-3 py-2 text-xs text-[#0F172A] outline-none transition"
                                    placeholder="Project Collaboration"
                                    required
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="block text-[11px] font-bold text-[#475569] uppercase font-code" htmlFor="message">Message</label>
                                <textarea
                                    id="message"
                                    rows="5"
                                    value={messageVal}
                                    onChange={e => setMessageVal(e.target.value)}
                                    className="w-full bg-white border border-[#E2E8F0] focus:border-[#3B82F6] rounded-lg px-3 py-2 text-xs text-[#0F172A] outline-none transition resize-none"
                                    placeholder="Message details..."
                                    required
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full py-2.5 rounded-lg bg-[#0F172A] hover:bg-[#3B82F6] text-white font-semibold text-xs tracking-wider uppercase transition-all duration-150 cursor-pointer"
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

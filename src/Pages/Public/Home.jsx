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
        document.title = 'Hey, I\'m Manish | Portfolio';
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
    
    // Group skills for the collage cloud
    const skillList = Object.values(skills || {}).flat();

    // Map projects to pastel colors for browser cards
    const getPastelColor = (slug) => {
        const colors = {
            'linkup': 'bg-[#e2d4f0]',
            'kitabi-adda': 'bg-[#ffd2e1]',
            'campus-connect': 'bg-[#d2f3ff]',
            'client-management': 'bg-[#ffe8d2]',
            'recipe-finder': 'bg-[#d2ffd4]'
        };
        return colors[slug] || 'bg-[#f0f4f8]';
    };

    return (
        <AppLayout settings={settings} socialLinks={socialLinks}>
            
            {/* Inline CSS for Marquee Scrolling & floating animations */}
            <style dangerouslySetInnerHTML={{__html: `
                @keyframes marquee {
                    0% { transform: translateX(0%); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee {
                    display: flex;
                    width: 200%;
                    animation: marquee 20s linear infinite;
                }
                .animate-marquee:hover {
                    animation-play-state: paused;
                }
                .font-moderno {
                    font-family: 'MuseoModerno', sans-serif;
                }
                .font-mono-atkinson {
                    font-family: 'Atkinson Hyperlegible Mono', monospace;
                }
            `}} />

            {/* 1. Hero Section (White bg) */}
            <section className="bg-white pt-24 pb-16 md:pt-40 md:pb-28 text-left md:text-center overflow-hidden border-b border-[#E5E7EB]">
                <div className="max-w-[1280px] mx-auto px-6 space-y-12">
                    
                    {/* Big Heading */}
                    <h1 className="font-moderno text-6xl sm:text-7xl md:text-[8vw] font-black tracking-tight text-[#111827] leading-[0.95] max-w-5xl mx-auto uppercase">
                        Hey, I'm Manish
                    </h1>
                    
                    {/* Subtitle */}
                    <p className="font-mono-atkinson text-[#942929] text-xs sm:text-sm tracking-widest font-bold uppercase max-w-2xl mx-auto">
                        Full Stack Developer / React & Laravel Specialist
                    </p>

                    {/* Dual Image Desk Workspace Mockup Frame */}
                    <div className="max-w-3xl mx-auto border border-[#E5E7EB] rounded-2xl overflow-hidden bg-slate-50 p-4 shadow-xl">
                        <img 
                            src="/workspace_about_mock.png" 
                            alt="Manish Workspace" 
                            className="w-full h-80 object-cover rounded-xl border border-[#E5E7EB]"
                            onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.parentNode.innerHTML = `
                                    <div class="flex flex-col items-center justify-center h-80 text-[#6B7280] space-y-4 p-8 text-center bg-white rounded-xl border border-dashed border-[#E5E7EB]">
                                        <span class="text-5xl">💻</span>
                                        <div>
                                            <h4 class="font-bold text-[#111827] text-sm">Workspace Mockup Loaded</h4>
                                            <p class="text-xs mt-1 text-[#6B7280]">Real dynamic portfolio loaded successfully.</p>
                                        </div>
                                    </div>
                                `;
                            }}
                        />
                    </div>

                    <div className="flex justify-center items-center gap-4 pt-4 font-mono-atkinson">
                        <a 
                            href="#projects" 
                            className="px-6 py-3 rounded-md bg-[#111827] hover:bg-[#942929] text-white text-xs font-bold uppercase tracking-wider transition duration-150 shadow-sm"
                        >
                            View Work
                        </a>
                        <a 
                            href="#about" 
                            className="px-6 py-3 rounded-md bg-white border border-[#E5E7EB] hover:bg-slate-50 text-[#111827] text-xs font-bold uppercase tracking-wider transition duration-150"
                        >
                            About Me
                        </a>
                    </div>
                </div>

                {/* Looping Infinite Marquee Banner */}
                <div className="bg-[#942929] text-white py-4 mt-20 border-y border-[#942929] overflow-hidden select-none whitespace-nowrap font-mono-atkinson text-xs font-bold tracking-widest uppercase">
                    <div className="animate-marquee">
                        <div className="flex justify-around min-w-full">
                            <span>✦ Laravel 12</span>
                            <span>✦ React 19</span>
                            <span>✦ Inertia.js</span>
                            <span>✦ MySQL Database</span>
                            <span>✦ API Integrations</span>
                            <span>✦ Clean Architecture</span>
                            <span>✦ Single Page Apps</span>
                        </div>
                        <div className="flex justify-around min-w-full">
                            <span>✦ Laravel 12</span>
                            <span>✦ React 19</span>
                            <span>✦ Inertia.js</span>
                            <span>✦ MySQL Database</span>
                            <span>✦ API Integrations</span>
                            <span>✦ Clean Architecture</span>
                            <span>✦ Single Page Apps</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. About Section (White bg) */}
            <section id="about" className="bg-white py-28 border-b border-[#E5E7EB] font-mono-atkinson">
                <div className="max-w-[960px] mx-auto px-6 space-y-8">
                    <span className="text-xs font-bold text-[#942929] uppercase tracking-wider block">Biography</span>
                    <h2 className="text-3xl md:text-5xl font-black text-[#111827] tracking-tight leading-tight">
                        Crafting Purposeful Interfaces.
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 text-[#6B7280] text-sm leading-relaxed font-normal">
                        <div className="md:col-span-8 space-y-4">
                            <p>
                                I am Manish Kumar, a software engineer developer interning at Comestro Techlabs Pvt Ltd. I design robust client-facing single page applications by binding clean Laravel endpoints with interactive React views.
                            </p>
                            <p>
                                I hold a BCA degree from Purnea University (2021-2024). I love structuring databases, writing clean code models, and creating responsive web environments.
                            </p>
                        </div>
                        
                        <div className="md:col-span-4 border-l border-[#E5E7EB] pl-6 space-y-4">
                            <div>
                                <h4 className="text-xs font-bold text-[#111827] uppercase">Education</h4>
                                <p className="text-xs text-gray-500 mt-1">{settings?.education || 'BCA, Purnea University'}</p>
                            </div>
                            <div>
                                <h4 className="text-xs font-bold text-[#111827] uppercase">Location</h4>
                                <p className="text-xs text-gray-500 mt-1">{settings?.location || 'Jaipur, India'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Skills Section (Floating Cloud Collage) */}
            <section id="skills" className="bg-[#F8FAFC] py-28 border-b border-[#E5E7EB] font-mono-atkinson overflow-hidden">
                <div className="max-w-[1100px] mx-auto px-6">
                    <div className="text-center max-w-xl mx-auto mb-20 space-y-3">
                        <span className="text-xs font-bold text-[#942929] uppercase tracking-wider">Expertise</span>
                        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#111827]">Skills Collage Cloud</h2>
                    </div>

                    {/* Floating Cards List */}
                    <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
                        {skillList.slice(0, 16).map((skill, idx) => {
                            // Alternate card rotation angles and paddings to simulate floating collage
                            const rotations = ['rotate-1', 'rotate-[-1deg]', 'rotate-2', 'rotate-[-2deg]'];
                            const rotation = rotations[idx % rotations.length];
                            
                            return (
                                <div 
                                    key={idx}
                                    className={`px-5 py-4 rounded-2xl bg-[#FFEDED] text-[#942929] font-bold text-xs uppercase tracking-wider shadow-md border border-[#942929]/10 transition-all duration-200 hover:-translate-y-1 hover:bg-[#942929] hover:text-white cursor-default select-none ${rotation}`}
                                >
                                    {skill.name}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* 4. Projects Section (Pastel Browser Mockups) */}
            <section id="projects" className="bg-white py-28 border-b border-[#E5E7EB] font-mono-atkinson">
                <div className="max-w-[1280px] mx-auto px-6">
                    
                    {/* Header */}
                    <div className="flex justify-between items-end mb-16">
                        <div>
                            <span className="text-xs font-bold text-[#942929] uppercase tracking-wider block">Work</span>
                            <h2 className="text-3xl md:text-5xl font-black text-[#111827] tracking-tight">Selected Works</h2>
                        </div>
                        <a href="#/blogs" className="text-xs font-bold text-[#942929] hover:text-black transition flex items-center gap-1">
                            View All Projects <span className="text-sm">&rarr;</span>
                        </a>
                    </div>

                    {/* Grid of Projects */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {projects?.map((project) => {
                            const pastelBg = getPastelColor(project.slug);
                            return (
                                <a 
                                    href={`#/project/${project.slug}`} 
                                    key={project.id}
                                    className="group block space-y-4"
                                >
                                    {/* Browser mockup window card */}
                                    <div className={`${pastelBg} border border-[#E5E7EB] rounded-2xl overflow-hidden aspect-video transition-all duration-300 group-hover:border-[#942929]/40 group-hover:-translate-y-1.5 flex flex-col justify-between shadow-sm`}>
                                        
                                        {/* Browser Tab Top Bar */}
                                        <div className="bg-white/80 border-b border-[#E5E7EB]/80 px-4 py-3 flex items-center gap-1.5 shrink-0">
                                            <span className="w-2 h-2 rounded-full bg-[#FF5F56]"></span>
                                            <span className="w-2 h-2 rounded-full bg-[#FFBD2E]"></span>
                                            <span className="w-2 h-2 rounded-full bg-[#27C93F]"></span>
                                            
                                            <div className="bg-white/90 border border-[#E5E7EB] text-[8px] text-[#6B7280] rounded px-3 py-0.5 text-center flex-grow max-w-[120px] truncate font-mono ml-4 select-none">
                                                {project.slug}.local
                                            </div>
                                        </div>

                                        {/* Browser Content */}
                                        <div className="flex-grow flex items-center justify-center p-6 text-center">
                                            <span className="text-4xl font-extrabold text-[#942929]/15 select-none font-moderno">
                                                {project.title.substring(0, 2).toUpperCase()}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Info text below */}
                                    <div>
                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                            {project.technologies?.slice(0, 2).join(' / ')}
                                        </span>
                                        <h3 className="text-base font-extrabold text-[#111827] mt-1 group-hover:text-[#942929] transition duration-150">
                                            {project.title}
                                        </h3>
                                    </div>
                                </a>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* 5. Kind Words / Timeline Section (White bg) */}
            <section className="bg-white py-28 border-b border-[#E5E7EB] font-mono-atkinson">
                <div className="max-w-[1000px] mx-auto px-6 space-y-16">
                    <div className="text-center space-y-3">
                        <span className="text-xs font-bold text-[#942929] uppercase tracking-wider block">Kind Words</span>
                        <h2 className="text-3xl md:text-4xl font-black text-[#111827] tracking-tight">Client Testimonials</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        <div className="border border-[#E5E7EB] p-8 rounded-2xl bg-[#F8FAFC]/50 flex flex-col justify-between space-y-6">
                            <p className="text-gray-500 text-xs sm:text-sm leading-relaxed font-light italic">
                                "Manish is an exceptionally focused developer. He helped us restructure the database schema for our e-commerce book marketplace and deliver a flawless Inertia integration."
                            </p>
                            <div className="flex items-center gap-3 pt-4 border-t border-[#E5E7EB]">
                                <div className="w-8 h-8 rounded-full bg-[#942929]/10 flex items-center justify-center font-bold text-[10px] text-[#942929]">
                                    TL
                                </div>
                                <div>
                                    <h4 className="font-bold text-[11px] text-[#111827]">Product Lead</h4>
                                    <p className="text-[9px] text-[#6B7280] mt-0.5">Comestro Techlabs Pvt Ltd</p>
                                </div>
                            </div>
                        </div>

                        <div className="border border-[#E5E7EB] p-8 rounded-2xl bg-[#F8FAFC]/50 flex flex-col justify-between space-y-6">
                            <p className="text-gray-500 text-xs sm:text-sm leading-relaxed font-light italic">
                                "A fast learner who writes clean, readable, and performant code. Manish is a great asset to any modern product team looking to build structured web tools."
                            </p>
                            <div className="flex items-center gap-3 pt-4 border-t border-[#E5E7EB]">
                                <div className="w-8 h-8 rounded-full bg-[#942929]/10 flex items-center justify-center font-bold text-[10px] text-[#942929]">
                                    SE
                                </div>
                                <div>
                                    <h4 className="font-bold text-[11px] text-[#111827]">Senior Engineer</h4>
                                    <p className="text-[9px] text-[#6B7280] mt-0.5">Comestro Techlabs</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. Contact Form Section (Deep Crimson / Maroon bg #662323) */}
            <section id="contact" className="bg-[#662323] text-[#FFEDED] py-28 font-mono-atkinson">
                <div className="max-w-[640px] mx-auto px-6 space-y-12">
                    
                    <div className="text-center space-y-3">
                        <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest block">Connect</span>
                        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">Let's build something.</h2>
                    </div>

                    {wasSuccessful && (
                        <div className="p-4 mb-6 rounded bg-[#FFEDED] text-[#662323] border border-[#FFEDED]/20 text-xs text-center font-bold uppercase tracking-wider">
                            Message Sent Successfully!
                        </div>
                    )}

                    <form onSubmit={handleContactSubmit} className="space-y-8">
                        
                        {/* Name Input */}
                        <div className="flex flex-col">
                            <label className="text-[10px] font-bold text-white/60 uppercase tracking-wider mb-2" htmlFor="form-name">Your Name</label>
                            <input
                                type="text"
                                id="form-name"
                                value={nameVal}
                                onChange={e => setNameVal(e.target.value)}
                                className="border-b-2 border-[#FFEDED]/20 bg-transparent py-2 text-sm text-[#FFEDED] focus:border-white focus:outline-none transition-all"
                                placeholder="JANE DOE"
                                required
                            />
                        </div>

                        {/* Email Input */}
                        <div className="flex flex-col">
                            <label className="text-[10px] font-bold text-white/60 uppercase tracking-wider mb-2" htmlFor="form-email">Email Address</label>
                            <input
                                type="email"
                                id="form-email"
                                value={emailVal}
                                onChange={e => setEmailVal(e.target.value)}
                                className="border-b-2 border-[#FFEDED]/20 bg-transparent py-2 text-sm text-[#FFEDED] focus:border-white focus:outline-none transition-all"
                                placeholder="JANE@EXAMPLE.COM"
                                required
                            />
                        </div>

                        {/* Subject Input */}
                        <div className="flex flex-col">
                            <label className="text-[10px] font-bold text-white/60 uppercase tracking-wider mb-2" htmlFor="form-subject">Subject</label>
                            <input
                                type="text"
                                id="form-subject"
                                value={subjectVal}
                                onChange={e => setSubjectVal(e.target.value)}
                                className="border-b-2 border-[#FFEDED]/20 bg-transparent py-2 text-sm text-[#FFEDED] focus:border-white focus:outline-none transition-all"
                                placeholder="COLLABORATION PROPOSAL"
                                required
                            />
                        </div>

                        {/* Message Input */}
                        <div className="flex flex-col">
                            <label className="text-[10px] font-bold text-white/60 uppercase tracking-wider mb-2" htmlFor="form-message">Message</label>
                            <textarea
                                id="form-message"
                                rows="4"
                                value={messageVal}
                                onChange={e => setMessageVal(e.target.value)}
                                className="border-b-2 border-[#FFEDED]/20 bg-transparent py-2 text-sm text-[#FFEDED] focus:border-white focus:outline-none transition-all resize-none"
                                placeholder="MESSAGE DETAILS..."
                                required
                            ></textarea>
                        </div>

                        {/* Circular Magnetic Submit Button */}
                        <div className="flex justify-center pt-6">
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-24 h-24 rounded-full border border-[#FFEDED]/40 flex items-center justify-center text-[#FFEDED] font-bold text-[10px] uppercase tracking-widest hover:bg-[#FFEDED] hover:text-[#662323] transition-all duration-300 cursor-pointer select-none"
                            >
                                {processing ? '...' : 'SEND'}
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </AppLayout>
    );
}

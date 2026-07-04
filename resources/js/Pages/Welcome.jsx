import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';

export default function Welcome({ profile, projects, skills }) {
    const { data, setData, post, processing, errors, reset, wasSuccessful } = useForm({
        name: '',
        email: '',
        message: '',
    });

    const [activeTab, setActiveTab] = useState('all');

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/contact', {
            onSuccess: () => reset(),
        });
    };

    // Fallbacks if props are not supplied
    const devProfile = profile || {
        name: 'Jane Doe',
        title: 'Full Stack Engineer & AI Specialist',
        bio: 'I build high-performance web applications using Laravel, React, and Inertia.js. Passionate about crafting clean code and integrating intelligent agent workflows.',
        email: 'jane.doe@example.com',
        github: 'https://github.com',
        linkedin: 'https://linkedin.com',
        location: 'San Francisco, CA',
    };

    const devSkills = skills || [
        { name: 'Laravel', level: '95%', category: 'Backend' },
        { name: 'React.js', level: '90%', category: 'Frontend' },
        { name: 'Inertia.js', level: '92%', category: 'Bridge' },
        { name: 'Tailwind CSS', level: '95%', category: 'Design' },
        { name: 'SQLite / MySQL', level: '88%', category: 'Database' },
        { name: 'Model Context Protocol (MCP)', level: '85%', category: 'AI Tools' },
    ];

    const devProjects = projects || [
        {
            id: 1,
            title: 'E-Commerce Platform (KitabiAdda)',
            description: 'A full-featured online bookstore built with Laravel, React, and Inertia. Features include customized dashboards for sellers, riders, and admins, wishlist systems, and automated delivery tracking.',
            tags: ['Laravel', 'React', 'Inertia', 'Tailwind'],
            github_url: 'https://github.com',
            live_url: '#',
        },
        {
            id: 2,
            title: 'Social Connect (LinkUp)',
            description: 'A modern social media application leveraging Laravel Socialite, ImageKit API, real-time message broadcasting, follow/block operations, and dynamic user stories.',
            tags: ['Laravel', 'React', 'Broadcasting', 'ImageKit'],
            github_url: 'https://github.com',
            live_url: '#',
        },
        {
            id: 3,
            title: 'Fit Tracker (GymSaas)',
            description: 'A robust SaaS subscription and membership management platform with interactive dashboard graphs, platforms settings, and Stripe payment integration.',
            tags: ['Laravel', 'Inertia', 'Recharts', 'Stripe'],
            github_url: 'https://github.com',
            live_url: '#',
        }
    ];

    const filteredProjects = activeTab === 'all' 
        ? devProjects 
        : devProjects.filter(p => p.tags.some(t => t.toLowerCase() === activeTab.toLowerCase()));

    const uniqueTags = ['all', ...new Set(devProjects.flatMap(p => p.tags))];

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#080b11] via-[#0f172a] to-[#0d1527] text-slate-100 font-sans selection:bg-cyan-500 selection:text-[#0f172a]">
            <Head title="Premium Portfolio" />

            {/* Glowing Orbs in Background */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

            {/* Navigation */}
            <nav className="sticky top-0 z-50 backdrop-blur-md bg-[#080b11]/70 border-b border-slate-800/50 transition-all duration-300">
                <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-400 to-purple-500 flex items-center justify-center font-bold text-[#080b11]">
                            {devProfile.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="font-semibold text-lg tracking-wider bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                            {devProfile.name}
                        </span>
                    </div>
                    <div className="flex items-center gap-6 text-sm">
                        <a href="#about" className="text-slate-300 hover:text-cyan-400 transition">About</a>
                        <a href="#projects" className="text-slate-300 hover:text-cyan-400 transition">Projects</a>
                        <a href="#skills" className="text-slate-300 hover:text-cyan-400 transition">Skills</a>
                        <a href="#contact" className="px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 transition duration-300">
                            Get in Touch
                        </a>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <header id="about" className="max-w-6xl mx-auto px-6 pt-24 pb-20 grid grid-cols-1 md:grid-cols-12 gap-12 items-center relative">
                <div className="md:col-span-7 flex flex-col justify-center space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold w-fit">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                        Available for freelance & contract work
                    </div>
                    <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-none text-slate-50">
                        Crafting Beautiful,{' '}
                        <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-purple-500 bg-clip-text text-transparent">
                            High-Performance
                        </span>{' '}
                        Web Applications
                    </h1>
                    <p className="text-slate-400 text-lg md:text-xl font-light leading-relaxed">
                        {devProfile.bio}
                    </p>
                    <div className="flex items-center gap-4 pt-4">
                        <a href="#projects" className="px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold transition shadow-lg shadow-cyan-500/25">
                            View My Work
                        </a>
                        <a href="#contact" className="px-6 py-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-100 font-semibold border border-slate-700 transition">
                            Contact Me
                        </a>
                    </div>
                </div>
                <div className="md:col-span-5 flex justify-center relative">
                    <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500 to-purple-500 rounded-full blur-2xl opacity-20 animate-pulse"></div>
                    <div className="w-72 h-72 md:w-80 md:h-80 rounded-3xl bg-slate-900 border border-slate-800/80 p-4 shadow-2xl relative overflow-hidden">
                        {/* Animated Mesh Pattern inside the avatar frame */}
                        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-40"></div>
                        <div className="w-full h-full rounded-2xl bg-gradient-to-br from-cyan-950/50 to-purple-950/50 border border-slate-800/50 flex flex-col items-center justify-center text-center p-6 space-y-4">
                            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-cyan-400 to-purple-500 flex items-center justify-center text-3xl font-bold text-[#080b11]">
                                {devProfile.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                                <h3 className="font-bold text-xl text-slate-50">{devProfile.name}</h3>
                                <p className="text-sm text-cyan-400 mt-1">{devProfile.title}</p>
                            </div>
                            <p className="text-xs text-slate-400 leading-relaxed max-w-[200px]">
                                {devProfile.location}
                            </p>
                            <div className="flex items-center gap-4 text-slate-400 text-sm">
                                <a href={devProfile.github} target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition">GitHub</a>
                                <span>•</span>
                                <a href={devProfile.linkedin} target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition">LinkedIn</a>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Projects Section */}
            <section id="projects" className="max-w-6xl mx-auto px-6 py-20 border-t border-slate-900">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
                    <div>
                        <h2 className="text-3xl font-bold text-slate-50">Selected Projects</h2>
                        <p className="text-slate-400 text-sm mt-2">A handpicked showcase of my recent developments</p>
                    </div>
                    {/* Tags Filter */}
                    <div className="flex flex-wrap gap-2">
                        {uniqueTags.map(tag => (
                            <button
                                key={tag}
                                onClick={() => setActiveTab(tag)}
                                className={`px-4 py-1.5 rounded-full text-xs font-semibold capitalize transition ${
                                    activeTab === tag 
                                        ? 'bg-cyan-500 text-slate-950' 
                                        : 'bg-slate-800/60 hover:bg-slate-800 text-slate-300 border border-slate-700/50'
                                }`}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {filteredProjects.map((project) => (
                        <article 
                            key={project.id}
                            className="group rounded-2xl bg-slate-900/40 border border-slate-800/80 p-6 flex flex-col justify-between hover:border-slate-700/80 hover:bg-slate-900/60 transition duration-300 relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-full blur-xl group-hover:bg-cyan-500/10 transition-all duration-300"></div>
                            <div>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.tags.map((tag, idx) => (
                                        <span key={idx} className="px-2.5 py-0.5 rounded-full bg-cyan-950/50 text-cyan-400 border border-cyan-800/30 text-[10px] font-bold uppercase tracking-wider">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <h3 className="text-xl font-bold text-slate-100 mb-3 group-hover:text-cyan-400 transition">
                                    {project.title}
                                </h3>
                                <p className="text-slate-400 text-sm leading-relaxed mb-6 font-light">
                                    {project.description}
                                </p>
                            </div>
                            <div className="flex items-center gap-4 pt-4 border-t border-slate-800/60">
                                <a 
                                    href={project.github_url} 
                                    target="_blank" 
                                    rel="noreferrer"
                                    className="text-xs text-slate-400 hover:text-slate-100 transition flex items-center gap-1"
                                >
                                    Codebase &rarr;
                                </a>
                                {project.live_url && (
                                    <a 
                                        href={project.live_url} 
                                        className="text-xs text-cyan-400 hover:underline transition"
                                    >
                                        Live Preview
                                    </a>
                                )}
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            {/* Skills Section */}
            <section id="skills" className="max-w-6xl mx-auto px-6 py-20 border-t border-slate-900">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                    <div className="md:col-span-5 space-y-4">
                        <h2 className="text-3xl font-bold text-slate-50">Technical Stack</h2>
                        <p className="text-slate-400 text-sm leading-relaxed font-light">
                            These are the core technologies I utilize to build modern web solutions. I focus on creating cohesive setups where the server-side logic and client interfaces communicate seamlessly.
                        </p>
                        <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-800/30 mt-6">
                            <h4 className="text-cyan-400 font-semibold text-sm">Model Context Protocol Integration</h4>
                            <p className="text-slate-400 text-xs mt-2 leading-relaxed font-light">
                                This portfolio has a built-in MCP server! AI assistants can access this server via `/mcp` to retrieve projects, developer info, and submit contact messages programmatically.
                            </p>
                        </div>
                    </div>
                    <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {devSkills.map((skill, idx) => (
                            <div key={idx} className="p-5 rounded-xl bg-slate-900/30 border border-slate-800/50 hover:border-slate-700/60 transition">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="font-semibold text-slate-100 text-sm">{skill.name}</span>
                                    <span className="text-xs text-cyan-400 font-bold">{skill.level}</span>
                                </div>
                                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                                    <div 
                                        className="bg-gradient-to-r from-cyan-400 to-purple-500 h-full rounded-full"
                                        style={{ width: skill.level }}
                                    ></div>
                                </div>
                                <span className="inline-block mt-2 text-[10px] text-slate-500 uppercase tracking-wider">{skill.category}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="max-w-6xl mx-auto px-6 py-20 border-t border-slate-900 relative">
                <div className="max-w-3xl mx-auto text-center mb-12">
                    <h2 className="text-3xl font-bold text-slate-50">Let's Build Something Together</h2>
                    <p className="text-slate-400 text-sm mt-2">Have a project, a job posting, or just want to say hi? Drop a message!</p>
                </div>

                <div className="max-w-xl mx-auto">
                    {wasSuccessful && (
                        <div className="p-4 mb-6 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm text-center">
                            Thank you! Your message has been received successfully.
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6 p-8 rounded-2xl bg-slate-900/30 border border-slate-800/80 backdrop-blur-sm">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2" htmlFor="name">Your Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                    className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/30 rounded-lg px-4 py-2.5 text-sm text-slate-200 placeholder-slate-600 transition"
                                    placeholder="Jane Doe"
                                    required
                                />
                                {errors.name && <p className="text-xs text-rose-400 mt-1">{errors.name}</p>}
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2" htmlFor="email">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={data.email}
                                    onChange={e => setData('email', e.target.value)}
                                    className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/30 rounded-lg px-4 py-2.5 text-sm text-slate-200 placeholder-slate-600 transition"
                                    placeholder="jane@example.com"
                                    required
                                />
                                {errors.email && <p className="text-xs text-rose-400 mt-1">{errors.email}</p>}
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2" htmlFor="message">Message</label>
                            <textarea
                                id="message"
                                rows="4"
                                value={data.message}
                                onChange={e => setData('message', e.target.value)}
                                className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/30 rounded-lg px-4 py-2.5 text-sm text-slate-200 placeholder-slate-600 transition resize-none"
                                placeholder="Describe your project or query..."
                                required
                            ></textarea>
                            {errors.message && <p className="text-xs text-rose-400 mt-1">{errors.message}</p>}
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold transition shadow-lg shadow-cyan-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {processing ? 'Sending...' : 'Send Message'}
                        </button>
                    </form>
                </div>
            </section>

            {/* Footer */}
            <footer className="max-w-6xl mx-auto px-6 py-8 border-t border-slate-900/60 text-center text-slate-500 text-xs">
                <p>&copy; {new Date().getFullYear()} {devProfile.name}. All rights reserved.</p>
                <p className="mt-2 text-[10px]">Built using Laravel 13, React 19, Inertia.js, and Tailwind CSS v4.</p>
            </footer>
        </div>
    );
}

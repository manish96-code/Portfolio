import React, { useEffect } from 'react';
import AppLayout, { IconGitHub, IconExternal } from '../../Layouts/AppLayout';

function SimpleMarkdown({ content }) {
    if (!content) return null;

    const lines = content.split('\n');
    return (
        <div className="space-y-4 text-slate-300 leading-relaxed text-base font-sans">
            {lines.map((line, idx) => {
                if (line.startsWith('# ')) {
                    return (
                        <h1 key={idx} className="text-3xl font-display font-extrabold text-white mt-8 mb-4 pb-2 border-b border-white/5">
                            {line.replace('# ', '')}
                        </h1>
                    );
                }
                if (line.startsWith('## ')) {
                    return (
                        <h2 key={idx} className="text-2xl font-display font-extrabold text-white mt-6 mb-3">
                            {line.replace('## ', '')}
                        </h2>
                    );
                }
                if (line.startsWith('### ')) {
                    return (
                        <h3 key={idx} className="text-lg font-bold text-cyan-400 mt-5 mb-2 font-mono">
                            {line.replace('### ', '')}
                        </h3>
                    );
                }
                if (line.startsWith('- ')) {
                    return (
                        <li key={idx} className="list-none ml-4 mt-2 text-slate-300 flex items-start gap-2.5">
                            <span className="text-cyan-400 select-none">✦</span>
                            <span>{line.replace('- ', '')}</span>
                        </li>
                    );
                }
                if (/^\d+\.\s/.test(line)) {
                    return (
                        <li key={idx} className="list-decimal ml-6 mt-1 text-slate-300 font-medium">
                            {line.replace(/^\d+\.\s/, '')}
                        </li>
                    );
                }
                if (line.startsWith('```')) {
                    return null;
                }
                if (line.trim() === '') {
                    return <div key={idx} className="h-2"></div>;
                }
                return <p key={idx}>{line}</p>;
            })}
        </div>
    );
}

export default function ProjectDetails({ project, socialLinks, settings, navigate }) {
    
    useEffect(() => {
        if (project) {
            document.title = `${project.title} | Case Study`;
        }
    }, [project]);

    if (!project) return null;

    const tags = project.technologies || [];

    return (
        <AppLayout settings={settings} socialLinks={socialLinks} navigate={navigate}>
            <div className="pt-32 pb-24 font-sans">
                
                {/* Back button */}
                <a 
                    href="/" 
                    onClick={(e) => { e.preventDefault(); navigate('/'); }} 
                    className="inline-flex items-center gap-2 text-sm font-bold text-slate-300 border border-white/10 bg-slate-900/60 px-4.5 py-2.5 rounded-xl hover:text-cyan-400 hover:border-cyan-400/40 hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(0,242,254,0.15)] transition-all duration-300 mb-8 group"
                >
                    <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Portfolio
                </a>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    
                    {/* Project Content */}
                    <div className="lg:col-span-8 space-y-6">
                        <span className="inline-flex items-center gap-1.5 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[11px] font-bold uppercase tracking-[0.2em] px-3.5 py-1.5 rounded-full font-mono">
                            <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse-glow" /> Case Study
                        </span>
                        
                        <div className="flex flex-wrap gap-2.5">
                            {tags.map((t, idx) => (
                                <span 
                                    key={idx} 
                                    className="px-3.5 py-1.5 rounded-lg border border-white/5 bg-slate-950/60 text-slate-300 text-xs font-mono font-semibold"
                                >
                                    {t}
                                </span>
                            ))}
                        </div>

                        <h1 className="text-4xl md:text-6xl font-display font-black text-white tracking-tight leading-tight">
                            {project.title}
                        </h1>

                        <p className="text-slate-300 text-lg leading-relaxed max-w-3xl font-medium">
                            {project.description}
                        </p>

                        {/* Main detailed content sheet */}
                        <div className="border border-white/10 bg-slate-900/40 p-8 md:p-12 mt-8 shadow-2xl rounded-2xl relative">
                            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"></div>
                            <SimpleMarkdown content={project.content} />
                        </div>
                    </div>

                    {/* Metadata Sidebar */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="border border-white/10 bg-slate-900/50 p-6 space-y-6 sticky top-24 shadow-2xl rounded-2xl relative">
                            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/40 to-transparent"></div>
                            
                            <h3 className="font-display text-2xl font-bold text-white border-b border-white/5 pb-3">
                                Project Info
                            </h3>
                            
                            <div className="space-y-4 text-[15px] font-medium text-slate-300">
                                <div className="flex justify-between py-2 border-b border-white/5">
                                    <span className="text-slate-500">Status</span>
                                    <span className={`font-bold ${project.status === 'Completed' ? 'text-emerald-400' : 'text-cyan-400'}`}>
                                        {project.status}
                                    </span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-white/5">
                                    <span className="text-slate-500">Type</span>
                                    <span className="text-slate-200">Full Stack</span>
                                </div>
                                <div className="flex justify-between py-2">
                                    <span className="text-slate-500">Stack</span>
                                    <span className="text-slate-200">Laravel & React</span>
                                </div>
                            </div>

                            <div className="space-y-4 pt-4 border-t border-white/5">
                                {project.live_url && (
                                    <a 
                                        href={project.live_url} 
                                        target="_blank" 
                                        rel="noreferrer" 
                                        className="btn-hand-primary flex items-center justify-center gap-2.5 w-full py-3.5 text-base font-bold"
                                    >
                                        <IconExternal /> Live Demo
                                    </a>
                                )}
                                {project.github_url && (
                                    <a 
                                        href={project.github_url} 
                                        target="_blank" 
                                        rel="noreferrer" 
                                        className="btn-hand-secondary flex items-center justify-center gap-2.5 w-full py-3.5 text-base font-bold"
                                    >
                                        <IconGitHub /> Source Code
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

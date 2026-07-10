import React, { useEffect } from 'react';
import AppLayout, { IconGitHub, IconExternal } from '../../Layouts/AppLayout';

function SimpleMarkdown({ content }) {
    if (!content) return null;

    const lines = content.split('\n');
    return (
        <div className="space-y-4 text-stone leading-relaxed text-base font-sans">
            {lines.map((line, idx) => {
                if (line.startsWith('# ')) {
                    return (
                        <h1 key={idx} className="text-3xl font-display font-bold text-stone mt-8 mb-4 pb-2 border-b-3 border-dashed border-stone rotate-[-0.5deg]">
                            {line.replace('# ', '')}
                        </h1>
                    );
                }
                if (line.startsWith('## ')) {
                    return (
                        <h2 key={idx} className="text-2xl font-display font-bold text-stone mt-6 mb-3 rotate-[0.5deg]">
                            {line.replace('## ', '')}
                        </h2>
                    );
                }
                if (line.startsWith('### ')) {
                    return (
                        <h3 key={idx} className="text-lg font-bold text-coral mt-5 mb-2 font-mono rotate-[-1deg]">
                            {line.replace('### ', '')}
                        </h3>
                    );
                }
                if (line.startsWith('- ')) {
                    return (
                        <li key={idx} className="list-none ml-4 mt-2 text-stone flex items-start gap-2">
                            <span className="text-coral text-lg select-none">✏️</span>
                            <span>{line.replace('- ', '')}</span>
                        </li>
                    );
                }
                if (/^\d+\.\s/.test(line)) {
                    return (
                        <li key={idx} className="list-decimal ml-6 mt-1 text-stone font-semibold">
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
                return <p key={idx} className="rotate-[0.2deg]">{line}</p>;
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
                
                {/* Back button styled as a wobbly sketch tag */}
                <a 
                    href="/" 
                    onClick={(e) => { e.preventDefault(); navigate('/'); }} 
                    className="inline-flex items-center gap-2 text-sm font-bold text-stone border-2 border-stone bg-white px-4 py-2 rounded-wobbly shadow-hard-muted hover:bg-coral hover:text-white hover:rotate-[-2deg] hover:translate-y-[-1px] transition-hand mb-8 group"
                >
                    <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Portfolio
                </a>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    
                    {/* Project Content */}
                    <div className="lg:col-span-8 space-y-6">
                        <span className="inline-block border-2 border-stone bg-coral text-white px-3 py-1 text-xs font-bold font-mono rounded-wobbly rotate-[-2deg] shadow-hard-muted">
                            CASE STUDY 📝
                        </span>
                        
                        <div className="flex flex-wrap gap-2.5">
                            {tags.map((t, idx) => (
                                <span 
                                    key={idx} 
                                    className="px-3 py-1 rounded-wobbly border-2 border-stone bg-sage-tint text-sage text-xs font-mono font-bold shadow-hard-muted rotate-[1deg]"
                                >
                                    {t}
                                </span>
                            ))}
                        </div>

                        <h1 className="text-4xl md:text-6xl font-display font-bold text-stone tracking-tight leading-tight rotate-[-1deg]">
                            {project.title}
                        </h1>

                        <p className="text-stone text-lg leading-relaxed max-w-3xl font-medium rotate-[0.5deg]">
                            {project.description}
                        </p>

                        {/* Main detailed content sheet - styled like a notebook page pinned to the background */}
                        <div className="bg-white border-3 border-stone p-8 md:p-12 mt-8 shadow-hard rounded-wobbly-md card-tack relative rotate-[-0.5deg] hover:rotate-0 transition-hand">
                            <SimpleMarkdown content={project.content} />
                        </div>
                    </div>

                    {/* Metadata Sidebar - Yellow Sticky Note Post-it style */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-postit border-3 border-stone p-6 space-y-6 sticky top-24 shadow-hard rounded-wobbly-md card-tape relative rotate-1 hover:rotate-0 transition-hand text-stone">
                            <h3 className="font-display text-2xl font-bold text-stone border-b-2 border-dashed border-stone pb-2">
                                📌 Project Info
                            </h3>
                            
                            <div className="space-y-4 text-base font-semibold">
                                <div className="flex justify-between py-2 border-b border-dashed border-stone/30">
                                    <span className="text-stone/70">Status</span>
                                    <span className={`font-bold ${project.status === 'Completed' ? 'text-sage' : 'text-coral'} rotate-2`}>
                                        {project.status}
                                    </span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-dashed border-stone/30 font-sans">
                                    <span className="text-stone/70">Type</span>
                                    <span className="text-stone rotate-[-1deg]">Full Stack</span>
                                </div>
                                <div className="flex justify-between py-2 font-sans">
                                    <span className="text-stone/70">Stack</span>
                                    <span className="text-stone rotate-1">Laravel & React</span>
                                </div>
                            </div>

                            <div className="space-y-4 pt-4 border-t-3 border-dashed border-stone">
                                {project.live_url && (
                                    <a 
                                        href={project.live_url} 
                                        target="_blank" 
                                        rel="noreferrer" 
                                        className="btn-hand-primary flex items-center justify-center gap-2.5 w-full py-3 text-base font-bold shadow-hard"
                                    >
                                        <IconExternal /> Live Demo
                                    </a>
                                )}
                                {project.github_url && (
                                    <a 
                                        href={project.github_url} 
                                        target="_blank" 
                                        rel="noreferrer" 
                                        className="btn-hand-secondary flex items-center justify-center gap-2.5 w-full py-3 text-base font-bold shadow-hard"
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

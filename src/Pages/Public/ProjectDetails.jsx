import React, { useEffect } from 'react';
import AppLayout, { IconGitHub, IconExternal } from '../../Layouts/AppLayout';

function SimpleMarkdown({ content }) {
    if (!content) return null;

    const lines = content.split('\n');
    return (
        <div className="space-y-4 text-slate leading-relaxed text-sm">
            {lines.map((line, idx) => {
                if (line.startsWith('# ')) {
                    return <h1 key={idx} className="text-2xl font-bold text-slate-lightest mt-8 mb-4 pb-2 border-b border-navy-lighter">{line.replace('# ', '')}</h1>;
                }
                if (line.startsWith('## ')) {
                    return <h2 key={idx} className="text-lg font-bold text-slate-lightest mt-6 mb-3">{line.replace('## ', '')}</h2>;
                }
                if (line.startsWith('### ')) {
                    return <h3 key={idx} className="text-sm font-bold text-green mt-5 mb-2 font-mono">{line.replace('### ', '')}</h3>;
                }
                if (line.startsWith('- ')) {
                    return <li key={idx} className="list-none ml-4 mt-1 text-slate flex items-start gap-2"><span className="text-green mt-1">▹</span>{line.replace('- ', '')}</li>;
                }
                if (/^\d+\.\s/.test(line)) {
                    return <li key={idx} className="list-decimal ml-6 mt-1 text-slate">{line.replace(/^\d+\.\s/, '')}</li>;
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

export default function ProjectDetails({ project, socialLinks, settings }) {
    
    useEffect(() => {
        if (project) {
            document.title = `${project.title} | Case Study`;
        }
    }, [project]);

    if (!project) return null;

    const tags = project.technologies || [];

    return (
        <AppLayout settings={settings} socialLinks={socialLinks}>
            <div className="pt-32 pb-24">
                <a href="#/" className="inline-flex items-center gap-2 text-sm font-mono text-green hover:underline mb-8">
                    ← Back to Portfolio
                </a>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    
                    {/* Project Content */}
                    <div className="lg:col-span-8 space-y-6">
                        <p className="font-mono text-green text-xs">Featured Project</p>
                        
                        <div className="flex flex-wrap gap-2">
                            {tags.map((t, idx) => (
                                <span key={idx} className="px-2.5 py-1 rounded-full bg-green-tint text-green text-xs font-mono">
                                    {t}
                                </span>
                            ))}
                        </div>

                        <h1 className="text-3xl md:text-5xl font-bold text-slate-lightest tracking-tight leading-tight">
                            {project.title}
                        </h1>

                        <p className="text-slate text-base leading-relaxed max-w-3xl">
                            {project.description}
                        </p>

                        <div className="bg-navy-light border border-navy-lighter/30 rounded-xl p-8 md:p-12 mt-8">
                            <SimpleMarkdown content={project.content} />
                        </div>
                    </div>

                    {/* Metadata Sidebar */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-navy-light border border-navy-lighter/30 rounded-xl p-6 space-y-6 sticky top-24">
                            <h3 className="font-mono text-xs text-green uppercase tracking-wider">Project Info</h3>
                            
                            <div className="space-y-4 text-sm font-mono">
                                <div className="flex justify-between py-2 border-b border-navy-lighter/30">
                                    <span className="text-slate/60">Status</span>
                                    <span className={`font-semibold ${project.status === 'Completed' ? 'text-green' : 'text-yellow-400'}`}>{project.status}</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-navy-lighter/30">
                                    <span className="text-slate/60">Type</span>
                                    <span className="text-slate-light">Full Stack</span>
                                </div>
                                <div className="flex justify-between py-2">
                                    <span className="text-slate/60">Stack</span>
                                    <span className="text-slate-light">Laravel / React</span>
                                </div>
                            </div>

                            <div className="space-y-3 pt-4 border-t border-navy-lighter/30">
                                {project.live_url && (
                                    <a 
                                        href={project.live_url} 
                                        target="_blank" 
                                        rel="noreferrer" 
                                        className="flex items-center justify-center gap-2 w-full py-3 rounded-lg border border-green text-green text-sm font-mono hover:bg-green-tint transition-all"
                                    >
                                        <IconExternal /> Live Demo
                                    </a>
                                )}
                                {project.github_url && (
                                    <a 
                                        href={project.github_url} 
                                        target="_blank" 
                                        rel="noreferrer" 
                                        className="flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-navy-lighter text-slate-lightest text-sm font-mono hover:text-green transition-all"
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

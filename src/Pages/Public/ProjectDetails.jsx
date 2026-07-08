import React, { useEffect } from 'react';
import AppLayout, { IconGitHub, IconExternal } from '../../Layouts/AppLayout';

function SimpleMarkdown({ content }) {
    if (!content) return null;

    const lines = content.split('\n');
    return (
        <div className="space-y-4 text-body leading-relaxed text-sm">
            {lines.map((line, idx) => {
                if (line.startsWith('# ')) {
                    return <h1 key={idx} className="text-2xl font-display font-bold text-charcoal mt-8 mb-4 pb-2 border-b border-stone-light">{line.replace('# ', '')}</h1>;
                }
                if (line.startsWith('## ')) {
                    return <h2 key={idx} className="text-lg font-display font-bold text-charcoal mt-6 mb-3">{line.replace('## ', '')}</h2>;
                }
                if (line.startsWith('### ')) {
                    return <h3 key={idx} className="text-sm font-bold text-coral mt-5 mb-2 font-mono">{line.replace('### ', '')}</h3>;
                }
                if (line.startsWith('- ')) {
                    return <li key={idx} className="list-none ml-4 mt-1 text-body flex items-start gap-2"><span className="text-coral mt-1">▸</span>{line.replace('- ', '')}</li>;
                }
                if (/^\d+\.\s/.test(line)) {
                    return <li key={idx} className="list-decimal ml-6 mt-1 text-body">{line.replace(/^\d+\.\s/, '')}</li>;
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
                <a href="#/" className="inline-flex items-center gap-2 text-sm font-medium text-coral hover:underline mb-8 group">
                    <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Portfolio
                </a>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    
                    {/* Project Content */}
                    <div className="lg:col-span-8 space-y-6">
                        <p className="font-mono text-coral text-xs uppercase tracking-wider">Featured Project</p>
                        
                        <div className="flex flex-wrap gap-2">
                            {tags.map((t, idx) => (
                                <span key={idx} className="px-2.5 py-1 rounded-full bg-sage-tint text-sage text-xs font-mono font-medium">
                                    {t}
                                </span>
                            ))}
                        </div>

                        <h1 className="text-3xl md:text-5xl font-display font-bold text-charcoal tracking-tight leading-tight">
                            {project.title}
                        </h1>

                        <p className="text-body text-base leading-relaxed max-w-3xl">
                            {project.description}
                        </p>

                        <div className="bg-white border border-stone-light/60 rounded-xl p-8 md:p-12 mt-8 shadow-warm">
                            <SimpleMarkdown content={project.content} />
                        </div>
                    </div>

                    {/* Metadata Sidebar */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-white border border-stone-light/60 rounded-xl p-6 space-y-6 sticky top-24 shadow-warm">
                            <h3 className="font-mono text-xs text-coral uppercase tracking-wider">Project Info</h3>
                            
                            <div className="space-y-4 text-sm font-mono">
                                <div className="flex justify-between py-2 border-b border-stone-light/60">
                                    <span className="text-body-light">Status</span>
                                    <span className={`font-semibold ${project.status === 'Completed' ? 'text-sage' : 'text-coral'}`}>{project.status}</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-stone-light/60">
                                    <span className="text-body-light">Type</span>
                                    <span className="text-charcoal-light">Full Stack</span>
                                </div>
                                <div className="flex justify-between py-2">
                                    <span className="text-body-light">Stack</span>
                                    <span className="text-charcoal-light">Laravel / React</span>
                                </div>
                            </div>

                            <div className="space-y-3 pt-4 border-t border-stone-light/60">
                                {project.live_url && (
                                    <a 
                                        href={project.live_url} 
                                        target="_blank" 
                                        rel="noreferrer" 
                                        className="flex items-center justify-center gap-2 w-full py-3 rounded-full bg-coral text-white text-sm font-medium hover:bg-coral-dark transition-all"
                                    >
                                        <IconExternal /> Live Demo
                                    </a>
                                )}
                                {project.github_url && (
                                    <a 
                                        href={project.github_url} 
                                        target="_blank" 
                                        rel="noreferrer" 
                                        className="flex items-center justify-center gap-2 w-full py-3 rounded-full bg-cream-dark border border-stone-light text-charcoal text-sm font-medium hover:text-coral hover:border-coral-light transition-all"
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

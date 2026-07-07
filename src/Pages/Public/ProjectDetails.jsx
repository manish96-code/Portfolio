import React, { useEffect } from 'react';
import AppLayout from '../../Layouts/AppLayout';

function SimpleMarkdown({ content }) {
    if (!content) return null;

    const lines = content.split('\n');
    return (
        <div className="space-y-4 text-gray-500 leading-relaxed font-normal text-sm font-mono-atkinson">
            {lines.map((line, idx) => {
                if (line.startsWith('# ')) {
                    return <h1 key={idx} className="text-2xl font-black text-[#111827] mt-8 mb-4 pb-2 border-b border-[#E5E7EB] font-moderno uppercase">{line.replace('# ', '')}</h1>;
                }
                if (line.startsWith('## ')) {
                    return <h2 key={idx} className="text-lg font-bold text-[#111827] mt-6 mb-3 font-moderno">{line.replace('## ', '')}</h2>;
                }
                if (line.startsWith('### ')) {
                    return <h3 key={idx} className="text-sm font-bold text-[#942929] mt-5 mb-2 uppercase tracking-wide">{line.replace('### ', '')}</h3>;
                }
                if (line.startsWith('- ')) {
                    return <li key={idx} className="list-disc ml-6 mt-1 text-gray-500">{line.replace('- ', '')}</li>;
                }
                if (/^\d+\.\s/.test(line)) {
                    return <li key={idx} className="list-decimal ml-6 mt-1 text-gray-500">{line.replace(/^\d+\.\s/, '')}</li>;
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
            <div className="max-w-[1280px] mx-auto px-6 py-16 md:py-24 font-mono-atkinson">
                <a href="#/" className="inline-flex items-center gap-2 text-xs font-bold text-[#942929] hover:text-black transition mb-8 uppercase tracking-wider">
                    &larr; Back to Portfolio
                </a>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    
                    {/* Project Specifications */}
                    <div className="lg:col-span-8 space-y-6">
                        <div className="flex flex-wrap gap-1.5">
                            {tags.map((t, idx) => (
                                <span key={idx} className="px-2 py-0.5 rounded bg-[#FFEDED] text-[#942929] text-[9px] uppercase tracking-wider font-bold">
                                    {t}
                                </span>
                            ))}
                        </div>

                        <h1 className="text-3xl md:text-5xl font-black text-[#111827] tracking-tight font-moderno uppercase">
                            {project.title}
                        </h1>

                        <p className="text-gray-500 text-sm leading-relaxed max-w-3xl">
                            {project.description}
                        </p>

                        <div className="border border-[#E5E7EB] rounded-2xl p-8 md:p-12 bg-white shadow-sm mt-8">
                            <SimpleMarkdown content={project.content} />
                        </div>
                    </div>

                    {/* Metadata & Actions Card */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="border border-[#E5E7EB] rounded-2xl p-6 bg-white shadow-sm space-y-6">
                            <h3 className="font-bold text-xs text-[#111827] uppercase tracking-wider">Specifications</h3>
                            
                            <div className="space-y-4 text-xs">
                                <div className="flex justify-between py-2 border-b border-[#E5E7EB]/60">
                                    <span className="font-semibold text-gray-400">Project Status</span>
                                    <span className={`font-bold ${project.status === 'Completed' ? 'text-emerald-600' : 'text-amber-600'}`}>{project.status}</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-[#E5E7EB]/60">
                                    <span className="font-semibold text-gray-400">Stack Layer</span>
                                    <span>Full Stack web environment</span>
                                </div>
                                <div className="flex justify-between py-2">
                                    <span className="font-semibold text-gray-400">Environment</span>
                                    <span>Laravel / React</span>
                                </div>
                            </div>

                            <div className="space-y-3 pt-4 border-t border-[#E5E7EB]">
                                {project.live_url && (
                                    <a 
                                        href={project.live_url} 
                                        target="_blank" 
                                        rel="noreferrer" 
                                        className="block w-full py-2.5 rounded-lg bg-[#942929] hover:bg-black text-white text-center text-xs font-bold uppercase tracking-wider transition"
                                    >
                                        Live Demo
                                    </a>
                                )}
                                {project.github_url && (
                                    <a 
                                        href={project.github_url} 
                                        target="_blank" 
                                        rel="noreferrer" 
                                        className="block w-full py-2.5 rounded-lg bg-white border border-[#942929] text-[#942929] text-center text-xs font-bold uppercase tracking-wider hover:bg-[#FFEDED] transition"
                                    >
                                        GitHub Repository
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

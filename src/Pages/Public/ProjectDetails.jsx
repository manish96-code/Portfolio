import React, { useEffect } from 'react';
import AppLayout from '../../Layouts/AppLayout';

function SimpleMarkdown({ content }) {
    if (!content) return null;

    const lines = content.split('\n');
    return (
        <div className="space-y-4 text-[#475569] leading-relaxed font-normal text-sm">
            {lines.map((line, idx) => {
                if (line.startsWith('# ')) {
                    return <h1 key={idx} className="text-2xl font-extrabold text-[#0F172A] mt-8 mb-4 pb-2 border-b border-[#F1F5F9]">{line.replace('# ', '')}</h1>;
                }
                if (line.startsWith('## ')) {
                    return <h2 key={idx} className="text-lg font-bold text-[#0F172A] mt-6 mb-3">{line.replace('## ', '')}</h2>;
                }
                if (line.startsWith('### ')) {
                    return <h3 key={idx} className="text-sm font-bold text-[#3B82F6] mt-5 mb-2 uppercase tracking-wide font-code">{line.replace('### ', '')}</h3>;
                }
                if (line.startsWith('- ')) {
                    return <li key={idx} className="list-disc ml-6 mt-1 text-[#475569]">{line.replace('- ', '')}</li>;
                }
                if (/^\d+\.\s/.test(line)) {
                    return <li key={idx} className="list-decimal ml-6 mt-1 text-[#475569]">{line.replace(/^\d+\.\s/, '')}</li>;
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
            <div className="max-w-[1200px] mx-auto px-6 py-16 md:py-24">
                <a href="#/" className="inline-flex items-center gap-2 text-xs font-semibold text-[#3B82F6] hover:text-[#2563EB] transition mb-8 uppercase tracking-wider font-code">
                    &larr; Back to Portfolio
                </a>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    
                    {/* Project Specifications */}
                    <div className="lg:col-span-8 space-y-6">
                        <div className="flex flex-wrap gap-1.5">
                            {tags.map((t, idx) => (
                                <span key={idx} className="px-2.5 py-0.5 rounded bg-[#3B82F6]/5 border border-[#3B82F6]/10 text-[#3B82F6] text-[10px] uppercase tracking-wider font-semibold font-code">
                                    {t}
                                </span>
                            ))}
                        </div>

                        <h1 className="text-3xl md:text-5xl font-black text-[#0F172A] tracking-tight leading-tight">
                            {project.title}
                        </h1>

                        <p className="text-[#475569] text-sm leading-relaxed max-w-3xl">
                            {project.description}
                        </p>

                        <div className="border border-[#E2E8F0] rounded-xl p-8 md:p-12 bg-white shadow-sm mt-8">
                            <SimpleMarkdown content={project.content} />
                        </div>
                    </div>

                    {/* Metadata & Actions Card */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="border border-[#E2E8F0] rounded-xl p-6 bg-white shadow-sm space-y-6">
                            <h3 className="font-bold text-xs text-[#0F172A] uppercase tracking-wider font-code">Specifications</h3>
                            
                            <div className="space-y-4 text-xs font-code">
                                <div className="flex justify-between py-2 border-b border-[#F1F5F9]">
                                    <span className="font-semibold text-gray-400">Status</span>
                                    <span className={`font-bold ${project.status === 'Completed' ? 'text-emerald-600' : 'text-amber-600'}`}>{project.status}</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-[#F1F5F9]">
                                    <span className="font-semibold text-gray-400">Stack Layer</span>
                                    <span>Full Stack environment</span>
                                </div>
                                <div className="flex justify-between py-2">
                                    <span className="font-semibold text-gray-400">Environment</span>
                                    <span>Laravel / React</span>
                                </div>
                            </div>

                            <div className="space-y-3 pt-4 border-t border-[#F1F5F9]">
                                {project.live_url && (
                                    <a 
                                        href={project.live_url} 
                                        target="_blank" 
                                        rel="noreferrer" 
                                        className="block w-full py-2.5 rounded-lg bg-[#3B82F6] hover:bg-[#2563EB] text-white text-center text-xs font-semibold tracking-wider transition"
                                    >
                                        Live Demo
                                    </a>
                                )}
                                {project.github_url && (
                                    <a 
                                        href={project.github_url} 
                                        target="_blank" 
                                        rel="noreferrer" 
                                        className="block w-full py-2.5 rounded-lg bg-white border border-[#E2E8F0] text-[#0F172A] text-center text-xs font-semibold tracking-wider hover:bg-slate-50 transition"
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

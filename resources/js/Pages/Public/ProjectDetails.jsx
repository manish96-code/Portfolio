import React from 'react';
import AppLayout from '../../Layouts/AppLayout';
import { Head, Link } from '@inertiajs/react';

function SimpleMarkdown({ content }) {
    if (!content) return null;

    const lines = content.split('\n');
    return (
        <div className="space-y-4 text-[#6B7280] leading-relaxed font-normal text-sm">
            {lines.map((line, idx) => {
                if (line.startsWith('# ')) {
                    return <h1 key={idx} className="text-xl font-bold text-[#111827] mt-6 mb-3 pb-2 border-b border-[#E5E7EB]">{line.replace('# ', '')}</h1>;
                }
                if (line.startsWith('## ')) {
                    return <h2 key={idx} className="text-base font-bold text-[#111827] mt-5 mb-2">{line.replace('## ', '')}</h2>;
                }
                if (line.startsWith('### ')) {
                    return <h3 key={idx} className="text-sm font-semibold text-[#2563EB] mt-4 mb-2">{line.replace('### ', '')}</h3>;
                }
                if (line.startsWith('- ')) {
                    return <li key={idx} className="list-disc ml-6 mt-1 text-[#6B7280]">{line.replace('- ', '')}</li>;
                }
                if (/^\d+\.\s/.test(line)) {
                    return <li key={idx} className="list-decimal ml-6 mt-1 text-[#6B7280]">{line.replace(/^\d+\.\s/, '')}</li>;
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
    const tags = Array.isArray(project.technologies) ? project.technologies : JSON.parse(project.technologies || '[]');

    return (
        <AppLayout settings={settings} socialLinks={socialLinks}>
            <Head>
                <title>{`${project.title} - Project Details`}</title>
                <meta name="description" content={project.description} />
            </Head>

            <div className="max-w-[1280px] mx-auto px-6 py-12">
                <Link href="/" className="inline-flex items-center gap-2 text-xs font-semibold text-[#6B7280] hover:text-[#111827] transition mb-8">
                    &larr; Back to Portfolio
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    
                    {/* Project Specifications */}
                    <div className="lg:col-span-8 space-y-6">
                        <div className="flex flex-wrap gap-1.5">
                            {tags.map((t, idx) => (
                                <span key={idx} className="px-2 py-0.5 rounded bg-[#F3F4F6] text-[#6B7280] text-[9px] uppercase tracking-wider font-bold">
                                    {t}
                                </span>
                            ))}
                        </div>

                        <h1 className="text-3xl font-extrabold text-[#111827] tracking-tight">
                            {project.title}
                        </h1>

                        <p className="text-[#6B7280] text-sm leading-relaxed max-w-3xl">
                            {project.description}
                        </p>

                        <div className="border border-[#E5E7EB] rounded-xl p-8 bg-white shadow-sm mt-8">
                            <SimpleMarkdown content={project.content} />
                        </div>
                    </div>

                    {/* Metadata & Actions Card */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="border border-[#E5E7EB] rounded-xl p-6 bg-white shadow-sm space-y-6">
                            <h3 className="font-bold text-xs text-[#111827] uppercase tracking-wider">Specifications</h3>
                            
                            <div className="space-y-4 text-xs">
                                <div className="flex justify-between py-2 border-b border-[#E5E7EB]/60">
                                    <span className="font-semibold text-[#6B7280]">Project Status</span>
                                    <span className={`font-bold ${project.status === 'Completed' ? 'text-emerald-600' : 'text-amber-600'}`}>{project.status}</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-[#E5E7EB]/60">
                                    <span className="font-semibold text-[#6B7280]">Stack Layer</span>
                                    <span>Full Stack web environment</span>
                                </div>
                                <div className="flex justify-between py-2">
                                    <span className="font-semibold text-[#6B7280]">Environment</span>
                                    <span>Laravel / React</span>
                                </div>
                            </div>

                            <div className="space-y-3 pt-4 border-t border-[#E5E7EB]">
                                {project.live_url && (
                                    <a 
                                        href={project.live_url} 
                                        target="_blank" 
                                        rel="noreferrer" 
                                        className="block w-full py-2.5 rounded-lg bg-[#2563EB] hover:bg-[#1d4ed8] text-white text-center text-xs font-semibold transition"
                                    >
                                        Live Demo
                                    </a>
                                )}
                                {project.github_url && (
                                    <a 
                                        href={project.github_url} 
                                        target="_blank" 
                                        rel="noreferrer" 
                                        className="block w-full py-2.5 rounded-lg bg-white border border-[#2563EB] text-[#2563EB] text-center text-xs font-semibold hover:bg-[#2563EB]/5 transition"
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

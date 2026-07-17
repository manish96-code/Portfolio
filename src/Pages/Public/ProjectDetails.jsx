import React, { useEffect } from 'react';
import AppLayout, { IconGitHub, IconExternal } from '../../Layouts/AppLayout';

function SimpleMarkdown({ content }) {
    if (!content) return null;

    const lines = content.split('\n');
    return (
        <div className="space-y-4 text-zinc-700 leading-relaxed text-sm font-sans">
            {lines.map((line, idx) => {
                if (line.startsWith('# ')) {
                    return (
                        <h1 key={idx} className="text-2xl font-display font-extrabold text-zinc-900 mt-8 mb-4 pb-2 border-b border-zinc-200">
                            {line.replace('# ', '')}
                        </h1>
                    );
                }
                if (line.startsWith('## ')) {
                    return (
                        <h2 key={idx} className="text-xl font-display font-bold text-zinc-900 mt-6 mb-3">
                            {line.replace('## ', '')}
                        </h2>
                    );
                }
                if (line.startsWith('### ')) {
                    return (
                        <h3 key={idx} className="text-base font-semibold text-teal-600 mt-5 mb-2 font-mono">
                            {line.replace('### ', '')}
                        </h3>
                    );
                }
                if (line.startsWith('- ')) {
                    return (
                        <li key={idx} className="list-none ml-4 mt-2 text-zinc-700 flex items-start gap-2.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-650 mt-2 flex-shrink-0" />
                            <span>{line.replace('- ', '')}</span>
                        </li>
                    );
                }
                if (/^\d+\.\s/.test(line)) {
                    return (
                        <li key={idx} className="list-decimal ml-6 mt-1 text-zinc-800 font-medium">
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
                    className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-650 hover:text-zinc-950 border border-zinc-200 bg-white/80 hover:bg-zinc-50 px-4 py-2 rounded-lg transition-all duration-300 mb-8 group"
                >
                    <span className="group-hover:-translate-x-0.5 transition-transform">←</span> Back to Portfolio
                </a>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* Project Content */}
                    <div className="lg:col-span-8 space-y-6">
                        <span className="inline-block border border-indigo-200 bg-indigo-50 text-indigo-650 px-3 py-1 text-[10px] font-semibold font-mono rounded-full">
                            CASE STUDY 📝
                        </span>

                        <div className="flex flex-wrap gap-1.5">
                            {tags.map((t, idx) => (
                                <span
                                    key={idx}
                                    className="px-2.5 py-0.5 rounded border border-zinc-200 bg-zinc-50 text-zinc-500 text-[10px] font-mono font-medium"
                                >
                                    {t}
                                </span>
                            ))}
                        </div>

                        <h1 className="text-3xl md:text-5xl font-display font-extrabold text-zinc-900 tracking-tight leading-tight">
                            {project.title}
                        </h1>

                        <p className="text-zinc-650 text-base leading-relaxed max-w-3xl font-normal">
                            {project.description}
                        </p>

                        {/* Main detailed content sheet */}
                        <div className="bg-white border border-zinc-200 p-8 md:p-10 mt-8 rounded-xl shadow-md">
                            <SimpleMarkdown content={project.content} />
                        </div>
                    </div>

                    {/* Metadata Sidebar */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="border border-zinc-200 bg-white p-6 space-y-6 sticky top-24 shadow-md rounded-xl relative overflow-hidden text-zinc-700">
                            {/* Decorative top border */}
                            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-500 to-cyan-500"></div>

                            <h3 className="font-display text-lg font-bold text-zinc-900 border-b border-zinc-150 pb-3">
                                Project Info
                            </h3>

                            <div className="space-y-4 text-xs font-semibold">
                                <div className="flex justify-between py-2 border-b border-zinc-100">
                                    <span className="text-zinc-500">Status</span>
                                    <span className={`font-bold ${project.status === 'Completed' ? 'text-emerald-650' : 'text-amber-600'}`}>
                                        {project.status}
                                    </span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-zinc-100 font-sans">
                                    <span className="text-zinc-500">Type</span>
                                    <span className="text-zinc-700">Full Stack</span>
                                </div>
                                <div className="flex justify-between py-2 font-sans">
                                    <span className="text-zinc-500">Stack</span>
                                    <span className="text-zinc-700">Laravel & React</span>
                                </div>
                            </div>

                            <div className="space-y-3 pt-4 border-t border-zinc-100">
                                {project.live_url && (
                                    <a
                                        href={project.live_url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="btn-hand-primary flex items-center justify-center gap-2 w-full py-2.5 text-xs font-bold rounded-lg"
                                    >
                                        <IconExternal /> Live Demo
                                    </a>
                                )}
                                {project.github_url && (
                                    <a
                                        href={project.github_url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="btn-hand-secondary flex items-center justify-center gap-2 w-full py-2.5 text-xs font-bold rounded-lg"
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

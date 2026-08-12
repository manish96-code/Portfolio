import React, { useEffect } from 'react';
import AppLayout, { IconGitHub, IconExternal } from '../../Layouts/AppLayout';

function SimpleMarkdown({ content }) {
    if (!content) return null;

    const lines = content.split('\n');
    return (
        <div className="space-y-2.5 text-zinc-650 leading-relaxed text-xs sm:text-sm font-sans">
            {lines.map((line, idx) => {
                if (line.startsWith('# ')) {
                    return (
                        <h1 key={idx} className="text-lg sm:text-xl font-display font-bold text-zinc-900 mt-6 mb-3 pb-1.5 border-b border-zinc-200">
                            {line.replace('# ', '')}
                        </h1>
                    );
                }
                if (line.startsWith('## ')) {
                    return (
                        <h2 key={idx} className="text-base font-display font-semibold text-zinc-900 mt-5 mb-2 border-b border-zinc-150 pb-1">
                            {line.replace('## ', '')}
                        </h2>
                    );
                }
                if (line.startsWith('### ')) {
                    return (
                        <h3 key={idx} className="text-sm font-semibold text-indigo-600 mt-4 mb-1.5 font-display">
                            {line.replace('### ', '')}
                        </h3>
                    );
                }
                if (line.startsWith('---')) {
                    return <hr key={idx} className="my-4 border-zinc-200" />;
                }
                if (line.startsWith('- ') || line.startsWith('  - ')) {
                    const isIndent = line.startsWith('  - ');
                    const rawText = line.replace(/^(  - |- )/, '');
                    const parts = rawText.split(/(`[^`]+`|\*\*.*?\*\*)/g);
                    return (
                        <li key={idx} className={`list-none ${isIndent ? 'ml-6' : 'ml-2'} mt-1 text-zinc-650 flex items-start gap-2`}>
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-1.5 flex-shrink-0" />
                            <span>
                                {parts.map((part, pIdx) => {
                                    if (part.startsWith('**') && part.endsWith('**')) {
                                        return <strong key={pIdx} className="font-semibold text-zinc-900">{part.slice(2, -2)}</strong>;
                                    }
                                    if (part.startsWith('`') && part.endsWith('`')) {
                                        return <code key={pIdx} className="px-1.5 py-0.5 rounded bg-zinc-100 border border-zinc-200 font-mono text-[11px] text-indigo-600 font-semibold">{part.slice(1, -1)}</code>;
                                    }
                                    return part;
                                })}
                            </span>
                        </li>
                    );
                }
                if (/^\d+\.\s/.test(line)) {
                    const rawText = line.replace(/^\d+\.\s/, '');
                    const parts = rawText.split(/(`[^`]+`|\*\*.*?\*\*)/g);
                    return (
                        <div key={idx} className="ml-2 mt-1.5 font-medium text-zinc-800 flex items-start gap-2">
                            <span className="font-bold text-indigo-600">{line.match(/^\d+/)?.[0]}.</span>
                            <span>
                                {parts.map((part, pIdx) => {
                                    if (part.startsWith('**') && part.endsWith('**')) {
                                        return <strong key={pIdx} className="font-semibold text-zinc-900">{part.slice(2, -2)}</strong>;
                                    }
                                    if (part.startsWith('`') && part.endsWith('`')) {
                                        return <code key={pIdx} className="px-1.5 py-0.5 rounded bg-zinc-100 border border-zinc-200 font-mono text-[11px] text-indigo-600 font-semibold">{part.slice(1, -1)}</code>;
                                    }
                                    return part;
                                })}
                            </span>
                        </div>
                    );
                }
                if (line.startsWith('```')) {
                    return null;
                }
                if (line.trim() === '') {
                    return <div key={idx} className="h-1"></div>;
                }

                const parts = line.split(/(`[^`]+`|\*\*.*?\*\*)/g);
                return (
                    <p key={idx}>
                        {parts.map((part, pIdx) => {
                            if (part.startsWith('**') && part.endsWith('**')) {
                                return <strong key={pIdx} className="font-semibold text-zinc-900">{part.slice(2, -2)}</strong>;
                            }
                            if (part.startsWith('`') && part.endsWith('`')) {
                                return <code key={pIdx} className="px-1.5 py-0.5 rounded bg-zinc-100 border border-zinc-200 font-mono text-[11px] text-indigo-600 font-semibold">{part.slice(1, -1)}</code>;
                            }
                            return part;
                        })}
                    </p>
                );
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
            <div className="pt-28 pb-20 font-sans max-w-6xl mx-auto">

                {/* Back button */}
                <a
                    href="/"
                    onClick={(e) => { e.preventDefault(); navigate('/'); }}
                    className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-600 hover:text-zinc-950 border border-zinc-200 bg-white/80 hover:bg-zinc-50 px-3.5 py-1.5 rounded-lg transition-all duration-300 mb-6 group shadow-sm"
                >
                    <span className="group-hover:-translate-x-0.5 transition-transform">←</span> Back to Portfolio
                </a>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                    {/* Project Main Content */}
                    <div className="lg:col-span-8 space-y-4">
                        <div className="flex flex-wrap items-center gap-2">
                            <span className="inline-block border border-indigo-200 bg-indigo-50 text-indigo-700 px-2.5 py-0.5 text-[10px] font-semibold font-mono rounded-md">
                                CASE STUDY 📝
                            </span>

                            {tags.map((t, idx) => (
                                <span
                                    key={idx}
                                    className="px-2 py-0.5 rounded border border-zinc-200 bg-zinc-50 text-zinc-600 text-[10px] font-mono font-medium"
                                >
                                    {t}
                                </span>
                            ))}
                        </div>

                        <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-zinc-900 tracking-tight leading-snug">
                            {project.title}
                        </h1>

                        <p className="text-zinc-600 text-xs sm:text-sm leading-relaxed max-w-2xl font-normal">
                            {project.description}
                        </p>

                        {/* Detailed content card */}
                        <div className="bg-white border border-zinc-200/90 p-5 sm:p-7 mt-6 rounded-xl shadow-sm">
                            <SimpleMarkdown content={project.content} />
                        </div>
                    </div>

                    {/* Metadata Sidebar */}
                    <div className="lg:col-span-4">
                        <div className="border border-zinc-200 bg-white p-5 space-y-5 sticky top-24 shadow-sm rounded-xl relative overflow-hidden text-zinc-700">
                            {/* Solid accent top border */}
                            <div className="absolute top-0 left-0 right-0 h-[3px] bg-indigo-600"></div>

                            <h3 className="font-display text-base font-bold text-zinc-900 border-b border-zinc-150 pb-2.5">
                                Project Overview
                            </h3>

                            <div className="space-y-3 text-xs font-medium">
                                <div className="flex justify-between py-1.5 border-b border-zinc-100">
                                    <span className="text-zinc-500">Status</span>
                                    <span className={`font-bold ${project.status === 'Completed' ? 'text-emerald-600' : 'text-amber-600'}`}>
                                        {project.status}
                                    </span>
                                </div>
                                <div className="flex justify-between py-1.5 border-b border-zinc-100 font-sans">
                                    <span className="text-zinc-500">Type</span>
                                    <span className="text-zinc-800 font-semibold">Full Stack</span>
                                </div>
                                <div className="flex justify-between py-1.5 font-sans">
                                    <span className="text-zinc-500">Stack</span>
                                    <span className="text-zinc-800 font-semibold">Laravel & React</span>
                                </div>
                            </div>

                            <div className="space-y-2.5 pt-3 border-t border-zinc-100">
                                {project.live_url && (
                                    <a
                                        href={project.live_url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex items-center justify-center gap-2 w-full py-2.5 px-4 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition-all duration-200"
                                    >
                                        <IconExternal /> Live Demo
                                    </a>
                                )}
                                {project.github_url && (
                                    <a
                                        href={project.github_url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex items-center justify-center gap-2 w-full py-2.5 px-4 text-xs font-semibold rounded-lg bg-white border border-zinc-300 hover:border-zinc-400 text-zinc-800 hover:bg-zinc-50 shadow-sm transition-all duration-200"
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

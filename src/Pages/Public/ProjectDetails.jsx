import React, { useEffect } from 'react';
import AppLayout, { IconGitHub, IconExternal } from '../../Layouts/AppLayout';
import SEO from '../../Components/SEO';
import { getProjectSchema } from '../../utils/seoSchemas';

function SimpleMarkdown({ content }) {
    if (!content) return null;

    const lines = content.split('\n');
    return (
        <div className="space-y-1.5 text-zinc-650 leading-relaxed text-xs sm:text-sm font-sans">
            {lines.map((line, idx) => {
                if (line.startsWith('# ')) {
                    return (
                        <h1 key={idx} className="text-base sm:text-lg font-display font-bold text-zinc-900 mt-4 first:mt-0 mb-2 pb-1 border-b border-zinc-200">
                            {line.replace('# ', '')}
                        </h1>
                    );
                }
                if (line.startsWith('## ')) {
                    return (
                        <h2 key={idx} className="text-sm sm:text-base font-display font-semibold text-zinc-900 mt-3.5 first:mt-0 mb-1.5 border-b border-zinc-150 pb-1">
                            {line.replace('## ', '')}
                        </h2>
                    );
                }
                if (line.startsWith('### ')) {
                    return (
                        <h3 key={idx} className="text-xs sm:text-sm font-semibold text-indigo-600 mt-2.5 first:mt-0 mb-1 font-display">
                            {line.replace('### ', '')}
                        </h3>
                    );
                }
                if (line.startsWith('---')) {
                    return <hr key={idx} className="my-2.5 border-zinc-200" />;
                }
                if (line.startsWith('- ') || line.startsWith('  - ')) {
                    const isIndent = line.startsWith('  - ');
                    const rawText = line.replace(/^(  - |- )/, '');
                    const parts = rawText.split(/(`[^`]+`|\*\*.*?\*\*)/g);
                    return (
                        <li key={idx} className={`list-none ${isIndent ? 'ml-5' : 'ml-1.5'} mt-0.5 text-zinc-650 flex items-start gap-2`}>
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
                        <div key={idx} className="ml-1.5 mt-1 font-medium text-zinc-800 flex items-start gap-2">
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
                    return null;
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
    const projectSchema = getProjectSchema(project, settings);

    return (
        <AppLayout settings={settings} socialLinks={socialLinks} navigate={navigate}>
            <SEO
                title={`${project.title} | Case Study`}
                description={project.description}
                canonicalUrl={`/project/${project.slug}`}
                ogImage={project.thumbnail}
                schemaData={projectSchema}
            />
            <div className="py-6 sm:py-8 font-sans max-w-7xl mx-auto px-4 sm:px-6 lg:px-14 xl:px-16">

                {/* Back button */}
                <a
                    href="/"
                    onClick={(e) => { e.preventDefault(); navigate('/'); }}
                    className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700 hover:text-slate-900 border border-slate-200 bg-white hover:bg-slate-50 px-3.5 py-1.5 rounded-lg transition-colors mb-5 group shadow-2xs"
                >
                    <span className="group-hover:-translate-x-0.5 transition-transform">←</span> Back to Projects
                </a>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">

                    {/* Project Main Content */}
                    <div className="lg:col-span-8 space-y-4">
                        <div className="flex flex-wrap items-center gap-1.5">
                            <span className="inline-block border border-blue-200 bg-blue-50 text-blue-700 px-2.5 py-0.5 text-[10px] font-semibold font-mono rounded-md">
                                CASE STUDY 📝
                            </span>

                            {tags.map((t, idx) => (
                                <span
                                    key={idx}
                                    className="px-2 py-0.5 rounded-md border border-slate-200 bg-slate-50 text-slate-600 text-[10px] font-mono font-medium"
                                >
                                    {t}
                                </span>
                            ))}
                        </div>

                        <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 tracking-tight leading-snug">
                            {project.title}
                        </h1>

                        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-2xl font-normal">
                            {project.description}
                        </p>

                        {/* Contribution Scope Banner */}
                        <div className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${project.contribution_type === 'minor'
                            ? 'bg-amber-50/70 border-amber-200 text-amber-950'
                            : 'bg-blue-50/70 border-blue-200 text-blue-950'
                            }`}>
                            <div className="flex items-center gap-2.5">
                                <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider font-mono shadow-2xs ${project.contribution_type === 'minor'
                                    ? 'bg-amber-200/90 text-amber-900'
                                    : 'bg-blue-200/90 text-blue-900'
                                    }`}>
                                    {project.contribution_type === 'minor' ? 'Module Contribution' : 'Core Architecture'}
                                </span>
                                <span className="text-xs font-semibold text-slate-800">
                                    Role: {project.role || 'Full-Stack Developer'}
                                </span>
                            </div>
                            {project.contribution_scope && (
                                <p className="text-xs text-slate-600 sm:text-right">
                                    <strong className="text-slate-800 font-medium">Contributed:</strong> {project.contribution_scope}
                                </p>
                            )}
                        </div>

                        {/* Detailed content card */}
                        <div className="bg-white border border-slate-200 p-5 sm:p-7 mt-5 rounded-2xl shadow-2xs">
                            <SimpleMarkdown content={project.content} />
                        </div>

                        {/* Screenshot Gallery if available */}
                        {project.images && project.images.length > 0 && (
                            <div className="bg-white border border-slate-200 p-5 sm:p-7 mt-5 rounded-2xl shadow-2xs space-y-4">
                                <div className="border-b border-slate-100 pb-3">
                                    <h2 className="font-display text-base font-bold text-slate-900">
                                        Interface &amp; System Screenshots
                                    </h2>
                                    <p className="text-xs text-slate-500 mt-0.5">
                                        Production portals, live dashboard metrics, and interactive student/admin views.
                                    </p>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {project.images.map((img, i) => (
                                        <div key={i} className="group rounded-xl overflow-hidden border border-slate-200 bg-slate-50 shadow-2xs hover:border-blue-400 transition-all">
                                            <img
                                                src={img}
                                                alt={`${project.title} Screenshot ${i + 1}`}
                                                className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-300"
                                                loading="lazy"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Metadata Sidebar */}
                    <div className="lg:col-span-4">
                        <div className="border border-slate-200 bg-white p-5 space-y-4 sticky top-20 shadow-2xs rounded-2xl relative overflow-hidden text-slate-700">
                            {/* Solid accent top border */}
                            <div className="absolute top-0 left-0 right-0 h-[3px] bg-blue-600"></div>

                            <h3 className="font-display text-sm sm:text-base font-bold text-slate-900 border-b border-slate-100 pb-2.5">
                                Project Overview
                            </h3>

                            <div className="space-y-2.5 text-xs font-medium">
                                <div className="flex justify-between py-1 border-b border-slate-100">
                                    <span className="text-slate-500">Status</span>
                                    <span className={`font-bold ${project.status === 'Completed' ? 'text-emerald-600' : 'text-amber-600'}`}>
                                        {project.status}
                                    </span>
                                </div>
                                <div className="flex justify-between py-1 border-b border-slate-100 font-sans">
                                    <span className="text-slate-500">Contribution</span>
                                    <span className={`font-semibold ${project.contribution_type === 'minor' ? 'text-amber-700' : 'text-blue-700'}`}>
                                        {project.contribution_type === 'minor' ? 'Module Contributor' : 'Core Build'}
                                    </span>
                                </div>
                                <div className="flex justify-between py-1 border-b border-slate-100 font-sans">
                                    <span className="text-slate-500">My Role</span>
                                    <span className="text-slate-800 font-semibold text-right">{project.role || 'Full-Stack Developer'}</span>
                                </div>
                                <div className="flex justify-between py-1 font-sans">
                                    <span className="text-slate-500">Type</span>
                                    <span className="text-slate-800 font-semibold">Full Stack</span>
                                </div>
                                <div className="flex justify-between py-1 font-sans">
                                    <span className="text-slate-500">Stack</span>
                                    <span className="text-slate-800 font-semibold">Laravel &amp; React</span>
                                </div>
                            </div>

                            <div className="space-y-2 pt-3 border-t border-slate-100">
                                {project.live_url && (
                                    <a
                                        href={project.live_url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex items-center justify-center gap-2 w-full py-2.5 px-3 text-xs font-semibold rounded-lg bg-slate-900 hover:bg-slate-800 text-white shadow-xs transition-colors"
                                    >
                                        <IconExternal /> Live Demo
                                    </a>
                                )}
                                {project.github_url && (
                                    <a
                                        href={project.github_url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex items-center justify-center gap-2 w-full py-2.5 px-3 text-xs font-semibold rounded-lg bg-white border border-slate-200 hover:border-slate-300 text-slate-800 hover:bg-slate-50 shadow-2xs transition-colors"
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

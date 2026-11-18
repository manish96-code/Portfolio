import React, { useEffect, useState } from 'react';
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

function ProjectGallery({ images, title, liveUrl }) {
    const [activeIdx, setActiveIdx] = useState(0);
    const [lightboxOpen, setLightboxOpen] = useState(false);

    const activeImage = images[activeIdx] || images[0];

    useEffect(() => {
        if (!lightboxOpen) return;
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') setLightboxOpen(false);
            if (e.key === 'ArrowRight') setActiveIdx((prev) => (prev + 1) % images.length);
            if (e.key === 'ArrowLeft') setActiveIdx((prev) => (prev - 1 + images.length) % images.length);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [lightboxOpen, images.length]);

    const getImageLabel = (imgUrl, idx) => {
        // Learn Syntax labels
        if (imgUrl.includes('learn-syntax-admin')) return 'Admin Management Portal';
        if (imgUrl.includes('learn-syntax-timetable')) return 'Live Cohort Timetable';
        if (imgUrl.includes('learn-syntax-certificates')) return 'Student Certificate & Verification';
        if (imgUrl.includes('learn-syntax-thumb')) return 'Platform Landing Page & Courses Track';

        // Ciplon labels
        if (imgUrl.includes('ciplon-mr-dashboard')) return 'MR Field Operations Dashboard';
        if (imgUrl.includes('ciplon-route-map')) return 'Doctor Movement & Route Map';
        if (imgUrl.includes('ciplon-mr-directory')) return 'Medical Representatives Directory';
        if (imgUrl.includes('ciplon-telemetry')) return 'Live GPS Telemetry & Tracking';
        if (imgUrl.includes('ciplon-rnd')) return 'R&D & Formulations Overview';
        if (imgUrl.includes('ciplon-thumb')) return 'Field Interface Overview';

        // Generic fallbacks
        if (imgUrl.includes('admin')) return 'Admin Management Portal';
        if (imgUrl.includes('timetable')) return 'Live Cohort Timetable';
        if (imgUrl.includes('certificates')) return 'Student Certificate & Verification';
        if (imgUrl.includes('thumb')) return 'Platform Overview';
        return `System View ${idx + 1}`;
    };

    return (
        <div className="bg-white border border-slate-200 p-4 sm:p-5 rounded-2xl shadow-2xs space-y-3.5">
            <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
                <div>
                    <h2 className="font-display text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
                        <span>Project Screenshots</span>
                        <span className="text-[10px] font-semibold font-mono px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                            {images.length} Views
                        </span>
                    </h2>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                        Interactive portals &amp; workflows. Click to zoom.
                    </p>
                </div>
                <button
                    type="button"
                    onClick={() => setLightboxOpen(true)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold transition-colors cursor-pointer shadow-2xs"
                >
                    <svg className="w-3.5 h-3.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                    </svg>
                    <span>Full Screen</span>
                </button>
            </div>

            {/* Browser Mockup Showcase */}
            <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-900 shadow-sm relative group">
                {/* Browser Header Bar */}
                <div className="px-3 py-1.5 bg-slate-100 border-b border-slate-200 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-rose-400 inline-block" />
                        <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />
                        <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
                    </div>
                    <div className="flex-1 max-w-[220px] mx-auto flex items-center justify-center px-2 py-0.5 rounded bg-white border border-slate-200 text-[10px] text-slate-500 font-mono truncate">
                        <span className="text-slate-400 mr-1 text-[9px]">🔒</span>
                        <span className="truncate">{liveUrl ? liveUrl.replace(/^https?:\/\//, '').replace(/\/$/, '') : 'Verified Interface'}</span>
                    </div>
                    <div className="text-[10px] font-semibold text-slate-600 bg-white px-1.5 py-0.5 rounded border border-slate-200 shadow-2xs">
                        {activeIdx + 1}/{images.length}
                    </div>
                </div>

                {/* Active View Box */}
                <div
                    className="relative bg-slate-950 flex items-center justify-center overflow-hidden cursor-zoom-in aspect-[16/10]"
                    onClick={() => setLightboxOpen(true)}
                >
                    <img
                        src={activeImage}
                        alt={`${title} - ${getImageLabel(activeImage, activeIdx)}`}
                        className="w-full h-full object-contain mx-auto transition-transform duration-200 group-hover:scale-[1.01]"
                        loading="lazy"
                    />
                    <div className="absolute inset-0 bg-slate-950/0 group-hover:bg-slate-950/15 transition-colors pointer-events-none" />
                    <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-slate-900/85 backdrop-blur-xs text-white text-[10px] font-medium opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 shadow-md pointer-events-none">
                        <span>🔍 Zoom</span>
                    </span>

                    {/* Arrow Navigation inside card */}
                    {images.length > 1 && (
                        <>
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveIdx((prev) => (prev - 1 + images.length) % images.length);
                                }}
                                className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-sm font-bold shadow-md cursor-pointer border border-white/10"
                                title="Previous Screenshot"
                            >
                                ‹
                            </button>
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveIdx((prev) => (prev + 1) % images.length);
                                }}
                                className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-sm font-bold shadow-md cursor-pointer border border-white/10"
                                title="Next Screenshot"
                            >
                                ›
                            </button>
                        </>
                    )}
                </div>

                {/* Caption Bar */}
                <div className="px-3 py-2 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-700">
                    <span className="font-semibold text-slate-800 text-[11px] truncate flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 flex-shrink-0" />
                        <span className="truncate">{getImageLabel(activeImage, activeIdx)}</span>
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono hidden sm:inline flex-shrink-0">
                        Live UI
                    </span>
                </div>
            </div>

            {/* Thumbnail Selectors (Uniform 16:10 aspect ratio) */}
            <div className={`grid ${images.length === 5 ? 'grid-cols-5' : images.length === 4 ? 'grid-cols-4' : 'grid-cols-3'} gap-2 pt-1`}>
                {images.map((img, i) => {
                    const isActive = i === activeIdx;
                    return (
                        <button
                            key={i}
                            type="button"
                            onClick={() => setActiveIdx(i)}
                            title={getImageLabel(img, i)}
                            className={`group rounded-lg overflow-hidden border text-left transition-all duration-200 cursor-pointer flex flex-col ${
                                isActive
                                    ? 'border-blue-600 ring-2 ring-blue-600/30 shadow-xs'
                                    : 'border-slate-200 hover:border-slate-300 bg-slate-50 opacity-75 hover:opacity-100'
                            }`}
                        >
                            <div className="aspect-[16/10] w-full overflow-hidden bg-slate-100 relative">
                                <img
                                    src={img}
                                    alt={`Thumbnail ${i + 1}`}
                                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-200"
                                    loading="lazy"
                                />
                                {isActive && (
                                    <span className="absolute top-1 left-1 w-1.5 h-1.5 rounded-full bg-blue-600 ring-1.5 ring-white" />
                                )}
                            </div>
                        </button>
                    );
                })}
            </div>

            {/* Fullscreen Lightbox Modal */}
            {lightboxOpen && (
                <div
                    className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 animate-in fade-in duration-150"
                    onClick={() => setLightboxOpen(false)}
                >
                    {/* Modal Top Bar */}
                    <div className="flex items-center justify-between text-white pb-3 max-w-7xl mx-auto w-full" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center gap-2">
                            <span className="font-display font-bold text-sm sm:text-base">
                                {title}
                            </span>
                            <span className="text-slate-400 text-xs hidden sm:inline">•</span>
                            <span className="text-slate-300 text-xs font-medium hidden sm:inline">
                                {getImageLabel(activeImage, activeIdx)}
                            </span>
                        </div>

                        <div className="flex items-center gap-3">
                            <span className="text-xs font-mono text-slate-400">
                                {activeIdx + 1} of {images.length}
                            </span>
                            <button
                                type="button"
                                onClick={() => setLightboxOpen(false)}
                                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer text-sm font-bold"
                                title="Close (Esc)"
                            >
                                ✕
                            </button>
                        </div>
                    </div>

                    {/* Modal Main View */}
                    <div
                        className="flex-1 flex items-center justify-center relative overflow-auto my-auto max-h-[82vh] max-w-7xl mx-auto w-full"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src={activeImage}
                            alt={`${title} Fullscreen`}
                            className="max-h-[82vh] max-w-full w-auto h-auto object-contain rounded-lg shadow-2xl"
                        />

                        {images.length > 1 && (
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveIdx((prev) => (prev - 1 + images.length) % images.length);
                                }}
                                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white flex items-center justify-center transition-colors cursor-pointer shadow-lg border border-white/10 text-xl font-bold"
                                title="Previous (Left arrow)"
                            >
                                ‹
                            </button>
                        )}

                        {images.length > 1 && (
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveIdx((prev) => (prev + 1) % images.length);
                                }}
                                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white flex items-center justify-center transition-colors cursor-pointer shadow-lg border border-white/10 text-xl font-bold"
                                title="Next (Right arrow)"
                            >
                                ›
                            </button>
                        )}
                    </div>

                    {/* Modal Bottom Thumbnails */}
                    <div
                        className="flex items-center justify-center gap-2 pt-3 overflow-x-auto max-w-7xl mx-auto w-full"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {images.map((img, i) => (
                            <button
                                key={i}
                                type="button"
                                onClick={() => setActiveIdx(i)}
                                className={`w-14 h-9 rounded-md overflow-hidden border transition-all cursor-pointer ${
                                    i === activeIdx
                                        ? 'border-blue-500 ring-2 ring-blue-500'
                                        : 'border-white/20 opacity-60 hover:opacity-100'
                                }`}
                            >
                                <img src={img} alt={`Thumb ${i}`} className="w-full h-full object-cover object-top" />
                            </button>
                        ))}
                    </div>
                </div>
            )}
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

                    {/* Project Main Content (Left Column) */}
                    <div className="lg:col-span-7 space-y-4">
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

                        {/* Detailed content card */}
                        <div className="bg-white border border-slate-200 p-5 sm:p-7 mt-5 rounded-2xl shadow-2xs">
                            <SimpleMarkdown content={project.content} />
                        </div>
                    </div>

                    {/* Metadata & Media Showcase Sidebar (Right Column - Fills Empty Space) */}
                    <div className="lg:col-span-5 space-y-5">
                        {/* Project Overview Card */}
                        <div className="border border-slate-200 bg-white p-5 space-y-4 shadow-2xs rounded-2xl relative overflow-hidden text-slate-700">
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
                                    <span className="text-slate-500">Type</span>
                                    <span className="text-slate-800 font-semibold">Full Stack</span>
                                </div>
                                <div className="flex justify-between py-1 font-sans">
                                    <span className="text-slate-500">Stack</span>
                                    <span className="text-slate-800 font-semibold">{project.technologies ? project.technologies.slice(0, 3).join(', ') : 'Laravel & React'}</span>
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

                        {/* Interactive Screenshot Showcase Gallery (Directly on the Right Side) */}
                        {project.images && project.images.length > 0 && (
                            <div className="sticky top-20">
                                <ProjectGallery
                                    images={project.images}
                                    title={project.title}
                                    liveUrl={project.live_url}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

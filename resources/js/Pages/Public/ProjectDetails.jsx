import React, { useState } from 'react';
import AppLayout from '../../Layouts/AppLayout';
import { Head, Link } from '@inertiajs/react';

// A simple, light Markdown renderer to prevent dependency overhead and code bloat.
function SimpleMarkdown({ content }) {
    if (!content) return null;

    const lines = content.split('\n');
    return (
        <div className="space-y-4 text-slate-300 leading-relaxed font-light text-sm">
            {lines.map((line, idx) => {
                // Header 1
                if (line.startsWith('# ')) {
                    return <h1 key={idx} className="text-2xl font-black text-slate-100 mt-6 mb-3 pb-2 border-b border-slate-900">{line.replace('# ', '')}</h1>;
                }
                // Header 2
                if (line.startsWith('## ')) {
                    return <h2 key={idx} className="text-lg font-bold text-slate-200 mt-5 mb-2">{line.replace('## ', '')}</h2>;
                }
                // Header 3
                if (line.startsWith('### ')) {
                    return <h3 key={idx} className="text-base font-bold text-[#FF2D20] mt-4 mb-2">{line.replace('### ', '')}</h3>;
                }
                // Bullet point
                if (line.startsWith('- ')) {
                    return <li key={idx} className="list-disc ml-6 mt-1 text-slate-400">{line.replace('- ', '')}</li>;
                }
                // Numbered list
                if (/^\d+\.\s/.test(line)) {
                    return <li key={idx} className="list-decimal ml-6 mt-1 text-slate-400">{line.replace(/^\d+\.\s/, '')}</li>;
                }
                // Code block (extremely basic toggle)
                if (line.startsWith('```')) {
                    return null; // Ignore tag lines
                }
                // Empty lines
                if (line.trim() === '') {
                    return <div key={idx} className="h-2"></div>;
                }
                // Regular paragraph
                return <p key={idx}>{line}</p>;
            })}
        </div>
    );
}

export default function ProjectDetails({ project, socialLinks, settings }) {
    const [selectedImage, setSelectedImage] = useState(project.thumbnail);

    const images = Array.isArray(project.images) ? project.images : JSON.parse(project.images || '[]');
    const allImages = project.thumbnail ? [project.thumbnail, ...images] : images;
    const tags = Array.isArray(project.technologies) ? project.technologies : JSON.parse(project.technologies || '[]');

    return (
        <AppLayout settings={settings} socialLinks={socialLinks}>
            <Head>
                <title>{`${project.title} - Project Details`}</title>
                <meta name="description" content={project.description} />
            </Head>

            <div className="max-w-6xl mx-auto px-6 py-12">
                {/* Back button */}
                <Link href="/" className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-[#FF2D20] transition mb-8">
                    &larr; Back to Portfolio Landing
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Project Gallery */}
                    <div className="lg:col-span-6 space-y-4">
                        <div className="w-full aspect-video rounded-2xl bg-slate-900 border border-slate-850 overflow-hidden relative group">
                            {selectedImage ? (
                                <div className="w-full h-full flex items-center justify-center bg-slate-950/40">
                                    <span className="text-xs text-slate-500">Image: {selectedImage}</span>
                                </div>
                            ) : (
                                <div className="w-full h-full flex flex-col items-center justify-center text-slate-600 bg-slate-955 p-6">
                                    <span className="text-4xl">🖼️</span>
                                    <span className="text-xs mt-2 font-mono">No Image Uploaded</span>
                                </div>
                            )}
                        </div>

                        {/* Thumbnail Grid */}
                        {allImages.length > 1 && (
                            <div className="flex gap-3 overflow-x-auto pb-2">
                                {allImages.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedImage(img)}
                                        className={`w-20 aspect-video rounded-lg bg-slate-900 border overflow-hidden shrink-0 transition ${
                                            selectedImage === img ? 'border-[#FF2D20]' : 'border-slate-800'
                                        }`}
                                    >
                                        <div className="w-full h-full flex items-center justify-center text-[8px] text-slate-500 truncate px-1">
                                            Img {idx + 1}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Quick Stats Column */}
                    <div className="lg:col-span-6 flex flex-col justify-between">
                        <div className="space-y-6">
                            <div className="flex flex-wrap gap-2">
                                {tags.map((t, idx) => (
                                    <span key={idx} className="px-2.5 py-0.5 rounded-full bg-[#FF2D20]/10 text-[#FF2D20] border border-[#FF2D20]/20 text-[10px] font-bold uppercase tracking-wider">
                                        {t}
                                    </span>
                                ))}
                            </div>

                            <h1 className="text-4xl font-extrabold text-slate-100 tracking-tight leading-tight">
                                {project.title}
                            </h1>

                            <p className="text-slate-400 text-sm leading-relaxed font-light">
                                {project.description}
                            </p>

                            <div className="p-5 rounded-2xl bg-slate-900/30 border border-slate-900 space-y-3.5 text-xs text-slate-400">
                                <div className="flex justify-between py-1 border-b border-slate-900/40">
                                    <span className="font-semibold text-slate-300">Status</span>
                                    <span className={`font-bold ${project.status === 'Completed' ? 'text-emerald-400' : 'text-amber-400'}`}>{project.status}</span>
                                </div>
                                <div className="flex justify-between py-1 border-b border-slate-900/40">
                                    <span className="font-semibold text-slate-300">Category</span>
                                    <span>Web Application</span>
                                </div>
                                <div className="flex justify-between py-1">
                                    <span className="font-semibold text-slate-300">Database</span>
                                    <span>MySQL / SQLite</span>
                                </div>
                            </div>
                        </div>

                        {/* Call to Actions */}
                        <div className="flex flex-wrap gap-4 pt-6 border-t border-slate-900">
                            {project.live_url && (
                                <a 
                                    href={project.live_url} 
                                    target="_blank" 
                                    rel="noreferrer" 
                                    className="px-6 py-3 rounded-xl bg-[#FF2D20] hover:bg-[#e0241b] text-white text-xs font-bold transition shadow-lg shadow-[#FF2D20]/25"
                                >
                                    Live Demonstration
                                </a>
                            )}
                            {project.github_url && (
                                <a 
                                    href={project.github_url} 
                                    target="_blank" 
                                    rel="noreferrer" 
                                    className="px-6 py-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-bold hover:bg-slate-850 hover:border-slate-700 transition"
                                >
                                    GitHub Source
                                </a>
                            )}
                        </div>
                    </div>
                </div>

                {/* Case Study Details Markdown */}
                <div className="mt-16 bg-slate-900/10 border border-slate-900/80 p-8 md:p-12 rounded-3xl backdrop-blur-sm max-w-4xl mx-auto shadow-2xl">
                    <SimpleMarkdown content={project.content} />
                </div>
            </div>
        </AppLayout>
    );
}

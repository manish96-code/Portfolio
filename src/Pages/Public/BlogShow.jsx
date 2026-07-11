import React, { useEffect } from 'react';
import AppLayout from '../../Layouts/AppLayout';

function BlogMarkdown({ content }) {
    if (!content) return null;

    const lines = content.split('\n');
    return (
        <div className="space-y-4 text-slate-300 leading-relaxed text-base font-sans">
            {lines.map((line, idx) => {
                if (line.startsWith('# ')) {
                    return (
                        <h1 key={idx} className="text-3xl font-display font-extrabold text-white mt-8 mb-4 pb-2 border-b border-white/5">
                            {line.replace('# ', '')}
                        </h1>
                    );
                }
                if (line.startsWith('## ')) {
                    return (
                        <h2 key={idx} className="text-2xl font-display font-extrabold text-white mt-6 mb-3">
                            {line.replace('## ', '')}
                        </h2>
                    );
                }
                if (line.startsWith('### ')) {
                    return (
                        <h3 key={idx} className="text-lg font-bold text-cyan-400 mt-5 mb-2 font-mono">
                            {line.replace('### ', '')}
                        </h3>
                    );
                }
                if (line.startsWith('- ')) {
                    return (
                        <li key={idx} className="list-none ml-4 mt-2 text-slate-300 flex items-start gap-2.5">
                            <span className="text-cyan-400 select-none">✦</span>
                            <span>{line.replace('- ', '')}</span>
                        </li>
                    );
                }
                if (/^\d+\.\s/.test(line)) {
                    return (
                        <li key={idx} className="list-decimal ml-6 mt-1 text-slate-300 font-medium">
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

export default function BlogShow({ blog, socialLinks, settings, navigate }) {
    
    useEffect(() => {
        if (blog) {
            document.title = `${blog.title} | Blog`;
        }
    }, [blog]);

    if (!blog) return null;

    const tags = blog.tags || [];

    return (
        <AppLayout settings={settings} socialLinks={socialLinks} navigate={navigate}>
            <article className="max-w-[768px] mx-auto pt-32 pb-24 font-sans">
                
                {/* Back button */}
                <a 
                    href="/blogs" 
                    onClick={(e) => { e.preventDefault(); navigate('/blogs'); }} 
                    className="inline-flex items-center gap-2 text-sm font-bold text-slate-300 border border-white/10 bg-slate-900/60 px-4.5 py-2.5 rounded-xl hover:text-cyan-400 hover:border-cyan-400/40 hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(0,242,254,0.15)] transition-all duration-300 mb-8 group"
                >
                    <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Articles
                </a>

                {/* Article Header */}
                <header className="space-y-6 mb-10 pb-10 border-b border-white/5">
                    <div className="flex items-center gap-3.5 text-xs font-mono font-bold">
                        <span className="text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-0.5 rounded text-xs font-mono font-bold">
                            {blog.category}
                        </span>
                        <span className="text-slate-600">•</span>
                        <span className="text-slate-400">
                            {new Date(blog.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-display font-black text-white tracking-tight leading-tight">
                        {blog.title}
                    </h1>

                    <p className="text-slate-300 text-lg leading-relaxed italic border-l-2 border-cyan-500/50 pl-4">
                        {blog.summary}
                    </p>

                    <div className="flex flex-wrap gap-2.5 pt-2">
                        {tags.map((t, idx) => (
                            <span 
                                key={idx} 
                                className="px-3.5 py-1.5 rounded-lg border border-white/5 bg-slate-950/60 text-slate-300 text-xs font-mono font-semibold"
                            >
                                {t}
                            </span>
                        ))}
                    </div>
                </header>

                {/* Main Content sheet */}
                <div className="border border-white/10 bg-slate-900/40 p-8 md:p-12 rounded-2xl relative shadow-2xl">
                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"></div>
                    <BlogMarkdown content={blog.content} />
                </div>
            </article>
        </AppLayout>
    );
}

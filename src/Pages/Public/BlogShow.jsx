import React, { useEffect } from 'react';
import AppLayout from '../../Layouts/AppLayout';

function BlogMarkdown({ content }) {
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
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-2 flex-shrink-0" />
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
            <article className="max-w-[700px] mx-auto pt-32 pb-24 font-sans relative">

                {/* Back button */}
                <a
                    href="/blogs"
                    onClick={(e) => { e.preventDefault(); navigate('/blogs'); }}
                    className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-600 hover:text-zinc-950 border border-zinc-200 bg-white/80 hover:bg-zinc-50 px-4 py-2 rounded-lg transition-all duration-300 mb-8 group"
                >
                    <span className="group-hover:-translate-x-0.5 transition-transform">←</span> Back to Articles
                </a>

                {/* Article Header */}
                <header className="space-y-6 mb-10 pb-10 border-b border-zinc-200">
                    <div className="flex items-center gap-3 text-[10px] font-mono font-semibold">
                        <span className="text-indigo-650 bg-indigo-50 border border-indigo-100 px-2.5 py-0.5 rounded">
                            {blog.category}
                        </span>
                        <span className="text-zinc-300">•</span>
                        <span className="text-zinc-500">
                            {new Date(blog.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </span>
                    </div>

                    <h1 className="text-3xl md:text-4xl font-display font-extrabold text-zinc-900 tracking-tight leading-tight">
                        {blog.title}
                    </h1>

                    <p className="text-zinc-650 text-base leading-relaxed italic border-l-2 border-indigo-500 pl-4">
                        {blog.summary}
                    </p>

                    <div className="flex flex-wrap gap-2 pt-2">
                        {tags.map((t, idx) => (
                            <span
                                key={idx}
                                className="px-2.5 py-0.5 rounded border border-zinc-200 bg-zinc-50 text-zinc-500 text-[10px] font-mono font-medium"
                            >
                                {t}
                            </span>
                        ))}
                    </div>
                </header>

                {/* Main Content Pane */}
                <div className="bg-white border border-zinc-200 p-8 md:p-10 rounded-xl shadow-md">
                    <BlogMarkdown content={blog.content} />
                </div>
            </article>
        </AppLayout>
    );
}

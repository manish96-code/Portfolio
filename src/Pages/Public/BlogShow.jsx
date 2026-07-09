import React, { useEffect } from 'react';
import AppLayout from '../../Layouts/AppLayout';

function BlogMarkdown({ content }) {
    if (!content) return null;

    const lines = content.split('\n');
    return (
        <div className="space-y-4 text-body leading-relaxed text-sm">
            {lines.map((line, idx) => {
                if (line.startsWith('# ')) {
                    return <h1 key={idx} className="text-2xl font-display font-bold text-charcoal mt-8 mb-4 pb-2 border-b border-stone-light">{line.replace('# ', '')}</h1>;
                }
                if (line.startsWith('## ')) {
                    return <h2 key={idx} className="text-lg font-display font-bold text-charcoal mt-6 mb-3">{line.replace('## ', '')}</h2>;
                }
                if (line.startsWith('### ')) {
                    return <h3 key={idx} className="text-sm font-bold text-coral mt-5 mb-2 font-mono">{line.replace('### ', '')}</h3>;
                }
                if (line.startsWith('- ')) {
                    return <li key={idx} className="list-none ml-4 mt-1 text-body flex items-start gap-2"><span className="text-coral mt-1">▸</span>{line.replace('- ', '')}</li>;
                }
                if (/^\d+\.\s/.test(line)) {
                    return <li key={idx} className="list-decimal ml-6 mt-1 text-body">{line.replace(/^\d+\.\s/, '')}</li>;
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
            <article className="max-w-[768px] mx-auto pt-32 pb-24">
                <a href="/blogs" onClick={(e) => { e.preventDefault(); navigate('/blogs'); }} className="inline-flex items-center gap-2 text-sm font-medium text-coral hover:underline mb-8 group">
                    <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Articles
                </a>

                <header className="space-y-4 mb-10 pb-10 border-b border-stone-light">
                    <div className="flex items-center gap-3 text-xs">
                        <span className="font-mono text-coral font-medium">{blog.category}</span>
                        <span className="text-stone-dark">•</span>
                        <span className="text-body-light">{new Date(blog.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                    </div>

                    <h1 className="text-3xl md:text-4xl font-display font-bold text-charcoal tracking-tight leading-tight">
                        {blog.title}
                    </h1>

                    <p className="text-body text-base leading-relaxed italic">
                        {blog.summary}
                    </p>

                    <div className="flex flex-wrap gap-2 pt-2">
                        {tags.map((t, idx) => (
                            <span key={idx} className="px-2.5 py-1 rounded-full bg-sage-tint text-sage text-xs font-mono font-medium">
                                {t}
                            </span>
                        ))}
                    </div>
                </header>

                <div className="bg-white border border-stone-light/60 p-8 md:p-12 rounded-xl shadow-warm">
                    <BlogMarkdown content={blog.content} />
                </div>
            </article>
        </AppLayout>
    );
}

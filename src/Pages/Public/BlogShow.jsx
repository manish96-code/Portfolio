import React, { useEffect } from 'react';
import AppLayout from '../../Layouts/AppLayout';

function BlogMarkdown({ content }) {
    if (!content) return null;

    const lines = content.split('\n');
    return (
        <div className="space-y-4 text-stone leading-relaxed text-base font-sans">
            {lines.map((line, idx) => {
                if (line.startsWith('# ')) {
                    return (
                        <h1 key={idx} className="text-3xl font-display font-bold text-stone mt-8 mb-4 pb-2 border-b-3 border-dashed border-stone rotate-[-0.5deg]">
                            {line.replace('# ', '')}
                        </h1>
                    );
                }
                if (line.startsWith('## ')) {
                    return (
                        <h2 key={idx} className="text-2xl font-display font-bold text-stone mt-6 mb-3 rotate-[0.5deg]">
                            {line.replace('## ', '')}
                        </h2>
                    );
                }
                if (line.startsWith('### ')) {
                    return (
                        <h3 key={idx} className="text-lg font-bold text-coral mt-5 mb-2 font-mono rotate-[-1deg]">
                            {line.replace('### ', '')}
                        </h3>
                    );
                }
                if (line.startsWith('- ')) {
                    return (
                        <li key={idx} className="list-none ml-4 mt-2 text-stone flex items-start gap-2">
                            <span className="text-coral text-lg select-none">✏️</span>
                            <span>{line.replace('- ', '')}</span>
                        </li>
                    );
                }
                if (/^\d+\.\s/.test(line)) {
                    return (
                        <li key={idx} className="list-decimal ml-6 mt-1 text-stone font-semibold">
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
                return <p key={idx} className="rotate-[0.2deg]">{line}</p>;
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

                {/* Back button styled as wobbly sketch tag */}
                <a
                    href="/blogs"
                    onClick={(e) => { e.preventDefault(); navigate('/blogs'); }}
                    className="inline-flex items-center gap-2 text-sm font-bold text-stone border-2 border-stone bg-white px-4 py-2 rounded-wobbly shadow-hard-muted hover:bg-coral hover:text-white hover:rotate-[-2deg] hover:translate-y-[-1px] transition-hand mb-8 group"
                >
                    <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Articles
                </a>

                {/* Article Header */}
                <header className="space-y-6 mb-10 pb-10 border-b-3 border-dashed border-stone">
                    <div className="flex items-center gap-4 text-xs font-mono font-bold">
                        <span className="text-coral bg-cream border border-stone px-2.5 py-0.5 rounded-wobbly rotate-[2deg] shadow-hard-muted">
                            {blog.category}
                        </span>
                        <span className="text-stone-dark">•</span>
                        <span className="text-stone-dark">
                            {new Date(blog.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-display font-bold text-stone tracking-tight leading-tight rotate-[-1deg]">
                        {blog.title}
                    </h1>

                    <p className="text-stone text-lg leading-relaxed italic border-l-3 border-stone pl-4 rotate-[0.5deg]">
                        {blog.summary}
                    </p>

                    <div className="flex flex-wrap gap-2.5 pt-2">
                        {tags.map((t, idx) => (
                            <span
                                key={idx}
                                className="px-3 py-1 rounded-wobbly border-2 border-stone bg-sage-tint text-sage text-xs font-mono font-bold shadow-hard-muted rotate-[1deg]"
                            >
                                {t}
                            </span>
                        ))}
                    </div>
                </header>

                {/* Main Content sheet - pinned styled notebook paper */}
                <div className="bg-white border-3 border-stone p-8 md:p-12 rounded-wobbly-md card-tack relative rotate-[-0.5deg] hover:rotate-0 transition-hand shadow-hard">
                    <BlogMarkdown content={blog.content} />
                </div>
            </article>
        </AppLayout>
    );
}

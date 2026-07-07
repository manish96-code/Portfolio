import React, { useEffect } from 'react';
import AppLayout from '../../Layouts/AppLayout';

// Lightweight Markdown parser matching our custom layout
function BlogMarkdown({ content }) {
    if (!content) return null;

    const lines = content.split('\n');
    return (
        <div className="space-y-4 text-gray-500 leading-relaxed font-normal text-sm font-mono-atkinson">
            {lines.map((line, idx) => {
                if (line.startsWith('# ')) {
                    return <h1 key={idx} className="text-2xl font-black text-[#111827] mt-8 mb-4 pb-2 border-b border-[#E5E7EB] font-moderno uppercase">{line.replace('# ', '')}</h1>;
                }
                if (line.startsWith('## ')) {
                    return <h2 key={idx} className="text-lg font-bold text-[#111827] mt-6 mb-3 font-moderno">{line.replace('## ', '')}</h2>;
                }
                if (line.startsWith('### ')) {
                    return <h3 key={idx} className="text-sm font-bold text-[#942929] mt-5 mb-2 uppercase tracking-wide">{line.replace('### ', '')}</h3>;
                }
                if (line.startsWith('- ')) {
                    return <li key={idx} className="list-disc ml-6 mt-1 text-gray-500">{line.replace('- ', '')}</li>;
                }
                if (/^\d+\.\s/.test(line)) {
                    return <li key={idx} className="list-decimal ml-6 mt-1 text-gray-500">{line.replace(/^\d+\.\s/, '')}</li>;
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

export default function BlogShow({ blog, socialLinks, settings }) {
    
    useEffect(() => {
        if (blog) {
            document.title = `${blog.title} | Blog`;
        }
    }, [blog]);

    if (!blog) return null;

    const tags = blog.tags || [];

    return (
        <AppLayout settings={settings} socialLinks={socialLinks}>
            <article className="max-w-[768px] mx-auto px-6 py-16 md:py-24 font-mono-atkinson">
                <a href="#/blogs" className="inline-flex items-center gap-2 text-xs font-bold text-[#942929] hover:text-black transition mb-8 uppercase tracking-wider">
                    &larr; Back to Articles
                </a>

                <header className="space-y-4 mb-8 pb-8 border-b border-[#E5E7EB]">
                    <div className="flex items-center gap-3 text-xs font-bold">
                        <span className="text-[#942929] uppercase tracking-wider">{blog.category}</span>
                        <span className="text-gray-400">•</span>
                        <span className="text-gray-400">{new Date(blog.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).toUpperCase()}</span>
                    </div>

                    <h1 className="text-3xl md:text-4xl font-black text-[#111827] tracking-tight leading-tight font-moderno uppercase">
                        {blog.title}
                    </h1>

                    <p className="text-gray-500 text-sm leading-relaxed font-light italic">
                        {blog.summary}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-2">
                        {tags.map((t, idx) => (
                            <span key={idx} className="px-3 py-0.5 rounded-full bg-[#FFEDED] text-[#942929] text-[9px] uppercase tracking-wider font-bold">
                                {t}
                            </span>
                        ))}
                    </div>
                </header>

                {/* Case Study Details Markdown */}
                <div className="bg-white border border-[#E5E7EB] p-8 md:p-12 rounded-2xl shadow-sm">
                    <BlogMarkdown content={blog.content} />
                </div>
            </article>
        </AppLayout>
    );
}

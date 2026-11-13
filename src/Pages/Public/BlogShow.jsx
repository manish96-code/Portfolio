import React, { useEffect } from 'react';
import AppLayout from '../../Layouts/AppLayout';
import SEO from '../../Components/SEO';
import { getBlogSchema } from '../../utils/seoSchemas';

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
    const blogSchema = getBlogSchema(blog, settings);

    return (
        <AppLayout settings={settings} socialLinks={socialLinks} navigate={navigate}>
            <SEO
                title={blog.title}
                description={blog.summary}
                canonicalUrl={`/blog/${blog.slug}`}
                ogType="article"
                schemaData={blogSchema}
            />
            <article className="max-w-3xl mx-auto py-6 sm:py-8 px-4 sm:px-6 font-sans">

                {/* Back button */}
                <a
                    href="/blogs"
                    onClick={(e) => { e.preventDefault(); navigate('/blogs'); }}
                    className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700 hover:text-slate-900 border border-slate-200 bg-white hover:bg-slate-50 px-3.5 py-1.5 rounded-lg transition-colors mb-6 group shadow-2xs"
                >
                    <span className="group-hover:-translate-x-0.5 transition-transform">←</span> Back to Articles
                </a>

                {/* Article Header */}
                <header className="space-y-4 mb-8 pb-8 border-b border-slate-200">
                    <div className="flex items-center gap-3 text-xs font-semibold">
                        <span className="text-blue-700 bg-blue-50 border border-blue-100 px-2.5 py-0.5 rounded-md">
                            {blog.category}
                        </span>
                        <span className="text-slate-300">•</span>
                        <span className="text-slate-500">
                            {new Date(blog.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </span>
                    </div>

                    <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 tracking-tight leading-snug">
                        {blog.title}
                    </h1>

                    <p className="text-slate-600 text-sm leading-relaxed border-l-2 border-blue-500 pl-4">
                        {blog.summary}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-2">
                        {tags.map((t, idx) => (
                            <span
                                key={idx}
                                className="px-2.5 py-0.5 rounded-md border border-slate-200 bg-slate-50 text-slate-600 text-[11px] font-medium"
                            >
                                {t}
                            </span>
                        ))}
                    </div>
                </header>

                {/* Main Content Pane */}
                <div className="bg-white border border-slate-200 p-6 sm:p-8 rounded-2xl shadow-2xs">
                    <BlogMarkdown content={blog.content} />
                </div>
            </article>
        </AppLayout>
    );
}

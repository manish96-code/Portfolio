import React from 'react';
import AppLayout from '../../Layouts/AppLayout';
import { Head, Link } from '@inertiajs/react';

// Lightweight Markdown parser matching our custom layout
function BlogMarkdown({ content }) {
    if (!content) return null;

    const lines = content.split('\n');
    return (
        <div className="space-y-5 text-slate-300 leading-relaxed font-light text-sm">
            {lines.map((line, idx) => {
                if (line.startsWith('# ')) {
                    return <h1 key={idx} className="text-3xl font-black text-slate-100 mt-8 mb-4 pb-2 border-b border-slate-900">{line.replace('# ', '')}</h1>;
                }
                if (line.startsWith('## ')) {
                    return <h2 key={idx} className="text-xl font-bold text-slate-200 mt-6 mb-3">{line.replace('## ', '')}</h2>;
                }
                if (line.startsWith('### ')) {
                    return <h3 key={idx} className="text-base font-bold text-[#FF2D20] mt-5 mb-2">{line.replace('### ', '')}</h3>;
                }
                if (line.startsWith('- ')) {
                    return <li key={idx} className="list-disc ml-6 mt-1.5 text-slate-400">{line.replace('- ', '')}</li>;
                }
                if (/^\d+\.\s/.test(line)) {
                    return <li key={idx} className="list-decimal ml-6 mt-1.5 text-slate-400">{line.replace(/^\d+\.\s/, '')}</li>;
                }
                if (line.startsWith('```')) {
                    return null; // Ignore formatting tags
                }
                if (line.trim() === '') {
                    return <div key={idx} className="h-2.5"></div>;
                }
                return <p key={idx}>{line}</p>;
            })}
        </div>
    );
}

export default function BlogShow({ blog, socialLinks, settings }) {
    const tags = Array.isArray(blog.tags) ? blog.tags : JSON.parse(blog.tags || '[]');

    return (
        <AppLayout settings={settings} socialLinks={socialLinks}>
            <Head>
                <title>{blog.meta_title || `${blog.title} - Blog`}</title>
                <meta name="description" content={blog.meta_description || blog.summary} />
            </Head>

            <article className="max-w-3xl mx-auto px-6 py-12">
                <Link href="/blogs" className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-[#FF2D20] transition mb-8">
                    &larr; Back to Articles
                </Link>

                <header className="space-y-4 mb-8 pb-8 border-b border-slate-900">
                    <div className="flex items-center gap-3 text-xs text-slate-500">
                        <span className="font-bold text-[#FF2D20] capitalize">{blog.category}</span>
                        <span>•</span>
                        <span>{new Date(blog.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                    </div>

                    <h1 className="text-3xl md:text-4xl font-extrabold text-slate-100 tracking-tight leading-tight">
                        {blog.title}
                    </h1>

                    <p className="text-slate-400 text-sm leading-relaxed font-light italic">
                        {blog.summary}
                    </p>

                    <div className="flex flex-wrap gap-2 pt-2">
                        {tags.map((t, idx) => (
                            <span key={idx} className="px-2.5 py-0.5 rounded-full bg-slate-900 text-slate-400 border border-slate-850 text-[9px] uppercase tracking-wider font-bold">
                                {t}
                            </span>
                        ))}
                    </div>
                </header>

                {/* Case Study Details Markdown */}
                <div className="bg-slate-900/10 border border-slate-900/60 p-8 md:p-12 rounded-3xl backdrop-blur-sm shadow-2xl">
                    <BlogMarkdown content={blog.content} />
                </div>
            </article>
        </AppLayout>
    );
}

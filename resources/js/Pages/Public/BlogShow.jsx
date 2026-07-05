import React from 'react';
import AppLayout from '../../Layouts/AppLayout';
import { Head, Link } from '@inertiajs/react';

// Lightweight Markdown parser matching our custom layout
function BlogMarkdown({ content }) {
    if (!content) return null;

    const lines = content.split('\n');
    return (
        <div className="space-y-4 text-[#6B7280] leading-relaxed font-normal text-sm">
            {lines.map((line, idx) => {
                if (line.startsWith('# ')) {
                    return <h1 key={idx} className="text-xl font-bold text-[#111827] mt-6 mb-3 pb-2 border-b border-[#E5E7EB]">{line.replace('# ', '')}</h1>;
                }
                if (line.startsWith('## ')) {
                    return <h2 key={idx} className="text-base font-bold text-[#111827] mt-5 mb-2">{line.replace('## ', '')}</h2>;
                }
                if (line.startsWith('### ')) {
                    return <h3 key={idx} className="text-sm font-semibold text-[#2563EB] mt-4 mb-2">{line.replace('### ', '')}</h3>;
                }
                if (line.startsWith('- ')) {
                    return <li key={idx} className="list-disc ml-6 mt-1 text-[#6B7280]">{line.replace('- ', '')}</li>;
                }
                if (/^\d+\.\s/.test(line)) {
                    return <li key={idx} className="list-decimal ml-6 mt-1 text-[#6B7280]">{line.replace(/^\d+\.\s/, '')}</li>;
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
    const tags = Array.isArray(blog.tags) ? blog.tags : JSON.parse(blog.tags || '[]');

    return (
        <AppLayout settings={settings} socialLinks={socialLinks}>
            <Head>
                <title>{blog.meta_title || `${blog.title} - Blog`}</title>
                <meta name="description" content={blog.meta_description || blog.summary} />
            </Head>

            <article className="max-w-[768px] mx-auto px-6 py-12">
                <Link href="/blogs" className="inline-flex items-center gap-2 text-xs font-semibold text-[#6B7280] hover:text-[#111827] transition mb-8">
                    &larr; Back to Articles
                </Link>

                <header className="space-y-4 mb-8 pb-8 border-b border-[#E5E7EB]">
                    <div className="flex items-center gap-3 text-xs text-[#6B7280]">
                        <span className="font-semibold text-[#2563EB] capitalize">{blog.category}</span>
                        <span>•</span>
                        <span>{new Date(blog.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                    </div>

                    <h1 className="text-3xl font-extrabold text-[#111827] tracking-tight leading-tight">
                        {blog.title}
                    </h1>

                    <p className="text-[#6B7280] text-sm leading-relaxed font-light italic">
                        {blog.summary}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-2">
                        {tags.map((t, idx) => (
                            <span key={idx} className="px-2.5 py-0.5 rounded-full bg-[#F3F4F6] text-[#6B7280] text-[9px] uppercase tracking-wider font-bold">
                                {t}
                            </span>
                        ))}
                    </div>
                </header>

                {/* Case Study Details Markdown */}
                <div className="bg-white border border-[#E5E7EB] p-8 md:p-12 rounded-xl shadow-sm">
                    <BlogMarkdown content={blog.content} />
                </div>
            </article>
        </AppLayout>
    );
}

import React, { useEffect } from 'react';
import AppLayout, { IconArrowRight } from '../../Layouts/AppLayout';
import SEO from '../../Components/SEO';
import { getBlogSchema } from '../../utils/seoSchemas';

function BlogMarkdown({ content }) {
    if (!content) return null;

    const lines = content.split('\n');
    return (
        <div className="space-y-4 leading-relaxed text-sm sm:text-base font-sans" style={{ color: 'var(--color-text-secondary)' }}>
            {lines.map((line, idx) => {
                if (line.startsWith('# ')) {
                    return (
                        <h1 key={idx} className="text-2xl sm:text-3xl font-display font-bold mt-8 mb-4 pb-2 border-b"
                            style={{ color: 'var(--color-text)', borderColor: 'var(--color-border)' }}
                        >
                            {line.replace('# ', '')}
                        </h1>
                    );
                }
                if (line.startsWith('## ')) {
                    return (
                        <h2 key={idx} className="text-xl sm:text-2xl font-display font-bold mt-8 mb-3"
                            style={{ color: 'var(--color-text)' }}
                        >
                            {line.replace('## ', '')}
                        </h2>
                    );
                }
                if (line.startsWith('### ')) {
                    return (
                        <h3 key={idx} className="text-base sm:text-lg font-display font-semibold mt-6 mb-2"
                            style={{ color: 'var(--color-accent)' }}
                        >
                            {line.replace('### ', '')}
                        </h3>
                    );
                }
                if (line.startsWith('- ')) {
                    const rawText = line.replace('- ', '');
                    const parts = rawText.split(/(`[^`]+`|\*\*.*?\*\*)/g);
                    return (
                        <li key={idx} className="list-none ml-2 sm:ml-4 mt-2 flex items-start gap-2.5">
                            <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: 'var(--color-accent)' }} />
                            <span>
                                {parts.map((part, pIdx) => {
                                    if (part.startsWith('**') && part.endsWith('**')) {
                                        return <strong key={pIdx} className="font-semibold" style={{ color: 'var(--color-text)' }}>{part.slice(2, -2)}</strong>;
                                    }
                                    if (part.startsWith('`') && part.endsWith('`')) {
                                        return (
                                            <code key={pIdx} className="px-1.5 py-0.5 rounded font-mono text-xs font-semibold"
                                                style={{
                                                    backgroundColor: 'var(--color-badge-bg)',
                                                    color: 'var(--color-accent)',
                                                    border: '1px solid var(--color-border)'
                                                }}
                                            >
                                                {part.slice(1, -1)}
                                            </code>
                                        );
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
                        <div key={idx} className="ml-2 sm:ml-4 mt-2 flex items-start gap-2.5">
                            <span className="font-bold text-xs mt-0.5" style={{ color: 'var(--color-accent)' }}>
                                {line.match(/^\d+/)?.[0]}.
                            </span>
                            <span>
                                {parts.map((part, pIdx) => {
                                    if (part.startsWith('**') && part.endsWith('**')) {
                                        return <strong key={pIdx} className="font-semibold" style={{ color: 'var(--color-text)' }}>{part.slice(2, -2)}</strong>;
                                    }
                                    if (part.startsWith('`') && part.endsWith('`')) {
                                        return (
                                            <code key={pIdx} className="px-1.5 py-0.5 rounded font-mono text-xs font-semibold"
                                                style={{
                                                    backgroundColor: 'var(--color-badge-bg)',
                                                    color: 'var(--color-accent)',
                                                    border: '1px solid var(--color-border)'
                                                }}
                                            >
                                                {part.slice(1, -1)}
                                            </code>
                                        );
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
                    return <div key={idx} className="h-2"></div>;
                }

                const parts = line.split(/(`[^`]+`|\*\*.*?\*\*)/g);
                return (
                    <p key={idx}>
                        {parts.map((part, pIdx) => {
                            if (part.startsWith('**') && part.endsWith('**')) {
                                return <strong key={pIdx} className="font-semibold" style={{ color: 'var(--color-text)' }}>{part.slice(2, -2)}</strong>;
                            }
                            if (part.startsWith('`') && part.endsWith('`')) {
                                return (
                                    <code key={pIdx} className="px-1.5 py-0.5 rounded font-mono text-xs font-semibold"
                                        style={{
                                            backgroundColor: 'var(--color-badge-bg)',
                                            color: 'var(--color-accent)',
                                            border: '1px solid var(--color-border)'
                                        }}
                                    >
                                        {part.slice(1, -1)}
                                    </code>
                                );
                            }
                            return part;
                        })}
                    </p>
                );
            })}
        </div>
    );
}

export default function BlogShow({ blog, socialLinks, settings, navigate }) {
    useEffect(() => {
        if (blog) {
            document.title = `${blog.title} — Manish Kumar`;
        }
    }, [blog]);

    if (!blog) return null;

    const tags = blog.tags || [];
    const blogSchema = getBlogSchema(blog, settings);

    const handleBack = (e) => {
        e.preventDefault();
        if (navigate) {
            navigate('/blogs');
        } else {
            window.location.href = '/blogs';
        }
    };

    return (
        <AppLayout settings={settings} socialLinks={socialLinks} navigate={navigate}>
            <SEO
                title={`${blog.title} — Manish Kumar`}
                description={blog.summary}
                canonicalUrl={`/blog/${blog.slug}`}
                ogType="article"
                schemaData={blogSchema}
            />

            <article className="pt-28 pb-20 md:pt-36 md:pb-28">
                <div className="max-w-3xl mx-auto px-5 sm:px-6">
                    
                    {/* Back button */}
                    <div className="mb-8">
                        <a
                            href="/blogs"
                            onClick={handleBack}
                            className="inline-flex items-center gap-1.5 text-xs font-semibold cursor-pointer transition-colors"
                            style={{ color: 'var(--color-text-muted)' }}
                            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-accent)'}
                            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-muted)'}
                        >
                            <span>←</span>
                            <span>Back to all articles</span>
                        </a>
                    </div>

                    {/* Article Header */}
                    <header className="mb-10 pb-8 border-b" style={{ borderColor: 'var(--color-border)' }}>
                        <div className="flex flex-wrap items-center gap-2 mb-4">
                            <span className="px-2.5 py-0.5 rounded-md text-xs font-semibold"
                                style={{
                                    backgroundColor: 'rgba(99, 102, 241, 0.1)',
                                    color: 'var(--color-accent)',
                                    border: '1px solid rgba(99, 102, 241, 0.25)'
                                }}
                            >
                                {blog.category}
                            </span>
                            <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>•</span>
                            <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                                {new Date(blog.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                            </span>
                        </div>

                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold tracking-tight mb-6 leading-tight"
                            style={{ color: 'var(--color-text)' }}
                        >
                            {blog.title}
                        </h1>

                        <p className="text-base sm:text-lg leading-relaxed italic pl-4 border-l-2"
                            style={{
                                borderColor: 'var(--color-accent)',
                                color: 'var(--color-text-secondary)'
                            }}
                        >
                            {blog.summary}
                        </p>

                        {/* Author strip */}
                        <div className="flex items-center gap-3 mt-6 pt-6 border-t" style={{ borderColor: 'var(--color-border)' }}>
                            <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs"
                                style={{ backgroundColor: 'rgba(99, 102, 241, 0.15)', color: 'var(--color-accent)' }}
                            >
                                TM
                            </div>
                            <div>
                                <p className="text-xs font-semibold" style={{ color: 'var(--color-text)' }}>
                                    {settings?.name || 'Manish Kumar'}
                                </p>
                                <p className="text-[11px]" style={{ color: 'var(--color-text-muted)' }}>
                                    Full-Stack Software Engineer
                                </p>
                            </div>
                        </div>
                    </header>

                    {/* Main Content Card */}
                    <div className="rounded-2xl p-6 sm:p-10 shadow-sm mb-12"
                        style={{
                            backgroundColor: 'var(--color-surface)',
                            border: '1px solid var(--color-border)'
                        }}
                    >
                        <BlogMarkdown content={blog.content} />
                    </div>

                    {/* Article Tags */}
                    {tags.length > 0 && (
                        <div className="flex flex-wrap items-center gap-2 pb-8 mb-8 border-b" style={{ borderColor: 'var(--color-border)' }}>
                            <span className="text-xs uppercase font-medium mr-1" style={{ color: 'var(--color-text-muted)' }}>
                                Tags:
                            </span>
                            {tags.map((t, idx) => (
                                <span
                                    key={idx}
                                    className="px-2.5 py-0.5 rounded text-xs font-medium"
                                    style={{
                                        backgroundColor: 'var(--color-badge-bg)',
                                        color: 'var(--color-text-secondary)',
                                        border: '1px solid var(--color-border)'
                                    }}
                                >
                                    #{t}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Bottom Discussion & Navigation CTA */}
                    <div className="rounded-2xl p-8 text-center"
                        style={{
                            backgroundColor: 'var(--color-surface)',
                            border: '1px solid var(--color-border)'
                        }}
                    >
                        <h3 className="text-lg font-display font-bold mb-2" style={{ color: 'var(--color-text)' }}>
                            Questions or thoughts on this topic?
                        </h3>
                        <p className="text-xs sm:text-sm max-w-md mx-auto mb-6" style={{ color: 'var(--color-text-secondary)' }}>
                            Feel free to reach out via email or connect on LinkedIn to discuss full-stack architecture.
                        </p>
                        <div className="flex items-center justify-center gap-3">
                            <a
                                href={`mailto:${settings?.email || 'manish966128@gmail.com'}?subject=Feedback%20on%20${encodeURIComponent(blog.title)}`}
                                className="btn-primary text-xs py-2 px-4"
                            >
                                Contact Author
                            </a>
                            <a
                                href="/blogs"
                                onClick={handleBack}
                                className="btn-secondary text-xs py-2 px-4 cursor-pointer"
                            >
                                More Articles
                            </a>
                        </div>
                    </div>

                </div>
            </article>
        </AppLayout>
    );
}

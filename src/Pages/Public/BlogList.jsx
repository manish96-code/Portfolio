import React, { useState } from 'react';
import AppLayout, { IconArrowRight } from '../../Layouts/AppLayout';
import SEO from '../../Components/SEO';

export default function BlogList({ blogs = [], categories = [], socialLinks = [], settings = {}, navigate }) {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredBlogs = (blogs || []).filter(blog => {
        const matchesCategory = selectedCategory === 'all' || blog.category?.toLowerCase() === selectedCategory.toLowerCase();
        const matchesSearch = blog.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            blog.summary?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (blog.tags && blog.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())));
        return matchesCategory && matchesSearch;
    });

    const handleNavigate = (path, e) => {
        if (e) e.preventDefault();
        if (navigate) {
            navigate(path);
        } else {
            window.location.href = path;
        }
    };

    return (
        <AppLayout settings={settings} socialLinks={socialLinks} navigate={navigate}>
            <SEO
                title="Writing & Technical Articles — Manish Kumar"
                description="Technical articles and architecture guides on Laravel, React 19, Inertia.js, and database query optimization strategies by Manish Kumar."
                canonicalUrl="/blogs"
            />

            <div className="pt-28 pb-20 md:pt-36 md:pb-28">
                <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
                    
                    {/* Page Header */}
                    <div className="max-w-2xl mb-12">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase mb-4"
                            style={{
                                backgroundColor: 'rgba(99, 102, 241, 0.08)',
                                color: 'var(--color-accent)',
                                border: '1px solid rgba(99, 102, 241, 0.2)'
                            }}
                        >
                            <span>Engineering Journal</span>
                        </div>
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold tracking-tight mb-4"
                            style={{ color: 'var(--color-text)' }}
                        >
                            Writing & Insights
                        </h1>
                        <p className="text-base sm:text-lg leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                            Deep dives into full-stack architecture, Laravel optimizations, React state paradigms, and database performance.
                        </p>
                    </div>

                    {/* Filter & Search Bar */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-10 border-b"
                        style={{ borderColor: 'var(--color-border)' }}
                    >
                        {/* Category Pills */}
                        <div className="flex flex-wrap items-center gap-2">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-all duration-200 ${
                                        selectedCategory === cat ? 'font-semibold' : ''
                                    }`}
                                    style={{
                                        backgroundColor: selectedCategory === cat ? 'var(--color-accent)' : 'var(--color-surface)',
                                        color: selectedCategory === cat ? '#FFFFFF' : 'var(--color-text-secondary)',
                                        border: selectedCategory === cat ? '1px solid var(--color-accent)' : '1px solid var(--color-border)',
                                    }}
                                >
                                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                                </button>
                            ))}
                        </div>

                        {/* Search Input */}
                        <div className="relative w-full sm:w-72">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search articles or topics..."
                                className="w-full text-xs sm:text-sm py-2 px-3.5 rounded-lg outline-none transition-all"
                                style={{
                                    backgroundColor: 'var(--color-surface)',
                                    border: '1px solid var(--color-border)',
                                    color: 'var(--color-text)',
                                }}
                            />
                        </div>
                    </div>

                    {/* Articles Grid */}
                    {filteredBlogs.length > 0 ? (
                        <div className="grid md:grid-cols-2 gap-6">
                            {filteredBlogs.map((blog) => {
                                const tags = blog.tags || [];
                                return (
                                    <article
                                        key={blog.id || blog.slug}
                                        onClick={(e) => handleNavigate(`/blog/${blog.slug}`, e)}
                                        className="rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-lg cursor-pointer group"
                                        style={{
                                            backgroundColor: 'var(--color-surface)',
                                            border: '1px solid var(--color-border)'
                                        }}
                                    >
                                        <div>
                                            <div className="flex items-center justify-between gap-2 mb-4 text-xs">
                                                <span className="px-2.5 py-0.5 rounded-md font-semibold"
                                                    style={{
                                                        backgroundColor: 'rgba(99, 102, 241, 0.1)',
                                                        color: 'var(--color-accent)',
                                                        border: '1px solid rgba(99, 102, 241, 0.2)'
                                                    }}
                                                >
                                                    {blog.category}
                                                </span>
                                                <span style={{ color: 'var(--color-text-muted)' }}>
                                                    {new Date(blog.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                </span>
                                            </div>

                                            <h2 className="text-xl sm:text-2xl font-display font-bold mb-3 transition-colors group-hover:text-indigo-500 leading-snug"
                                                style={{ color: 'var(--color-text)' }}
                                            >
                                                {blog.title}
                                            </h2>

                                            <p className="text-xs sm:text-sm leading-relaxed mb-6" style={{ color: 'var(--color-text-secondary)' }}>
                                                {blog.summary}
                                            </p>
                                        </div>

                                        <div className="pt-4 border-t flex items-center justify-between" style={{ borderColor: 'var(--color-border)' }}>
                                            <div className="flex flex-wrap gap-1.5">
                                                {tags.map((tag) => (
                                                    <span
                                                        key={tag}
                                                        className="px-2 py-0.5 rounded text-[10px] font-medium"
                                                        style={{
                                                            backgroundColor: 'var(--color-badge-bg)',
                                                            color: 'var(--color-text-muted)',
                                                            border: '1px solid var(--color-border)'
                                                        }}
                                                    >
                                                        #{tag}
                                                    </span>
                                                ))}
                                            </div>

                                            <span className="inline-flex items-center gap-1 text-xs font-semibold"
                                                style={{ color: 'var(--color-accent)' }}
                                            >
                                                <span>Read</span>
                                                <IconArrowRight />
                                            </span>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="py-20 text-center rounded-2xl"
                            style={{
                                backgroundColor: 'var(--color-surface)',
                                border: '1px solid var(--color-border)'
                            }}
                        >
                            <p className="text-base font-semibold mb-1" style={{ color: 'var(--color-text)' }}>
                                No articles found
                            </p>
                            <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                                Try clearing your search query or choosing another category.
                            </p>
                        </div>
                    )}

                </div>
            </div>
        </AppLayout>
    );
}

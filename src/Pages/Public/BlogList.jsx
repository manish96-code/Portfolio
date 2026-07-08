import React, { useState, useEffect } from 'react';
import AppLayout from '../../Layouts/AppLayout';

export default function BlogList({ blogs, categories, socialLinks, settings }) {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        document.title = 'Insights & Articles | Manish Kumar';
    }, []);

    const filteredBlogs = (blogs || []).filter(blog => {
        const matchesCategory = selectedCategory === 'all' || blog.category.toLowerCase() === selectedCategory.toLowerCase();
        const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              blog.summary.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <AppLayout settings={settings} socialLinks={socialLinks}>
            <div className="pt-32 pb-24">
                {/* Header */}
                <div className="text-center max-w-xl mx-auto mb-16 space-y-4">
                    <p className="font-mono text-coral text-xs uppercase tracking-[0.2em]">Writing & Insights</p>
                    <h1 className="text-4xl font-display font-bold text-charcoal tracking-tight">Articles & Blog</h1>
                    <p className="text-body text-base">Deep dives into Laravel, React, and modern development workflows.</p>
                </div>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-6 justify-between items-center mb-12 pb-6 border-b border-stone-light">
                    <div className="flex flex-wrap gap-2">
                        {categories.map((cat, idx) => (
                            <button
                                key={idx}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 ${
                                    selectedCategory === cat
                                        ? 'bg-coral text-white'
                                        : 'bg-white border border-stone text-body hover:text-coral hover:border-coral-light'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <div className="relative w-full sm:w-64">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search articles..."
                            className="w-full bg-white border border-stone focus:border-coral rounded-xl px-4 py-2.5 text-sm text-charcoal placeholder:text-stone-dark/50 outline-none transition-colors"
                        />
                    </div>
                </div>

                {/* Articles Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredBlogs.length > 0 ? (
                        filteredBlogs.map((blog) => {
                            const tags = blog.tags || [];
                            return (
                                <article key={blog.id} className="bg-white border border-stone-light/60 rounded-xl p-8 flex flex-col justify-between card-lift group shadow-warm">
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between text-xs">
                                            <span className="font-mono text-coral font-medium">{blog.category}</span>
                                            <span className="text-body-light">{new Date(blog.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                        </div>

                                        <a href={`#/blog/${blog.slug}`}>
                                            <h3 className="text-lg font-display font-bold text-charcoal group-hover:text-coral transition-colors leading-snug">
                                                {blog.title}
                                            </h3>
                                        </a>

                                        <p className="text-body text-sm leading-relaxed line-clamp-3">
                                            {blog.summary}
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-between pt-6 mt-6 border-t border-stone-light/60">
                                        <div className="flex flex-wrap gap-2">
                                            {tags.slice(0, 3).map((t, idx) => (
                                                <span key={idx} className="text-xs text-body-light">
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                        <a 
                                            href={`#/blog/${blog.slug}`}
                                            className="text-xs font-medium text-coral link-underline"
                                        >
                                            Read →
                                        </a>
                                    </div>
                                </article>
                            );
                        })
                    ) : (
                        <div className="text-center py-20 text-body border border-stone-light/60 rounded-xl bg-white col-span-2 shadow-warm">
                            <p className="text-sm">No articles matched your criteria.</p>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}

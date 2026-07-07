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
                    <p className="font-mono text-green text-sm">Writing & Insights</p>
                    <h1 className="text-4xl font-bold text-slate-lightest tracking-tight">Articles & Blog</h1>
                    <p className="text-slate text-base">Deep dives into Laravel, React, and modern development workflows.</p>
                </div>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-6 justify-between items-center mb-12 pb-6 border-b border-navy-lighter/30">
                    <div className="flex flex-wrap gap-2">
                        {categories.map((cat, idx) => (
                            <button
                                key={idx}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-2 rounded-lg text-xs font-mono transition-all duration-200 ${
                                    selectedCategory === cat
                                        ? 'bg-green-tint border border-green/30 text-green'
                                        : 'bg-navy-light border border-navy-lighter/30 text-slate hover:text-green hover:border-green/20'
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
                            className="w-full bg-navy-light border border-navy-lighter focus:border-green rounded-lg px-4 py-2.5 text-sm text-slate-lightest placeholder:text-slate/40 outline-none transition-colors font-mono"
                        />
                    </div>
                </div>

                {/* Articles Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredBlogs.length > 0 ? (
                        filteredBlogs.map((blog) => {
                            const tags = blog.tags || [];
                            return (
                                <article key={blog.id} className="bg-navy-light border border-navy-lighter/30 rounded-xl p-8 flex flex-col justify-between hover:border-green/20 hover:-translate-y-0.5 transition-all duration-200 group">
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between text-xs font-mono">
                                            <span className="text-green">{blog.category}</span>
                                            <span className="text-slate/60">{new Date(blog.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                        </div>

                                        <a href={`#/blog/${blog.slug}`}>
                                            <h3 className="text-lg font-bold text-slate-lightest group-hover:text-green transition-colors leading-snug">
                                                {blog.title}
                                            </h3>
                                        </a>

                                        <p className="text-slate text-sm leading-relaxed line-clamp-3">
                                            {blog.summary}
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-between pt-6 mt-6 border-t border-navy-lighter/20">
                                        <div className="flex flex-wrap gap-2">
                                            {tags.slice(0, 3).map((t, idx) => (
                                                <span key={idx} className="text-xs font-mono text-slate-light">
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                        <a 
                                            href={`#/blog/${blog.slug}`}
                                            className="text-xs font-mono text-green link-underline"
                                        >
                                            Read →
                                        </a>
                                    </div>
                                </article>
                            );
                        })
                    ) : (
                        <div className="text-center py-20 text-slate border border-navy-lighter/30 rounded-xl bg-navy-light col-span-2">
                            <p className="text-sm font-mono">No articles matched your criteria.</p>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}

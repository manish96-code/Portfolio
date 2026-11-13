import React, { useState, useEffect } from 'react';
import AppLayout from '../../Layouts/AppLayout';
import SEO from '../../Components/SEO';

export default function BlogList({ blogs, categories, socialLinks, settings, navigate }) {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredBlogs = (blogs || []).filter(blog => {
        const matchesCategory = selectedCategory === 'all' || blog.category.toLowerCase() === selectedCategory.toLowerCase();
        const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            blog.summary.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <AppLayout settings={settings} socialLinks={socialLinks} navigate={navigate}>
            <SEO
                title="Engineering Insights & Articles"
                description="Technical articles on Laravel, React 19, Inertia.js, and database query optimization strategies by Manish Kumar."
                canonicalUrl="/blogs"
            />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-14 xl:px-16 py-8 sm:py-10 font-sans">

                {/* Header */}
                <div className="max-w-2xl mb-8 space-y-2">
                    <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-100 rounded-full">
                        Writing & Insights
                    </span>
                    <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                        Articles &amp; Engineering Blog
                    </h1>
                    <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                        Deep dives into Laravel backends, React 19 applications, and modern development workflows.
                    </p>
                </div>

                {/* Filters & Search */}
                <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-8 pb-5 border-b border-slate-200">
                    <div className="flex flex-wrap gap-2 w-full md:w-auto">
                        {categories.map((cat, idx) => (
                            <button
                                key={idx}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${selectedCategory === cat
                                    ? 'bg-slate-900 border-slate-900 text-white shadow-xs'
                                    : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-900'
                                    }`}
                            >
                                {cat.charAt(0).toUpperCase() + cat.slice(1)}
                            </button>
                        ))}
                    </div>

                    <div className="relative w-full md:w-72">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search articles..."
                            className="w-full bg-white border border-slate-200 rounded-lg px-3.5 py-2 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-blue-500 transition-colors"
                        />
                    </div>
                </div>

                {/* Articles Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {filteredBlogs.length > 0 ? (
                        filteredBlogs.map((blog) => {
                            const tags = blog.tags || [];
                            return (
                                <article
                                    key={blog.id}
                                    className="bg-white border border-slate-200 p-5 sm:p-6 flex flex-col justify-between rounded-2xl hover:border-slate-300 hover:shadow-md transition-all duration-200 group shadow-2xs"
                                >
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between text-[11px] font-semibold">
                                            <span className="text-blue-700 bg-blue-50 border border-blue-100 px-2.5 py-0.5 rounded-md">
                                                {blog.category}
                                            </span>
                                            <span className="text-slate-400">
                                                {new Date(blog.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                            </span>
                                        </div>

                                        <a
                                            href={`/blog/${blog.slug}`}
                                            onClick={(e) => { e.preventDefault(); navigate(`/blog/${blog.slug}`); }}
                                            className="block"
                                        >
                                            <h3 className="font-display text-lg sm:text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                                                {blog.title}
                                            </h3>
                                        </a>

                                        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed line-clamp-3">
                                            {blog.summary}
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-between pt-4 mt-5 border-t border-slate-100">
                                        <div className="flex flex-wrap gap-1.5">
                                            {tags.slice(0, 3).map((t, idx) => (
                                                <span key={idx} className="text-[10px] font-medium text-slate-600 border border-slate-200 bg-slate-50 px-2 py-0.5 rounded">
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                        <a
                                            href={`/blog/${blog.slug}`}
                                            onClick={(e) => { e.preventDefault(); navigate(`/blog/${blog.slug}`); }}
                                            className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                                        >
                                            Read Article →
                                        </a>
                                    </div>
                                </article>
                            );
                        })
                    ) : (
                        <div className="text-center py-20 text-zinc-500 border border-zinc-200 rounded-xl bg-white col-span-2 shadow-sm font-sans">
                            <p className="text-sm font-semibold">No articles matched your query. 🔍</p>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}

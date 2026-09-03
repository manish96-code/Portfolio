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
            <div className="pt-32 pb-24 font-sans relative">
                
                {/* Background ambient light */}
                <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[350px] h-[350px] bg-indigo-500/[0.02] rounded-full blur-[100px] pointer-events-none -z-10"></div>

                {/* Header */}
                <div className="text-center max-w-xl mx-auto mb-16 space-y-4">
                    <span className="inline-block px-3 py-1 font-mono text-xs font-semibold tracking-wider text-indigo-650 bg-indigo-500/10 border border-indigo-500/20 rounded-full">
                        Writing & Insights
                    </span>
                    <h1 className="text-3xl font-extrabold text-zinc-900 tracking-tight md:text-4xl">
                        Articles & Blog
                    </h1>
                    <p className="text-zinc-550 text-sm leading-relaxed max-w-sm mx-auto">
                        Deep dives into Laravel backends, React applications, and modern development workflows.
                    </p>
                </div>

                {/* Filters & Search */}
                <div className="flex flex-col md:flex-row gap-6 justify-between items-center mb-12 pb-6 border-b border-zinc-200">
                    <div className="flex flex-wrap gap-2">
                        {categories.map((cat, idx) => (
                            <button
                                key={idx}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-300 ${
                                    selectedCategory === cat
                                        ? 'bg-indigo-600 border-indigo-500 text-white shadow-sm'
                                        : 'bg-white border-zinc-200 text-zinc-500 hover:border-zinc-300 hover:text-zinc-900'
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
                            className="w-full bg-white border border-zinc-200 rounded-lg px-4 py-2 text-sm text-zinc-800 placeholder:text-zinc-400 outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/10 transition-all duration-300 font-sans"
                        />
                    </div>
                </div>

                {/* Articles Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {filteredBlogs.length > 0 ? (
                        filteredBlogs.map((blog) => {
                            const tags = blog.tags || [];
                            return (
                                <article
                                    key={blog.id}
                                    className="bg-white border border-zinc-200 p-6 md:p-8 flex flex-col justify-between rounded-xl hover:border-indigo-500/10 hover:shadow-xl transition-all duration-300 group shadow-sm relative overflow-hidden"
                                >
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between text-[10px] font-mono font-semibold">
                                            <span className="text-indigo-650 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded">
                                                {blog.category}
                                            </span>
                                            <span className="text-zinc-500">
                                                {new Date(blog.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                            </span>
                                        </div>

                                        <a
                                            href={`/blog/${blog.slug}`}
                                            onClick={(e) => { e.preventDefault(); navigate(`/blog/${blog.slug}`); }}
                                            className="block"
                                        >
                                            <h3 className="text-xl font-bold text-zinc-900 group-hover:text-indigo-650 transition-colors leading-snug">
                                                {blog.title}
                                            </h3>
                                        </a>

                                        <p className="text-zinc-600 text-sm leading-relaxed line-clamp-3">
                                            {blog.summary}
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-between pt-6 mt-6 border-t border-zinc-100">
                                        <div className="flex flex-wrap gap-1.5">
                                            {tags.slice(0, 3).map((t, idx) => (
                                                <span key={idx} className="text-[10px] font-medium text-zinc-500 border border-zinc-200 bg-zinc-50 px-2 py-0.5 rounded">
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                        <a
                                            href={`/blog/${blog.slug}`}
                                            onClick={(e) => { e.preventDefault(); navigate(`/blog/${blog.slug}`); }}
                                            className="text-xs font-semibold text-indigo-600 hover:text-indigo-550 transition-colors"
                                        >
                                            Read Article ➜
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

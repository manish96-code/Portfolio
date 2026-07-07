import React, { useState, useEffect } from 'react';
import AppLayout from '../../Layouts/AppLayout';

export default function BlogList({ blogs, categories, socialLinks, settings }) {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        document.title = 'Articles & Insights | Manish Kumar';
    }, []);

    const filteredBlogs = (blogs || []).filter(blog => {
        const matchesCategory = selectedCategory === 'all' || blog.category.toLowerCase() === selectedCategory.toLowerCase();
        const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              blog.summary.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <AppLayout settings={settings} socialLinks={socialLinks}>
            <div className="max-w-[1280px] mx-auto px-6 py-16 md:py-24 font-mono-atkinson">
                <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
                    <span className="text-xs font-bold text-[#942929] uppercase tracking-wider block">Insights</span>
                    <h1 className="text-4xl md:text-5xl font-black text-[#111827] tracking-tight font-moderno uppercase">Articles & Blog</h1>
                    <p className="text-gray-500 text-sm">Deep dives into Laravel, React, Inertia, and modern developer workflows.</p>
                </div>

                {/* Filters Board */}
                <div className="flex flex-col sm:flex-row gap-6 justify-between items-center mb-12 pb-6 border-b border-[#E5E7EB]">
                    {/* Category Pills */}
                    <div className="flex flex-wrap gap-2">
                        {categories.map((cat, idx) => (
                            <button
                                key={idx}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition ${
                                    selectedCategory === cat
                                        ? 'bg-[#942929] text-white'
                                        : 'bg-white text-gray-500 border border-[#E5E7EB] hover:bg-slate-50'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Search Field */}
                    <div className="relative w-full sm:w-64">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="SEARCH ARTICLES..."
                            className="w-full bg-white border border-[#E5E7EB] focus:border-[#942929] rounded-lg px-4 py-2.5 text-xs text-[#111827] placeholder-gray-400 outline-none transition"
                        />
                    </div>
                </div>

                {/* Articles List */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {filteredBlogs.length > 0 ? (
                        filteredBlogs.map((blog) => {
                            const tags = blog.tags || [];
                            return (
                                <article key={blog.id} className="p-8 rounded-2xl bg-white border border-[#E5E7EB] hover:border-[#942929]/40 transition duration-150 flex flex-col justify-between shadow-sm">
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between text-xs font-bold">
                                            <span className="text-[#942929] uppercase tracking-wider">{blog.category}</span>
                                            <span className="text-gray-400">{new Date(blog.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase()}</span>
                                        </div>

                                        <a href={`#/blog/${blog.slug}`}>
                                            <h3 className="text-lg font-black text-[#111827] hover:text-[#942929] transition duration-150 leading-snug font-moderno uppercase">
                                                {blog.title}
                                            </h3>
                                        </a>

                                        <p className="text-gray-500 text-xs leading-relaxed line-clamp-3 font-light">
                                            {blog.summary}
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-between pt-6 border-t border-[#E5E7EB]/60 mt-6">
                                        <div className="flex flex-wrap gap-1">
                                            {tags.slice(0, 3).map((t, idx) => (
                                                <span key={idx} className="px-2 py-0.5 rounded bg-[#FFEDED] text-[#942929] text-[9px] uppercase tracking-wider font-bold">
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                        <a 
                                            href={`#/blog/${blog.slug}`}
                                            className="text-xs text-[#942929] font-bold uppercase tracking-wider hover:underline transition"
                                        >
                                            Read &rarr;
                                        </a>
                                    </div>
                                </article>
                            );
                        })
                    ) : (
                        <div className="text-center py-20 text-gray-400 border border-[#E5E7EB] rounded-2xl bg-[#F8FAFC] col-span-2">
                            <p className="text-sm font-light">No articles matched your criteria.</p>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}

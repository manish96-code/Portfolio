import React, { useState, useEffect } from 'react';
import AppLayout from '../../Layouts/AppLayout';

export default function BlogList({ blogs, categories, socialLinks, settings, navigate }) {
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
        <AppLayout settings={settings} socialLinks={socialLinks} navigate={navigate}>
            <div className="pt-32 pb-24 font-sans">
                
                {/* Header */}
                <div className="text-center max-w-xl mx-auto mb-16 space-y-4">
                    <span className="inline-flex items-center gap-1.5 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[11px] font-bold uppercase tracking-[0.2em] px-3.5 py-1.5 rounded-full font-mono">
                        <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse-glow" /> Writing & Insights
                    </span>
                    <h1 className="text-4xl font-display font-black text-white tracking-tight md:text-5xl">
                        Articles & Blog
                    </h1>
                    <p className="text-slate-400 text-lg leading-relaxed max-w-lg mx-auto">
                        Deep dives into Laravel backends, React structures, and modern query optimization.
                    </p>
                </div>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-6 justify-between items-center mb-12 pb-6 border-b border-white/5">
                    <div className="flex flex-wrap gap-3">
                        {categories.map((cat, idx) => (
                            <button
                                key={idx}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-2 rounded-lg text-sm font-bold border transition-all duration-300 shadow-md ${
                                    selectedCategory === cat
                                        ? 'bg-cyan-500 text-slate-950 border-cyan-400'
                                        : 'bg-slate-900/60 text-slate-300 border-white/10 hover:border-cyan-500/40 hover:text-cyan-400'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <div className="relative w-full sm:w-72">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search articles..."
                            className="w-full bg-slate-950/50 border border-white/10 rounded-lg px-4.5 py-2.5 text-base text-white placeholder:text-slate-600 outline-none transition-all duration-300 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/20 font-sans"
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
                                    className="bg-slate-900/40 border border-white/10 p-8 flex flex-col justify-between rounded-2xl hover:border-cyan-500/30 hover:bg-slate-900/60 hover:-translate-y-1 transition-all duration-300 group shadow-2xl relative"
                                >
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between text-xs font-mono font-bold">
                                            <span className="text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-0.5 rounded text-xs font-mono font-bold">
                                                {blog.category}
                                            </span>
                                            <span className="text-slate-500">
                                                {new Date(blog.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                            </span>
                                        </div>

                                        <a 
                                            href={`/blog/${blog.slug}`} 
                                            onClick={(e) => { e.preventDefault(); navigate(`/blog/${blog.slug}`); }}
                                            className="block"
                                        >
                                            <h3 className="text-2xl font-display font-bold text-white group-hover:text-cyan-400 transition-colors leading-snug">
                                                {blog.title}
                                            </h3>
                                        </a>

                                        <p className="text-slate-400 text-base leading-relaxed line-clamp-3 font-sans">
                                            {blog.summary}
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-between pt-6 mt-6 border-t border-white/5">
                                        <div className="flex flex-wrap gap-2">
                                            {tags.slice(0, 3).map((t, idx) => (
                                                <span key={idx} className="text-xs font-semibold text-slate-400 border border-white/5 bg-slate-950/60 px-2.5 py-1 rounded">
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                        <a 
                                            href={`/blog/${blog.slug}`}
                                            onClick={(e) => { e.preventDefault(); navigate(`/blog/${blog.slug}`); }}
                                            className="text-sm font-bold text-cyan-400 hover:text-white transition-colors duration-200"
                                        >
                                            Read ➜
                                        </a>
                                    </div>
                                </article>
                            );
                        })
                    ) : (
                        <div className="text-center py-20 text-slate-400 border border-white/10 rounded-2xl bg-slate-900/40 col-span-2 shadow-2xl font-sans">
                            <p className="text-lg font-bold">No articles matched your criteria. 🔍</p>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}

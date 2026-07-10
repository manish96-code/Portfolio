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
                    <span className="inline-block sticky-note-tag text-stone text-xs font-bold uppercase tracking-[0.2em] px-3.5 py-1.5 font-mono">
                        📝 Writing & Insights
                    </span>
                    <h1 className="text-4xl font-display font-bold text-stone tracking-tight md:text-5xl rotate-[-1deg]">
                        Articles & Blog
                    </h1>
                    <p className="text-stone text-lg leading-relaxed max-w-lg mx-auto rotate-[0.5deg]">
                        Deep dives into Laravel, React, and modern development workflows.
                    </p>
                </div>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-6 justify-between items-center mb-12 pb-6 border-b-3 border-dashed border-stone">
                    <div className="flex flex-wrap gap-3">
                        {categories.map((cat, idx) => (
                            <button
                                key={idx}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-2 rounded-wobbly text-sm font-bold border-2 border-stone transition-hand shadow-hard-muted ${
                                    selectedCategory === cat
                                        ? 'bg-coral text-white rotate-[-2deg]'
                                        : 'bg-white text-stone hover:bg-postit hover:rotate-[2deg]'
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
                            className="w-full bg-white border-3 border-stone rounded-wobbly px-4.5 py-2.5 text-base text-stone placeholder:text-stone-dark/50 outline-none transition focus:border-sage focus:ring-2 focus:ring-sage/20 font-sans"
                        />
                    </div>
                </div>

                {/* Articles Grid - collage cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {filteredBlogs.length > 0 ? (
                        filteredBlogs.map((blog, idx) => {
                            const tags = blog.tags || [];
                            return (
                                <article 
                                    key={blog.id} 
                                    className={`bg-white border-3 border-stone p-8 flex flex-col justify-between rounded-wobbly-md card-tape hover:shadow-hard hover:rotate-0 transition-hand group shadow-hard-muted relative ${
                                        idx % 2 === 0 ? 'rotate-1' : '-rotate-1'
                                    }`}
                                >
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between text-xs font-mono font-bold">
                                            <span className="text-coral bg-cream border border-stone px-2.5 py-0.5 rounded-wobbly rotate-[2deg] shadow-hard-muted">
                                                {blog.category}
                                            </span>
                                            <span className="text-stone-dark">
                                                {new Date(blog.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                            </span>
                                        </div>

                                        <a 
                                            href={`/blog/${blog.slug}`} 
                                            onClick={(e) => { e.preventDefault(); navigate(`/blog/${blog.slug}`); }}
                                            className="block"
                                        >
                                            <h3 className="text-2xl font-display font-bold text-stone group-hover:text-coral group-hover:link-underline-wavy transition-colors leading-snug rotate-[-0.5deg]">
                                                {blog.title}
                                            </h3>
                                        </a>

                                        <p className="text-stone text-base leading-relaxed line-clamp-3">
                                            {blog.summary}
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-between pt-6 mt-6 border-t-2 border-dashed border-stone">
                                        <div className="flex flex-wrap gap-2">
                                            {tags.slice(0, 3).map((t, idx) => (
                                                <span key={idx} className="text-xs font-bold text-stone-dark border border-stone bg-cream px-2 py-0.5 rounded-wobbly">
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                        <a 
                                            href={`/blog/${blog.slug}`}
                                            onClick={(e) => { e.preventDefault(); navigate(`/blog/${blog.slug}`); }}
                                            className="text-sm font-bold text-coral hover:link-underline-wavy transition-hand rotate-[2deg]"
                                        >
                                            Read ➜
                                        </a>
                                    </div>
                                </article>
                            );
                        })
                    ) : (
                        <div className="text-center py-20 text-stone border-3 border-stone rounded-wobbly-lg bg-white col-span-2 shadow-hard font-sans rotate-1">
                            <p className="text-lg font-bold">No articles matched your criteria. 🔍</p>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}

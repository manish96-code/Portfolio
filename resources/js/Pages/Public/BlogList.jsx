import React from 'react';
import AppLayout from '../../Layouts/AppLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function BlogList({ blogs, categories, filters, socialLinks, settings }) {
    const handleSearch = (e) => {
        router.get('/blogs', { 
            ...filters, 
            search: e.target.value 
        }, { 
            preserveState: true,
            replace: true 
        });
    };

    const handleCategorySelect = (category) => {
        router.get('/blogs', { 
            ...filters, 
            category: category 
        });
    };

    return (
        <AppLayout settings={settings} socialLinks={socialLinks}>
            <Head>
                <title>Blogs & Articles - मनीष कुमार</title>
                <meta name="description" content="Read full-stack web development case studies and technical articles by Manish Kumar." />
            </Head>

            <div className="max-w-4xl mx-auto px-6 py-12">
                <div className="text-center mb-12">
                    <h4 className="text-xs text-[#FF2D20] font-black uppercase tracking-widest">Insights</h4>
                    <h1 className="text-4xl font-extrabold text-slate-100 tracking-tight mt-2">Articles & Knowledge Base</h1>
                    <p className="text-slate-400 text-sm mt-3 font-light">Deep dives into Laravel, React, Inertia, and AI workflows.</p>
                </div>

                {/* Filters Board */}
                <div className="flex flex-col sm:flex-row gap-5 justify-between items-center mb-10 pb-6 border-b border-slate-900">
                    {/* Category Pills */}
                    <div className="flex flex-wrap gap-2">
                        {categories.map((cat, idx) => (
                            <button
                                key={idx}
                                onClick={() => handleCategorySelect(cat)}
                                className={`px-4 py-1.5 rounded-xl text-xs font-semibold capitalize transition ${
                                    (filters?.category || 'all') === cat
                                        ? 'bg-[#FF2D20] text-white'
                                        : 'bg-slate-900/60 hover:bg-slate-800 text-slate-400 border border-slate-850'
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
                            defaultValue={filters?.search || ''}
                            onChange={handleSearch}
                            placeholder="Search articles..."
                            className="w-full bg-slate-900 border border-slate-900 focus:border-[#FF2D20]/60 focus:ring-1 focus:ring-[#FF2D20]/20 rounded-xl px-4 py-2.5 text-xs text-slate-200 placeholder-slate-500 transition"
                        />
                    </div>
                </div>

                {/* Articles List */}
                <div className="space-y-10">
                    {blogs.length > 0 ? (
                        blogs.map((blog) => {
                            const tags = Array.isArray(blog.tags) ? blog.tags : JSON.parse(blog.tags || '[]');
                            return (
                                <article key={blog.id} className="p-8 rounded-2xl bg-slate-900/20 border border-slate-900/80 hover:border-slate-850 hover:bg-slate-900/30 transition duration-300 flex flex-col justify-between relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-24 h-24 bg-[#FF2D20]/5 rounded-full blur-xl group-hover:bg-[#FF2D20]/10 transition duration-300"></div>
                                    <div>
                                        <div className="flex items-center gap-4 text-xs text-slate-500 mb-3.5">
                                            <span className="font-semibold text-slate-400 capitalize">{blog.category}</span>
                                            <span>•</span>
                                            <span>{new Date(blog.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                        </div>

                                        <Link href={`/blog/${blog.slug}`}>
                                            <h3 className="text-xl font-bold text-slate-100 group-hover:text-[#FF2D20] transition duration-300 mb-3 leading-tight">
                                                {blog.title}
                                            </h3>
                                        </Link>

                                        <p className="text-slate-400 text-xs leading-relaxed mb-6 font-light max-w-2xl">
                                            {blog.summary}
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-between pt-4 border-t border-slate-900">
                                        <div className="flex flex-wrap gap-1.5">
                                            {tags.map((t, idx) => (
                                                <span key={idx} className="px-2 py-0.5 rounded bg-slate-950 text-slate-500 border border-slate-850 text-[8px] uppercase tracking-wider font-bold">
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                        <Link 
                                            href={`/blog/${blog.slug}`}
                                            className="text-xs text-[#FF2D20] font-bold hover:underline transition"
                                        >
                                            Read Article &rarr;
                                        </Link>
                                    </div>
                                </article>
                            );
                        })
                    ) : (
                        <div className="text-center py-20 text-slate-500 border border-slate-900 rounded-2xl bg-slate-900/10">
                            <span className="text-3xl">🔍</span>
                            <p className="text-sm mt-3 font-light">No articles matched your criteria.</p>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}

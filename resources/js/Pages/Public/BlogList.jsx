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
                <title>Blog - Manish Kumar</title>
                <meta name="description" content="Read full-stack web development case studies and technical articles by Manish Kumar." />
            </Head>

            <div className="max-w-[1280px] mx-auto px-6 py-12">
                <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
                    <span className="text-xs font-semibold text-[#2563EB] uppercase tracking-wider">Insights</span>
                    <h1 className="text-4xl font-extrabold text-[#111827] tracking-tight">Articles & Knowledge Base</h1>
                    <p className="text-[#6B7280] text-sm">Deep dives into Laravel, React, Inertia, and AI workflows.</p>
                </div>

                {/* Filters Board */}
                <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-10 pb-6 border-b border-[#E5E7EB]">
                    {/* Category Pills */}
                    <div className="flex flex-wrap gap-2">
                        {categories.map((cat, idx) => (
                            <button
                                key={idx}
                                onClick={() => handleCategorySelect(cat)}
                                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium capitalize transition ${
                                    (filters?.category || 'all') === cat
                                        ? 'bg-[#2563EB] text-white'
                                        : 'bg-white text-[#6B7280] border border-[#E5E7EB] hover:bg-slate-50'
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
                            className="w-full bg-white border border-[#E5E7EB] focus:border-[#2563EB] rounded-lg px-3 py-2 text-xs text-[#111827] placeholder-[#6B7280]/60 outline-none transition"
                        />
                    </div>
                </div>

                {/* Articles List */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {blogs.length > 0 ? (
                        blogs.map((blog) => {
                            const tags = Array.isArray(blog.tags) ? blog.tags : JSON.parse(blog.tags || '[]');
                            return (
                                <article key={blog.id} className="p-6 rounded-xl bg-white border border-[#E5E7EB] hover:border-[#2563EB]/40 transition duration-150 flex flex-col justify-between shadow-sm">
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between text-xs text-[#6B7280]">
                                            <span className="font-semibold text-[#2563EB] capitalize">{blog.category}</span>
                                            <span>{new Date(blog.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                        </div>

                                        <Link href={`/blog/${blog.slug}`}>
                                            <h3 className="text-lg font-bold text-[#111827] hover:text-[#2563EB] transition duration-150 leading-snug">
                                                {blog.title}
                                            </h3>
                                        </Link>

                                        <p className="text-[#6B7280] text-xs leading-relaxed line-clamp-3">
                                            {blog.summary}
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-between pt-4 border-t border-[#E5E7EB]/60 mt-6">
                                        <div className="flex flex-wrap gap-1">
                                            {tags.slice(0, 3).map((t, idx) => (
                                                <span key={idx} className="px-2 py-0.5 rounded bg-[#F3F4F6] text-[#6B7280] text-[9px] uppercase tracking-wider font-bold">
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                        <Link 
                                            href={`/blog/${blog.slug}`}
                                            className="text-xs text-[#2563EB] font-semibold hover:underline transition"
                                        >
                                            Read Article &rarr;
                                        </Link>
                                    </div>
                                </article>
                            );
                        })
                    ) : (
                        <div className="text-center py-20 text-[#6B7280] border border-[#E5E7EB] rounded-xl bg-[#F8FAFC] col-span-2">
                            <p className="text-sm font-light">No articles matched your criteria.</p>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}

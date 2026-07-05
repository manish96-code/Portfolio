import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';

export default function AppLayout({ children, settings, socialLinks }) {
    const [scrollProgress, setScrollProgress] = useState(0);
    const [showBackToTop, setShowBackToTop] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const name = settings?.name || 'Manish Kumar';
    const email = settings?.email || 'manish.kumar@example.com';

    useEffect(() => {
        const handleScroll = () => {
            // Scroll progress bar calculation
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            if (totalHeight > 0) {
                setScrollProgress((window.scrollY / totalHeight) * 100);
            }

            // Back to top button visibility
            setShowBackToTop(window.scrollY > 400);

            // Glass Navbar scroll state
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-[#020617] text-slate-100 font-sans selection:bg-[#FF2D20] selection:text-white relative flex flex-col justify-between">
            {/* Scroll Progress Bar */}
            <div 
                className="fixed top-0 left-0 h-1 bg-[#FF2D20] z-50 transition-all duration-100"
                style={{ width: `${scrollProgress}%` }}
            ></div>

            {/* Glowing background circles for ambient premium look */}
            <div className="absolute top-10 left-10 w-96 h-96 bg-[#FF2D20]/5 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute top-[40vh] right-[10vw] w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-20 left-[20vw] w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>

            {/* Floating Navbar */}
            <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
                isScrolled 
                    ? 'py-3 bg-slate-950/80 backdrop-blur-lg border-b border-slate-900 shadow-lg' 
                    : 'py-5 bg-transparent'
            }`}>
                <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#FF2D20] to-purple-600 flex items-center justify-center font-bold text-white shadow-lg shadow-[#FF2D20]/25 transition duration-300 group-hover:scale-105">
                            {name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="font-extrabold text-lg tracking-wider bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                            {name}
                        </span>
                    </Link>

                    <div className="flex items-center gap-6 text-sm">
                        <Link href="/" className="text-slate-300 hover:text-[#FF2D20] transition font-medium">Home</Link>
                        <Link href="/blogs" className="text-slate-300 hover:text-[#FF2D20] transition font-medium">Blog</Link>
                        <a href="#contact" className="px-5 py-2.5 rounded-full bg-[#FF2D20]/10 border border-[#FF2D20]/20 text-[#FF2D20] font-bold hover:bg-[#FF2D20]/20 transition duration-300">
                            Hire Me
                        </a>
                    </div>
                </div>
            </nav>

            {/* Main Page Area */}
            <main className="flex-grow pt-20">
                {children}
            </main>

            {/* Footer */}
            <footer className="border-t border-slate-900 bg-slate-950/50 backdrop-blur-md pt-16 pb-8 mt-20">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#FF2D20] to-purple-600 flex items-center justify-center font-bold text-white">
                                    {name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <span className="font-extrabold text-lg text-white">{name}</span>
                            </div>
                            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
                                {settings?.objective || 'Full Stack Laravel Developer specializing in high performance React, Inertia and Tailwind systems.'}
                            </p>
                        </div>
                        <div>
                            <h4 className="text-slate-200 font-bold text-sm tracking-wider uppercase mb-4">Quick Links</h4>
                            <div className="flex flex-col gap-2.5 text-sm text-slate-400">
                                <Link href="/" className="hover:text-[#FF2D20] transition">Portfolio Landing</Link>
                                <Link href="/blogs" className="hover:text-[#FF2D20] transition">Blogs & News</Link>
                                <a href="#contact" className="hover:text-[#FF2D20] transition">Get in Touch</a>
                            </div>
                        </div>
                        <div>
                            <h4 className="text-slate-200 font-bold text-sm tracking-wider uppercase mb-4">Social Presence</h4>
                            <div className="flex gap-4 mb-4">
                                {socialLinks?.map((link, idx) => (
                                    <a 
                                        key={idx} 
                                        href={link.url} 
                                        target="_blank" 
                                        rel="noreferrer"
                                        className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center hover:border-[#FF2D20]/40 hover:bg-[#FF2D20]/10 text-slate-300 hover:text-[#FF2D20] transition duration-300"
                                        title={link.platform}
                                    >
                                        <span className="capitalize font-semibold text-xs">{link.platform[0]}</span>
                                    </a>
                                ))}
                            </div>
                            <span className="text-xs text-slate-500">Contact: {email}</span>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-slate-900 text-xs text-slate-500 gap-4">
                        <p>&copy; {new Date().getFullYear()} {name}. All rights reserved.</p>
                        <p>Stack: Laravel 13, React 19, Inertia.js, Tailwind CSS v4, MySQL.</p>
                    </div>
                </div>
            </footer>

            {/* Back to Top Floating Button */}
            {showBackToTop && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full bg-[#FF2D20] text-white flex items-center justify-center shadow-lg shadow-[#FF2D20]/30 hover:bg-[#FF2D20]/90 transition-all duration-300 hover:-translate-y-1"
                    title="Back to Top"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                </button>
            )}
        </div>
    );
}

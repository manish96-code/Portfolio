import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';

export default function AppLayout({ children, settings, socialLinks }) {
    const [showBackToTop, setShowBackToTop] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const name = settings?.name || 'Manish Kumar';
    const email = settings?.email || 'manish.kumar@example.com';

    useEffect(() => {
        const handleScroll = () => {
            setShowBackToTop(window.scrollY > 400);
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-white text-[#111827] font-sans antialiased flex flex-col justify-between">
            
            {/* Sticky Navigation Bar */}
            <nav className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-200 bg-white border-b border-[#E5E7EB]`}>
                <div className="max-w-[1280px] mx-auto px-6 h-16 flex justify-between items-center">
                    
                    {/* Logo (Left) */}
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded bg-[#111827] flex items-center justify-center font-bold text-white text-sm">
                            {name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="font-semibold text-base text-[#111827] tracking-tight">
                            {name}
                        </span>
                    </Link>

                    {/* Navigation Items (Center/Right) */}
                    <div className="hidden md:flex items-center gap-8 text-sm">
                        <Link href="/" className="text-[#6B7280] hover:text-[#111827] transition font-medium">Home</Link>
                        <a href="#about" className="text-[#6B7280] hover:text-[#111827] transition font-medium">About</a>
                        <a href="#skills" className="text-[#6B7280] hover:text-[#111827] transition font-medium">Skills</a>
                        <a href="#experience" className="text-[#6B7280] hover:text-[#111827] transition font-medium">Experience</a>
                        <a href="#projects" className="text-[#6B7280] hover:text-[#111827] transition font-medium">Projects</a>
                        <a href="#contact" className="text-[#6B7280] hover:text-[#111827] transition font-medium">Contact</a>
                        <Link href="/blogs" className="text-[#6B7280] hover:text-[#111827] transition font-medium">Blog</Link>
                    </div>

                    {/* Resume Button (Right) */}
                    <div className="flex items-center gap-4">
                        <a 
                            href="/resume/download" 
                            target="_blank"
                            className="px-4 py-1.5 rounded-lg border border-[#2563EB] text-[#2563EB] text-xs font-semibold hover:bg-[#2563EB]/5 transition duration-150"
                        >
                            Resume
                        </a>
                    </div>
                </div>
            </nav>

            {/* Main Content (centered container max width 1280px) */}
            <main className="flex-grow pt-16">
                {children}
            </main>

            {/* Simple Footer */}
            <footer className="border-t border-[#E5E7EB] bg-[#F8FAFC] py-12">
                <div className="max-w-[1280px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded bg-[#111827] flex items-center justify-center font-bold text-white text-[10px]">
                            {name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="text-xs font-semibold text-[#111827]">{name}</span>
                    </div>

                    <div className="flex items-center gap-6 text-xs text-[#6B7280]">
                        <Link href="/" className="hover:text-[#111827] transition">Home</Link>
                        <Link href="/blogs" className="hover:text-[#111827] transition">Blog</Link>
                        <a href="mailto:manish.kumar@example.com" className="hover:text-[#111827] transition">{email}</a>
                    </div>

                    <div className="flex items-center gap-4">
                        {socialLinks?.map((link, idx) => (
                            <a 
                                key={idx} 
                                href={link.url} 
                                target="_blank" 
                                rel="noreferrer"
                                className="text-xs text-[#6B7280] hover:text-[#111827] transition font-medium uppercase"
                                title={link.platform}
                            >
                                {link.platform}
                            </a>
                        ))}
                    </div>
                </div>
                <div className="max-w-[1280px] mx-auto px-6 mt-6 pt-6 border-t border-[#E5E7EB]/50 flex justify-between items-center text-[11px] text-[#6B7280]">
                    <p>&copy; {new Date().getFullYear()} {name}. All rights reserved.</p>
                    <p>Designed in clean minimal style.</p>
                </div>
            </footer>

            {/* Back to Top Button */}
            {showBackToTop && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-6 right-6 z-40 w-9 h-9 rounded-lg bg-[#111827] text-white flex items-center justify-center shadow-sm hover:bg-[#111827]/90 transition-all duration-200"
                    title="Back to Top"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                    </svg>
                </button>
            )}
        </div>
    );
}

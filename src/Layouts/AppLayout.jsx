import React, { useState, useEffect } from 'react';

export default function AppLayout({ children, settings, socialLinks }) {
    const [showBackToTop, setShowBackToTop] = useState(false);
    const name = settings?.name || 'Manish Kumar';
    const email = settings?.email || 'manish96611311@gmail.com';

    useEffect(() => {
        const handleScroll = () => {
            setShowBackToTop(window.scrollY > 400);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-[#FFFFFF] text-[#0F172A] font-sans antialiased flex flex-col justify-between selection:bg-[#3B82F6]/10 selection:text-[#3B82F6]">
            
            {/* Header (Developer / Vercel style) */}
            <header className="sticky top-0 z-50 bg-[#FFFFFF]/80 backdrop-blur-md border-b border-[#F1F5F9]">
                <div className="max-w-[1200px] mx-auto px-6 h-16 flex justify-between items-center">
                    
                    {/* Logo / Coder Name */}
                    <a href="#/" className="flex items-center gap-2 group">
                        <span className="font-mono text-sm font-bold tracking-tight text-[#0F172A] flex items-center gap-1.5">
                            <span className="text-[#3B82F6]">&lt;/&gt;</span>
                            {name}
                        </span>
                    </a>

                    {/* Desktop Menu */}
                    <nav className="hidden md:flex items-center gap-8 text-[13px] font-medium text-[#475569]">
                        <a href="#projects" className="hover:text-[#3B82F6] transition-colors duration-150">Projects</a>
                        <a href="#about" className="hover:text-[#3B82F6] transition-colors duration-150">About</a>
                        <a href="#skills" className="hover:text-[#3B82F6] transition-colors duration-150">Skills</a>
                        <a href="#experience" className="hover:text-[#3B82F6] transition-colors duration-150">Experience</a>
                        <a href="#contact" className="hover:text-[#3B82F6] transition-colors duration-150">Contact</a>
                        <a href="#/blogs" className="hover:text-[#3B82F6] transition-colors duration-150">Blog</a>
                    </nav>

                    {/* Resume / Contact Button */}
                    <div className="flex items-center">
                        <a 
                            href="#contact" 
                            className="px-4 py-1.5 rounded-lg bg-[#0F172A] hover:bg-[#3B82F6] text-white text-xs font-semibold tracking-wide transition-all duration-150 shadow-sm"
                        >
                            Contact
                        </a>
                    </div>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="flex-grow">
                {children}
            </main>

            {/* Footer */}
            <footer className="border-t border-[#F1F5F9] bg-[#F8FAFC] py-16">
                <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="space-y-2 text-center md:text-left">
                        <span className="font-mono text-sm font-bold tracking-tight text-[#0F172A] flex items-center justify-center md:justify-start gap-1.5">
                            <span className="text-[#3B82F6]">&lt;/&gt;</span>
                            {name}
                        </span>
                        <p className="text-[#64748B] text-xs font-light">
                            © {new Date().getFullYear()} Manish Kumar. All rights reserved.
                        </p>
                    </div>

                    {/* Navigation Link list */}
                    <div className="flex items-center gap-8 text-xs font-medium text-[#475569]">
                        <a href="#projects" className="hover:text-[#3B82F6] transition-colors duration-150">Projects</a>
                        <a href="#/blogs" className="hover:text-[#3B82F6] transition-colors duration-150">Blog</a>
                        <a href="https://linkedin.com/in/manish-kumar" target="_blank" rel="noreferrer" className="hover:text-[#3B82F6] transition-colors duration-150">LinkedIn</a>
                        <a href="https://github.com/manish96-code" target="_blank" rel="noreferrer" className="hover:text-[#3B82F6] transition-colors duration-150">GitHub</a>
                    </div>
                </div>
            </footer>

            {/* Back to Top */}
            {showBackToTop && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-6 right-6 z-40 w-9 h-9 rounded-lg bg-[#0F172A] text-white flex items-center justify-center shadow-md hover:bg-[#3B82F6] transition-all duration-150"
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

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
        <div className="min-h-screen bg-black p-[0.8vh] flex flex-col justify-stretch selection:bg-[#942929]/20 selection:text-[#942929]">
            
            {/* The Main Rounded White Canvas Frame */}
            <div className="bg-white text-black min-h-[calc(100vh-1.6vh)] rounded-[max(2vw,1.5vh)] overflow-hidden relative flex flex-col justify-between shadow-2xl">
                
                {/* Floating Top Navigation (Inside White Frame) */}
                <header className="absolute top-8 right-8 md:right-16 z-50 flex items-center gap-8 text-[11px] font-mono-atkinson uppercase font-bold tracking-widest">
                    <a href="#/" className="hover:text-[#942929] transition duration-150">Work</a>
                    <a href="#about" className="hover:text-[#942929] transition duration-150">About</a>
                    <a href="#skills" className="hover:text-[#942929] transition duration-150">Skills</a>
                    <a href="#contact" className="hover:text-[#942929] transition duration-150">Contact</a>
                    <a href="#/blogs" className="hover:text-[#942929] transition duration-150">Blog</a>
                </header>

                {/* Left Floating Sidebar (Social Links & Pill Button) */}
                <aside className="fixed left-[calc(0.8vh+20px)] top-[25%] bottom-[25%] w-[40px] z-40 hidden xl:flex flex-col justify-between items-center py-4 border-r border-[#E5E7EB]/80 text-[10px] font-mono-atkinson uppercase tracking-widest font-bold text-gray-400">
                    <a 
                        href={settings?.resume_file || '#'} 
                        target="_blank"
                        rel="noreferrer"
                        className="px-2.5 py-1 rounded bg-[#942929] text-white text-[9px] font-semibold tracking-wider hover:bg-black transition duration-150 text-center select-none"
                    >
                        CV
                    </a>
                    
                    <div className="flex flex-col gap-6 items-center">
                        <a href="https://linkedin.com/in/manish-kumar" target="_blank" rel="noreferrer" className="hover:text-black transition -rotate-90 origin-center my-2">Linkedin</a>
                        <a href="https://github.com/manish96-code" target="_blank" rel="noreferrer" className="hover:text-black transition -rotate-90 origin-center my-2">Github</a>
                        <a href={`mailto:${email}`} className="hover:text-black transition -rotate-90 origin-center my-2">Email</a>
                    </div>
                </aside>

                {/* Main Content Space */}
                <main className="flex-grow">
                    {children}
                </main>

                {/* Maroon/Crimson Footer Section */}
                <footer className="bg-[#662323] text-[#FFEDED] py-16 px-8 md:px-16 border-t border-[#942929]/20 font-mono-atkinson">
                    <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                        <div>
                            <span className="font-moderno text-3xl font-black tracking-wider uppercase text-white">
                                {name.replace(' ', '')}
                            </span>
                            <p className="text-white/60 text-xs mt-2 font-light">© {new Date().getFullYear()} Manish Kumar. Built with React SPA architecture.</p>
                        </div>

                        <div className="flex flex-col md:flex-row gap-6 md:gap-12 text-xs font-semibold uppercase tracking-wider">
                            <a href="#/" className="hover:text-white transition">Home</a>
                            <a href="#/blogs" className="hover:text-white transition">Blog</a>
                            <a href="https://linkedin.com/in/manish-kumar" target="_blank" rel="noreferrer" className="hover:text-white transition">LinkedIn</a>
                            <a href="https://github.com/manish96-code" target="_blank" rel="noreferrer" className="hover:text-white transition">GitHub</a>
                        </div>
                    </div>
                </footer>
            </div>

            {/* Back to Top Button */}
            {showBackToTop && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-6 right-6 z-40 w-9 h-9 rounded-lg bg-[#942929] text-white flex items-center justify-center shadow-lg hover:bg-black transition-all duration-200"
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

import React, { useState, useEffect } from 'react';

// Icons as small components
const IconGitHub = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
    </svg>
);

const IconLinkedIn = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
);

const IconMail = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/>
    </svg>
);

const IconExternal = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"/>
    </svg>
);

const IconFolder = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"/>
    </svg>
);


export default function AppLayout({ children, settings, socialLinks, navigate }) {
    const [showBackToTop, setShowBackToTop] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const name = settings?.name || 'Manish Kumar';
    const email = settings?.email || 'manish96611311@gmail.com';

    useEffect(() => {
        const handleScroll = () => {
            setShowBackToTop(window.scrollY > 400);
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Fade-in sections on scroll
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            },
            { threshold: 0.1 }
        );
        document.querySelectorAll('.fade-section').forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleNavClick = (e, href) => {
        e.preventDefault();
        const targetId = href.replace('#', '');
        
        if (window.location.pathname === '/') {
            const element = document.getElementById(targetId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        } else if (navigate) {
            navigate('/');
            setTimeout(() => {
                const element = document.getElementById(targetId);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        } else {
            window.location.href = '/' + href;
        }
    };

    const navItems = [
        { label: 'About', href: '#about' },
        { label: 'Experience', href: '#experience' },
        { label: 'Projects', href: '#projects' },
        { label: 'Skills', href: '#skills' },
        { label: 'Contact', href: '#contact' },
    ];

    return (
        <div className="min-h-screen bg-cream text-body font-sans antialiased">
            
            {/* Fixed Left Social Bar */}
            <div className="hidden lg:flex fixed bottom-0 left-10 z-30 flex-col items-center gap-6">
                <a href="https://github.com/manish96-code" target="_blank" rel="noreferrer" className="text-body-light hover:text-coral hover:-translate-y-0.5 transition-all duration-200">
                    <IconGitHub />
                </a>
                <a href="https://linkedin.com/in/manish-kumar" target="_blank" rel="noreferrer" className="text-body-light hover:text-coral hover:-translate-y-0.5 transition-all duration-200">
                    <IconLinkedIn />
                </a>
                <a href={`mailto:${email}`} className="text-body-light hover:text-coral hover:-translate-y-0.5 transition-all duration-200">
                    <IconMail />
                </a>
                <div className="w-px h-24 bg-stone"></div>
            </div>

            {/* Fixed Right Email Bar */}
            <div className="hidden lg:flex fixed bottom-0 right-10 z-30 flex-col items-center gap-6">
                <a href={`mailto:${email}`} className="text-body-light text-xs font-mono tracking-widest hover:text-coral hover:-translate-y-0.5 transition-all duration-200" style={{ writingMode: 'vertical-rl' }}>
                    {email}
                </a>
                <div className="w-px h-24 bg-stone"></div>
            </div>

            {/* Header / Navigation */}
            <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-warm py-4' : 'bg-transparent py-6'}`}>
                <div className="max-w-[1100px] mx-auto px-6 lg:px-12 flex justify-between items-center">
                    
                    {/* Logo */}
                    <a 
                        href="/" 
                        onClick={(e) => {
                            e.preventDefault();
                            if (window.location.pathname === '/') {
                                scrollToTop();
                            } else if (navigate) {
                                navigate('/');
                            } else {
                                window.location.href = '/';
                            }
                        }} 
                        className="font-display text-charcoal text-xl font-bold hover:text-coral transition-colors duration-200"
                    >
                        MK
                    </a>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-1">
                        {navItems.map((item, idx) => (
                            <a
                                key={idx}
                                href={item.href}
                                onClick={(e) => handleNavClick(e, item.href)}
                                className="px-4 py-2 text-[13px] font-medium text-body hover:text-coral transition-colors duration-200"
                            >
                                {item.label}
                            </a>
                        ))}
                        <a
                            href={settings?.resume_file || '#'}
                            target="_blank"
                            rel="noreferrer"
                            className="ml-4 px-5 py-2 rounded-full border border-coral text-coral text-[13px] font-medium hover:bg-coral hover:text-white transition-all duration-200"
                        >
                            Resume
                        </a>
                    </nav>

                    {/* Mobile Hamburger */}
                    <button 
                        className="md:hidden text-charcoal p-2" 
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            {mobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu Overlay */}
                {mobileMenuOpen && (
                    <div className="md:hidden fixed inset-0 top-0 bg-white/98 backdrop-blur-lg z-40 flex flex-col items-center justify-center gap-8">
                        <button 
                            className="absolute top-6 right-6 text-charcoal p-2"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        {navItems.map((item, idx) => (
                            <a
                                key={idx}
                                href={item.href}
                                onClick={(e) => {
                                    setMobileMenuOpen(false);
                                    handleNavClick(e, item.href);
                                }}
                                className="text-charcoal text-lg font-display font-semibold hover:text-coral transition-colors"
                            >
                                {item.label}
                            </a>
                        ))}
                        <a
                            href={settings?.resume_file || '#'}
                            target="_blank"
                            rel="noreferrer"
                            className="mt-4 px-8 py-3 rounded-full border border-coral text-coral font-medium hover:bg-coral hover:text-white transition-all"
                        >
                            Resume
                        </a>
                    </div>
                )}
            </header>

            {/* Main Content */}
            <main className="max-w-[1100px] mx-auto px-6 lg:px-12">
                {children}
            </main>

            {/* Footer */}
            <footer className="py-8 border-t border-stone-light">
                <div className="max-w-[1100px] mx-auto px-6 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-body-light">
                        (c) {new Date().getFullYear()} Manish Kumar
                    </p>
                    <a 
                        href="https://github.com/manish96-code" 
                        target="_blank" 
                        rel="noreferrer"
                        className="text-xs text-body-light hover:text-coral transition-colors"
                    >
                        Designed & Built by Manish Kumar
                    </a>
                </div>
            </footer>

            {/* Back to Top */}
            {showBackToTop && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-6 right-6 z-40 w-10 h-10 rounded-full bg-white border border-stone text-coral flex items-center justify-center hover:bg-coral-tint hover:border-coral transition-all duration-200 shadow-warm lg:hidden"
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

export { IconGitHub, IconLinkedIn, IconMail, IconExternal, IconFolder };

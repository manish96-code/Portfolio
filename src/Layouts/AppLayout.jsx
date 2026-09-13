import React, { useState, useEffect } from 'react';

// Icons as small components
const IconGitHub = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
);

const IconLinkedIn = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
);

const IconFacebook = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
    </svg>
);

const IconInstagram = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
);

const IconWhatsApp = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.458L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.863-9.864.001-2.636-1.023-5.11-2.884-6.974C16.593 1.898 14.116.87 11.48.87c-5.437 0-9.863 4.421-9.865 9.867 0 1.704.457 3.364 1.324 4.803L1.89 21.05l5.757-1.509c.001-.001.002-.001.003-.001zm10.743-7.531c-.272-.136-1.614-.797-1.863-.888-.249-.09-.431-.136-.613.136-.182.271-.703.888-.862 1.069-.159.182-.318.204-.59.068-.272-.136-1.15-.424-2.19-1.353-.809-.721-1.355-1.612-1.514-1.884-.159-.272-.017-.419.119-.554.122-.122.272-.318.408-.477.136-.159.182-.272.272-.453.09-.182.045-.34-.023-.477-.068-.136-.613-1.477-.839-2.023-.22-.531-.44-.458-.604-.466-.156-.008-.337-.008-.517-.008-.18 0-.476.068-.726.34-.25.272-.953.932-.953 2.273s.975 2.632 1.111 2.813c.136.182 1.92 2.931 4.652 4.114.65.281 1.157.449 1.553.575.654.208 1.248.178 1.717.108.522-.078 1.614-.659 1.841-1.295.227-.636.227-1.182.159-1.295-.068-.113-.249-.182-.522-.318z" />
    </svg>
);

const IconMail = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
);

const IconExternal = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
    </svg>
);

const IconFolder = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
    </svg>
);

const renderIcon = (iconName) => {
    switch (iconName?.toLowerCase()) {
        case 'github':
            return <IconGitHub />;
        case 'linkedin':
            return <IconLinkedIn />;
        case 'facebook':
            return <IconFacebook />;
        case 'instagram':
            return <IconInstagram />;
        case 'whatsapp':
            return <IconWhatsApp />;
        case 'mail':
        case 'email':
            return <IconMail />;
        default:
            return <IconExternal />;
    }
};

export default function AppLayout({ children, settings, socialLinks, navigate }) {
    const [showBackToTop, setShowBackToTop] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const name = settings?.name || 'Manish Kumar';
    const email = settings?.email || 'manish966128@gmail.com';

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
        { label: 'Expertise', href: '#expertise' },
        { label: 'Why Me', href: '#why-me' },
        { label: 'Projects', href: '#projects' },
        { label: 'Process', href: '#process' },
        { label: 'Experience', href: '#experience' },
        { label: 'Contact', href: '#contact' },
    ];

    return (
        <div className="min-h-screen bg-zinc-50/50 text-zinc-900 font-sans antialiased relative overflow-hidden">

            {/* Ambient background glows */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-500/[0.03] rounded-full blur-[120px] pointer-events-none -z-10"></div>
            <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-cyan-500/[0.02] rounded-full blur-[100px] pointer-events-none -z-10"></div>
            <div className="absolute bottom-10 left-1/3 w-[600px] h-[600px] bg-indigo-500/[0.02] rounded-full blur-[150px] pointer-events-none -z-10"></div>

            {/* Fixed Left Social Bar - Sleek Minimalist Badges */}
            <div className="hidden lg:flex fixed bottom-0 left-8 z-30 flex-col items-center gap-4">
                {socialLinks && socialLinks.map((link, idx) => (
                    <a
                        key={idx}
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-center w-10 h-10 border border-zinc-200 bg-white/80 backdrop-blur-md rounded-full text-zinc-500 hover:text-indigo-600 hover:-translate-y-1 transition-all duration-300 shadow-sm"
                        title={link.platform}
                    >
                        {renderIcon(link.icon || link.platform)}
                    </a>
                ))}
                <div className="w-px h-24 bg-gradient-to-t from-transparent to-zinc-300"></div>
            </div>

            {/* Fixed Right Email Bar - Sleek Vertical Label */}
            <div className="hidden lg:flex fixed bottom-0 right-8 z-30 flex-col items-center gap-5">
                <a
                    href={`mailto:${email}`}
                    className="text-zinc-500 hover:text-indigo-600 text-xs font-mono tracking-wider hover:-translate-y-1 transition-all duration-300 py-2"
                    style={{ writingMode: 'vertical-rl' }}
                >
                    {email}
                </a>
                <div className="w-px h-20 bg-gradient-to-t from-transparent to-zinc-300"></div>
            </div>

            {/* Comestro-Inspired Top Info Bar */}
            <div className="bg-zinc-100/95 border-b border-zinc-200/80 text-zinc-600 text-xs py-1.5 px-4 sm:px-6 lg:px-12 relative z-50">
                <div className="max-w-[1100px] mx-auto flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-[11px] sm:text-xs">
                        <a href={`mailto:${email}`} className="hover:text-indigo-600 flex items-center gap-1.5 transition-colors">
                            <svg className="w-3.5 h-3.5 text-indigo-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <span className="truncate max-w-[180px] sm:max-w-none">{email}</span>
                        </a>
                        <span className="text-zinc-300 hidden sm:inline">|</span>
                        <a href="tel:+918207593672" className="hover:text-indigo-600 flex items-center gap-1.5 transition-colors hidden sm:flex">
                            <svg className="w-3.5 h-3.5 text-indigo-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            <span>+91 8207593672</span>
                        </a>
                        <span className="text-zinc-300 hidden md:inline">|</span>
                        <span className="text-zinc-500 flex items-center gap-1.5 hidden md:flex">
                            <svg className="w-3.5 h-3.5 text-indigo-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span>Jaipur, RJ / Purnea, BR</span>
                        </span>
                    </div>
                    <div className="flex items-center gap-3 text-[11px] sm:text-xs">
                        <span className="inline-flex items-center gap-1.5 text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full font-medium">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                            Available for Roles
                        </span>
                        <div className="flex items-center gap-2 text-zinc-500">
                            <a href="https://github.com/manish96-code" target="_blank" rel="noreferrer" className="hover:text-indigo-600 transition-colors" title="GitHub">
                                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
                            </a>
                            <a href="https://www.linkedin.com/in/manish-kumar-9661link" target="_blank" rel="noreferrer" className="hover:text-indigo-600 transition-colors" title="LinkedIn">
                                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                            </a>
                            <a href="https://wa.me/918207593672" target="_blank" rel="noreferrer" className="hover:text-emerald-600 transition-colors" title="WhatsApp">
                                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.458L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.863-9.864.001-2.636-1.023-5.11-2.884-6.974C16.593 1.898 14.116.87 11.48.87c-5.437 0-9.863 4.421-9.865 9.867 0 1.704.457 3.364 1.324 4.803L1.89 21.05l5.757-1.509c.001-.001.002-.001.003-.001z"/></svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Header / Navigation - Sticky Glassmorphic Header */}
            <header className={`sticky top-0 left-0 right-0 z-40 transition-all duration-300 bg-white/95 backdrop-blur-md border-b border-zinc-200/80 ${scrolled ? 'py-2.5 shadow-sm' : 'py-3'
                }`}>
                <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-12 flex justify-between items-center">

                    {/* Developer Code Brand Logo */}
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
                        className="font-mono text-xs font-bold tracking-tight border border-zinc-200 px-2.5 sm:px-3 py-1.5 rounded-lg bg-white shadow-xs hover:border-indigo-500/50 hover:bg-indigo-50/30 transition-all duration-200 inline-flex items-center gap-1.5"
                    >
                        <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
                        <span className="text-indigo-600 font-extrabold">&lt;</span>
                        <span className="text-zinc-900 font-bold">techmanish.in</span>
                        <span className="text-indigo-600 font-extrabold">/&gt;</span>
                    </a>

                    {/* Desktop Nav & System Status */}
                    <div className="hidden md:flex items-center gap-3">
                        <nav className="flex items-center gap-0.5">
                            {navItems.map((item, idx) => (
                                <a
                                    key={idx}
                                    href={item.href}
                                    onClick={(e) => handleNavClick(e, item.href)}
                                    className="px-2.5 py-1.5 text-xs font-semibold text-zinc-600 hover:text-indigo-600 hover:bg-zinc-100 rounded-md transition-colors duration-200 font-sans"
                                >
                                    {item.label}
                                </a>
                            ))}
                        </nav>

                        {/* Comestro-Inspired CTA Button */}
                        <a
                            href="#contact"
                            onClick={(e) => handleNavClick(e, '#contact')}
                            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm shadow-indigo-600/20 active:scale-95 transition-all duration-200 cursor-pointer ml-1"
                        >
                            <span>Let's Talk</span>
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </a>
                    </div>

                    {/* Mobile Hamburger Button */}
                    <button
                        className="md:hidden text-zinc-700 p-2 border border-zinc-200 bg-white/90 backdrop-blur-sm rounded-lg shadow-xs hover:bg-zinc-50 active:scale-95 transition-all"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                            {mobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            )}
                        </svg>
                    </button>
                </div>

            </header>

            {/* Mobile Menu Overlay Drawer */}
            {mobileMenuOpen && (
                <div className="md:hidden fixed inset-0 bg-white z-[100] flex flex-col justify-between p-6 text-zinc-900">
                    {/* Drawer Header */}
                    <div className="flex items-center justify-between border-b border-zinc-200 pb-4">
                        <div className="font-mono text-xs font-bold tracking-tight inline-flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-ping"></span>
                            <span className="text-indigo-600 font-extrabold">&lt;</span>
                            <span className="text-zinc-900 font-bold">techmanish.in</span>
                            <span className="text-indigo-600 font-extrabold">/&gt;</span>
                        </div>
                        <button
                            className="text-zinc-500 p-2 border border-zinc-200 bg-zinc-50 rounded-lg shadow-xs hover:text-zinc-900 cursor-pointer"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Navigation Links */}
                    <div className="flex flex-col gap-3 font-sans text-center my-auto py-6">
                        {navItems.map((item, idx) => (
                            <a
                                key={idx}
                                href={item.href}
                                onClick={(e) => {
                                    setMobileMenuOpen(false);
                                    handleNavClick(e, item.href);
                                }}
                                className="text-zinc-800 text-lg font-bold hover:text-indigo-600 py-1.5 border-b border-zinc-100 transition-colors"
                            >
                                {item.label}
                            </a>
                        ))}
                        <a
                            href="#contact"
                            onClick={(e) => {
                                setMobileMenuOpen(false);
                                handleNavClick(e, '#contact');
                            }}
                            className="mt-3 py-2.5 px-4 rounded-lg bg-indigo-600 text-white font-bold text-sm shadow-md"
                        >
                            Start a Project / Hire Me
                        </a>
                    </div>

                    {/* Mobile Social Links & Footer Status */}
                    <div className="border-t border-zinc-200 pt-5 space-y-4 text-center">
                        <div className="flex items-center justify-center gap-3">
                            {socialLinks && socialLinks.map((link, idx) => (
                                <a
                                    key={idx}
                                    href={link.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center justify-center w-9 h-9 border border-zinc-200 bg-zinc-50 rounded-full text-zinc-500 hover:text-indigo-600 hover:border-indigo-300 transition-all"
                                    title={link.platform}
                                >
                                    {renderIcon(link.icon || link.platform)}
                                </a>
                            ))}
                        </div>
                        <p className="font-mono text-[11px] text-zinc-400">
                            $ status: 200 OK • Full Stack Software Engineer
                        </p>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <main className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
                {children}
            </main>

            {/* Comestro-Inspired Structured 4-Column Footer (Indigo Theme) */}
            <footer className="py-12 border-t border-zinc-200 mt-12 bg-white/90 backdrop-blur-md relative z-10 font-sans">
                <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-zinc-200">
                        {/* Col 1: Brand & About */}
                        <div className="space-y-3">
                            <div className="font-mono text-xs font-bold tracking-tight border border-zinc-200 px-3 py-1.5 rounded-lg bg-zinc-50 inline-flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
                                <span className="text-indigo-600 font-extrabold">&lt;</span>
                                <span className="text-zinc-900 font-bold">techmanish.in</span>
                                <span className="text-indigo-600 font-extrabold">/&gt;</span>
                            </div>
                            <p className="text-xs text-zinc-600 leading-relaxed">
                                Full-Stack Software Engineer specializing in Laravel 11, React 19, Inertia.js, and MySQL. Building scalable SaaS applications, e-commerce marketplaces, and production web platforms.
                            </p>
                            <div className="flex items-center gap-2 pt-2">
                                {socialLinks && socialLinks.map((link, idx) => (
                                    <a
                                        key={idx}
                                        href={link.url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex items-center justify-center w-8 h-8 border border-zinc-200 bg-zinc-50 rounded-lg text-zinc-500 hover:text-indigo-600 hover:border-indigo-300 transition-all shadow-xs"
                                        title={link.platform}
                                    >
                                        {renderIcon(link.icon || link.platform)}
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Col 2: Engineering Expertise */}
                        <div>
                            <h4 className="font-display text-xs font-bold text-zinc-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600"></span>
                                Core Capabilities
                            </h4>
                            <ul className="space-y-2 text-xs text-zinc-600">
                                <li className="hover:text-indigo-600 transition-colors flex items-center gap-1.5">
                                    <span className="text-indigo-400">›</span> SaaS Architecture (GymMitra)
                                </li>
                                <li className="hover:text-indigo-600 transition-colors flex items-center gap-1.5">
                                    <span className="text-indigo-400">›</span> Laravel 11 Backend & APIs
                                </li>
                                <li className="hover:text-indigo-600 transition-colors flex items-center gap-1.5">
                                    <span className="text-indigo-400">›</span> React 19 & Inertia.js SPAs
                                </li>
                                <li className="hover:text-indigo-600 transition-colors flex items-center gap-1.5">
                                    <span className="text-indigo-400">›</span> MySQL Schema & Indexing
                                </li>
                                <li className="hover:text-indigo-600 transition-colors flex items-center gap-1.5">
                                    <span className="text-indigo-400">›</span> Multi-Vendor Marketplaces
                                </li>
                                <li className="hover:text-indigo-600 transition-colors flex items-center gap-1.5">
                                    <span className="text-indigo-400">›</span> Authentication & RBAC
                                </li>
                            </ul>
                        </div>

                        {/* Col 3: Quick Navigation */}
                        <div>
                            <h4 className="font-display text-xs font-bold text-zinc-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600"></span>
                                Quick Links
                            </h4>
                            <ul className="space-y-2 text-xs text-zinc-600">
                                {navItems.map((item, idx) => (
                                    <li key={idx}>
                                        <a
                                            href={item.href}
                                            onClick={(e) => handleNavClick(e, item.href)}
                                            className="hover:text-indigo-600 hover:translate-x-1 inline-flex items-center gap-1.5 transition-all"
                                        >
                                            <span className="text-zinc-400">›</span>
                                            <span>{item.label}</span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Col 4: Contact & Availability */}
                        <div>
                            <h4 className="font-display text-xs font-bold text-zinc-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600"></span>
                                Get In Touch
                            </h4>
                            <div className="space-y-2 text-xs text-zinc-600">
                                <p className="flex items-start gap-2">
                                    <span className="text-indigo-600 font-semibold shrink-0">HQ:</span>
                                    <span>Jaipur, RJ & Purnea, BR, India</span>
                                </p>
                                <p className="flex items-center gap-2">
                                    <span className="text-indigo-600 font-semibold shrink-0">Email:</span>
                                    <a href={`mailto:${email}`} className="hover:text-indigo-600 transition-colors truncate">{email}</a>
                                </p>
                                <p className="flex items-center gap-2">
                                    <span className="text-indigo-600 font-semibold shrink-0">Phone:</span>
                                    <a href="tel:+918207593672" className="hover:text-indigo-600 transition-colors">+91 8207593672</a>
                                </p>
                                <div className="mt-3 p-3 rounded-lg bg-indigo-50/60 border border-indigo-100 text-[11px] text-indigo-950">
                                    <p className="font-semibold flex items-center gap-1.5 text-indigo-900">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
                                        Open for Roles
                                    </p>
                                    <p className="text-zinc-600 mt-1">Available for full-stack engineering roles, SaaS MVPs, and production web platforms.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-500 text-center sm:text-left">
                        <p>© {new Date().getFullYear()} {name} (TechManish). All rights reserved.</p>
                        <p className="font-mono text-[11px] text-zinc-400">
                            Engineered with React 19 + Laravel 11 Patterns • Built for Production
                        </p>
                    </div>
                </div>
            </footer>

            {/* Back to Top */}
            {showBackToTop && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-6 right-6 z-40 w-10 h-10 rounded-full bg-white border border-zinc-200 text-zinc-500 flex items-center justify-center hover:bg-zinc-100 hover:text-zinc-900 transition-all duration-300 shadow-sm lg:hidden"
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

export { IconGitHub, IconLinkedIn, IconMail, IconExternal, IconFolder, IconFacebook, IconInstagram, IconWhatsApp };

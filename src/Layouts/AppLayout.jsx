import React, { useState, useEffect } from 'react';

// ===== Icon Components =====
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
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
);

const IconExternal = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
    </svg>
);

const IconFolder = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
    </svg>
);

const IconSun = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="5" />
        <path strokeLinecap="round" d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
);

const IconMoon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
    </svg>
);

const IconArrowRight = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
);

const renderIcon = (iconName) => {
    switch (iconName?.toLowerCase()) {
        case 'github': return <IconGitHub />;
        case 'linkedin': return <IconLinkedIn />;
        case 'facebook': return <IconFacebook />;
        case 'instagram': return <IconInstagram />;
        case 'whatsapp': return <IconWhatsApp />;
        case 'mail': case 'email': return <IconMail />;
        default: return <IconExternal />;
    }
};

// ===== Theme Management =====
function useTheme() {
    const [theme, setTheme] = useState(() => {
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem('theme');
            if (stored) return stored;
            return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }
        return 'light';
    });

    useEffect(() => {
        const root = document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

    return { theme, toggleTheme };
}

// ===== Main Layout =====
export default function AppLayout({ children, settings, socialLinks, navigate }) {
    const [showBackToTop, setShowBackToTop] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { theme, toggleTheme } = useTheme();
    const name = settings?.name || 'Manish Kumar';
    const email = settings?.email || 'manish966128@gmail.com';

    useEffect(() => {
        const handleScroll = () => {
            setShowBackToTop(window.scrollY > 400);
            setScrolled(window.scrollY > 20);
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
            { threshold: 0.08 }
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
        { label: 'Work', href: '#projects' },
        { label: 'About', href: '#about' },
        { label: 'Experience', href: '#experience' },
        { label: 'Writing', href: '/blogs', isPage: true },
    ];

    return (
        <div className="min-h-screen relative" style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}>

            {/* ===== Header ===== */}
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                    scrolled
                        ? 'py-3 shadow-sm'
                        : 'py-4'
                }`}
                style={{
                    backgroundColor: scrolled
                        ? (theme === 'dark' ? 'rgba(11, 13, 16, 0.85)' : 'rgba(255, 253, 247, 0.85)')
                        : 'transparent',
                    backdropFilter: scrolled ? 'blur(12px)' : 'none',
                    borderBottom: scrolled ? '1px solid var(--color-border)' : '1px solid transparent',
                }}
            >
                <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 flex justify-between items-center">

                    {/* Logo - TM Monogram */}
                    <a
                        href="/"
                        onClick={(e) => {
                            e.preventDefault();
                            if (window.location.pathname === '/') scrollToTop();
                            else if (navigate) navigate('/');
                            else window.location.href = '/';
                        }}
                        className="flex items-center gap-3 group"
                    >
                        <div
                            className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-display font-bold text-sm transition-transform duration-200 group-hover:scale-105"
                            style={{ backgroundColor: 'var(--color-accent)' }}
                        >
                            TM
                        </div>
                        <div className="hidden sm:block">
                            <p className="text-sm font-semibold leading-none" style={{ color: 'var(--color-text)' }}>
                                Manish Kumar
                            </p>
                            <p className="text-[11px] mt-0.5 font-medium" style={{ color: 'var(--color-text-muted)' }}>
                                Full-Stack Engineer
                            </p>
                        </div>
                    </a>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-1">
                        <nav className="flex items-center gap-0.5">
                            {navItems.map((item, idx) => (
                                <a
                                    key={idx}
                                    href={item.isPage ? item.href : item.href}
                                    onClick={(e) => {
                                        if (item.isPage) {
                                            e.preventDefault();
                                            if (navigate) navigate(item.href);
                                        } else {
                                            handleNavClick(e, item.href);
                                        }
                                    }}
                                    className="px-3.5 py-2 text-[13px] font-medium rounded-lg transition-colors duration-200"
                                    style={{ color: 'var(--color-text-secondary)' }}
                                    onMouseEnter={(e) => e.target.style.color = 'var(--color-text)'}
                                    onMouseLeave={(e) => e.target.style.color = 'var(--color-text-secondary)'}
                                >
                                    {item.label}
                                </a>
                            ))}
                        </nav>

                        <div className="w-px h-5 mx-2" style={{ backgroundColor: 'var(--color-border)' }}></div>

                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-lg transition-colors duration-200 cursor-pointer"
                            style={{ color: 'var(--color-text-secondary)' }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-accent-muted)'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                            aria-label="Toggle theme"
                        >
                            {theme === 'dark' ? <IconSun /> : <IconMoon />}
                        </button>

                        {/* Resume Button */}
                        <a
                            href="/downloads/resume.pdf"
                            target="_blank"
                            rel="noreferrer"
                            className="ml-1 px-4 py-2 text-[13px] font-semibold rounded-lg text-white transition-all duration-200"
                            style={{ backgroundColor: 'var(--color-accent)' }}
                            onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--color-accent-hover)'}
                            onMouseLeave={(e) => e.target.style.backgroundColor = 'var(--color-accent)'}
                        >
                            Resume
                        </a>
                    </div>

                    {/* Mobile Controls */}
                    <div className="flex md:hidden items-center gap-2">
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-lg cursor-pointer"
                            style={{ color: 'var(--color-text-secondary)' }}
                            aria-label="Toggle theme"
                        >
                            {theme === 'dark' ? <IconSun /> : <IconMoon />}
                        </button>
                        <button
                            className="p-2 rounded-lg cursor-pointer"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label="Toggle menu"
                            style={{ color: 'var(--color-text)' }}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                {mobileMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </header>

            {/* ===== Mobile Menu ===== */}
            {mobileMenuOpen && (
                <div
                    className="md:hidden fixed inset-0 z-[100] flex flex-col"
                    style={{ backgroundColor: 'var(--color-bg)' }}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: '1px solid var(--color-border)' }}>
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-display font-bold text-sm"
                                 style={{ backgroundColor: 'var(--color-accent)' }}>
                                TM
                            </div>
                            <span className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>Manish Kumar</span>
                        </div>
                        <button
                            className="p-2 rounded-lg cursor-pointer"
                            onClick={() => setMobileMenuOpen(false)}
                            style={{ color: 'var(--color-text-secondary)' }}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Nav Links */}
                    <div className="flex flex-col flex-1 justify-center px-8 gap-1">
                        {navItems.map((item, idx) => (
                            <a
                                key={idx}
                                href={item.isPage ? item.href : item.href}
                                onClick={(e) => {
                                    setMobileMenuOpen(false);
                                    if (item.isPage) {
                                        e.preventDefault();
                                        if (navigate) navigate(item.href);
                                    } else {
                                        handleNavClick(e, item.href);
                                    }
                                }}
                                className="text-2xl font-display font-semibold py-3 transition-colors"
                                style={{ color: 'var(--color-text)' }}
                            >
                                {item.label}
                            </a>
                        ))}
                        <a
                            href="/downloads/resume.pdf"
                            target="_blank"
                            rel="noreferrer"
                            className="text-2xl font-display font-semibold py-3"
                            style={{ color: 'var(--color-accent)' }}
                        >
                            Resume ↗
                        </a>
                    </div>

                    {/* Bottom */}
                    <div className="px-8 py-6" style={{ borderTop: '1px solid var(--color-border)' }}>
                        <div className="flex items-center gap-3 mb-4">
                            {socialLinks && socialLinks.map((link, idx) => (
                                <a
                                    key={idx}
                                    href={link.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="p-2 rounded-lg transition-colors"
                                    style={{ color: 'var(--color-text-secondary)' }}
                                    title={link.platform}
                                >
                                    {renderIcon(link.icon || link.platform)}
                                </a>
                            ))}
                        </div>
                        <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                            {email}
                        </p>
                    </div>
                </div>
            )}

            {/* ===== Main Content ===== */}
            <main className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
                {children}
            </main>

            {/* ===== Footer ===== */}
            <footer className="mt-20" style={{ borderTop: '1px solid var(--color-border)' }}>
                <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 py-16">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
                        {/* Brand */}
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-display font-bold text-sm"
                                     style={{ backgroundColor: 'var(--color-accent)' }}>
                                    TM
                                </div>
                                <div>
                                    <p className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>Manish Kumar</p>
                                    <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Full-Stack Software Engineer</p>
                                </div>
                            </div>
                            <p className="text-sm leading-relaxed max-w-xs" style={{ color: 'var(--color-text-secondary)' }}>
                                Building production-ready SaaS platforms and web applications with Laravel & React.
                            </p>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: 'var(--color-text-muted)' }}>
                                Navigation
                            </p>
                            <div className="flex flex-col gap-2.5">
                                {[
                                    { label: 'Work', href: '#projects' },
                                    { label: 'About', href: '#about' },
                                    { label: 'Experience', href: '#experience' },
                                    { label: 'Writing', href: '/blogs', isPage: true },
                                    { label: 'Resume', href: '/downloads/resume.pdf', isExternal: true },
                                ].map((item, idx) => (
                                    <a
                                        key={idx}
                                        href={item.href}
                                        target={item.isExternal ? '_blank' : undefined}
                                        rel={item.isExternal ? 'noreferrer' : undefined}
                                        onClick={(e) => {
                                            if (item.isExternal) return;
                                            if (item.isPage) {
                                                e.preventDefault();
                                                if (navigate) navigate(item.href);
                                            } else {
                                                handleNavClick(e, item.href);
                                            }
                                        }}
                                        className="text-sm transition-colors duration-200"
                                        style={{ color: 'var(--color-text-secondary)' }}
                                        onMouseEnter={(e) => e.target.style.color = 'var(--color-text)'}
                                        onMouseLeave={(e) => e.target.style.color = 'var(--color-text-secondary)'}
                                    >
                                        {item.label}
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Social / Connect */}
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: 'var(--color-text-muted)' }}>
                                Connect
                            </p>
                            <div className="flex flex-col gap-2.5">
                                {socialLinks && socialLinks.slice(0, 4).map((link, idx) => (
                                    <a
                                        key={idx}
                                        href={link.url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-sm transition-colors duration-200 flex items-center gap-2"
                                        style={{ color: 'var(--color-text-secondary)' }}
                                        onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-text)'}
                                        onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-secondary)'}
                                    >
                                        {link.platform}
                                    </a>
                                ))}
                                <a
                                    href={`mailto:${email}`}
                                    className="text-sm transition-colors duration-200"
                                    style={{ color: 'var(--color-text-secondary)' }}
                                    onMouseEnter={(e) => e.target.style.color = 'var(--color-text)'}
                                    onMouseLeave={(e) => e.target.style.color = 'var(--color-text-secondary)'}
                                >
                                    {email}
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Copyright */}
                    <div className="mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3" style={{ borderTop: '1px solid var(--color-border)' }}>
                        <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                            © {new Date().getFullYear()} {name}. All rights reserved.
                        </p>
                        <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                            Designed & built by {name}
                        </p>
                    </div>
                </div>
            </footer>

            {/* ===== Back to Top ===== */}
            {showBackToTop && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-6 right-6 z-40 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg cursor-pointer"
                    style={{
                        backgroundColor: 'var(--color-surface)',
                        border: '1px solid var(--color-border)',
                        color: 'var(--color-text-secondary)',
                    }}
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

export { IconGitHub, IconLinkedIn, IconMail, IconExternal, IconFolder, IconFacebook, IconInstagram, IconWhatsApp, IconArrowRight };

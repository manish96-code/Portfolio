import React, { useState, useEffect } from 'react';

// Clean minimal SVG Icons
const IconGitHub = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
);

const IconLinkedIn = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
);

const IconFacebook = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
    </svg>
);

const IconInstagram = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
);

const IconWhatsApp = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.458L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.863-9.864.001-2.636-1.023-5.11-2.884-6.974C16.593 1.898 14.116.87 11.48.87c-5.437 0-9.863 4.421-9.865 9.867 0 1.704.457 3.364 1.324 4.803L1.89 21.05l5.757-1.509c.001-.001.002-.001.003-.001z" />
    </svg>
);

const IconMail = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
);

const IconExternal = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
    </svg>
);

const IconFolder = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
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
    const [activeSection, setActiveSection] = useState('top');
    const name = settings?.name || 'Manish Kumar';
    const email = settings?.email || 'manish966128@gmail.com';
    const phone = settings?.phone || '+91 8207593672';

    const fallbackSocials = [
        { platform: 'GitHub', url: 'https://github.com/manish96-code', icon: 'github' },
        { platform: 'LinkedIn', url: 'https://www.linkedin.com/in/manish-kumar-9661link', icon: 'linkedin' },
        { platform: 'Facebook', url: 'https://www.facebook.com/share/1MArsUNxGr/', icon: 'facebook' },
        { platform: 'Instagram', url: 'https://www.instagram.com/manish_kumar_9661?igsh=MTQxdmY2ajJrem9ocw==', icon: 'instagram' },
        { platform: 'WhatsApp', url: 'https://wa.me/918207593672?text=Hello%20Manish%2C%20I%20visited%20your%20portfolio%20and%20wanted%20to%20connect!', icon: 'whatsapp' },
    ];
    const displaySocials = (socialLinks && socialLinks.length > 0) ? socialLinks : fallbackSocials;

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
                        if (entry.target.id) {
                            setActiveSection(entry.target.id);
                        }
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
        if (href.startsWith('/')) {
            if (navigate) {
                navigate(href);
            } else {
                window.location.href = href;
            }
            return;
        }
        const targetId = href.replace('#', '');
        setActiveSection(targetId);

        if (window.location.pathname === '/') {
            if (targetId === 'top') {
                scrollToTop();
                return;
            }
            const element = document.getElementById(targetId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        } else if (navigate) {
            navigate('/');
            setTimeout(() => {
                if (targetId === 'top') {
                    scrollToTop();
                } else {
                    const element = document.getElementById(targetId);
                    if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            }, 100);
        } else {
            window.location.href = '/' + href;
        }
    };

    // Signature colored letter badge nav items inspired by clean modern LMS/SaaS platforms
    const navItems = [
        { label: 'Home', href: '#top', badge: 'H', badgeBg: 'bg-sky-500', id: 'top' },
        { label: 'Projects', href: '#projects', badge: 'P', badgeBg: 'bg-violet-500', id: 'projects' },
        { label: 'Workflow', href: '#workflow', badge: 'W', badgeBg: 'bg-blue-600', id: 'workflow' },
        { label: 'Experience', href: '#about', badge: 'E', badgeBg: 'bg-amber-500', id: 'about' },
        { label: 'Articles', href: '/blogs', badge: 'A', badgeBg: 'bg-rose-500', id: 'blogs' },
        { label: 'Contact', href: '#contact', badge: 'C', badgeBg: 'bg-emerald-500', id: 'contact' },
    ];

    const isItemActive = (item) => {
        if (item.href === '/blogs' && window.location.pathname.startsWith('/blog')) return true;
        if (window.location.pathname === '/' && activeSection === item.id) return true;
        return false;
    };

    return (
        <div id="top" className="min-h-screen bg-white text-slate-900 font-sans antialiased flex flex-col relative">

            {/* Ambient background glows (Isolated clipping) */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-500/[0.03] rounded-full blur-[120px]"></div>
                <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-cyan-500/[0.02] rounded-full blur-[100px]"></div>
                <div className="absolute bottom-10 left-1/3 w-[600px] h-[600px] bg-indigo-500/[0.02] rounded-full blur-[150px]"></div>
            </div>

            {/* Fixed Left Social Bar */}
            <div className="hidden lg:flex fixed bottom-0 left-5 xl:left-8 z-30 flex-col items-center gap-3">
                {displaySocials.filter(l => !['email', 'mail'].includes(l.platform?.toLowerCase())).map((link, idx) => (
                    <a
                        key={idx}
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-center w-9 h-9 border border-slate-200 bg-white/90 backdrop-blur-md rounded-full text-slate-500 hover:text-blue-600 hover:border-blue-300 hover:-translate-y-1 transition-all duration-200 shadow-2xs"
                        title={link.platform}
                        aria-label={link.platform}
                    >
                        {renderIcon(link.icon || link.platform)}
                    </a>
                ))}
                <div className="w-px h-20 bg-gradient-to-t from-transparent to-slate-300"></div>
            </div>

            {/* Fixed Right Email Bar */}
            <div className="hidden lg:flex fixed bottom-0 right-5 xl:right-8 z-30 flex-col items-center gap-4">
                <a
                    href={`mailto:${email}`}
                    className="text-slate-500 hover:text-blue-600 text-xs font-mono tracking-wider hover:-translate-y-1 transition-all duration-200 py-2"
                    style={{ writingMode: 'vertical-rl' }}
                    title={`Email ${email}`}
                >
                    {email}
                </a>
                <div className="w-px h-20 bg-gradient-to-t from-transparent to-slate-300"></div>
            </div>

            {/* Clean Fixed Header (Always Pinned at Top) */}
            <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 bg-white/95 backdrop-blur-md border-b ${scrolled ? 'border-slate-200 shadow-xs py-2.5' : 'border-slate-100 py-3'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-14 xl:px-16 flex justify-between items-center gap-4">

                    {/* Brand Logo (Left) */}
                    <a
                        href="/"
                        onClick={(e) => {
                            e.preventDefault();
                            if (window.location.pathname === '/') {
                                scrollToTop();
                                setActiveSection('top');
                            } else if (navigate) {
                                navigate('/');
                            } else {
                                window.location.href = '/';
                            }
                        }}
                        className="inline-flex items-center gap-2.5 group shrink-0"
                    >
                        <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-violet-600 text-white font-display font-extrabold text-xs flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                            TM
                        </span>
                        <span className="font-display font-bold text-base tracking-tight text-slate-900">
                            Tech<span className="text-blue-600">Manish</span>
                        </span>
                    </a>

                    {/* Center Pill Navigation (Desktop) */}
                    <nav className="hidden lg:flex items-center gap-1">
                        {navItems.map((item, idx) => {
                            const active = isItemActive(item);
                            return (
                                <a
                                    key={idx}
                                    href={item.href}
                                    onClick={(e) => {
                                        if (item.href === '#top' && window.location.pathname === '/') {
                                            e.preventDefault();
                                            scrollToTop();
                                            setActiveSection('top');
                                        } else {
                                            handleNavClick(e, item.href);
                                        }
                                    }}
                                    className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 ${active
                                        ? 'bg-blue-50 text-blue-700 font-semibold border border-blue-200/60 shadow-2xs'
                                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-transparent'
                                        }`}
                                >
                                    <span className={`w-4 h-4 rounded-sm ${item.badgeBg} text-white text-[9px] font-bold flex items-center justify-center shrink-0`}>
                                        {item.badge}
                                    </span>
                                    <span>{item.label}</span>
                                </a>
                            );
                        })}
                    </nav>

                    {/* Right Action Buttons */}
                    <div className="hidden md:flex items-center gap-3 shrink-0">
                        <a
                            href="#contact"
                            onClick={(e) => handleNavClick(e, '#contact')}
                            className="text-xs font-semibold text-slate-600 hover:text-blue-600 px-3 py-1.5 rounded-lg hover:bg-slate-50 transition-colors"
                        >
                            Let&apos;s Talk
                        </a>
                        <a
                            href={settings?.resume_file || '/downloads/resume.pdf'}
                            download
                            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg text-white bg-slate-900 hover:bg-slate-800 shadow-xs active:scale-[0.98] transition-all duration-150"
                        >
                            <span>Download CV</span>
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </a>
                    </div>

                    {/* Mobile Hamburger Button */}
                    <button
                        className="lg:hidden text-slate-700 p-2 border border-slate-200 bg-white rounded-lg hover:bg-slate-50 transition-colors"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle menu"
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
            </header>

            {/* Mobile Menu Overlay Drawer */}
            {mobileMenuOpen && (
                <div className="lg:hidden fixed inset-0 bg-white z-50 flex flex-col justify-between p-6 text-slate-900">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                        <div className="inline-flex items-center gap-2.5">
                            <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-violet-600 text-white font-display font-extrabold text-xs flex items-center justify-center">
                                TM
                            </span>
                            <span className="font-display font-bold text-base text-slate-900">
                                Tech<span className="text-blue-600">Manish</span>
                            </span>
                        </div>
                        <button
                            className="text-slate-500 p-2 border border-slate-200 bg-slate-50 rounded-lg hover:text-slate-900"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div className="flex flex-col gap-2 my-auto py-6">
                        {navItems.map((item, idx) => (
                            <a
                                key={idx}
                                href={item.href}
                                onClick={(e) => {
                                    setMobileMenuOpen(false);
                                    if (item.href === '#top' && window.location.pathname === '/') {
                                        e.preventDefault();
                                        scrollToTop();
                                    } else {
                                        handleNavClick(e, item.href);
                                    }
                                }}
                                className="flex items-center gap-3 text-slate-800 text-base font-semibold hover:bg-slate-50 p-3 rounded-xl transition-colors"
                            >
                                <span className={`w-6 h-6 rounded-md ${item.badgeBg} text-white text-xs font-bold flex items-center justify-center`}>
                                    {item.badge}
                                </span>
                                <span>{item.label}</span>
                            </a>
                        ))}
                        <div className="pt-4 mt-2 border-t border-slate-100 flex flex-col gap-2.5">
                            <a
                                href={settings?.resume_file || '/downloads/resume.pdf'}
                                download
                                className="py-3 px-4 rounded-xl bg-slate-900 text-white font-semibold text-sm text-center shadow-xs"
                            >
                                Download CV →
                            </a>
                            <a
                                href="#contact"
                                onClick={(e) => {
                                    setMobileMenuOpen(false);
                                    handleNavClick(e, '#contact');
                                }}
                                className="py-2.5 px-4 rounded-xl border border-slate-200 text-slate-700 font-semibold text-sm text-center hover:bg-slate-50 transition-colors"
                            >
                                Let&apos;s Connect →
                            </a>
                        </div>
                    </div>

                    <div className="border-t border-slate-100 pt-4 text-center">
                        <div className="flex items-center justify-center gap-2.5 mb-3">
                            {socialLinks && socialLinks.slice(0, 5).map((link, idx) => (
                                <a
                                    key={idx}
                                    href={link.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center justify-center w-9 h-9 border border-slate-200 bg-slate-50 rounded-lg text-slate-500 hover:text-slate-900 transition-colors"
                                    title={link.platform}
                                >
                                    {renderIcon(link.icon || link.platform)}
                                </a>
                            ))}
                        </div>
                        <p className="text-xs text-slate-400">
                            Purnea, Bihar, India • Full-Stack Software Engineer
                        </p>
                    </div>
                </div>
            )}

            {/* Main Content with top padding offset for Fixed Header */}
            <main className="flex-1 w-full pt-16 sm:pt-[68px]">
                {children}
            </main>

            {/* Clean 4-Column Standard Footer */}
            <footer className="bg-slate-50/80 border-t border-slate-200 pt-12 pb-8 font-sans">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-slate-200/80">
                        {/* Col 1: Brand */}
                        <div className="space-y-4">
                            <div className="inline-flex items-center gap-2.5">
                                <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-violet-600 text-white font-display font-extrabold text-xs flex items-center justify-center">
                                    TM
                                </span>
                                <span className="font-display font-bold text-base text-slate-900">
                                    Tech<span className="text-blue-600">Manish</span>
                                </span>
                            </div>
                            <p className="text-xs text-slate-500 leading-relaxed max-w-xs">
                                Full-Stack Software Engineer building production Laravel, React, and Inertia.js web products from Purnea, Bihar.
                            </p>
                            <div className="flex items-center gap-2">
                                {socialLinks && socialLinks.slice(0, 5).map((link, idx) => (
                                    <a
                                        key={idx}
                                        href={link.url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex items-center justify-center w-8 h-8 border border-slate-200 bg-white rounded-lg text-slate-500 hover:text-slate-900 hover:border-slate-300 transition-colors"
                                        title={link.platform}
                                    >
                                        {renderIcon(link.icon || link.platform)}
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Col 2: Contact & Location */}
                        <div>
                            <h4 className="text-xs font-bold text-slate-900 mb-3.5">Contact & Location</h4>
                            <ul className="space-y-2.5 text-xs text-slate-500">
                                <li className="flex items-center gap-2">
                                    <svg className="w-3.5 h-3.5 text-slate-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                    <a href={`tel:${phone.replace(/\s+/g, '')}`} className="hover:text-slate-900 transition-colors">{phone}</a>
                                </li>
                                <li className="flex items-center gap-2">
                                    <svg className="w-3.5 h-3.5 text-slate-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    <a href={`mailto:${email}`} className="hover:text-slate-900 transition-colors truncate">{email}</a>
                                </li>
                                <li className="flex items-start gap-2">
                                    <svg className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <span>Purnea, Bihar, India</span>
                                </li>
                            </ul>
                        </div>

                        {/* Col 3: Explore */}
                        <div>
                            <h4 className="text-xs font-bold text-slate-900 mb-3.5">Explore</h4>
                            <ul className="space-y-2.5 text-xs text-slate-500">
                                <li><a href="#projects" onClick={(e) => handleNavClick(e, '#projects')} className="hover:text-slate-900 transition-colors">Selected Projects</a></li>
                                <li><a href="#workflow" onClick={(e) => handleNavClick(e, '#workflow')} className="hover:text-slate-900 transition-colors">Engineering Workflow</a></li>
                                <li><a href="#about" onClick={(e) => handleNavClick(e, '#about')} className="hover:text-slate-900 transition-colors">Experience & Journey</a></li>
                                <li><a href="#skills" onClick={(e) => handleNavClick(e, '#skills')} className="hover:text-slate-900 transition-colors">Technical Stack</a></li>
                                <li><a href="/blogs" onClick={(e) => handleNavClick(e, '/blogs')} className="hover:text-slate-900 transition-colors">Articles & Blog</a></li>
                            </ul>
                        </div>

                        {/* Col 4: Featured Builds */}
                        <div>
                            <h4 className="text-xs font-bold text-slate-900 mb-3.5">Featured Builds</h4>
                            <ul className="space-y-2.5 text-xs text-slate-500">
                                <li><a href="/project/learn-syntax" onClick={(e) => handleNavClick(e, '/project/learn-syntax')} className="hover:text-slate-900 transition-colors font-medium text-slate-800">Learn Syntax LMS</a></li>
                                <li><a href="/project/ciplon" onClick={(e) => handleNavClick(e, '/project/ciplon')} className="hover:text-slate-900 transition-colors">Ciplon Pharma ERP</a></li>
                                <li><a href="/project/gymmitra" onClick={(e) => handleNavClick(e, '/project/gymmitra')} className="hover:text-slate-900 transition-colors">GymMitra SaaS</a></li>
                                <li><a href="/project/kitabi-adda" onClick={(e) => handleNavClick(e, '/project/kitabi-adda')} className="hover:text-slate-900 transition-colors">KitabiAdda Marketplace</a></li>
                                <li><a href="/project/linkup" onClick={(e) => handleNavClick(e, '/project/linkup')} className="hover:text-slate-900 transition-colors">LinkUp Social Network</a></li>
                                <li><a href="#contact" onClick={(e) => handleNavClick(e, '#contact')} className="hover:text-slate-900 transition-colors">Get in Touch</a></li>
                            </ul>
                        </div>
                    </div>

                    {/* Bottom Strip */}
                    <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
                        <p>© {new Date().getFullYear()} {name}. All rights reserved.</p>
                        <div className="flex items-center gap-4">
                            <a href="#about" onClick={(e) => handleNavClick(e, '#about')} className="hover:text-slate-700 transition-colors">About</a>
                            <a href="#projects" onClick={(e) => handleNavClick(e, '#projects')} className="hover:text-slate-700 transition-colors">Projects</a>
                            <a href={settings?.resume_file || '/downloads/resume.pdf'} download className="hover:text-slate-700 transition-colors">Resume</a>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Clean Back to Top */}
            {showBackToTop && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-6 right-6 lg:right-20 z-40 w-10 h-10 rounded-full bg-white border border-slate-200 text-slate-600 flex items-center justify-center hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all duration-200 shadow-md cursor-pointer"
                    title="Back to Top"
                    aria-label="Back to Top"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                    </svg>
                </button>
            )}
        </div>
    );
}

export { IconGitHub, IconLinkedIn, IconMail, IconExternal, IconFolder, IconFacebook, IconInstagram, IconWhatsApp };

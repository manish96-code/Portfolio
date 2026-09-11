import React, { useEffect } from 'react';
import AppLayout, { IconGitHub, IconExternal, IconArrowRight } from '../../Layouts/AppLayout';
import SEO from '../../Components/SEO';
import { getProjectSchema } from '../../utils/seoSchemas';

function SimpleMarkdown({ content }) {
    if (!content) return null;

    const lines = content.split('\n');
    return (
        <div className="space-y-4 leading-relaxed text-sm sm:text-base font-sans" style={{ color: 'var(--color-text-secondary)' }}>
            {lines.map((line, idx) => {
                if (line.startsWith('# ')) {
                    return (
                        <h1 key={idx} className="text-2xl sm:text-3xl font-display font-bold mt-8 mb-4 pb-2 border-b"
                            style={{ color: 'var(--color-text)', borderColor: 'var(--color-border)' }}
                        >
                            {line.replace('# ', '')}
                        </h1>
                    );
                }
                if (line.startsWith('## ')) {
                    return (
                        <h2 key={idx} className="text-xl sm:text-2xl font-display font-bold mt-8 mb-3 pb-1.5 border-b"
                            style={{ color: 'var(--color-text)', borderColor: 'var(--color-border)' }}
                        >
                            {line.replace('## ', '')}
                        </h2>
                    );
                }
                if (line.startsWith('### ')) {
                    return (
                        <h3 key={idx} className="text-base sm:text-lg font-display font-semibold mt-6 mb-2"
                            style={{ color: 'var(--color-accent)' }}
                        >
                            {line.replace('### ', '')}
                        </h3>
                    );
                }
                if (line.startsWith('---')) {
                    return <hr key={idx} className="my-6" style={{ borderColor: 'var(--color-border)' }} />;
                }
                if (line.startsWith('- ') || line.startsWith('  - ')) {
                    const isIndent = line.startsWith('  - ');
                    const rawText = line.replace(/^(  - |- )/, '');
                    const parts = rawText.split(/(`[^`]+`|\*\*.*?\*\*)/g);
                    return (
                        <li key={idx} className={`list-none ${isIndent ? 'ml-6' : 'ml-1'} mt-1.5 flex items-start gap-2.5`}>
                            <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: 'var(--color-accent)' }} />
                            <span>
                                {parts.map((part, pIdx) => {
                                    if (part.startsWith('**') && part.endsWith('**')) {
                                        return <strong key={pIdx} className="font-semibold" style={{ color: 'var(--color-text)' }}>{part.slice(2, -2)}</strong>;
                                    }
                                    if (part.startsWith('`') && part.endsWith('`')) {
                                        return (
                                            <code key={pIdx} className="px-1.5 py-0.5 rounded font-mono text-xs font-semibold"
                                                style={{
                                                    backgroundColor: 'var(--color-badge-bg)',
                                                    color: 'var(--color-accent)',
                                                    border: '1px solid var(--color-border)'
                                                }}
                                            >
                                                {part.slice(1, -1)}
                                            </code>
                                        );
                                    }
                                    return part;
                                })}
                            </span>
                        </li>
                    );
                }
                if (/^\d+\.\s/.test(line)) {
                    const rawText = line.replace(/^\d+\.\s/, '');
                    const parts = rawText.split(/(`[^`]+`|\*\*.*?\*\*)/g);
                    return (
                        <div key={idx} className="ml-1 mt-2 flex items-start gap-2.5">
                            <span className="font-bold text-xs mt-0.5" style={{ color: 'var(--color-accent)' }}>
                                {line.match(/^\d+/)?.[0]}.
                            </span>
                            <span>
                                {parts.map((part, pIdx) => {
                                    if (part.startsWith('**') && part.endsWith('**')) {
                                        return <strong key={pIdx} className="font-semibold" style={{ color: 'var(--color-text)' }}>{part.slice(2, -2)}</strong>;
                                    }
                                    if (part.startsWith('`') && part.endsWith('`')) {
                                        return (
                                            <code key={pIdx} className="px-1.5 py-0.5 rounded font-mono text-xs font-semibold"
                                                style={{
                                                    backgroundColor: 'var(--color-badge-bg)',
                                                    color: 'var(--color-accent)',
                                                    border: '1px solid var(--color-border)'
                                                }}
                                            >
                                                {part.slice(1, -1)}
                                            </code>
                                        );
                                    }
                                    return part;
                                })}
                            </span>
                        </div>
                    );
                }
                if (line.startsWith('```')) {
                    return null;
                }
                if (line.trim() === '') {
                    return <div key={idx} className="h-2"></div>;
                }

                const parts = line.split(/(`[^`]+`|\*\*.*?\*\*)/g);
                return (
                    <p key={idx} className="text-sm sm:text-base">
                        {parts.map((part, pIdx) => {
                            if (part.startsWith('**') && part.endsWith('**')) {
                                return <strong key={pIdx} className="font-semibold" style={{ color: 'var(--color-text)' }}>{part.slice(2, -2)}</strong>;
                            }
                            if (part.startsWith('`') && part.endsWith('`')) {
                                return (
                                    <code key={pIdx} className="px-1.5 py-0.5 rounded font-mono text-xs font-semibold"
                                        style={{
                                            backgroundColor: 'var(--color-badge-bg)',
                                            color: 'var(--color-accent)',
                                            border: '1px solid var(--color-border)'
                                        }}
                                    >
                                        {part.slice(1, -1)}
                                    </code>
                                );
                            }
                            return part;
                        })}
                    </p>
                );
            })}
        </div>
    );
}

export default function ProjectDetails({ project, socialLinks, settings, navigate }) {
    useEffect(() => {
        if (project) {
            document.title = `${project.title} — Technical Case Study | Manish Kumar`;
        }
    }, [project]);

    if (!project) return null;

    const tags = project.technologies || [];
    const projectSchema = getProjectSchema(project, settings);

    const handleBack = (e) => {
        e.preventDefault();
        if (navigate) {
            navigate('/');
        } else {
            window.location.href = '/';
        }
    };

    return (
        <AppLayout settings={settings} socialLinks={socialLinks} navigate={navigate}>
            <SEO
                title={`${project.title} — Technical Case Study | Manish Kumar`}
                description={project.description}
                canonicalUrl={`/project/${project.slug}`}
                ogImage={project.thumbnail}
                schemaData={projectSchema}
            />

            <div className="pt-28 pb-20 md:pt-36 md:pb-28">
                <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
                    
                    {/* Breadcrumbs & Navigation */}
                    <div className="flex items-center gap-2 text-xs font-medium mb-8" style={{ color: 'var(--color-text-muted)' }}>
                        <a
                            href="/"
                            onClick={handleBack}
                            className="transition-colors hover:text-indigo-500 flex items-center gap-1"
                        >
                            <span>←</span>
                            <span>Portfolio</span>
                        </a>
                        <span>/</span>
                        <span>Projects</span>
                        <span>/</span>
                        <span style={{ color: 'var(--color-text)' }}>{project.title}</span>
                    </div>

                    {/* Case Study Header */}
                    <div className="mb-10">
                        <div className="flex flex-wrap items-center gap-2 mb-4">
                            <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold uppercase tracking-wider"
                                style={{
                                    backgroundColor: 'rgba(99, 102, 241, 0.1)',
                                    color: 'var(--color-accent)',
                                    border: '1px solid rgba(99, 102, 241, 0.25)'
                                }}
                            >
                                Case Study
                            </span>
                            <span className="px-2.5 py-1 rounded-md text-xs font-medium"
                                style={{
                                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                                    color: '#10B981',
                                    border: '1px solid rgba(16, 185, 129, 0.2)'
                                }}
                            >
                                {project.status || 'Completed'}
                            </span>
                        </div>

                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold tracking-tight mb-4"
                            style={{ color: 'var(--color-text)' }}
                        >
                            {project.title}
                        </h1>

                        <p className="text-base sm:text-lg max-w-3xl leading-relaxed"
                            style={{ color: 'var(--color-text-secondary)' }}
                        >
                            {project.description}
                        </p>
                    </div>

                    {/* Screenshot Banner if available */}
                    {project.thumbnail && (
                        <div className="mb-12 rounded-2xl overflow-hidden shadow-xl"
                            style={{
                                backgroundColor: '#0B0D10',
                                border: '1px solid var(--color-border)'
                            }}
                        >
                            <img
                                src={project.thumbnail}
                                alt={`${project.title} interface preview`}
                                className="w-full h-auto max-h-[500px] object-cover object-top"
                            />
                        </div>
                    )}

                    {/* Main Layout: Case Study Body + Sidebar */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                        
                        {/* Markdown / Body Content */}
                        <div className="lg:col-span-8">
                            <div className="rounded-2xl p-6 sm:p-10 shadow-sm"
                                style={{
                                    backgroundColor: 'var(--color-surface)',
                                    border: '1px solid var(--color-border)'
                                }}
                            >
                                <SimpleMarkdown content={project.content} />
                            </div>
                        </div>

                        {/* Metadata Sidebar */}
                        <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
                            
                            {/* Project Meta Card */}
                            <div className="rounded-2xl p-6 shadow-sm"
                                style={{
                                    backgroundColor: 'var(--color-surface)',
                                    border: '1px solid var(--color-border)'
                                }}
                            >
                                <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 pb-3 border-b"
                                    style={{
                                        color: 'var(--color-text)',
                                        borderColor: 'var(--color-border)'
                                    }}
                                >
                                    Project Details
                                </h3>

                                <div className="space-y-3.5 text-xs">
                                    <div className="flex justify-between items-center py-1 border-b" style={{ borderColor: 'var(--color-border)' }}>
                                        <span style={{ color: 'var(--color-text-muted)' }}>Status</span>
                                        <span className="font-semibold text-emerald-500">
                                            {project.status || 'Completed'}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center py-1 border-b" style={{ borderColor: 'var(--color-border)' }}>
                                        <span style={{ color: 'var(--color-text-muted)' }}>Architecture</span>
                                        <span className="font-medium" style={{ color: 'var(--color-text)' }}>
                                            Full-Stack (Laravel + React)
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center py-1 border-b" style={{ borderColor: 'var(--color-border)' }}>
                                        <span style={{ color: 'var(--color-text-muted)' }}>Database</span>
                                        <span className="font-medium" style={{ color: 'var(--color-text)' }}>
                                            MySQL Relational
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center py-1" style={{ borderColor: 'var(--color-border)' }}>
                                        <span style={{ color: 'var(--color-text-muted)' }}>Engineer</span>
                                        <span className="font-medium" style={{ color: 'var(--color-text)' }}>
                                            {settings?.name || 'Manish Kumar'}
                                        </span>
                                    </div>
                                </div>

                                {/* Technologies */}
                                <div className="mt-6 pt-4 border-t" style={{ borderColor: 'var(--color-border)' }}>
                                    <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--color-text-muted)' }}>
                                        Technologies
                                    </p>
                                    <div className="flex flex-wrap gap-1.5">
                                        {tags.map((tech) => (
                                            <span
                                                key={tech}
                                                className="px-2 py-0.5 rounded text-[11px] font-medium"
                                                style={{
                                                    backgroundColor: 'var(--color-badge-bg)',
                                                    color: 'var(--color-text)',
                                                    border: '1px solid var(--color-border)'
                                                }}
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* External Links */}
                                <div className="mt-6 pt-5 space-y-2.5 border-t" style={{ borderColor: 'var(--color-border)' }}>
                                    {project.live_url && (
                                        <a
                                            href={project.live_url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="btn-primary w-full justify-center text-xs py-2.5"
                                        >
                                            <IconExternal />
                                            <span>Open Live Demo</span>
                                        </a>
                                    )}
                                    {project.github_url && (
                                        <a
                                            href={project.github_url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="btn-secondary w-full justify-center text-xs py-2.5"
                                        >
                                            <IconGitHub />
                                            <span>Inspect Repository</span>
                                        </a>
                                    )}
                                </div>
                            </div>

                            {/* Back to Work CTA Card */}
                            <div className="p-6 rounded-2xl text-center"
                                style={{
                                    backgroundColor: 'var(--color-bg)',
                                    border: '1px solid var(--color-border)'
                                }}
                            >
                                <h4 className="text-sm font-semibold mb-2" style={{ color: 'var(--color-text)' }}>
                                    Looking for similar engineering?
                                </h4>
                                <p className="text-xs mb-4" style={{ color: 'var(--color-text-secondary)' }}>
                                    Available for full-stack contracts and product development.
                                </p>
                                <a
                                    href={`mailto:${settings?.email || 'manish966128@gmail.com'}?subject=Inquiry%20regarding%20${encodeURIComponent(project.title)}`}
                                    className="btn-secondary text-xs w-full justify-center"
                                >
                                    Discuss this Project
                                </a>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

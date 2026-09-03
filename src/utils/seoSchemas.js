/**
 * SEO JSON-LD Structured Data Schema Generators for Google Rich Results
 */

export const getPersonSchema = (settings, socialLinks) => {
    const sameAs = (socialLinks || []).map(link => link.url);
    
    return {
        '@context': 'https://schema.org',
        '@type': 'Person',
        'name': settings?.name || 'Manish Kumar',
        'jobTitle': 'Full-Stack Software Engineer',
        'worksFor': {
            '@type': 'Organization',
            'name': settings?.current_company || 'Comestro Techlabs Pvt Ltd'
        },
        'alumniOf': {
            '@type': 'EducationalOrganization',
            'name': 'Purnea University'
        },
        'url': 'https://manish.dev',
        'email': `mailto:${settings?.email || 'manish966128@gmail.com'}`,
        'address': {
            '@type': 'PostalAddress',
            'addressLocality': 'Jaipur',
            'addressRegion': 'Rajasthan',
            'addressCountry': 'India'
        },
        'sameAs': sameAs,
        'knowsAbout': [
            'Laravel',
            'React.js',
            'PHP',
            'MySQL',
            'Inertia.js',
            'Tailwind CSS',
            'SaaS Architecture',
            'Full-Stack Web Development'
        ]
    };
};

export const getWebsiteSchema = (settings) => {
    return {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        'name': settings?.name ? `${settings.name} Portfolio` : 'Manish Kumar | Full Stack Software Engineer',
        'url': 'https://manish.dev',
        'description': settings?.meta_description || 'Personal portfolio of Manish Kumar. Full Stack Software Engineer specializing in Laravel, React, and MySQL.',
        'author': {
            '@type': 'Person',
            'name': settings?.name || 'Manish Kumar'
        }
    };
};

export const getProjectSchema = (project, settings) => {
    if (!project) return null;

    return {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        'name': project.title,
        'description': project.description,
        'applicationCategory': project.title.toLowerCase().includes('saas') ? 'BusinessApplication' : 'WebApplication',
        'operatingSystem': 'Web Browser',
        'author': {
            '@type': 'Person',
            'name': settings?.name || 'Manish Kumar'
        },
        'offers': {
            '@type': 'Offer',
            'price': '0.00',
            'priceCurrency': 'USD'
        },
        'url': project.live_url || project.github_url || `https://manish.dev/project/${project.slug}`
    };
};

export const getBlogSchema = (blog, settings) => {
    if (!blog) return null;

    return {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        'headline': blog.title,
        'description': blog.summary,
        'author': {
            '@type': 'Person',
            'name': settings?.name || 'Manish Kumar'
        },
        'datePublished': blog.created_at || '2026-07-06',
        'mainEntityOfPage': {
            '@type': 'WebPage',
            '@id': `https://manish.dev/blog/${blog.slug}`
        }
    };
};

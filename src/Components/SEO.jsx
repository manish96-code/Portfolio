import React, { useEffect } from 'react';

/**
 * SEO Manager Component for Dynamic Head & Meta Tags Management
 * Handles Titles, Meta Descriptions, OpenGraph cards (WhatsApp/LinkedIn), Twitter Cards, Canonical URLs & JSON-LD Schemas.
 */
export default function SEO({
    title,
    description,
    canonicalUrl,
    ogImage,
    ogType = 'website',
    schemaData
}) {
    const siteTitle = title 
        ? `${title} | Manish Kumar` 
        : 'Manish Kumar | Full-Stack Software Engineer (Laravel & React)';
        
    const metaDescription = description 
        || 'Personal portfolio of Manish Kumar. Full Stack Software Engineer specializing in Laravel, React, Inertia.js, and MySQL. Building SaaS platforms & web applications.';

    const siteUrl = typeof window !== 'undefined' && window.location.origin ? window.location.origin : 'https://www.techmanish.in';
    const pageUrl = canonicalUrl ? `${siteUrl}${canonicalUrl}` : siteUrl;
    const defaultOgImage = `${siteUrl}/images/projects/gymmitra-thumb.png`;
    const imageToUse = ogImage ? (ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`) : defaultOgImage;

    useEffect(() => {
        // 1. Update Document Title
        document.title = siteTitle;

        // 2. Helper to set or update meta tag by name or property attribute
        const setMeta = (attrName, attrValue, contentValue) => {
            let element = document.querySelector(`meta[${attrName}="${attrValue}"]`);
            if (!element) {
                element = document.createElement('meta');
                element.setAttribute(attrName, attrValue);
                document.head.appendChild(element);
            }
            element.setAttribute('content', contentValue);
        };

        // Standard Meta Tags
        setMeta('name', 'description', metaDescription);
        setMeta('name', 'author', 'Manish Kumar');
        setMeta('name', 'keywords', 'Manish, Manish Kumar, Manish Kumar Developer, Manish Kumar Software Engineer Purnea, Manish Kumar Software Engineer Purnia, Manish Kumar Purnea, Manish Kumar Purnia, Software Engineer Purnea, Software Engineer Purnia, Purnea University, Purnia University, Web Developer Purnea, Web Developer Purnia, Full Stack Developer Purnea, Full Stack Developer Purnia, Purnea, Purnia, Bihar, Laravel Developer, React Developer, PHP Developer, Full Stack Developer, Inertia.js Developer, GymMitra SaaS, KitabiAdda');

        // Open Graph Meta Tags (for WhatsApp, LinkedIn, Facebook preview cards)
        setMeta('property', 'og:site_name', 'Manish Kumar Portfolio');
        setMeta('property', 'og:title', siteTitle);
        setMeta('property', 'og:description', metaDescription);
        setMeta('property', 'og:type', ogType);
        setMeta('property', 'og:url', pageUrl);
        setMeta('property', 'og:image', imageToUse);

        // Twitter Card Meta Tags
        setMeta('name', 'twitter:card', 'summary_large_image');
        setMeta('name', 'twitter:title', siteTitle);
        setMeta('name', 'twitter:description', metaDescription);
        setMeta('name', 'twitter:image', imageToUse);

        // Canonical Link Tag
        let canonicalElement = document.querySelector('link[rel="canonical"]');
        if (!canonicalElement) {
            canonicalElement = document.createElement('link');
            canonicalElement.setAttribute('rel', 'canonical');
            document.head.appendChild(canonicalElement);
        }
        canonicalElement.setAttribute('href', pageUrl);

        // JSON-LD Structured Data Schema Injection
        let schemaScript = document.getElementById('json-ld-schema');
        if (schemaData) {
            if (!schemaScript) {
                schemaScript = document.createElement('script');
                schemaScript.id = 'json-ld-schema';
                schemaScript.type = 'application/ld+json';
                document.head.appendChild(schemaScript);
            }
            schemaScript.textContent = JSON.stringify(schemaData, null, 2);
        } else if (schemaScript) {
            schemaScript.remove();
        }

    }, [siteTitle, metaDescription, pageUrl, imageToUse, ogType, schemaData]);

    return null; // Side-effect head updater component
}

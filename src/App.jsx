import React, { useState, useEffect } from 'react';
import Home from './Pages/Public/Home';
import ProjectDetails from './Pages/Public/ProjectDetails';
import BlogList from './Pages/Public/BlogList';
import BlogShow from './Pages/Public/BlogShow';
import { portfolioData } from './data/portfolioData';

export default function App() {
    const [currentPath, setCurrentPath] = useState(window.location.hash || '#/');

    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash || '#/';
            setCurrentPath(hash);
            
            // Only scroll to top if we are transitioning to a different subpage (like projects or blogs)
            // If it's a section anchor on the home page, let the browser scroll to it naturally or scroll smoothly
            if (hash.startsWith('#/')) {
                window.scrollTo({ top: 0, behavior: 'instant' });
            } else if (hash.startsWith('#')) {
                const element = document.getElementById(hash.substring(1));
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }
        };
        window.addEventListener('hashchange', handleHashChange);
        
        // Initial scroll check on load
        if (window.location.hash && !window.location.hash.startsWith('#/')) {
            setTimeout(() => {
                const element = document.getElementById(window.location.hash.substring(1));
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        }
        
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    // Helper to render pages based on Hash
    const renderPage = () => {
        const path = currentPath;

        if (path === '#/' || path === '') {
            return <Home {...portfolioData} />;
        }

        if (path.startsWith('#/project/')) {
            const slug = path.replace('#/project/', '');
            const project = portfolioData.projects.find(p => p.slug === slug);
            if (project) {
                return (
                    <ProjectDetails 
                        project={project} 
                        socialLinks={portfolioData.socialLinks} 
                        settings={portfolioData.settings} 
                    />
                );
            }
        }

        if (path === '#/blogs' || path.startsWith('#/blogs?')) {
            const categories = ['all', ...new Set(portfolioData.blogs.map(b => b.category))];
            return (
                <BlogList 
                    blogs={portfolioData.blogs} 
                    categories={categories} 
                    filters={{}} 
                    socialLinks={portfolioData.socialLinks} 
                    settings={portfolioData.settings} 
                />
            );
        }

        if (path.startsWith('#/blog/')) {
            const slug = path.replace('#/blog/', '');
            const blog = portfolioData.blogs.find(b => b.slug === slug);
            if (blog) {
                return (
                    <BlogShow 
                        blog={blog} 
                        socialLinks={portfolioData.socialLinks} 
                        settings={portfolioData.settings} 
                    />
                );
            }
        }

        // Fallback to Home page
        return <Home {...portfolioData} />;
    };

    return renderPage();
}

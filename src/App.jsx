import React, { useState, useEffect } from 'react';
import Home from './Pages/Public/Home';
import ProjectDetails from './Pages/Public/ProjectDetails';
import BlogList from './Pages/Public/BlogList';
import BlogShow from './Pages/Public/BlogShow';
import { portfolioData } from './data/portfolioData';

export default function App() {
    const [currentPath, setCurrentPath] = useState(window.location.pathname || '/');

    useEffect(() => {
        const handlePopState = () => {
            setCurrentPath(window.location.pathname || '/');
        };
        window.addEventListener('popstate', handlePopState);
        
        // Initial scroll to dynamic URL hashes if they exist on loading (e.g. /#experience)
        if (window.location.hash) {
            setTimeout(() => {
                const element = document.getElementById(window.location.hash.substring(1));
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        }
        
        return () => window.removeEventListener('popstate', handlePopState);
    }, []);

    // Custom client-side navigation helper
    const navigate = (path) => {
        window.history.pushState(null, '', path);
        setCurrentPath(path);
        window.scrollTo({ top: 0, behavior: 'instant' });
    };

    // Helper to render pages based on pathname
    const renderPage = () => {
        const path = currentPath;

        if (path === '/' || path === '') {
            return <Home {...portfolioData} navigate={navigate} />;
        }

        if (path.startsWith('/project/')) {
            const slug = path.replace('/project/', '');
            const project = portfolioData.projects.find(p => p.slug === slug);
            if (project) {
                return (
                    <ProjectDetails 
                        project={project} 
                        socialLinks={portfolioData.socialLinks} 
                        settings={portfolioData.settings} 
                        navigate={navigate}
                    />
                );
            }
        }

        if (path === '/blogs' || path.startsWith('/blogs?')) {
            const categories = ['all', ...new Set(portfolioData.blogs.map(b => b.category))];
            return (
                <BlogList 
                    blogs={portfolioData.blogs} 
                    categories={categories} 
                    filters={{}} 
                    socialLinks={portfolioData.socialLinks} 
                    settings={portfolioData.settings} 
                    navigate={navigate}
                />
            );
        }

        if (path.startsWith('/blog/')) {
            const slug = path.replace('/blog/', '');
            const blog = portfolioData.blogs.find(b => b.slug === slug);
            if (blog) {
                return (
                    <BlogShow 
                        blog={blog} 
                        socialLinks={portfolioData.socialLinks} 
                        settings={portfolioData.settings} 
                        navigate={navigate}
                    />
                );
            }
        }

        // Fallback to Home page
        return <Home {...portfolioData} navigate={navigate} />;
    };

    return renderPage();
}

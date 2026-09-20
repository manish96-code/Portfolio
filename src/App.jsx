import React, { useState, useEffect } from 'react';
import Home from './Pages/Public/Home';
import ProjectDetails from './Pages/Public/ProjectDetails';
import BlogList from './Pages/Public/BlogList';
import BlogShow from './Pages/Public/BlogShow';
import { portfolioData } from './data/portfolioData';

// Admin imports
import AdminLogin from './Pages/Admin/AdminLogin';
import AdminLayout from './Layouts/AdminLayout';
import Dashboard from './Pages/Admin/Dashboard';
import AdminProjects from './Pages/Admin/AdminProjects';
import AdminBlogs from './Pages/Admin/AdminBlogs';
import AdminSkills from './Pages/Admin/AdminSkills';
import AdminExperience from './Pages/Admin/AdminExperience';
import AdminCertificates from './Pages/Admin/AdminCertificates';
import AdminSettings from './Pages/Admin/AdminSettings';

export default function App() {
    const [currentPath, setCurrentPath] = useState(window.location.pathname || '/');
    const [isAdmin, setIsAdmin] = useState(() => sessionStorage.getItem('admin_auth') === 'true');

    useEffect(() => {
        const handlePopState = () => {
            setCurrentPath(window.location.pathname || '/');
        };
        window.addEventListener('popstate', handlePopState);
        
        // Initial scroll to dynamic URL hashes if they exist on loading
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

    const handleLogin = () => {
        setIsAdmin(true);
        navigate('/admin');
    };

    const handleLogout = () => {
        sessionStorage.removeItem('admin_auth');
        setIsAdmin(false);
        navigate('/');
    };

    // Helper to render pages based on pathname
    const renderPage = () => {
        const path = currentPath;

        // === ADMIN ROUTES ===
        if (path.startsWith('/admin')) {
            // Show login if not authenticated
            if (!isAdmin) {
                return <AdminLogin onLogin={handleLogin} navigate={navigate} />;
            }

            // Admin pages wrapped in AdminLayout
            const renderAdminPage = () => {
                if (path === '/admin' || path === '/admin/') {
                    return <Dashboard portfolioData={portfolioData} navigate={navigate} />;
                }
                if (path === '/admin/projects') {
                    return <AdminProjects projects={portfolioData.projects} navigate={navigate} />;
                }
                if (path === '/admin/blogs') {
                    return <AdminBlogs blogs={portfolioData.blogs} navigate={navigate} />;
                }
                if (path === '/admin/skills') {
                    return <AdminSkills skills={portfolioData.skills} navigate={navigate} />;
                }
                if (path === '/admin/experience') {
                    return <AdminExperience experiences={portfolioData.experiences} navigate={navigate} />;
                }
                if (path === '/admin/certificates') {
                    return <AdminCertificates certificates={portfolioData.certificates} navigate={navigate} />;
                }
                if (path === '/admin/settings') {
                    return <AdminSettings settings={portfolioData.settings} socialLinks={portfolioData.socialLinks} navigate={navigate} />;
                }
                // Default to dashboard
                return <Dashboard portfolioData={portfolioData} navigate={navigate} />;
            };

            return (
                <AdminLayout
                    currentPath={path}
                    navigate={navigate}
                    onLogout={handleLogout}
                    settings={portfolioData.settings}
                >
                    {renderAdminPage()}
                </AdminLayout>
            );
        }

        // === PUBLIC ROUTES ===
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

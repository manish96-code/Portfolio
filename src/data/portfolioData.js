export const portfolioData = {
    settings: {
        name: 'Manish Kumar',
        title: 'Full Stack Web Developer | Laravel | React | PHP',
        location: 'Jaipur, Rajasthan, India',
        current_company: 'Comestro Techlabs Pvt Ltd',
        education: 'BCA, Purnea University (2023-2026)',
        objective: 'Seeking to leverage solid expertise in Laravel, React, and MySQL database management to build modern, high-performance web environments.',
        bio: 'Passionate about building modern web applications that solve real-world problems. Specialize in full-stack ecosystems leveraging Laravel on the backend and React/Inertia on the frontend.',
        email: 'manish966128@gmail.com',
        phone: '+91 8207593672',
        resume_file: '/downloads/resume.pdf',
        meta_title: 'Manish Kumar | Full Stack Web Developer',
        meta_description: 'Personal portfolio of Manish Kumar. Full Stack Web Developer Intern at Comestro Techlabs Pvt Ltd. Expert in Laravel, PHP, React, and MySQL.'
    },
    socialLinks: [
        { platform: 'GitHub', url: 'https://github.com/manish96-code', icon: 'github' },
        { platform: 'LinkedIn', url: 'https://www.linkedin.com/in/manish-kumar-9661link', icon: 'linkedin' },
        { platform: 'Facebook', url: 'https://www.facebook.com/share/1MArsUNxGr/', icon: 'facebook' },
        { platform: 'Instagram', url: 'https://www.instagram.com/manish_kumar_9661?igsh=MTQxdmY2ajJrem9ocw==', icon: 'instagram' },
        { platform: 'WhatsApp', url: 'https://wa.me/918207593672?text=Hello%20Manish%2C%20I%20visited%20your%20portfolio%20and%20wanted%20to%20connect!', icon: 'whatsapp' },
        { platform: 'Email', url: 'mailto:manish966128@gmail.com', icon: 'mail' }
    ],
    skills: {
        Frontend: [
            { name: 'HTML5', level: 95 },
            { name: 'CSS3', level: 90 },
            { name: 'JavaScript', level: 92 },
            { name: 'React', level: 90 },
            { name: 'Tailwind CSS', level: 95 },
            { name: 'Vite', level: 88 }
        ],
        Backend: [
            { name: 'PHP', level: 95 },
            { name: 'Laravel', level: 95 }
        ],
        Database: [
            { name: 'MySQL', level: 90 },
            { name: 'SQLite', level: 85 },
            { name: 'PostgreSQL', level: 80 },
            { name: 'MongoDB', level: 75 },
            { name: 'Redis', level: 80 }
        ],
        'Programming Languages': [
            { name: 'C', level: 85 },
            { name: 'C++', level: 88 },
            { name: 'Python', level: 80 }
        ],
        Tools: [
            { name: 'Git', level: 90 },
            { name: 'GitHub', level: 95 },
            { name: 'VS Code', level: 95 },
            { name: 'Vercel', level: 85 }
        ]
    },
    experiences: [
        {
            company: 'Comestro Techlabs Pvt Ltd',
            designation: 'Laravel Developer',
            duration: 'May 2026 - Present',
            description: "Developed multi-vendor e-commerce bookstore marketplaces (KitabiAdda) and campus networking portals (Campus Connect) using Laravel, React, Inertia, and MySQL. Experienced in writing clean code, designing database schemas, and managing repository integrations.",
            skills_used: ['Laravel', 'React', 'PHP', 'MySQL', 'Git', 'GitHub', 'Inertia.js']
        }
    ],
    projects: [
        {
            id: 1,
            title: 'LinkUp',
            slug: 'linkup',
            description: 'A modern social media platform featuring posts, comments, likes, real-time messaging, and profile customization.',
            content: "# LinkUp - Modern Social Media Platform\n\n## Overview\nLinkUp is a full-featured social media web application built with a modern single-page experience using Inertia.js, React, and Laravel.\n\n## Core Features\n- **Activity Feed**: Interactive posts, image uploads, likes, and nested comments.\n- **User Relations**: Follow/unfollow mechanics, user profile customize screens.\n- **Real-time Messaging**: Instant chat integrations.\n- **Modern SPA Router**: Fast page updates without page reloads using Inertia.js.",
            images: [],
            technologies: ['Laravel', 'React', 'Inertia', 'MySQL', 'Tailwind CSS'],
            github_url: 'https://github.com/manish96-code/LinkUp',
            status: 'Completed',
            is_featured: true
        },
        {
            id: 2,
            title: 'KitabiAdda',
            slug: 'kitabi-adda',
            description: 'A premium Multi-Vendor Book Marketplace designed for students, sellers, and readers to interact and transact book sales.',
            content: "# KitabiAdda - Multi Vendor Book Marketplace\n\n## Overview\nKitabiAdda is a multi-vendor bookstore designed to connect local bookshops and students. Users can list books, purchase copies, and rate sellers.",
            images: [],
            technologies: ['Laravel', 'React', 'Inertia', 'MySQL', 'Tailwind CSS'],
            github_url: 'https://github.com/manish96-code/KitabiAdda',
            status: 'Completed',
            is_featured: true
        },
        {
            id: 3,
            title: 'Campus Connect',
            slug: 'campus-connect',
            description: 'An all-in-one college management and campus social networking system for students and teachers.',
            content: "# Campus Connect - Campus Management System\n\n## Overview\nCampusConnect integrates course files sharing, student timelines, and assignment boards onto a single clean dashboard.",
            images: [],
            technologies: ['Laravel', 'Livewire', 'MySQL', 'Tailwind CSS'],
            github_url: 'https://github.com/manish96-code/CampusConnect',
            status: 'Completed',
            is_featured: true
        },

        {
            id: 5,
            title: 'Recipe Finder',
            slug: 'recipe-finder',
            description: 'A React-based single-page application integrating third-party recipe REST APIs with local filtering.',
            content: "# Recipe Finder\n\n## Overview\nAllows users to search for dishes, filter by dietary requirements, and save recipes to their local storage.",
            thumbnail: '/images/projects/recipe-thumb.jpg',
            images: [],
            technologies: ['React', 'REST API', 'JavaScript', 'Tailwind CSS'],
            github_url: 'https://github.com/manish96-code',
            live_url: 'https://the-recipe-finder-three.vercel.app/',
            status: 'Completed',
            is_featured: false
        }
    ],
    certificates: [
        {
            id: 1,
            title: 'Laravel & PHP Web Development',
            organization: 'Status: Completed',
            issue_date: 'Learned',
            credential_url: '#'
        },
        {
            id: 2,
            title: 'Python Programming Language',
            organization: 'Status: In Progress',
            issue_date: 'Learning',
            credential_url: '#'
        }
    ],
    blogs: [
        {
            id: 1,
            title: 'Mastering React 19 Compiler: What You Need to Know',
            slug: 'react-19-compiler',
            summary: 'React 19 introduces React Compiler, which automatically optimizes rendering and eliminates manual memoization. Learn how it works.',
            content: "# Mastering React 19 Compiler\n\n## Introduction\nReact 19 represents a major paradigm shift. The most significant feature is the **React Compiler** (formerly React Forget). It compiles your code to optimize hook dependencies automatically.\n\n## What Problem Does it Solve?\nIn React 18, developer-guided memoization was required to avoid waste rendering cycles:\n- `useMemo`\n- `useCallback`\n- `React.memo`\n\nWriting these is tedious and error-prone. The compiler handles it automatically at compile-time!\n\n## How it Works\nThe compiler acts as a Babel/Vite compilation stage. It parses the JSX tree and components, injecting memoization cache lines directly into the compiled output. Your components re-render only when values change, keeping UI updates lightning-fast.\n\n## Conclusion\nReact 19 simplifies state design and optimizes memory footprints. Start testing it in your Vite plugins today!",
            category: 'Frontend',
            tags: ['React', 'JavaScript', 'Frontend'],
            created_at: '2026-07-06'
        },
        {
            id: 2,
            title: 'Database Query Optimization Strategies in Laravel',
            slug: 'laravel-query-optimization',
            summary: 'A guide to optimizing database performance in Laravel applications, resolving N+1 queries, and using proper indexes.',
            content: "# Database Query Optimization in Laravel\n\n## Introduction\nDatabase performance is key to scaling apps. Laravel makes it easy to build database queries, but it's easy to write slow queries that block requests.\n\n## 1. N+1 Queries Problem\nOne of the most common issues is N+1 queries. E.g.:\n```php\n$books = Book::all();\nforeach ($books as $book) {\n    echo $book->author->name;\n}\n```\nThis runs 1 query to get books, and then N queries to fetch each author. Fix this using **Eager Loading**:\n```php\n$books = Book::with('author')->get();\n```\nThis reduces database requests to just 2 queries.\n\n## 2. Proper Database Indexes\nMake sure columns commonly used in `where()`, `join()`, or `orderBy()` clauses are indexed in migrations:\n```php\n$table->index('status');\n```\n\n## Conclusion\nOptimized relationships and proper schemas will make your Laravel applications load instantly.",
            category: 'Backend',
            tags: ['Laravel', 'PHP', 'Database'],
            created_at: '2026-07-05'
        }
    ]
};

<?php

namespace Database\Seeders;

use App\Models\Project;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $projects = [
            [
                'title' => 'LinkUp',
                'slug' => 'linkup',
                'description' => 'A modern social media platform featuring posts, comments, likes, real-time messaging, and profile customization.',
                'content' => "# LinkUp - Modern Social Media Platform\n\n## Overview\nLinkUp is a full-featured social media web application built with a modern single-page experience using Inertia.js, React, and Laravel.\n\n## Core Features\n- **Activity Feed**: Interactive posts, image uploads, likes, and nested comments.\n- **User Relations**: Follow/unfollow mechanics, user profile customize screens.\n- **Real-time Messaging**: Instant chat integrations.\n- **Modern SPA Router**: Fast page updates without page reloads using Inertia.js.",
                'thumbnail' => '/images/projects/linkup-thumb.jpg',
                'images' => ['/images/projects/linkup-1.jpg'],
                'technologies' => ['Laravel', 'React', 'Inertia', 'MySQL', 'Tailwind CSS'],
                'github_url' => 'https://github.com/manish96-code/LinkUp',
                'live_url' => 'http://localhost:8000',
                'status' => 'Completed',
                'is_featured' => true,
            ],
            [
                'title' => 'KitabiAdda',
                'slug' => 'kitabi-adda',
                'description' => 'A premium Multi-Vendor Book Marketplace designed for students, sellers, and readers to interact and transact book sales.',
                'content' => "# KitabiAdda - Multi Vendor Book Marketplace\n\n## Overview\nKitabiAdda is a multi-vendor bookstore designed to connect local bookshops and students. Users can list books, purchase copies, and rate sellers.",
                'thumbnail' => '/images/projects/kitabiadda-thumb.jpg',
                'images' => ['/images/projects/kitabiadda-1.jpg'],
                'technologies' => ['Laravel', 'React', 'Inertia', 'MySQL', 'Tailwind CSS'],
                'github_url' => 'https://github.com/manish96-code/KitabiAdda',
                'live_url' => 'http://localhost:8000',
                'status' => 'Completed',
                'is_featured' => true,
            ],
            [
                'title' => 'Campus Connect',
                'slug' => 'campus-connect',
                'description' => 'An all-in-one college management and campus social networking system for students and teachers.',
                'content' => "# Campus Connect - Campus Management System\n\n## Overview\nCampusConnect integrates course files sharing, student timelines, and assignment boards onto a single clean dashboard.",
                'thumbnail' => '/images/projects/campusconnect-thumb.jpg',
                'images' => ['/images/projects/campusconnect-1.jpg'],
                'technologies' => ['Laravel', 'Livewire', 'MySQL', 'Tailwind CSS'],
                'github_url' => 'https://github.com/manish96-code/CampusConnect',
                'live_url' => 'http://localhost:8000',
                'status' => 'Completed',
                'is_featured' => true,
            ],
            [
                'title' => 'Client Management',
                'slug' => 'client-management',
                'description' => 'A secure client portal for project management, tracking billable hours, invoices, and messaging.',
                'content' => "# Client Management Portal\n\n## Overview\nA clean portal built for agencies to coordinate task deliverables and invoice milestones with clients.",
                'thumbnail' => '/images/projects/client-thumb.jpg',
                'images' => [],
                'technologies' => ['PHP', 'MySQL', 'HTML5', 'CSS3'],
                'github_url' => 'https://github.com/manish96-code',
                'live_url' => 'http://localhost:8000',
                'status' => 'Completed',
                'is_featured' => false,
            ],
            [
                'title' => 'Recipe Finder',
                'slug' => 'recipe-finder',
                'description' => 'A React-based single-page application integrating third-party recipe REST APIs with local filtering.',
                'content' => "# Recipe Finder\n\n## Overview\nAllows users to search for dishes, filter by dietary requirements, and save recipes to their local storage.",
                'thumbnail' => '/images/projects/recipe-thumb.jpg',
                'images' => [],
                'technologies' => ['React', 'REST API', 'JavaScript', 'Tailwind CSS'],
                'github_url' => 'https://github.com/manish96-code',
                'live_url' => 'http://localhost:8000',
                'status' => 'Completed',
                'is_featured' => false,
            ]
        ];

        foreach ($projects as $project) {
            Project::updateOrCreate(
                ['slug' => $project['slug']],
                $project
            );
        }
    }
}

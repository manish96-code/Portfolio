<?php

namespace Database\Seeders;

use App\Models\Project;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $projects = [
            [
                'title' => 'KitabiAdda',
                'slug' => 'kitabi-adda',
                'description' => 'A premium Multi-Vendor Book Marketplace designed for students, sellers, and readers to interact and transact seamlessly.',
                'content' => "# KitabiAdda - Multi Vendor Book Marketplace\n\n## Overview\nKitabiAdda is a sophisticated digital storefront that brings local book vendors and students together onto a unified platform. Built to address the high costs of academic textbooks, the application allows users to buy new/used books, list their own books for sale, and coordinate delivery with local riders.\n\n## Problem Statement\nStudents struggle to find affordable textbooks, while independent local bookshops lack digital storefront infrastructure. General e-commerce sites don't cater to the specialized needs of book condition grading, rental models, or local hyper-local delivery services.\n\n## Solution\nWe developed a multi-tenant marketplace where:\n1. **Sellers** get dedicated dashboard portals to manage inventories, view transactions, and process payouts.\n2. **Customers** browse categorized lists, apply discount coupons, track orders, and request returns.\n3. **Riders** accept deliveries based on location, update progress, and earn commissions.\n\n## Core Features\n- **Interactive Front Store**: Filter by genre, author, and condition.\n- **Vendor Dashboards**: Dynamic charts, sales reports, inventory tracking.\n- **Rider Allocation System**: Automated order assignment with timers.\n- **Coupon & Refund system**: Secure cancellation logs and checkout discounts.\n\n## Architecture\nBuilt on a solid Model-View-Controller framework using Laravel on the backend and React/Inertia on the frontend. Utilizing SQLite/MySQL databases for relational transactions.\n\n## Challenges & Future Improvements\n- **Challenge**: Coordinating multi-vendor shipments. Resolved by splitting a single order into multiple sub-shipments assigned to different vendors.\n- **Improvement**: Integrating automated shipping APIs (e.g. Shiprocket) and SMS notifications.",
                'thumbnail' => '/images/projects/kitabiadda-thumb.jpg',
                'images' => ['/images/projects/kitabiadda-1.jpg', '/images/projects/kitabiadda-2.jpg'],
                'technologies' => ['Laravel', 'React', 'Inertia', 'MySQL', 'Tailwind CSS'],
                'github_url' => 'https://github.com',
                'live_url' => 'http://localhost:8000',
                'status' => 'Completed',
                'is_featured' => true,
            ],
            [
                'title' => 'Campus Connect',
                'slug' => 'campus-connect',
                'description' => 'A dynamic social and academic platform for students to share notes, assignments, and interact in real-time.',
                'content' => "# Campus Connect - Student Social Network\n\n## Overview\nCampus Connect is a customized digital hub designed for university students to connect, interact, share course resources, and manage classroom assignments.\n\n## Problem Statement\nStudents are forced to use multiple disjointed tools (WhatsApp for chat, Google Drive for resource sharing, emails for announcements), leading to information loss and lack of community engagement.\n\n## Solution\nAn all-in-one platform combining files sharing, academic forums, real-time message boards, and social timelines. Students register with university email IDs to gain access to their respective campus workspace.\n\n## Core Features\n- **Resource Hub**: Upload and download lecture notes, test materials, and past papers sorted by subject codes.\n- **Social Feed**: Write posts, upload images, tag peers, like, and comment.\n- **Events & Announcements**: Administrative alerts, test schedules, and club gatherings.\n- **Profiles**: View student details, academic courses, and uploaded files.\n\n## Tech Stack\n- Laravel framework\n- React.js frontend integrated via Inertia.js\n- MySQL database storage\n- Tailwind CSS design system",
                'thumbnail' => '/images/projects/campusconnect-thumb.jpg',
                'images' => ['/images/projects/campusconnect-1.jpg'],
                'technologies' => ['Laravel', 'React', 'MySQL', 'Tailwind CSS', 'Inertia'],
                'github_url' => 'https://github.com',
                'live_url' => 'http://localhost:8000',
                'status' => 'Completed',
                'is_featured' => true,
            ],
            [
                'title' => 'Gym Management SaaS',
                'slug' => 'gym-management-saas',
                'description' => 'A multi-tenant software-as-a-service system designed for fitness clubs to handle subscriptions, billing, and attendance tracking.',
                'content' => "# Gym Management SaaS\n\n## Overview\nThis project is a multi-tenant software application that allows fitness center owners to manage memberships, process monthly fees, track staff schedules, and check member check-ins.\n\n## Core Features\n- **Multi-Tenant Database Structure**: Isolated data storage per gym instance.\n- **Membership Plans**: Configure customizable recurring subscription packages.\n- **Automated Billing**: Generates recurring invoices, receipts, and tracks pending balances.\n- **Attendance Log**: QR-code based entry checks for gym members.\n- **Reports**: Graphic representations of monthly sales trends and popular workout hours.",
                'thumbnail' => '/images/projects/gymsaas-thumb.jpg',
                'images' => [],
                'technologies' => ['Laravel', 'React', 'MySQL', 'Tailwind CSS', 'Inertia'],
                'github_url' => 'https://github.com',
                'live_url' => 'http://localhost:8000',
                'status' => 'In Progress',
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

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
                'title' => 'E-Commerce Platform (KitabiAdda)',
                'description' => 'A full-featured online bookstore built with Laravel, React, and Inertia. Features include customized dashboards for sellers, riders, and admins, wishlist systems, and automated delivery tracking.',
                'tags' => ['Laravel', 'React', 'Inertia', 'Tailwind'],
                'github_url' => 'https://github.com',
                'live_url' => 'http://localhost',
            ],
            [
                'title' => 'Social Connect (LinkUp)',
                'description' => 'A modern social media application leveraging Laravel Socialite, ImageKit API, real-time message broadcasting, follow/block operations, and dynamic user stories.',
                'tags' => ['Laravel', 'React', 'Broadcasting', 'ImageKit'],
                'github_url' => 'https://github.com',
                'live_url' => 'http://localhost',
            ],
            [
                'title' => 'Fit Tracker (GymSaas)',
                'description' => 'A robust SaaS subscription and membership management platform with interactive dashboard graphs, platforms settings, and Stripe payment integration.',
                'tags' => ['Laravel', 'Inertia', 'Recharts', 'Stripe'],
                'github_url' => 'https://github.com',
                'live_url' => 'http://localhost',
            ]
        ];

        foreach ($projects as $project) {
            Project::updateOrCreate(
                ['title' => $project['title']],
                $project
            );
        }
    }
}

<?php

namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Seeder;

class SettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $settings = [
            'name' => 'Manish Kumar',
            'title' => 'Full Stack Laravel Developer',
            'location' => 'Jaipur, Rajasthan, India',
            'current_company' => 'Comestro Techlabs Pvt Ltd',
            'education' => 'BCA, Purnea University',
            'objective' => 'Highly motivated Full Stack Developer Intern looking to leverage solid expertise in Laravel, React, and MySQL database management to build modern web environments.',
            'bio' => 'I build premium, high-performance web applications using Laravel, React, and Inertia.js. Specialize in crafting pixel-perfect frontend layouts using Tailwind CSS and integrating Model Context Protocol servers for AI agents.',
            'email' => 'manish.kumar@example.com',
            'phone' => '+91 9876543210',
            'resume_file' => '/downloads/resume.pdf',
            'meta_title' => 'Manish Kumar | Full Stack Laravel Developer Portfolio',
            'meta_description' => 'Personal portfolio of Manish Kumar. Full Stack Developer Intern at Comestro Techlabs Pvt Ltd. Expert in Laravel, PHP, React, and MySQL.',
            'robots' => 'index, follow',
        ];

        foreach ($settings as $key => $value) {
            Setting::set($key, $value);
        }
    }
}

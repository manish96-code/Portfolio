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
            'title' => 'Full Stack Web Developer | Laravel | React | PHP',
            'location' => 'Jaipur, Rajasthan, India',
            'current_company' => 'Comestro Techlabs Pvt Ltd',
            'education' => 'BCA, Purnea University (2021-2024)',
            'objective' => 'Seeking to leverage solid expertise in Laravel, React, and MySQL database management to build modern, high-performance web environments.',
            'bio' => 'Passionate about building modern web applications that solve real-world problems. Specialize in full-stack ecosystems leveraging Laravel on the backend and React/Inertia on the frontend.',
            'email' => 'manish96611311@gmail.com',
            'phone' => '+91 9661131100', // Mock representation or similar
            'resume_file' => '/downloads/resume.pdf',
            'meta_title' => 'Manish Kumar | Full Stack Web Developer',
            'meta_description' => 'Personal portfolio of Manish Kumar. Full Stack Web Developer Intern at Comestro Techlabs Pvt Ltd. Expert in Laravel, PHP, React, and MySQL.',
            'robots' => 'index, follow',
        ];

        foreach ($settings as $key => $value) {
            Setting::set($key, $value);
        }
    }
}

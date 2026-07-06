<?php

namespace Database\Seeders;

use App\Models\Experience;
use Illuminate\Database\Seeder;

class ExperienceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $experiences = [
            [
                'company' => 'Comestro Techlabs Pvt Ltd',
                'designation' => 'Laravel Developer',
                'duration' => 'May 2024 - Present',
                'description' => "Developed multi-vendor e-commerce bookstore marketplaces (KitabiAdda) and campus networking portals (Campus Connect) using Laravel, React, Inertia, and MySQL. Experienced in writing clean code, designing database schemas, and managing repository integrations.",
                'skills_used' => ['Laravel', 'React', 'PHP', 'MySQL', 'Git', 'GitHub', 'Inertia.js'],
                'is_current' => true,
                'order_index' => 0,
            ]
        ];

        foreach ($experiences as $experience) {
            Experience::updateOrCreate(
                ['company' => $experience['company'], 'designation' => $experience['designation']],
                $experience
            );
        }
    }
}

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
                'designation' => 'Full Stack Developer Intern',
                'duration' => 'Currently',
                'description' => "Developed multi-vendor bookstore applications (KitabiAdda) and academic portals using Laravel, Inertia, and React. Optimized SQL query performance and integrated custom MCP server nodes to assist in codebase analysis.",
                'skills_used' => ['Laravel', 'React', 'Inertia.js', 'Tailwind CSS', 'MySQL', 'Git'],
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

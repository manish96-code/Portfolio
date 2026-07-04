<?php

namespace Database\Seeders;

use App\Models\Skill;
use Illuminate\Database\Seeder;

class SkillSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $skills = [
            // Backend
            ['name' => 'Laravel', 'category' => 'Backend', 'icon' => 'laravel', 'level' => 95],
            ['name' => 'PHP', 'category' => 'Backend', 'icon' => 'php', 'level' => 95],
            ['name' => 'Livewire', 'category' => 'Backend', 'icon' => 'lightning', 'level' => 85],
            
            // Frontend
            ['name' => 'React', 'category' => 'Frontend', 'icon' => 'react', 'level' => 90],
            ['name' => 'JavaScript', 'category' => 'Frontend', 'icon' => 'javascript', 'level' => 92],
            ['name' => 'Tailwind CSS', 'category' => 'Frontend', 'icon' => 'wind', 'level' => 95],
            
            // Database
            ['name' => 'MySQL', 'category' => 'Database', 'icon' => 'database', 'level' => 88],
            
            // Tools
            ['name' => 'Git', 'category' => 'Tools', 'icon' => 'git', 'level' => 90],
            ['name' => 'GitHub', 'category' => 'Tools', 'icon' => 'github', 'level' => 95],
            ['name' => 'Postman', 'category' => 'Tools', 'icon' => 'mail', 'level' => 85],
            ['name' => 'VS Code', 'category' => 'Tools', 'icon' => 'code', 'level' => 92],
        ];

        foreach ($skills as $skill) {
            Skill::updateOrCreate(
                ['name' => $skill['name']],
                $skill
            );
        }
    }
}

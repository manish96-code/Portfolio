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
            // Frontend
            ['name' => 'HTML5', 'category' => 'Frontend', 'icon' => 'html5', 'level' => 95],
            ['name' => 'CSS3', 'category' => 'Frontend', 'icon' => 'css3', 'level' => 90],
            ['name' => 'JavaScript', 'category' => 'Frontend', 'icon' => 'javascript', 'level' => 92],
            ['name' => 'React', 'category' => 'Frontend', 'icon' => 'react', 'level' => 90],
            ['name' => 'Tailwind CSS', 'category' => 'Frontend', 'icon' => 'tailwind', 'level' => 95],
            ['name' => 'Vite', 'category' => 'Frontend', 'icon' => 'vite', 'level' => 88],
            
            // Backend
            ['name' => 'PHP', 'category' => 'Backend', 'icon' => 'php', 'level' => 95],
            ['name' => 'Laravel', 'category' => 'Backend', 'icon' => 'laravel', 'level' => 95],
            
            // Database
            ['name' => 'MySQL', 'category' => 'Database', 'icon' => 'mysql', 'level' => 90],
            ['name' => 'SQLite', 'category' => 'Database', 'icon' => 'sqlite', 'level' => 85],
            ['name' => 'PostgreSQL', 'category' => 'Database', 'icon' => 'postgresql', 'level' => 80],
            ['name' => 'MongoDB', 'category' => 'Database', 'icon' => 'mongodb', 'level' => 75],
            ['name' => 'Redis', 'category' => 'Database', 'icon' => 'redis', 'level' => 80],
            
            // Programming Languages
            ['name' => 'C', 'category' => 'Programming Languages', 'icon' => 'c', 'level' => 85],
            ['name' => 'C++', 'category' => 'Programming Languages', 'icon' => 'cpp', 'level' => 88],
            ['name' => 'Python', 'category' => 'Programming Languages', 'icon' => 'python', 'level' => 80],
            
            // Tools
            ['name' => 'Git', 'category' => 'Tools', 'icon' => 'git', 'level' => 90],
            ['name' => 'GitHub', 'category' => 'Tools', 'icon' => 'github', 'level' => 95],
            ['name' => 'VS Code', 'category' => 'Tools', 'icon' => 'vscode', 'level' => 95],
            ['name' => 'Vercel', 'category' => 'Tools', 'icon' => 'vercel', 'level' => 85],
        ];

        foreach ($skills as $skill) {
            Skill::updateOrCreate(
                ['name' => $skill['name']],
                $skill
            );
        }
    }
}

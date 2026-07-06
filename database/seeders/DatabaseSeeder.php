<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Seed default admin user
        User::updateOrCreate(
            ['email' => 'manish96611311@gmail.com'],
            [
                'name' => 'Manish Kumar',
                'password' => Hash::make('password'), // Change on first login
            ]
        );

        // Call individual seeders
        $this->call([
            SettingSeeder::class,
            ProjectSeeder::class,
            SkillSeeder::class,
            ExperienceSeeder::class,
            CertificateSeeder::class,
            BlogSeeder::class,
            SocialLinkSeeder::class,
        ]);
    }
}

<?php

namespace Database\Seeders;

use App\Models\SocialLink;
use Illuminate\Database\Seeder;

class SocialLinkSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $links = [
            ['platform' => 'GitHub', 'url' => 'https://github.com/manish96-code', 'icon' => 'github'],
            ['platform' => 'LinkedIn', 'url' => 'https://linkedin.com/in/manish-kumar', 'icon' => 'linkedin'],
            ['platform' => 'Email', 'url' => 'mailto:manish96611311@gmail.com', 'icon' => 'mail'],
        ];

        foreach ($links as $link) {
            SocialLink::updateOrCreate(
                ['platform' => $link['platform']],
                $link
            );
        }
    }
}

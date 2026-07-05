<?php

namespace Database\Seeders;

use App\Models\Certificate;
use Illuminate\Database\Seeder;

class CertificateSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $certificates = [
            [
                'title' => 'Advanced Full Stack Web Development',
                'organization' => 'Udemy / Laracasts',
                'issue_date' => 'December 2025',
                'credential_url' => 'https://udemy.com',
                'image' => '/images/certificates/fullstack.jpg',
            ],
            [
                'title' => 'Laravel Security Best Practices',
                'organization' => 'Laravel Academy',
                'issue_date' => 'February 2026',
                'credential_url' => 'https://laravel.com',
                'image' => '/images/certificates/security.jpg',
            ]
        ];

        foreach ($certificates as $cert) {
            Certificate::updateOrCreate(
                ['title' => $cert['title']],
                $cert
            );
        }
    }
}

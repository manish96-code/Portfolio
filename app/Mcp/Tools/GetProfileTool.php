<?php

declare(strict_types=1);

namespace App\Mcp\Tools;

use Illuminate\Contracts\JsonSchema\JsonSchema;
use Laravel\Mcp\Request;
use Laravel\Mcp\Response;
use Laravel\Mcp\Server\Tool;

class GetProfileTool extends Tool
{
    protected string $name = 'get_profile';

    protected string $description = 'Retrieve the developer profile, including contact details, bio, and technical skills';

    /**
     * Get the tool's input schema.
     *
     * @param  \Illuminate\Contracts\JsonSchema\JsonSchema  $schema
     * @return array<string, \Illuminate\JsonSchema\Types\Type>
     */
    public function schema(JsonSchema $schema): array
    {
        return []; // No inputs required
    }

    /**
     * Handle the tool request.
     *
     * @param  \Laravel\Mcp\Request  $request
     * @return \Laravel\Mcp\Response
     */
    public function handle(Request $request): Response
    {
        $profile = [
            'name' => 'Manish Sharma',
            'title' => 'Full Stack & AI Agent Engineer',
            'location' => 'Jaipur, Rajasthan, India',
            'bio' => 'Building advanced web systems using Laravel, Inertia, and React. Expert in Model Context Protocol integrations and automated AI developer tools.',
            'contact' => [
                'email' => 'manish.sharma@example.com',
                'github' => 'https://github.com',
                'linkedin' => 'https://linkedin.com',
            ],
            'skills' => [
                ['name' => 'Laravel / PHP', 'level' => '95%', 'category' => 'Backend'],
                ['name' => 'React.js / JS', 'level' => '92%', 'category' => 'Frontend'],
                ['name' => 'Inertia.js', 'level' => '95%', 'category' => 'Bridge'],
                ['name' => 'Tailwind CSS v4', 'level' => '90%', 'category' => 'Design'],
                ['name' => 'SQLite / MySQL', 'level' => '85%', 'category' => 'Database'],
                ['name' => 'MCP Server Dev', 'level' => '90%', 'category' => 'AI System Integration'],
            ]
        ];

        return Response::json($profile);
    }
}

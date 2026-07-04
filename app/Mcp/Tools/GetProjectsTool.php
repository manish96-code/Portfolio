<?php

declare(strict_types=1);

namespace App\Mcp\Tools;

use App\Models\Project;
use Illuminate\Contracts\JsonSchema\JsonSchema;
use Laravel\Mcp\Request;
use Laravel\Mcp\Response;
use Laravel\Mcp\Server\Tool;

class GetProjectsTool extends Tool
{
    protected string $name = 'get_projects';

    protected string $description = 'Retrieve lists of current portfolio projects from the database';

    /**
     * Get the tool's input schema.
     *
     * @param  \Illuminate\Contracts\JsonSchema\JsonSchema  $schema
     * @return array<string, \Illuminate\JsonSchema\Types\Type>
     */
    public function schema(JsonSchema $schema): array
    {
        return [
            'tag' => $schema->string()->description('Filter projects by a specific tag (e.g. Laravel, React)')->nullable(),
        ];
    }

    /**
     * Handle the tool request.
     *
     * @param  \Laravel\Mcp\Request  $request
     * @return \Laravel\Mcp\Response
     */
    public function handle(Request $request): Response
    {
        $request->validate([
            'tag' => 'nullable|string',
        ]);

        $tag = $request->get('tag');
        $query = Project::query();

        // Safe query in case migrations have not run yet
        try {
            $projects = $query->get();
        } catch (\Exception $e) {
            // Static fallback
            $projects = collect([
                [
                    'title' => 'E-Commerce Platform (KitabiAdda)',
                    'description' => 'A full-featured online bookstore built with Laravel, React, and Inertia.',
                    'tags' => ['Laravel', 'React', 'Inertia', 'Tailwind'],
                    'github_url' => 'https://github.com',
                ],
                [
                    'title' => 'Social Connect (LinkUp)',
                    'description' => 'A modern social media application leveraging Laravel, React, and real-time broadcasting.',
                    'tags' => ['Laravel', 'React', 'Broadcasting', 'ImageKit'],
                    'github_url' => 'https://github.com',
                ],
                [
                    'title' => 'Fit Tracker (GymSaas)',
                    'description' => 'A robust SaaS subscription and membership management platform.',
                    'tags' => ['Laravel', 'Inertia', 'Recharts', 'Stripe'],
                    'github_url' => 'https://github.com',
                ]
            ]);
        }

        if ($tag) {
            $projects = $projects->filter(function ($project) use ($tag) {
                $tags = is_array($project['tags']) ? $project['tags'] : json_decode($project['tags'], true) ?? [];
                return collect($tags)->map(fn($t) => strtolower($t))->contains(strtolower($tag));
            })->values();
        }

        return Response::json($projects);
    }
}

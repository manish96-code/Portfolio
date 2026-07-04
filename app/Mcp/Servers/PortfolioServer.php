<?php

declare(strict_types=1);

namespace App\Mcp\Servers;

use Laravel\Mcp\Server;

class PortfolioServer extends Server
{
    protected string $name = 'Manish Sharma Portfolio MCP Server';

    protected string $version = '1.0.0';

    protected string $instructions = 'Interactive tools to view developer profile information, inspect current database projects, and submit contact messages programmatically.';

    /**
     * @var array<int, class-string<\Laravel\Mcp\Server\Tool>>
     */
    protected array $tools = [
        \App\Mcp\Tools\GetProfileTool::class,
        \App\Mcp\Tools\GetProjectsTool::class,
        \App\Mcp\Tools\SubmitContactTool::class,
    ];
}

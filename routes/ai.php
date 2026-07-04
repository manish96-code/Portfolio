<?php

declare(strict_types=1);

use App\Mcp\Servers\PortfolioServer;
use Laravel\Mcp\Facades\Mcp;

Mcp::web('/mcp', PortfolioServer::class);
Mcp::local('portfolio', PortfolioServer::class);

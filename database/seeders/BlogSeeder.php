<?php

namespace Database\Seeders;

use App\Models\Blog;
use Illuminate\Database\Seeder;

class BlogSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $blogs = [
            [
                'title' => 'Mastering React 19 in Laravel Applications',
                'slug' => 'mastering-react-19-in-laravel',
                'summary' => 'Explore the new features of React 19, including server actions, document metadata, and how to seamlessly integrate them with Inertia.js.',
                'content' => "# Mastering React 19 in Laravel Applications\n\nReact 19 brings a suite of features that drastically improve developer experience and application performance. In this post, we'll dive deep into integrating these with Laravel and Inertia.js.\n\n## 1. Document Metadata Support\nIn React 19, you can write `<title>` and `<meta>` tags directly in your components without third-party libraries like react-helmet. Inertia's built-in `<Head>` component works perfectly alongside this.\n\n```jsx\nimport { Head } from '@inertiajs/react';\n\nexport default function Page() {\n    return (\n        <>\n            <Head>\n                <title>My Article</title>\n                <meta name=\"description\" content=\"A deep dive article.\" />\n            </Head>\n            <div>Content here...</div>\n        </>\n    );\n}\n```\n\n## 2. Server Actions and Forms\nForm submissions in Inertia are already optimized via Inertia's `useForm` helper, which aligns nicely with React 19's focus on structured form states. It manages pending states, error states, and resets efficiently.\n\n## 3. Suspense and Asset Loading\nReact 19 optimizes asset loading out-of-the-box. Dynamic imports of pages via Vite glob matching works seamlessly under the hood in the client-side router, meaning faster initial page loads and smooth client routing.",
                'thumbnail' => '/images/blogs/react19.jpg',
                'category' => 'Frontend',
                'tags' => ['React', 'Inertia.js', 'Vite'],
                'status' => 'published',
                'meta_title' => 'Mastering React 19 in Laravel Applications | Manish Kumar',
                'meta_description' => 'A comprehensive guide to integrating React 19 features like document metadata and suspense with Laravel and Inertia.js.',
            ],
            [
                'title' => 'Building Custom MCP Servers with Laravel',
                'slug' => 'building-custom-mcp-servers-with-laravel',
                'summary' => 'An introduction to the Model Context Protocol (MCP) and how to configure custom endpoints in Laravel to expose resources to coding AI agents.',
                'content' => "# Building Custom MCP Servers with Laravel\n\nModel Context Protocol (MCP) is a standard created to bridge the gap between AI coding assistants and local development ecosystems. By building an MCP server in your Laravel application, you enable agents like Gemini or Claude to view schemas, search books, or submit records programmatically.\n\n## Why use Laravel MCP?\nExposing raw REST APIs to AI clients can be tedious. The `laravel/mcp` package simplifies this by defining Tools, Prompts, and Resources using standard PHP classes and JSON Schema schemas.\n\n## Setup\nFirst, install the package:\n\n```bash\ncomposer require laravel/mcp\n```\n\nThen create your server:\n\n```php\nnamespace App\\Mcp\\Servers;\n\nuse Laravel\\Mcp\\Server;\n\nclass CustomServer extends Server {\n    protected array \$tools = [\n        \\App\\Mcp\\Tools\\CustomTool::class,\n    ];\n}\n```\n\nRegister the server in `routes/ai.php` and AI agents will immediately discover your custom endpoints! This is extremely powerful for building specialized admin helpers.",
                'thumbnail' => '/images/blogs/mcp-laravel.jpg',
                'category' => 'Backend',
                'tags' => ['Laravel', 'MCP', 'AI Integration'],
                'status' => 'published',
                'meta_title' => 'Building Custom MCP Servers with Laravel | Manish Kumar',
                'meta_description' => 'Learn how to construct Model Context Protocol servers in Laravel using the official laravel/mcp package to empower AI assistants.',
            ]
        ];

        foreach ($blogs as $blog) {
            Blog::updateOrCreate(
                ['slug' => $blog['slug']],
                $blog
            );
        }
    }
}

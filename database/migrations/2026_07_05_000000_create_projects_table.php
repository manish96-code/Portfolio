<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('description');
            $table->longText('content')->nullable(); // Markdown formatted overview, features, challenges, etc.
            $table->string('thumbnail')->nullable();
            $table->json('images')->nullable(); // Gallery images
            $table->json('technologies')->nullable(); // Array of tech tags
            $table->string('github_url')->nullable();
            $table->string('live_url')->nullable();
            $table->string('status')->default('Completed'); // Completed, In Progress, etc.
            $table->boolean('is_featured')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};

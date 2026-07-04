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
        Schema::create('experiences', function (Blueprint $table) {
            $table->id();
            $table->string('company');
            $table->string('designation');
            $table->string('duration'); // e.g. "Currently", "Jan 2024 - Present", "Jun 2023 - Dec 2023"
            $table->text('description')->nullable();
            $table->json('skills_used')->nullable(); // Tech stacks used
            $table->boolean('is_current')->default(false);
            $table->integer('order_index')->default(0); // For layout sorting
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('experiences');
    }
};

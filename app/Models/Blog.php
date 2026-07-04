<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'summary',
        'content',
        'thumbnail',
        'category',
        'tags',
        'status',
        'meta_title',
        'meta_description',
    ];

    protected $casts = [
        'tags' => 'array',
    ];
}

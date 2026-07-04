<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Experience extends Model
{
    use HasFactory;

    protected $fillable = [
        'company',
        'designation',
        'duration',
        'description',
        'skills_used',
        'is_current',
        'order_index',
    ];

    protected $casts = [
        'skills_used' => 'array',
        'is_current' => 'boolean',
        'order_index' => 'integer',
    ];
}

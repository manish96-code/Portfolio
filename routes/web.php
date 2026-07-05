<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\CertificateController;
use App\Http\Controllers\ExperienceController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\PublicController;
use App\Http\Controllers\SkillController;
use App\Http\Controllers\SocialLinkController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/
Route::get('/', [PublicController::class, 'index'])->name('home');
Route::get('/project/{slug}', [PublicController::class, 'projectDetails'])->name('project.details');
Route::get('/blogs', [PublicController::class, 'blogList'])->name('blogs.index');
Route::get('/blog/{slug}', [PublicController::class, 'blogShow'])->name('blogs.show');
Route::post('/contact', [PublicController::class, 'submitContact'])->name('contact.submit');
Route::get('/resume/download', [PublicController::class, 'downloadResume'])->name('resume.download');

/*
|--------------------------------------------------------------------------
| Authentication Routes
|--------------------------------------------------------------------------
*/
Route::get('/login', [AuthController::class, 'showLoginForm'])->name('login');
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

/*
|--------------------------------------------------------------------------
| Admin Protected Dashboard Routes
|--------------------------------------------------------------------------
*/
Route::middleware(['auth'])->prefix('admin')->name('admin.')->group(function () {
    // Dashboard Stats
    Route::get('/dashboard', [AdminController::class, 'dashboard'])->name('dashboard');

    // Settings
    Route::get('/settings', [AdminController::class, 'settings'])->name('settings');
    Route::post('/settings', [AdminController::class, 'updateSettings'])->name('settings.update');
    Route::post('/resume/upload', [AdminController::class, 'uploadResume'])->name('resume.upload');

    // Profile Settings
    Route::get('/profile', [AdminController::class, 'profile'])->name('profile');
    Route::post('/profile', [AdminController::class, 'updateProfile'])->name('profile.update');

    // Contact Messages
    Route::get('/messages', [AdminController::class, 'messages'])->name('messages.index');
    Route::post('/messages/{id}/read', [AdminController::class, 'markMessageRead'])->name('messages.read');
    Route::delete('/messages/{id}', [AdminController::class, 'deleteMessage'])->name('messages.destroy');

    // Module CRUD Resources
    Route::resource('projects', ProjectController::class)->except(['create', 'show', 'edit']);
    Route::resource('skills', SkillController::class)->except(['create', 'show', 'edit']);
    Route::resource('experiences', ExperienceController::class)->except(['create', 'show', 'edit']);
    Route::resource('certificates', CertificateController::class)->except(['create', 'show', 'edit']);
    Route::resource('blogs', BlogController::class)->except(['create', 'show', 'edit']);
    Route::resource('social-links', SocialLinkController::class)->except(['create', 'show', 'edit']);
});

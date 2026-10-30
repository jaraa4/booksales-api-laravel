<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GenreController;
use App\Http\Controllers\AuthorController;
use App\Http\Controllers\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes - Bookstore / Booksales API
|--------------------------------------------------------------------------
| Konfigurasi Routing dengan Middleware:
| 1. Autentikasi: Register, Login, Logout, Profile Me
| 2. Public Routes: Read All (index) & Show Detail (show) pada Genre dan Author
|    -> Dapat diakses oleh semua orang tanpa autentikasi (guest/unauthenticated).
| 3. Protected Routes: Create (store), Update (update), Destroy (destroy)
|    -> Hanya dapat diakses oleh Admin dengan middleware ['auth.api', 'admin'].
*/

// ==========================================
// 1. ROUTE AUTENTIKASI
// ==========================================
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth.api')->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);
});

// ==========================================
// 2. ROUTE PUBLIC (SEMUA ORANG / TANPA LOGIN)
// ==========================================
// Genre: Read All & Show
Route::get('/genres', [GenreController::class, 'index']);
Route::get('/genres/{id}', [GenreController::class, 'show']);

// Author: Read All & Show
Route::get('/authors', [AuthorController::class, 'index']);
Route::get('/authors/{id}', [AuthorController::class, 'show']);

// ==========================================
// 3. ROUTE PROTECTED (KHUSUS ADMIN)
// ==========================================
// Memerlukan valid token ('auth.api') dan role === 'admin' ('admin')
Route::middleware(['auth.api', 'admin'])->group(function () {
    // Genre: Create, Update, Destroy
    Route::post('/genres', [GenreController::class, 'store']);
    Route::put('/genres/{id}', [GenreController::class, 'update']);
    Route::delete('/genres/{id}', [GenreController::class, 'destroy']);

    // Author: Create, Update, Destroy
    Route::post('/authors', [AuthorController::class, 'store']);
    Route::put('/authors/{id}', [AuthorController::class, 'update']);
    Route::delete('/authors/{id}', [AuthorController::class, 'destroy']);
});

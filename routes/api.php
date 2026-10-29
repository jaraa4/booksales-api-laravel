<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GenreController;
use App\Http\Controllers\AuthorController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
| Menggunakan apiResource untuk tabel Genre dan Author
| Menyediakan otomatis endpoint:
| - GET    /api/genres          (index)
| - POST   /api/genres          (store)
| - GET    /api/genres/{id}     (show)
| - PUT/PATCH /api/genres/{id}  (update)
| - DELETE /api/genres/{id}     (destroy)
|
| - GET    /api/authors         (index)
| - POST   /api/authors         (store)
| - GET    /api/authors/{id}    (show)
| - PUT/PATCH /api/authors/{id} (update)
| - DELETE /api/authors/{id}    (destroy)
*/

Route::apiResource('genres', GenreController::class);
Route::apiResource('authors', AuthorController::class);

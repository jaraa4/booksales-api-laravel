<?php

namespace App\Http\Controllers;

use App\Models\Genre;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;

class GenreController extends Controller
{
    /**
     * Read all data for genres table.
     */
    public function index(): JsonResponse
    {
        $genres = Genre::all();

        return response()->json([
            'status' => 'success',
            'message' => 'Data genre berhasil diambil',
            'data' => $genres,
        ], 200);
    }

    /**
     * Create data for genres table.
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required_without:nama|string|max:255',
            'nama' => 'required_without:name|string|max:255',
            'description' => 'nullable|string',
            'deskripsi' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validasi gagal',
                'errors' => $validator->errors(),
            ], 422);
        }

        $genre = Genre::create([
            'name' => $request->input('name') ?? $request->input('nama'),
            'description' => $request->input('description') ?? $request->input('deskripsi'),
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Genre berhasil ditambahkan',
            'data' => $genre,
        ], 201);
    }

    /**
     * Show single data for genre by ID.
     */
    public function show(string|int $id): JsonResponse
    {
        $genre = Genre::find($id);

        if (!$genre) {
            return response()->json([
                'status' => 'error',
                'message' => 'Data genre tidak ditemukan',
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Data genre berhasil ditemukan',
            'data' => $genre,
        ], 200);
    }

    /**
     * Update data for genre by ID.
     */
    public function update(Request $request, string|int $id): JsonResponse
    {
        $genre = Genre::find($id);

        if (!$genre) {
            return response()->json([
                'status' => 'error',
                'message' => 'Data genre tidak ditemukan',
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|required|string|max:255',
            'nama' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'deskripsi' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validasi gagal',
                'errors' => $validator->errors(),
            ], 422);
        }

        if ($request->has('name') || $request->has('nama')) {
            $genre->name = $request->input('name') ?? $request->input('nama');
        }

        if ($request->has('description') || $request->has('deskripsi')) {
            $genre->description = $request->input('description') ?? $request->input('deskripsi');
        }

        $genre->save();

        return response()->json([
            'status' => 'success',
            'message' => 'Data genre berhasil diperbarui',
            'data' => $genre,
        ], 200);
    }

    /**
     * Destroy (Delete) data for genre by ID.
     */
    public function destroy(string|int $id): JsonResponse
    {
        $genre = Genre::find($id);

        if (!$genre) {
            return response()->json([
                'status' => 'error',
                'message' => 'Data genre tidak ditemukan',
            ], 404);
        }

        $genre->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Data genre berhasil dihapus',
        ], 200);
    }
}

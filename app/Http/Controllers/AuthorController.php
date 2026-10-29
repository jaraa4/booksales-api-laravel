<?php

namespace App\Http\Controllers;

use App\Models\Author;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;

class AuthorController extends Controller
{
    /**
     * Read all data for authors table.
     */
    public function index(): JsonResponse
    {
        $authors = Author::all();

        return response()->json([
            'status' => 'success',
            'message' => 'Data author berhasil diambil',
            'data' => $authors,
        ], 200);
    }

    /**
     * Create data for authors table.
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required_without:nama|string|max:255',
            'nama' => 'required_without:name|string|max:255',
            'email' => 'nullable|email|max:255',
            'country' => 'nullable|string|max:255',
            'negara' => 'nullable|string|max:255',
            'bio' => 'nullable|string',
            'bioSingkat' => 'nullable|string',
            'bio_singkat' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validasi gagal',
                'errors' => $validator->errors(),
            ], 422);
        }

        $author = Author::create([
            'name' => $request->input('name') ?? $request->input('nama'),
            'email' => $request->input('email'),
            'country' => $request->input('country') ?? $request->input('negara'),
            'bio' => $request->input('bio') ?? $request->input('bioSingkat') ?? $request->input('bio_singkat'),
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Author berhasil ditambahkan',
            'data' => $author,
        ], 201);
    }

    /**
     * Show single data for author by ID.
     */
    public function show(string|int $id): JsonResponse
    {
        $author = Author::find($id);

        if (!$author) {
            return response()->json([
                'status' => 'error',
                'message' => 'Data author tidak ditemukan',
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Data author berhasil ditemukan',
            'data' => $author,
        ], 200);
    }

    /**
     * Update data for author by ID.
     */
    public function update(Request $request, string|int $id): JsonResponse
    {
        $author = Author::find($id);

        if (!$author) {
            return response()->json([
                'status' => 'error',
                'message' => 'Data author tidak ditemukan',
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|required|string|max:255',
            'nama' => 'sometimes|required|string|max:255',
            'email' => 'nullable|email|max:255',
            'country' => 'nullable|string|max:255',
            'negara' => 'nullable|string|max:255',
            'bio' => 'nullable|string',
            'bioSingkat' => 'nullable|string',
            'bio_singkat' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validasi gagal',
                'errors' => $validator->errors(),
            ], 422);
        }

        if ($request->has('name') || $request->has('nama')) {
            $author->name = $request->input('name') ?? $request->input('nama');
        }

        if ($request->has('email')) {
            $author->email = $request->input('email');
        }

        if ($request->has('country') || $request->has('negara')) {
            $author->country = $request->input('country') ?? $request->input('negara');
        }

        if ($request->has('bio') || $request->has('bioSingkat') || $request->has('bio_singkat')) {
            $author->bio = $request->input('bio') ?? $request->input('bioSingkat') ?? $request->input('bio_singkat');
        }

        $author->save();

        return response()->json([
            'status' => 'success',
            'message' => 'Data author berhasil diperbarui',
            'data' => $author,
        ], 200);
    }

    /**
     * Destroy (Delete) data for author by ID.
     */
    public function destroy(string|int $id): JsonResponse
    {
        $author = Author::find($id);

        if (!$author) {
            return response()->json([
                'status' => 'error',
                'message' => 'Data author tidak ditemukan',
            ], 404);
        }

        $author->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Data author berhasil dihapus',
        ], 200);
    }
}

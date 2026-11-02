<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\Transaksi;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;

class TransaksiController extends Controller
{
    /**
     * Read all transaksi data. (Admin only)
     * Mengambil semua data transaksi beserta relasi user dan book (beserta author & genre-nya).
     */
    public function index(): JsonResponse
    {
        $transaksis = Transaksi::with([
            'user:id,name,email,role',
            'book.author:id,name,country',
            'book.genre:id,name',
        ])->get();

        return response()->json([
            'status'  => 'success',
            'message' => 'Data transaksi berhasil diambil',
            'data'    => $transaksis,
        ], 200);
    }

    /**
     * Create a new transaksi. (Authenticated customer)
     * Customer yang sudah login dapat membuat transaksi baru.
     */
    public function store(Request $request): JsonResponse
    {
        $user = $request->user() ?? $request->attributes->get('auth_user');

        $validator = Validator::make($request->all(), [
            'book_id'  => 'required|integer|exists:books,id',
            'quantity' => 'required|integer|min:1',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status'  => 'error',
                'message' => 'Validasi gagal',
                'errors'  => $validator->errors(),
            ], 422);
        }

        $book = Book::find($request->book_id);

        // Cek ketersediaan stok
        if ($book->stock < $request->quantity) {
            return response()->json([
                'status'  => 'error',
                'message' => 'Stok buku tidak mencukupi. Stok tersedia: ' . $book->stock,
            ], 422);
        }

        $totalPrice = $book->price * $request->quantity;

        $transaksi = Transaksi::create([
            'user_id'     => $user->id,
            'book_id'     => $book->id,
            'quantity'    => $request->quantity,
            'total_price' => $totalPrice,
            'status'      => 'pending',
        ]);

        // Kurangi stok buku
        $book->stock -= $request->quantity;
        $book->save();

        // Load relasi untuk response
        $transaksi->load([
            'user:id,name,email,role',
            'book.author:id,name,country',
            'book.genre:id,name',
        ]);

        return response()->json([
            'status'  => 'success',
            'message' => 'Transaksi berhasil dibuat',
            'data'    => $transaksi,
        ], 201);
    }

    /**
     * Show single transaksi by ID. (Authenticated customer)
     * Customer dapat melihat detail transaksi miliknya sendiri.
     */
    public function show(Request $request, int $id): JsonResponse
    {
        $user = $request->user() ?? $request->attributes->get('auth_user');

        $transaksi = Transaksi::with([
            'user:id,name,email,role',
            'book.author:id,name,country',
            'book.genre:id,name',
        ])->find($id);

        if (!$transaksi) {
            return response()->json([
                'status'  => 'error',
                'message' => 'Data transaksi tidak ditemukan',
            ], 404);
        }

        // Customer hanya bisa melihat transaksi miliknya sendiri
        if (!$user->isAdmin() && $transaksi->user_id !== $user->id) {
            return response()->json([
                'status'  => 'error',
                'message' => 'Akses terlarang. Anda tidak memiliki izin untuk melihat transaksi ini.',
            ], 403);
        }

        return response()->json([
            'status'  => 'success',
            'message' => 'Data transaksi berhasil ditemukan',
            'data'    => $transaksi,
        ], 200);
    }

    /**
     * Update transaksi status by ID. (Authenticated customer)
     * Customer dapat mengubah status transaksi miliknya (misal: cancel).
     */
    public function update(Request $request, int $id): JsonResponse
    {
        $user = $request->user() ?? $request->attributes->get('auth_user');

        $transaksi = Transaksi::find($id);

        if (!$transaksi) {
            return response()->json([
                'status'  => 'error',
                'message' => 'Data transaksi tidak ditemukan',
            ], 404);
        }

        // Customer hanya bisa mengubah transaksi miliknya sendiri
        if (!$user->isAdmin() && $transaksi->user_id !== $user->id) {
            return response()->json([
                'status'  => 'error',
                'message' => 'Akses terlarang. Anda tidak memiliki izin untuk mengubah transaksi ini.',
            ], 403);
        }

        $validator = Validator::make($request->all(), [
            'status' => 'required|string|in:pending,paid,cancelled',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status'  => 'error',
                'message' => 'Validasi gagal',
                'errors'  => $validator->errors(),
            ], 422);
        }

        // Jika status berubah menjadi 'cancelled', kembalikan stok buku
        if ($request->status === 'cancelled' && $transaksi->status !== 'cancelled') {
            $book = Book::find($transaksi->book_id);
            if ($book) {
                $book->stock += $transaksi->quantity;
                $book->save();
            }
        }

        $transaksi->status = $request->status;
        $transaksi->save();

        $transaksi->load([
            'user:id,name,email,role',
            'book.author:id,name,country',
            'book.genre:id,name',
        ]);

        return response()->json([
            'status'  => 'success',
            'message' => 'Data transaksi berhasil diperbarui',
            'data'    => $transaksi,
        ], 200);
    }

    /**
     * Destroy (delete) transaksi by ID. (Admin only)
     * Admin dapat menghapus data transaksi.
     */
    public function destroy(int $id): JsonResponse
    {
        $transaksi = Transaksi::find($id);

        if (!$transaksi) {
            return response()->json([
                'status'  => 'error',
                'message' => 'Data transaksi tidak ditemukan',
            ], 404);
        }

        $transaksi->delete();

        return response()->json([
            'status'  => 'success',
            'message' => 'Data transaksi berhasil dihapus',
        ], 200);
    }
}

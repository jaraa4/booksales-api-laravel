<?php

namespace Tests\Feature;

use App\Models\Author;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AuthorTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_read_all_authors(): void
    {
        Author::create([
            'name' => 'Andrea Hirata',
            'email' => 'andrea@bookstore.id',
            'country' => 'Indonesia',
            'bio' => 'Penulis novel Laskar Pelangi',
        ]);

        $response = $this->getJson('/api/authors');

        $response->assertStatus(200)
            ->assertJsonStructure([
                'status',
                'message',
                'data' => [
                    '*' => ['id', 'name', 'email', 'country', 'bio', 'created_at', 'updated_at']
                ]
            ]);
    }

    public function test_can_create_author(): void
    {
        $payload = [
            'name' => 'Tere Liye',
            'email' => 'tere.liye@bookstore.id',
            'country' => 'Indonesia',
            'bio' => 'Penulis novel terkenal Indonesia',
        ];

        $response = $this->postJson('/api/authors', $payload);

        $response->assertStatus(201)
            ->assertJson([
                'status' => 'success',
                'message' => 'Author berhasil ditambahkan',
                'data' => [
                    'name' => 'Tere Liye',
                    'email' => 'tere.liye@bookstore.id',
                ]
            ]);

        $this->assertDatabaseHas('authors', [
            'name' => 'Tere Liye',
            'email' => 'tere.liye@bookstore.id',
        ]);
    }

    public function test_can_show_author(): void
    {
        $author = Author::create([
            'name' => 'Pramoedya Ananta Toer',
            'email' => 'pramoedya@bookstore.id',
            'country' => 'Indonesia',
            'bio' => 'Sastrawan Indonesia',
        ]);

        $response = $this->getJson("/api/authors/{$author->id}");

        $response->assertStatus(200)
            ->assertJson([
                'status' => 'success',
                'message' => 'Data author berhasil ditemukan',
                'data' => [
                    'id' => $author->id,
                    'name' => 'Pramoedya Ananta Toer',
                ]
            ]);
    }

    public function test_show_author_not_found_returns_404(): void
    {
        $response = $this->getJson('/api/authors/99999');

        $response->assertStatus(404)
            ->assertJson([
                'status' => 'error',
                'message' => 'Data author tidak ditemukan',
            ]);
    }

    public function test_can_update_author(): void
    {
        $author = Author::create([
            'name' => 'Nama Lama',
            'email' => 'lama@bookstore.id',
            'country' => 'Indonesia',
            'bio' => 'Bio lama',
        ]);

        $payload = [
            'name' => 'Nama Baru',
            'email' => 'baru@bookstore.id',
        ];

        $response = $this->putJson("/api/authors/{$author->id}", $payload);

        $response->assertStatus(200)
            ->assertJson([
                'status' => 'success',
                'message' => 'Data author berhasil diperbarui',
                'data' => [
                    'id' => $author->id,
                    'name' => 'Nama Baru',
                    'email' => 'baru@bookstore.id',
                ]
            ]);

        $this->assertDatabaseHas('authors', [
            'id' => $author->id,
            'name' => 'Nama Baru',
            'email' => 'baru@bookstore.id',
        ]);
    }

    public function test_update_author_not_found_returns_404(): void
    {
        $response = $this->putJson('/api/authors/99999', [
            'name' => 'Tidak Ada',
        ]);

        $response->assertStatus(404)
            ->assertJson([
                'status' => 'error',
                'message' => 'Data author tidak ditemukan',
            ]);
    }

    public function test_can_destroy_author(): void
    {
        $author = Author::create([
            'name' => 'Author Hapus',
            'email' => 'hapus@bookstore.id',
        ]);

        $response = $this->deleteJson("/api/authors/{$author->id}");

        $response->assertStatus(200)
            ->assertJson([
                'status' => 'success',
                'message' => 'Data author berhasil dihapus',
            ]);

        $this->assertDatabaseMissing('authors', [
            'id' => $author->id,
        ]);
    }

    public function test_destroy_author_not_found_returns_404(): void
    {
        $response = $this->deleteJson('/api/authors/99999');

        $response->assertStatus(404)
            ->assertJson([
                'status' => 'error',
                'message' => 'Data author tidak ditemukan',
            ]);
    }
}

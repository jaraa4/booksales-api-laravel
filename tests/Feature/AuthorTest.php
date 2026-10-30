<?php

namespace Tests\Feature;

use App\Models\Author;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AuthorTest extends TestCase
{
    use RefreshDatabase;

    private User $adminUser;
    private User $regularUser;

    protected function setUp(): void
    {
        parent::setUp();

        $this->adminUser = User::create([
            'name' => 'Admin Test',
            'email' => 'admin@test.com',
            'password' => bcrypt('password123'),
            'role' => 'admin',
            'api_token' => 'admin-test-token-author',
        ]);

        $this->regularUser = User::create([
            'name' => 'Regular User Test',
            'email' => 'user@test.com',
            'password' => bcrypt('password123'),
            'role' => 'user',
            'api_token' => 'user-test-token-author',
        ]);
    }

    public function test_public_user_can_read_all_authors(): void
    {
        Author::create([
            'name' => 'Andrea Hirata',
            'email' => 'andrea@test.com',
            'country' => 'Indonesia',
            'bio' => 'Penulis Laskar Pelangi',
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

    public function test_public_user_can_show_author(): void
    {
        $author = Author::create([
            'name' => 'Tere Liye',
            'email' => 'tereliye@test.com',
            'country' => 'Indonesia',
            'bio' => 'Penulis Produktif',
        ]);

        $response = $this->getJson("/api/authors/{$author->id}");

        $response->assertStatus(200)
            ->assertJson([
                'status' => 'success',
                'message' => 'Data author berhasil ditemukan',
                'data' => [
                    'id' => $author->id,
                    'name' => 'Tere Liye',
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

    public function test_unauthenticated_user_cannot_create_author(): void
    {
        $payload = [
            'name' => 'Pramoedya',
            'email' => 'pram@test.com',
        ];

        $response = $this->postJson('/api/authors', $payload);

        $response->assertStatus(401);
    }

    public function test_regular_user_cannot_create_author(): void
    {
        $payload = [
            'name' => 'Pramoedya',
            'email' => 'pram@test.com',
        ];

        $response = $this->withHeader('Authorization', 'Bearer ' . $this->regularUser->api_token)
            ->postJson('/api/authors', $payload);

        $response->assertStatus(403);
    }

    public function test_admin_user_can_create_author(): void
    {
        $payload = [
            'name' => 'Pramoedya Ananta Toer',
            'email' => 'pram@bookstore.id',
            'country' => 'Indonesia',
            'bio' => 'Sastrawan Besar',
        ];

        $response = $this->withHeader('Authorization', 'Bearer ' . $this->adminUser->api_token)
            ->postJson('/api/authors', $payload);

        $response->assertStatus(201)
            ->assertJson([
                'status' => 'success',
                'message' => 'Author berhasil ditambahkan',
                'data' => [
                    'name' => 'Pramoedya Ananta Toer',
                ]
            ]);

        $this->assertDatabaseHas('authors', [
            'name' => 'Pramoedya Ananta Toer',
        ]);
    }

    public function test_unauthenticated_user_cannot_update_author(): void
    {
        $author = Author::create([
            'name' => 'Penulis Lama',
        ]);

        $response = $this->putJson("/api/authors/{$author->id}", [
            'name' => 'Penulis Baru',
        ]);

        $response->assertStatus(401);
    }

    public function test_regular_user_cannot_update_author(): void
    {
        $author = Author::create([
            'name' => 'Penulis Lama',
        ]);

        $response = $this->withHeader('Authorization', 'Bearer ' . $this->regularUser->api_token)
            ->putJson("/api/authors/{$author->id}", [
                'name' => 'Penulis Baru',
            ]);

        $response->assertStatus(403);
    }

    public function test_admin_user_can_update_author(): void
    {
        $author = Author::create([
            'name' => 'Penulis Lama',
        ]);

        $payload = [
            'name' => 'Penulis Baru Diupdate',
            'bio' => 'Bio baru',
        ];

        $response = $this->withHeader('Authorization', 'Bearer ' . $this->adminUser->api_token)
            ->putJson("/api/authors/{$author->id}", $payload);

        $response->assertStatus(200)
            ->assertJson([
                'status' => 'success',
                'message' => 'Data author berhasil diperbarui',
                'data' => [
                    'id' => $author->id,
                    'name' => 'Penulis Baru Diupdate',
                ]
            ]);

        $this->assertDatabaseHas('authors', [
            'id' => $author->id,
            'name' => 'Penulis Baru Diupdate',
        ]);
    }

    public function test_admin_update_author_not_found_returns_404(): void
    {
        $response = $this->withHeader('Authorization', 'Bearer ' . $this->adminUser->api_token)
            ->putJson('/api/authors/99999', [
                'name' => 'Tidak Ada',
            ]);

        $response->assertStatus(404)
            ->assertJson([
                'status' => 'error',
                'message' => 'Data author tidak ditemukan',
            ]);
    }

    public function test_unauthenticated_user_cannot_destroy_author(): void
    {
        $author = Author::create([
            'name' => 'Author Hapus',
        ]);

        $response = $this->deleteJson("/api/authors/{$author->id}");

        $response->assertStatus(401);
    }

    public function test_regular_user_cannot_destroy_author(): void
    {
        $author = Author::create([
            'name' => 'Author Hapus',
        ]);

        $response = $this->withHeader('Authorization', 'Bearer ' . $this->regularUser->api_token)
            ->deleteJson("/api/authors/{$author->id}");

        $response->assertStatus(403);
    }

    public function test_admin_user_can_destroy_author(): void
    {
        $author = Author::create([
            'name' => 'Author Hapus',
        ]);

        $response = $this->withHeader('Authorization', 'Bearer ' . $this->adminUser->api_token)
            ->deleteJson("/api/authors/{$author->id}");

        $response->assertStatus(200)
            ->assertJson([
                'status' => 'success',
                'message' => 'Data author berhasil dihapus',
            ]);

        $this->assertDatabaseMissing('authors', [
            'id' => $author->id,
        ]);
    }

    public function test_admin_destroy_author_not_found_returns_404(): void
    {
        $response = $this->withHeader('Authorization', 'Bearer ' . $this->adminUser->api_token)
            ->deleteJson('/api/authors/99999');

        $response->assertStatus(404)
            ->assertJson([
                'status' => 'error',
                'message' => 'Data author tidak ditemukan',
            ]);
    }
}

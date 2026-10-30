<?php

namespace Tests\Feature;

use App\Models\Genre;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class GenreTest extends TestCase
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
            'api_token' => 'admin-test-token-valid',
        ]);

        $this->regularUser = User::create([
            'name' => 'Regular User Test',
            'email' => 'user@test.com',
            'password' => bcrypt('password123'),
            'role' => 'user',
            'api_token' => 'user-test-token-valid',
        ]);
    }

    public function test_public_user_can_read_all_genres(): void
    {
        Genre::create([
            'name' => 'Fiksi Ilmiah',
            'description' => 'Genre fiksi ilmiah futuristik',
        ]);

        $response = $this->getJson('/api/genres');

        $response->assertStatus(200)
            ->assertJsonStructure([
                'status',
                'message',
                'data' => [
                    '*' => ['id', 'name', 'description', 'created_at', 'updated_at']
                ]
            ]);
    }

    public function test_public_user_can_show_genre(): void
    {
        $genre = Genre::create([
            'name' => 'Misteri',
            'description' => 'Genre penuh misteri',
        ]);

        $response = $this->getJson("/api/genres/{$genre->id}");

        $response->assertStatus(200)
            ->assertJson([
                'status' => 'success',
                'message' => 'Data genre berhasil ditemukan',
                'data' => [
                    'id' => $genre->id,
                    'name' => 'Misteri',
                ]
            ]);
    }

    public function test_show_genre_not_found_returns_404(): void
    {
        $response = $this->getJson('/api/genres/99999');

        $response->assertStatus(404)
            ->assertJson([
                'status' => 'error',
                'message' => 'Data genre tidak ditemukan',
            ]);
    }

    public function test_unauthenticated_user_cannot_create_genre(): void
    {
        $payload = [
            'name' => 'Romansa',
            'description' => 'Genre romansa',
        ];

        $response = $this->postJson('/api/genres', $payload);

        $response->assertStatus(401)
            ->assertJson([
                'status' => 'error',
            ]);
    }

    public function test_regular_user_cannot_create_genre(): void
    {
        $payload = [
            'name' => 'Romansa',
            'description' => 'Genre romansa',
        ];

        $response = $this->withHeader('Authorization', 'Bearer ' . $this->regularUser->api_token)
            ->postJson('/api/genres', $payload);

        $response->assertStatus(403)
            ->assertJson([
                'status' => 'error',
                'message' => 'Akses terlarang. Fitur ini hanya dapat diakses oleh Admin.',
            ]);
    }

    public function test_admin_user_can_create_genre(): void
    {
        $payload = [
            'name' => 'Romansa',
            'description' => 'Genre kisah cinta dan asmara',
        ];

        $response = $this->withHeader('Authorization', 'Bearer ' . $this->adminUser->api_token)
            ->postJson('/api/genres', $payload);

        $response->assertStatus(201)
            ->assertJson([
                'status' => 'success',
                'message' => 'Genre berhasil ditambahkan',
                'data' => [
                    'name' => 'Romansa',
                    'description' => 'Genre kisah cinta dan asmara',
                ]
            ]);

        $this->assertDatabaseHas('genres', [
            'name' => 'Romansa',
        ]);
    }

    public function test_unauthenticated_user_cannot_update_genre(): void
    {
        $genre = Genre::create([
            'name' => 'Horor Lama',
            'description' => 'Deskripsi lama',
        ]);

        $response = $this->putJson("/api/genres/{$genre->id}", [
            'name' => 'Horor Baru',
        ]);

        $response->assertStatus(401);
    }

    public function test_regular_user_cannot_update_genre(): void
    {
        $genre = Genre::create([
            'name' => 'Horor Lama',
            'description' => 'Deskripsi lama',
        ]);

        $response = $this->withHeader('Authorization', 'Bearer ' . $this->regularUser->api_token)
            ->putJson("/api/genres/{$genre->id}", [
                'name' => 'Horor Baru',
            ]);

        $response->assertStatus(403);
    }

    public function test_admin_user_can_update_genre(): void
    {
        $genre = Genre::create([
            'name' => 'Horor Lama',
            'description' => 'Deskripsi lama',
        ]);

        $payload = [
            'name' => 'Horor Baru',
            'description' => 'Deskripsi baru yang diperbarui',
        ];

        $response = $this->withHeader('Authorization', 'Bearer ' . $this->adminUser->api_token)
            ->putJson("/api/genres/{$genre->id}", $payload);

        $response->assertStatus(200)
            ->assertJson([
                'status' => 'success',
                'message' => 'Data genre berhasil diperbarui',
                'data' => [
                    'id' => $genre->id,
                    'name' => 'Horor Baru',
                ]
            ]);

        $this->assertDatabaseHas('genres', [
            'id' => $genre->id,
            'name' => 'Horor Baru',
        ]);
    }

    public function test_admin_update_genre_not_found_returns_404(): void
    {
        $response = $this->withHeader('Authorization', 'Bearer ' . $this->adminUser->api_token)
            ->putJson('/api/genres/99999', [
                'name' => 'Tidak Ada',
            ]);

        $response->assertStatus(404)
            ->assertJson([
                'status' => 'error',
                'message' => 'Data genre tidak ditemukan',
            ]);
    }

    public function test_unauthenticated_user_cannot_destroy_genre(): void
    {
        $genre = Genre::create([
            'name' => 'Genre Hapus',
            'description' => 'Akan dihapus',
        ]);

        $response = $this->deleteJson("/api/genres/{$genre->id}");

        $response->assertStatus(401);
    }

    public function test_regular_user_cannot_destroy_genre(): void
    {
        $genre = Genre::create([
            'name' => 'Genre Hapus',
            'description' => 'Akan dihapus',
        ]);

        $response = $this->withHeader('Authorization', 'Bearer ' . $this->regularUser->api_token)
            ->deleteJson("/api/genres/{$genre->id}");

        $response->assertStatus(403);
    }

    public function test_admin_user_can_destroy_genre(): void
    {
        $genre = Genre::create([
            'name' => 'Genre Hapus',
            'description' => 'Akan dihapus',
        ]);

        $response = $this->withHeader('Authorization', 'Bearer ' . $this->adminUser->api_token)
            ->deleteJson("/api/genres/{$genre->id}");

        $response->assertStatus(200)
            ->assertJson([
                'status' => 'success',
                'message' => 'Data genre berhasil dihapus',
            ]);

        $this->assertDatabaseMissing('genres', [
            'id' => $genre->id,
        ]);
    }

    public function test_admin_destroy_genre_not_found_returns_404(): void
    {
        $response = $this->withHeader('Authorization', 'Bearer ' . $this->adminUser->api_token)
            ->deleteJson('/api/genres/99999');

        $response->assertStatus(404)
            ->assertJson([
                'status' => 'error',
                'message' => 'Data genre tidak ditemukan',
            ]);
    }
}

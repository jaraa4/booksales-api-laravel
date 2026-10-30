<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AuthTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_register_user(): void
    {
        $payload = [
            'name' => 'John Doe',
            'email' => 'john@test.com',
            'password' => 'secret123',
            'role' => 'user',
        ];

        $response = $this->postJson('/api/register', $payload);

        $response->assertStatus(201)
            ->assertJson([
                'status' => 'success',
                'message' => 'Registrasi berhasil',
            ])
            ->assertJsonStructure([
                'status',
                'message',
                'data' => [
                    'user' => ['id', 'name', 'email', 'role'],
                    'token',
                ]
            ]);

        $this->assertDatabaseHas('users', [
            'email' => 'john@test.com',
            'role' => 'user',
        ]);
    }

    public function test_can_login_user(): void
    {
        User::create([
            'name' => 'Jane Admin',
            'email' => 'jane@test.com',
            'password' => bcrypt('password123'),
            'role' => 'admin',
        ]);

        $response = $this->postJson('/api/login', [
            'email' => 'jane@test.com',
            'password' => 'password123',
        ]);

        $response->assertStatus(200)
            ->assertJson([
                'status' => 'success',
                'message' => 'Login berhasil',
                'data' => [
                    'user' => [
                        'email' => 'jane@test.com',
                        'role' => 'admin',
                    ]
                ]
            ]);
    }

    public function test_login_invalid_credentials_returns_401(): void
    {
        $response = $this->postJson('/api/login', [
            'email' => 'wrong@test.com',
            'password' => 'wrongpassword',
        ]);

        $response->assertStatus(401)
            ->assertJson([
                'status' => 'error',
                'message' => 'Email atau kata sandi tidak valid',
            ]);
    }

    public function test_can_get_user_profile(): void
    {
        $user = User::create([
            'name' => 'Profile User',
            'email' => 'profile@test.com',
            'password' => bcrypt('password123'),
            'role' => 'user',
            'api_token' => 'profile-token-12345',
        ]);

        $response = $this->withHeader('Authorization', 'Bearer ' . $user->api_token)
            ->getJson('/api/me');

        $response->assertStatus(200)
            ->assertJson([
                'status' => 'success',
                'data' => [
                    'email' => 'profile@test.com',
                ]
            ]);
    }
}

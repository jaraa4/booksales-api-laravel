<?php

namespace App\Http\Middleware;

use Closure;
use App\Models\User;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ApiAuthMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $token = $request->bearerToken() ?? $request->header('X-API-TOKEN') ?? $request->input('api_token');

        if (!$token) {
            return response()->json([
                'status' => 'error',
                'message' => 'Akses ditolak. Token autentikasi tidak ditemukan. Silakan login terlebih dahulu.',
            ], 401);
        }

        $user = User::where('api_token', $token)->first();

        if (!$user) {
            return response()->json([
                'status' => 'error',
                'message' => 'Token autentikasi tidak valid atau telah kadaluarsa.',
            ], 401);
        }

        // Set authenticated user to request
        $request->setUserResolver(fn () => $user);
        $request->attributes->set('auth_user', $user);

        return $next($request);
    }
}

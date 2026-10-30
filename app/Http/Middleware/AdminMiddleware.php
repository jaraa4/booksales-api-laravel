<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user() ?? $request->attributes->get('auth_user');

        if (!$user) {
            return response()->json([
                'status' => 'error',
                'message' => 'Akses ditolak. Silakan login terlebih dahulu.',
            ], 401);
        }

        if ($user->role !== 'admin') {
            return response()->json([
                'status' => 'error',
                'message' => 'Akses terlarang. Fitur ini hanya dapat diakses oleh Admin.',
            ], 403);
        }

        return $next($request);
    }
}

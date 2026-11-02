<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Transaksi extends Model
{
    use HasFactory;

    protected $table = 'transaksis';

    protected $fillable = [
        'user_id',
        'book_id',
        'quantity',
        'total_price',
        'status',
    ];

    /**
     * Transaksi belongs to a user (customer).
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Transaksi belongs to a book.
     */
    public function book(): BelongsTo
    {
        return $this->belongsTo(Book::class);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Author extends Model
{
    use HasFactory;

    protected $table = 'authors';

    protected $fillable = [
        'name',
        'email',
        'country',
        'bio',
    ];

    /**
     * An author has many books.
     */
    public function books(): HasMany
    {
        return $this->hasMany(Book::class);
    }
}

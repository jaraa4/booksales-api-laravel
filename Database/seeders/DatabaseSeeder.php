<?php

namespace Database\Seeders;

use App\Models\Genre;
use App\Models\Author;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Seeder Genre
        Genre::firstOrCreate(
            ['name' => 'Fiksi Ilmiah'],
            ['description' => 'Genre yang mengeksplorasi konsep ilmu pengetahuan futuristik dan teknologi canggih.']
        );
        Genre::firstOrCreate(
            ['name' => 'Romansa'],
            ['description' => 'Genre yang berfokus pada kisah cinta dan hubungan romantis antar karakter.']
        );
        Genre::firstOrCreate(
            ['name' => 'Misteri & Thriller'],
            ['description' => 'Genre yang penuh dengan teka-teki, ketegangan, dan alur cerita yang tak terduga.']
        );
        Genre::firstOrCreate(
            ['name' => 'Fantasi'],
            ['description' => 'Genre yang membawa pembaca ke dunia magis dengan makhluk mitos dan petualangan epik.']
        );
        Genre::firstOrCreate(
            ['name' => 'Sejarah'],
            ['description' => 'Genre yang mengisahkan peristiwa nyata atau fiksi berlatar belakang era historis.']
        );

        // Seeder Author
        Author::firstOrCreate(
            ['name' => 'Andrea Hirata'],
            [
                'email' => 'andrea.hirata@bookstore.id',
                'country' => 'Indonesia',
                'bio' => 'Penulis novel Laskar Pelangi, salah satu novel terlaris sepanjang masa di Indonesia.'
            ]
        );
        Author::firstOrCreate(
            ['name' => 'Tere Liye'],
            [
                'email' => 'tere.liye@bookstore.id',
                'country' => 'Indonesia',
                'bio' => 'Penulis prolifik Indonesia yang dikenal lewat karya-karya bernuansa keluarga dan cinta.'
            ]
        );
        Author::firstOrCreate(
            ['name' => 'Pramoedya Ananta Toer'],
            [
                'email' => 'pramoedya@bookstore.id',
                'country' => 'Indonesia',
                'bio' => 'Sastrawan besar Indonesia, terkenal dengan Tetralogi Pulau Buru yang monumental.'
            ]
        );
        Author::firstOrCreate(
            ['name' => 'Raditya Dika'],
            [
                'email' => 'raditya.dika@bookstore.id',
                'country' => 'Indonesia',
                'bio' => 'Penulis, komika, dan sutradara yang terkenal dengan gaya penulisan humor autobiografi.'
            ]
        );
        Author::firstOrCreate(
            ['name' => 'Dewi Lestari'],
            [
                'email' => 'dewi.lestari@bookstore.id',
                'country' => 'Indonesia',
                'bio' => 'Dikenal dengan nama pena Dee Lestari, penulis serial Supernova yang fenomenal.'
            ]
        );
    }
}

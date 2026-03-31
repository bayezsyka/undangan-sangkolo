<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Default Admin Account
        User::updateOrCreate(['email' => 'farros@sangkolo.store'], [
            'name' => 'Admin Sangkolo',
            'password' => bcrypt('password'),
        ]);

        $this->call([
            WeddingSeeder::class,
        ]);
    }
}

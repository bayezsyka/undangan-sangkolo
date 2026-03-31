<?php

namespace Database\Factories;

use App\Models\Invitation;
use Illuminate\Database\Eloquent\Factories\Factory;

class GuestMessageFactory extends Factory
{
    public function definition(): array
    {
        return [
            'invitation_id' => Invitation::factory(),
            'name' => $this->faker->name(),
            'relation' => $this->faker->randomElement(['Keluarga', 'Teman Sekolah', 'Rekan Kerja']),
            'message' => $this->faker->paragraph(),
            'is_approved' => $this->faker->boolean(),
        ];
    }
}

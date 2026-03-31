<?php

namespace Database\Factories;

use App\Models\Invitation;
use Illuminate\Database\Eloquent\Factories\Factory;

class RsvpFactory extends Factory
{
    public function definition(): array
    {
        return [
            'invitation_id' => Invitation::factory(),
            'name' => $this->faker->name(),
            'attendance_status' => $this->faker->randomElement(['attending', 'maybe', 'not_attending']),
            'guest_count' => $this->faker->numberBetween(1, 5),
            'notes' => $this->faker->sentence(),
        ];
    }
}

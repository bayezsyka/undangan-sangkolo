<?php

namespace Database\Factories;

use App\Models\Client;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProjectFactory extends Factory
{
    public function definition(): array
    {
        return [
            'client_id' => Client::factory(),
            'name_project' => 'Project ' . strtoupper($this->faker->bothify('??-#')),
            'event_type' => $this->faker->randomElement(['Wedding', 'Engagement', 'Birthday']),
            'event_date' => $this->faker->dateTimeBetween('+2 months', '+8 months'),
            'status_order' => $this->faker->randomElement(['pending', 'paid', 'cancelled']),
            'status_project' => $this->faker->randomElement(['queue', 'designing', 'revision', 'finished']),
            'is_active_slot' => false,
            'deadline' => $this->faker->dateTimeBetween('+1 month', '+2 months'),
            'notes' => $this->faker->sentence(),
        ];
    }
}

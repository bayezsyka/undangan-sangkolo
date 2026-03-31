<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class LeadFactory extends Factory
{
    public function definition(): array
    {
        return [
            'client_id' => null,
            'name_calon' => $this->faker->name(),
            'whatsapp' => $this->faker->phoneNumber(),
            'event_type' => $this->faker->randomElement(['Wedding', 'Engagement', 'Birthday']),
            'event_date' => $this->faker->dateTimeBetween('+1 month', '+6 months'),
            'source' => $this->faker->randomElement(['Instagram', 'Facebook', 'Referral', 'Website']),
            'status' => $this->faker->randomElement(['new', 'contacted', 'negotiating', 'closed', 'lost']),
            'notes' => $this->faker->sentence(),
        ];
    }
}

<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class TemplateFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => $this->faker->randomElement(['Elegant Gold', 'Modern Minimalist', 'Royal Javanese', 'Rustic Bloom']),
            'thumbnail' => 'https://placehold.co/600x400',
            'preview_url' => 'https://sangkolo.com/preview/' . $this->faker->slug(),
            'is_active' => true,
        ];
    }
}

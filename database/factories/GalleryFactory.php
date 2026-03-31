<?php

namespace Database\Factories;

use App\Models\Invitation;
use Illuminate\Database\Eloquent\Factories\Factory;

class GalleryFactory extends Factory
{
    public function definition(): array
    {
        return [
            'invitation_id' => Invitation::factory(),
            'image_path' => 'https://placehold.co/800x1200',
            'caption' => $this->faker->sentence(),
            'order' => $this->faker->numberBetween(1, 10),
        ];
    }
}

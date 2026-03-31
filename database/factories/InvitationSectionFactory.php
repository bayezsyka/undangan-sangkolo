<?php

namespace Database\Factories;

use App\Models\Invitation;
use Illuminate\Database\Eloquent\Factories\Factory;

class InvitationSectionFactory extends Factory
{
    public function definition(): array
    {
        return [
            'invitation_id' => Invitation::factory(),
            'section_type' => $this->faker->randomElement(['hero', 'story', 'event', 'location', 'gallery', 'rsvp', 'footer']),
            'title' => $this->faker->word(),
            'content' => ['subtitle' => $this->faker->sentence(), 'body' => $this->faker->paragraph()],
            'order' => $this->faker->numberBetween(1, 10),
            'is_active' => true,
        ];
    }
}

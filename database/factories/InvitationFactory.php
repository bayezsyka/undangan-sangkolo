<?php

namespace Database\Factories;

use App\Models\Project;
use App\Models\Template;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class InvitationFactory extends Factory
{
    public function definition(): array
    {
        $title = $this->faker->sentence(3);
        return [
            'project_id' => Project::factory(),
            'template_id' => Template::factory(),
            'slug' => Str::slug($title) . '-' . Str::random(5),
            'title' => $title,
            'description' => $this->faker->paragraph(),
            'is_published' => $this->faker->boolean(),
        ];
    }
}

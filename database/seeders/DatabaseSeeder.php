<?php

namespace Database\Seeders;

use App\Models\Client;
use App\Models\Gallery;
use App\Models\GuestMessage;
use App\Models\Invitation;
use App\Models\InvitationSection;
use App\Models\Lead;
use App\Models\Project;
use App\Models\Rsvp;
use App\Models\Template;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Admin Default
        User::updateOrCreate(['email' => 'farros@sangkolo.store'], [
            'name' => 'Admin Sangkolo',
            'password' => bcrypt('password'),
        ]);

        // 2. Templates
        $templates = [
            ['name' => 'Royal Javanese', 'category' => 'Wedding', 'preview' => 'https://sangkolo.com/p/royal'],
            ['name' => 'Modern Minimalist', 'category' => 'Wedding', 'preview' => 'https://sangkolo.com/p/modern'],
            ['name' => 'Rustic Bloom', 'category' => 'Engagement', 'preview' => 'https://sangkolo.com/p/rustic'],
        ];

        foreach ($templates as $t) {
            Template::create([
                'name' => $t['name'],
                'category' => $t['category'],
                'thumbnail' => 'https://placehold.co/600x400',
                'preview_url' => $t['preview'],
                'is_active' => true,
                'default_settings' => [
                    'primary_color' => '#4f46e5',
                    'font_family' => 'Outfit',
                ],
            ]);
        }

        $allTemplates = Template::all();

        // 3. Clients & Leads
        $clients = Client::factory(8)->create();
        Lead::factory(12)->create();

        // 4. Projects & Invitations (Simulation of Slots)
        foreach ($clients as $index => $client) {
            $is_active = $index < 3;
            $status_order = $index < 6 ? 'paid' : 'pending';

            $project = Project::factory()->create([
                'client_id' => $client->id,
                'is_active_slot' => $is_active,
                'status_order' => $status_order,
                'status_project' => $is_active ? 'designing' : 'queue',
            ]);

            // Create Invitation if Paid
            if ($status_order === 'paid') {
                $invitation = Invitation::create([
                    'project_id' => $project->id,
                    'template_id' => $allTemplates->random()->id,
                    'slug' => Str::slug($project->name_project).'-'.rand(100, 999),
                    'title' => $project->name_project,
                    'is_published' => $is_active,
                ]);

                // Modular Sections
                foreach (['hero', 'opening', 'event', 'gallery', 'rsvp', 'guest_messages'] as $order => $type) {
                    InvitationSection::create([
                        'invitation_id' => $invitation->id,
                        'section_type' => $type,
                        'title' => ucfirst($type),
                        'order' => $order,
                        'is_active' => true,
                        'content' => ['couple_names' => $client->name.' & Partner'],
                    ]);
                }

                // Random Interaction
                if ($is_active) {
                    Gallery::factory(4)->create(['invitation_id' => $invitation->id]);
                    Rsvp::factory(8)->create(['invitation_id' => $invitation->id]);
                    GuestMessage::factory(5)->create(['invitation_id' => $invitation->id, 'is_approved' => true]);
                }
            }
        }
    }
}

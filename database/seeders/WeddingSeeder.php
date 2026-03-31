<?php

namespace Database\Seeders;

use App\Models\Client;
use App\Models\Project;
use App\Models\Template;
use App\Models\Invitation;
use App\Models\InvitationSchedule;
use App\Models\GiftAccount;
use App\Models\InvitationGuest;
use App\Models\Rsvp;
use App\Models\GuestMessage;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class WeddingSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Create Template 1 (Elegant Minimal)
        $template1 = Template::updateOrCreate(['name' => 'Wedding Elegant Minimal'], [
            'slug' => 'wedding-elegant-minimal',
            'category' => 'Wedding',
            'description' => 'Clean, refined, and minimalist design for high-end weddings.',
            'thumbnail' => 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=500',
            'preview_url' => '/v/fauzan-aminah',
            'default_settings' => [
                'primary_color' => '#1a1a1a',
                'font_family' => 'Inter, sans-serif',
                'layout' => 'centered',
            ],
            'is_active' => true,
        ]);

        // Template 2 (Floral Serenity)
        $template2 = Template::updateOrCreate(['name' => 'Floral Serenity'], [
            'slug' => 'floral-serenity',
            'category' => 'Wedding',
            'description' => 'Soft, romantic, and floral theme for a warm celebration.',
            'thumbnail' => 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=500',
            'preview_url' => '/v/fauzan-aminah', // Using same demo for preview for now
            'default_settings' => [
                'primary_color' => '#db2777',
                'font_family' => 'serif',
                'layout' => 'centered',
            ],
            'is_active' => true,
        ]);

        // 2. Create Client
        $client = Client::updateOrCreate(['email' => 'demo@client.com'], [
            'name' => 'Bpk. Ahmad Fauzan',
            'slug' => 'ahmad-fauzan-demo',
            'whatsapp' => '081234567890',
            'notes' => 'Priority Client from Jakarta',
        ]);

        // 3. Create Project
        $project = Project::updateOrCreate(['name_project' => 'The Wedding of Fauzan & Aminah'], [
            'client_id' => $client->id,
            'slug' => 'the-wedding-of-fauzan-aminah-demo',
            'event_type' => 'Wedding',
            'event_date' => now()->addMonths(2),
            'status_order' => 'paid',
            'status_project' => 'finished',
            'is_active_slot' => true,
            'deadline' => now()->addMonths(1),
            'notes' => 'Client wants pure minimalist black and white theme.',
        ]);

        // 4. Create Invitation
        $invitation = Invitation::updateOrCreate(['project_id' => $project->id], [
            'template_id' => $template1->id,
            'slug' => 'fauzan-aminah',
            'title' => 'The Wedding of Fauzan & Aminah',
            'invitation_type' => 'wedding',
            'opening_label' => 'PERNIKAHAN SUCI KAMI',
            'bride_full_name' => 'Siti Aminah, S.T.',
            'bride_nickname' => 'Aminah',
            'bride_father_name' => 'Bpk. H. Ahmad Dahlan',
            'bride_mother_name' => 'Ibu Hj. Aminah Suri',
            'groom_full_name' => 'Ahmad Fauzan, M.BA',
            'groom_nickname' => 'Fauzan',
            'groom_father_name' => 'Bpk. Drs. H. Malik Ibrahim',
            'groom_mother_name' => 'Ibu Hj. Siti Sarah',
            'wedding_date' => now()->addMonths(2)->format('Y-m-d'),
            'countdown_datetime' => now()->addMonths(2)->startOfDay()->format('Y-m-d H:i:s'),
            'hero_subtitle' => 'Together Forever',
            'opening_quote' => 'Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.',
            'closing_note' => 'Ungkapan terima kasih yang tulus kami sampaikan atas kehadiran serta doa restu Bapak/Ibu/Saudara/i sekalian.',
            'gift_note' => 'Tanpa mengurangi rasa hormat, bagi tamu yang ingin mengirimkan kado fisik dapat menghubungi pihak keluarga.',
            'host_names' => 'Fauzan & Aminah',
            'event_location_name' => 'The Grand Ballroom',
            'event_time' => '10:00 - Selesai',
            'event_address' => 'Hotel Indonesia Kempinski, Menteng, Jakarta Pusat',
            'event_maps_url' => 'https://maps.app.goo.gl/uX3L3C3C3C3C3C3C3',
            'background_music' => 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
            'cover_image' => 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1200',
            'is_published' => true,
            'published_at' => now(),
        ]);

        // 5. Create Schedules
        InvitationSchedule::updateOrCreate(['invitation_id' => $invitation->id, 'title' => 'Akad Nikah'], [
            'date' => now()->addMonths(2)->format('Y-m-d'),
            'start_time' => '08:00:00',
            'end_time' => '10:00:00',
            'location_name' => 'Masjid Istiqlal',
            'address' => 'Jl. Taman Wijaya Kusuma, Jakarta Pusat',
            'maps_url' => 'https://maps.app.goo.gl/istiqlal',
            'sort_order' => 1,
        ]);

        InvitationSchedule::updateOrCreate(['invitation_id' => $invitation->id, 'title' => 'Resepsi Pernikahan'], [
            'date' => now()->addMonths(2)->format('Y-m-d'),
            'start_time' => '11:00:00',
            'end_time' => '13:00:00',
            'location_name' => 'The Grand Ballroom',
            'address' => 'Hotel Indonesia Kempinski, Menteng, Jakarta Pusat',
            'maps_url' => 'https://maps.app.goo.gl/kempinski',
            'sort_order' => 2,
        ]);

        // 6. Create Gift Accounts
        GiftAccount::updateOrCreate(['invitation_id' => $invitation->id, 'bank_name' => 'BCA'], [
            'account_number' => '1234567890',
            'account_holder' => 'Ahmad Fauzan',
            'is_active' => true,
            'sort_order' => 1,
        ]);

        // 7. Create Some Guests
        $guests = [
            ['name' => 'Bpk. Farros & Partner', 'phone' => '081122334455', 'location' => 'Makassar'],
            ['name' => 'Keluarga Besar Sangkolo', 'phone' => '081122334466', 'location' => 'Jakarta'],
            ['name' => 'Sahabat IT Indonesia', 'phone' => '081122334477', 'location' => 'Bandung'],
            ['name' => 'Bpk. Jaka Sembung', 'phone' => '081122334488', 'location' => 'Surabaya'],
        ];

        foreach ($guests as $g) {
            InvitationGuest::updateOrCreate(['invitation_id' => $invitation->id, 'name' => $g['name']], [
                'phone' => $g['phone'],
                'location' => $g['location'],
                'guest_code' => Str::upper(Str::random(6)),
            ]);
        }

        // 8. Create Some Wishes
        GuestMessage::updateOrCreate(['invitation_id' => $invitation->id, 'name' => 'Bpk. Farros'], [
            'message' => 'Barakallah! Semoga menjadi keluarga yang sakinah, mawaddah, warahmah. Sangat suka desain Sangkolo!',
            'is_approved' => true,
        ]);

        GuestMessage::updateOrCreate(['invitation_id' => $invitation->id, 'name' => 'Keluarga Sangkolo'], [
            'message' => 'Selamat ya Fauzan & Aminah! Doa terbaik dari kami semua di Sangkolo.',
            'is_approved' => true,
        ]);
        
        // 9. RSVP
        Rsvp::create([
            'invitation_id' => $invitation->id,
            'name' => 'Bpk. Farros',
            'attendance_status' => 'attending',
            'guest_count' => 2,
            'notes' => 'Insha Allah hadir bersama istri.',
        ]);

        Rsvp::create([
            'invitation_id' => $invitation->id,
            'name' => 'Bpk. Jaka Sembung',
            'attendance_status' => 'attending',
            'guest_count' => 1,
            'notes' => 'Hadir!',
        ]);
    }
}

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // 1. Tambah field di tabel invitations
        Schema::table('invitations', function (Blueprint $table) {
            $table->string('invitation_type')->default('wedding')->after('template_id');
            $table->string('opening_label')->nullable()->after('invitation_type');
            $table->string('bride_full_name')->nullable()->after('opening_label');
            $table->string('bride_nickname')->nullable()->after('bride_full_name');
            $table->string('bride_father_name')->nullable()->after('bride_nickname');
            $table->string('bride_mother_name')->nullable()->after('bride_father_name');
            $table->string('groom_full_name')->nullable()->after('bride_mother_name');
            $table->string('groom_nickname')->nullable()->after('groom_full_name');
            $table->string('groom_father_name')->nullable()->after('groom_nickname');
            $table->string('groom_mother_name')->nullable()->after('groom_father_name');
            $table->date('wedding_date')->nullable()->after('groom_mother_name');
            $table->dateTime('countdown_datetime')->nullable()->after('wedding_date');
            
            // Rename existing fields for consistency if needed, or just keep them
            // the user requested venue_name utama, venue_address utama, maps_url utama
            // but event_location_name, event_address, event_maps_url are already there.
            // I'll keep them but might use the requested names. 
            // Better to keep it additive.
            $table->string('hero_subtitle')->nullable()->after('countdown_datetime');
            $table->text('closing_note')->nullable()->after('hero_subtitle');
            $table->text('gift_note')->nullable()->after('closing_note');
            $table->timestamp('published_at')->nullable()->after('is_published');
        });

        // 2. Buat tabel invitation_schedules (Susunan Acara)
        Schema::create('invitation_schedules', function (Blueprint $table) {
            $table->id();
            $table->foreignId('invitation_id')->constrained()->onDelete('cascade');
            $table->string('title'); // Akad Nikah, Resepsi, dll
            $table->date('date');
            $table->time('start_time');
            $table->time('end_time')->nullable();
            $table->string('location_name')->nullable();
            $table->text('address')->nullable();
            $table->text('maps_url')->nullable();
            $table->text('notes')->nullable();
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });

        // 3. Buat tabel gift_accounts (Amplop Online)
        Schema::create('gift_accounts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('invitation_id')->constrained()->onDelete('cascade');
            $table->string('bank_name'); // atau e-wallet (BCA, Mandiri, OVO, dll)
            $table->string('account_number');
            $table->string('account_holder');
            $table->string('ewallet_type')->nullable(); // kalau user mau bedakan
            $table->string('copy_label')->default('Salin');
            $table->boolean('is_active')->default(true);
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('gift_accounts');
        Schema::dropIfExists('invitation_schedules');
        
        Schema::table('invitations', function (Blueprint $table) {
            $table->dropColumn([
                'invitation_type', 'opening_label', 'bride_full_name', 'bride_nickname',
                'bride_father_name', 'bride_mother_name', 'groom_full_name', 'groom_nickname',
                'groom_father_name', 'groom_mother_name', 'wedding_date', 'countdown_datetime',
                'hero_subtitle', 'closing_note', 'gift_note', 'published_at'
            ]);
        });
    }
};

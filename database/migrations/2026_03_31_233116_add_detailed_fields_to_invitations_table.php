<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('invitations', function (Blueprint $table) {
            $table->string('host_names')->nullable()->after('title'); // Contoh: Farros & Partner
            $table->string('cover_image')->nullable()->after('host_names');
            $table->string('background_music')->nullable()->after('cover_image');
            $table->string('event_time')->nullable()->after('background_music');
            $table->string('event_location_name')->nullable()->after('event_time');
            $table->text('event_address')->nullable()->after('event_location_name');
            $table->text('event_maps_url')->nullable()->after('event_address');
            $table->text('opening_quote')->nullable()->after('event_maps_url');
        });
    }

    public function down(): void
    {
        Schema::table('invitations', function (Blueprint $table) {
            $table->dropColumn([
                'host_names', 'cover_image', 'background_music', 
                'event_time', 'event_location_name', 'event_address', 
                'event_maps_url', 'opening_quote'
            ]);
        });
    }
};

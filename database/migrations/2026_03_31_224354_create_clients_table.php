<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('clients', function (Blueprint $col) {
            $col->id();
            $col->string('name');
            $col->string('whatsapp')->unique();
            $col->string('email')->nullable();
            $col->text('notes')->nullable();
            $col->timestamps();
        });

        Schema::create('leads', function (Blueprint $col) {
            $col->id();
            $col->foreignId('client_id')->nullable()->constrained()->onDelete('set null');
            $col->string('name_calon');
            $col->string('whatsapp');
            $col->string('event_type');
            $col->date('event_date')->nullable();
            $col->string('source')->nullable(); // Instagram, Referral, etc.
            $col->enum('status', ['new', 'contacted', 'negotiating', 'closed', 'lost'])->default('new');
            $col->text('notes')->nullable();
            $col->timestamps();
        });

        Schema::create('projects', function (Blueprint $col) {
            $col->id();
            $col->foreignId('client_id')->constrained()->onDelete('cascade');
            $col->string('name_project');
            $col->string('event_type');
            $col->date('event_date');
            $col->enum('status_order', ['pending', 'paid', 'cancelled'])->default('pending');
            $col->enum('status_project', ['queue', 'designing', 'revision', 'finished'])->default('queue');
            $col->boolean('is_active_slot')->default(false); // Maksimum 3 yang true
            $col->date('deadline')->nullable();
            $col->text('notes')->nullable();
            $col->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('projects');
        Schema::dropIfExists('leads');
        Schema::dropIfExists('clients');
    }
};

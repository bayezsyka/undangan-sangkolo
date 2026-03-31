<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::dropIfExists('leads');
    }

    public function down(): void
    {
        Schema::create('leads', function (Blueprint $col) {
            $col->id();
            $col->foreignId('client_id')->nullable()->constrained()->onDelete('set null');
            $col->string('name_calon');
            $col->string('whatsapp');
            $col->string('event_type');
            $col->date('event_date')->nullable();
            $col->string('source')->nullable();
            $col->enum('status', ['new', 'contacted', 'negotiating', 'closed', 'lost'])->default('new');
            $col->text('notes')->nullable();
            $col->timestamps();
        });
    }
};

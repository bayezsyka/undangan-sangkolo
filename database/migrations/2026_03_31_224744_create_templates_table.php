<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('templates', function (Blueprint $col) {
            $col->id();
            $col->string('name');
            $col->string('thumbnail')->nullable();
            $col->string('preview_url')->nullable();
            $col->boolean('is_active')->default(true);
            $col->timestamps();
        });

        Schema::create('invitations', function (Blueprint $col) {
            $col->id();
            $col->foreignId('project_id')->constrained()->onDelete('cascade');
            $col->foreignId('template_id')->constrained()->onDelete('cascade');
            $col->string('slug')->unique();
            $col->string('title');
            $col->text('description')->nullable();
            $col->boolean('is_published')->default(false);
            $col->timestamps();
        });

        Schema::create('invitation_sections', function (Blueprint $col) {
            $col->id();
            $col->foreignId('invitation_id')->constrained()->onDelete('cascade');
            $col->string('section_type'); // hero, story, event, gallery, rsvp, etc.
            $col->string('title')->nullable();
            $col->json('content')->nullable();
            $col->integer('order')->default(0);
            $col->boolean('is_active')->default(true);
            $col->timestamps();
        });

        Schema::create('galleries', function (Blueprint $col) {
            $col->id();
            $col->foreignId('invitation_id')->constrained()->onDelete('cascade');
            $col->string('image_path');
            $col->string('caption')->nullable();
            $col->integer('order')->default(0);
            $col->timestamps();
        });

        Schema::create('guest_messages', function (Blueprint $col) {
            $col->id();
            $col->foreignId('invitation_id')->constrained()->onDelete('cascade');
            $col->string('name');
            $col->string('relation')->nullable();
            $col->text('message');
            $col->boolean('is_approved')->default(false);
            $col->timestamps();
        });

        Schema::create('rsvps', function (Blueprint $col) {
            $col->id();
            $col->foreignId('invitation_id')->constrained()->onDelete('cascade');
            $col->string('name');
            $col->enum('attendance_status', ['attending', 'maybe', 'not_attending']);
            $col->integer('guest_count')->default(1);
            $col->text('notes')->nullable();
            $col->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('rsvps');
        Schema::dropIfExists('guest_messages');
        Schema::dropIfExists('galleries');
        Schema::dropIfExists('invitation_sections');
        Schema::dropIfExists('invitations');
        Schema::dropIfExists('templates');
    }
};

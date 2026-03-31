<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('templates', function (Blueprint $table) {
            $table->string('category')->default('Wedding')->after('name');
            $table->text('description')->nullable()->after('category');
            $table->json('default_settings')->nullable()->after('preview_url');
        });
    }

    public function down(): void
    {
        Schema::table('templates', function (Blueprint $table) {
            $table->dropColumn(['category', 'description', 'default_settings']);
        });
    }
};

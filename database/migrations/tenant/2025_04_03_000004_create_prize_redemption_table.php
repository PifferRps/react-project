<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('prize_redemption', function (Blueprint $table) {
            $table->id();
            $table->uuid('user_id');
            $table->foreignId('prizes_id')->constrained('prizes');
            $table->date('redemption_date');
            $table->decimal('coins_used', 8, 2);
            $table->string('status', 20);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void {
        Schema::dropIfExists('prize_redemption');
    }
};

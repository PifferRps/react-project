<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('indicator_scores', function (Blueprint $table) {
            $table->id();
            $table->uuid('user_id');
            $table->foreignId('indicators_id')->constrained('indicators');
            $table->string('year_month', 7);
            $table->decimal('score', 5, 2);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void {
        Schema::dropIfExists('indicator_scores');
    }
};

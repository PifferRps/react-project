<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('monthly_performance', function (Blueprint $table) {
            $table->id();
            $table->uuid('user_id');
            $table->string('year_month', 7);
            $table->decimal('total_score', 10, 2);
            $table->decimal('generated_coins', 10, 2);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void {
        Schema::dropIfExists('monthly_performance');
    }
};

<?php

use Illuminate\Support\Facades\Route;

Route::middleware(['web', 'auth','tenant','verified'], \App\Http\Middleware\IdentifyTenant::class)->group(function () {
//    dd('aquffdi');
});

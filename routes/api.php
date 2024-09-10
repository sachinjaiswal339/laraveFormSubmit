<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/user', [App\Http\Controllers\UserController::class, 'store']);
Route::get('/users', [App\Http\Controllers\UserController::class, 'index']);

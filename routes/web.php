<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('app');
});

Route::get('/admin', function () {
    return view('app');
});

Route::get('/blog', function () {
    return view('app');
});

Route::get('/blog/search', function () {
    return view('app');
});

Route::get('/blog/{post:slug}', function () {
    return view('app');
});

// Auth
// Auth::routes();
Route::get('/login', function () {
    return view('app');
});

Route::get('/register', function () {
    return view('app');
});

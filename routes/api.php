<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Laravel\Passport\Http\Controllers\AccessTokenController;

Route::post('register', 'UserController@userRegister');

Route::post('login', [AccessTokenController::class, 'issueToken'])
    ->middleware(['api-login', 'throttle']);

Route::get('user/{email}', 'UserController@userDetail');

// Posts
Route::get('post', 'PostController@index');

Route::get('post/{post}', 'PostController@show');

Route::post('post', 'PostController@store');

Route::put('post/{post}', 'PostController@update');

Route::delete('post/{post}', 'PostController@destroy');

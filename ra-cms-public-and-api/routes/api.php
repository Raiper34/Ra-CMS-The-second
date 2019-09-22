<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware(['auth:api', 'cors'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::resource('articles', 'Api\ArticleController')->middleware(['auth:api', 'cors']);
Route::get('articles/preview/{id}', 'Api\ArticleController@preview');
Route::resource('files', 'Api\FileController')->middleware(['auth:api', 'cors']);
Route::resource('site', 'Api\SiteController')->middleware(['auth:api', 'cors']);
Route::resource('menu-items', 'Api\MenuItemController')->middleware(['auth:api', 'cors']);
Route::post('menu-items/order', 'Api\MenuItemController@order')->middleware(['auth:api', 'cors']);
Route::resource('categories', 'Api\CategoryController')->middleware(['auth:api', 'cors']);
Route::resource('templates', 'Api\TemplateController')->middleware(['auth:api', 'cors']);
Route::resource('templatePages', 'Api\TemplatePageController')->middleware(['auth:api', 'cors']);

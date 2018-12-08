<?php

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

use Illuminate\Support\Facades\Auth;

use App\Article;
use App\Site;

//Auth::routes();

Route::get('/', ['uses' => 'PageController', 'id' => Site::find(Site::SITE_ID)->homepage]);

Route::get('page', 'PageController');
foreach (Article::all() as $article) {
    Route::get($article->url, ['uses' => 'PageController', 'id' => $article->id]);
}

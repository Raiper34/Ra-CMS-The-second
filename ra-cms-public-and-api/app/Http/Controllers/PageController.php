<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Article;
use App\Site;
use App\MenuItem;

class PageController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        $article = Article::find($request->route()->getAction()['id']);
        $site = Site::find(Site::SITE_ID);
        $menuItems = MenuItem::with('article')->orderBy('order')->get();
        return view('page', compact('article', 'site', 'menuItems'));
    }
}

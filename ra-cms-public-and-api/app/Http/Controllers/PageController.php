<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Article;
use App\Site;
use App\MenuItem;
use App\Category;

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
        $article = Article::with('templatePage')->find($request->route()->getAction()['id']);
        $site = Site::with('template')->find(Site::SITE_ID);
        $menuItems = MenuItem::with('article')->orderBy('order')->get();
        $category = Category::find($article->included_category_id);
        return view("templates/{$site->template->folder_name}/{$article->templatePage->file_name}", compact('article', 'site', 'menuItems', 'category'));
    }
}

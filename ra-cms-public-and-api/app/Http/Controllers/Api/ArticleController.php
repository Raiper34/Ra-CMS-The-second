<?php

namespace App\Http\Controllers\Api;

use App\Category;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

use App\Http\Resources\Article as ArticleResource;
use App\Article;
use App\Site;
use App\MenuItem;

class ArticleController extends Controller
{

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return ArticleResource::collection(Article::all());
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $article = new Article;

        $article->title = $request->title;
        $article->content = $request->article_content;
        $article->description = $request->description;
        $article->keywords = $request->keywords;
        $article->url = $request->url;
        $article->category_id = $request->category_id;
        $article->included_category_id = $request->included_category_id;
        $article->template_page_id = $request->template_page_id;

        Auth::user()->articles()->save($article);

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return new ArticleResource(Article::find($id));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $article = Article::find($id);

        $article->title = $request->title;
        $article->content = $request->article_content;
        $article->description = $request->description;
        $article->keywords = $request->keywords;
        $article->url = $request->url;
        $article->category_id = $request->category_id;
        $article->included_category_id = $request->included_category_id;
        $article->template_page_id = $request->template_page_id;

        $article->save();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Article::find($id)->delete();
    }

    public function preview($id) {
        $article = Article::with('templatePage')->find($id);
        $site = Site::with('template')->find(Site::SITE_ID);
        $menuItems = MenuItem::with('article')->orderBy('order')->get();
        $category = Category::find($article->included_category_id);
        return view("templates/{$site->template->folder_name}/{$article->templatePage->file_name}", compact('article', 'site', 'menuItems', 'category'));
    }
}

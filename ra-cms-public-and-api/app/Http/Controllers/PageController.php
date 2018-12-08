<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Article;
use App\Site;

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
        $data = [
            'article' => Article::find($request->route()->getAction()['id']),
            'site' => Site::find(Site::SITE_ID)
        ];
        return view('page', $data);
    }
}

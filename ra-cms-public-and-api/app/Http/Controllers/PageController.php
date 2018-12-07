<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Article;

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
        return view('page', Article::find($request->route()->getAction()['id']));
    }
}

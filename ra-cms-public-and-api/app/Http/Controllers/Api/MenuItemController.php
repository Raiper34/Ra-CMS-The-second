<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use App\Http\Resources\MenuItem as MenuItemResource;
use App\MenuItem;

class MenuItemController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return MenuItemResource::collection(MenuItem::orderBy('order')->get());
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
        $menuItem = new MenuItem;

        $menuItem->title = $request->title;
        $menuItem->order = $request->order;
        $menuItem->article_id = $request->article_id;

        $menuItem->save();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return new MenuItemResource(MenuItem::find($id));
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
        $menuItem = MenuItem::find($id);

        $menuItem->title = $request->title;
        $menuItem->order = $request->order;
        $menuItem->article_id = $request->article_id;

        $menuItem->save();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        MenuItem::find($id)->delete();
    }

    public function order(Request $request) {
        foreach ($request->input() as $item) {
            $menuItem = MenuItem::find($item['id']);
            $menuItem->order = $item['order'];
            $menuItem->save();
        }
    }
}

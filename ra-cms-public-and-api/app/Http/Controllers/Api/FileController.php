<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;

use App\Http\Resources\File as FileResource;
use App\File;


class FileController extends Controller
{
    const UPLOAD_FOLDER = 'upload';
    const STORAGE_DISK = 'public';

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return FileResource::collection(File::all());
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

    private function getFileName(String $path, String $fileName): String {
        if (Storage::disk(self::STORAGE_DISK)->exists("{$path}/{$fileName}")) {
            $tempFile = preg_replace('/(\..*)$/', '(1)\1', $fileName);
            return $this->getFileName($path, $tempFile);
        }
        return $fileName;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $uploadFolder = self::UPLOAD_FOLDER;
        $path = "{$uploadFolder}";
        $fileName = $this->getFileName($path, $request->filepond->getClientOriginalName());
        Storage::disk(self::STORAGE_DISK)->putFileAs($path, $request->filepond, $fileName);
        $url = Storage::disk(self::STORAGE_DISK)->url("{$path}/{$fileName}");

        $file = new File;
        $file->name = $fileName;
        $file->extension = $request->filepond->getClientOriginalExtension();
        $file->url = $url;
        $file->path = "{$path}/{$fileName}";
        $file->type = $request->filepond->getClientMimeType();

        Auth::user()->files()->save($file);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return new FileResource(File::find($id));
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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Storage::disk(self::STORAGE_DISK)->delete($this->show($id)->path);
        File::find($id)->delete();
    }
}

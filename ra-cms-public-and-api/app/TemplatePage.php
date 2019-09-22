<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TemplatePage extends Model
{
    public function template()
    {
        return $this->belongsTo('App\Template');
    }
}

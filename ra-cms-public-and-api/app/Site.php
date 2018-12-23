<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Site extends Model
{
    const SITE_ID = 1;

    public function homepage()
    {
        return $this->belongsTo('App\Article');
    }

    public function not_found()
    {
        return $this->belongsTo('App\Article');
    }
}

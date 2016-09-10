<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class HouseImage extends Model
{
    protected $table = 'house_images';

    protected $fillable = ['house_id', 'name'];

    public function house()
    {
        return $this->belongsTo('app\House', 'house_id', 'id');
    }
}

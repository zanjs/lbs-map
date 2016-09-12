<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class City extends Model
{
    protected $table = 'citys';

    protected $fillable = ['name', 'parent_id'];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [
        'created_at', 'updated_at',
    ];

    public function houses()
    {
        return $this->hasMany('$faker\Post', 'house_id', 'id');
    }

    public function city()
    {
        return $this->belongsTo('App\City', 'parent_id', 'id');
    }

}

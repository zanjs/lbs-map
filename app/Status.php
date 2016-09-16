<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Status extends Model
{
    /**
     * @var string
     */
    protected $table = 'status';

    /**
     * @var array
     */
    protected $fillable = ['name','image'];

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

    public function status()
    {
        return $this->belongsTo('App\Status', 'parent_id', 'id');
    }
}

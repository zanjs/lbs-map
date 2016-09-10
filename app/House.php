<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class House extends Model
{

    /**
     * @var string
     */
    protected $table = 'houses';

    /**
     * @var array
     */
    protected $fillable = ['city_id', 'title', 'content', 'description', 'address','latitude','longitude' ,'image', 'visible'];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function houseImages()
    {
        return $this->hasMany('App\HouseImage', 'house_id', 'id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function city()
    {
        return $this->belongsTo('App\City', 'city_id', 'id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function tags()
    {
        return $this->belongsToMany('App\Tag');
    }

    /**
     * @param $query
     * @return mixed
     */
    public function scopeLatest($query)
    {
        return $query->orderBy('updated_at', 'desc');
    }

}

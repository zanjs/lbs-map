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
    protected $fillable = ['name'];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function houses()
    {
        return $this->belongsToMany('App\House');
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

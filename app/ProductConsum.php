<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ProductConsum extends Model
{
     /**
     * @var string
     */
    protected $table = 'product_consum';

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


   
    public function status()
    {
        return $this->belongsTo('App\Status', 'parent_id', 'id');
    }
}

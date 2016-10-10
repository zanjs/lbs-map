<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ShopProduct extends Model
{
     /**
     * @var string
     */
    protected $table = 'shop_products';

    /**
     * @var array
     */
    protected $fillable = ['shop_id','flag','condition','product_id','price','quantity'];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [
        'created_at', 'updated_at',
    ];


   

    public function product()
    {
        return $this->belongsTo('App\Product', 'product_id', 'id');
    }

    public function shop()
    {
        return $this->belongsTo('App\House', 'shop_id', 'id');
    }
}

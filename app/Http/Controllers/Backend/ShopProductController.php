<?php

namespace App\Http\Controllers\Backend;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use App\ShopProduct;
use App\Product;
use App\House;
use Validator;

class ShopProductController extends Controller
{
      /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $current_page = $request->input('page', 1);
        $page_size = $request->input('page_size', 15);
        $shopId = $request->input('shop_id');
        $product = ShopProduct::where('shop_id', $shopId)->with('product','shop')->latest()->forPage($current_page, $page_size)->get();
        $count = ShopProduct::where('shop_id', $shopId)->count();
        return response()->json(['flag' => true, 'data' => $product, 'count' => $count]);
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

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'shop_id' => 'required',
            'product_id' => 'required',
            'price' => 'required',
            'quantity' => 'required'
        ], [
            'shop_id.required' => '名称必填'
        ]);

    
        if ($validator->fails()) {
            return response()->json(['flag' => false, 'msg' => '验证未通过', 'errors' => $validator->errors()]);
        }


        $shopId = $request->input('shop_id');
        $productId = $request->input('product_id');

        $shop = House::find($shopId);



        if (!$shop) {
            return response()->json(['flag' => false, 'msg' => '店铺不存在']);
        }


        $product = Product::find($productId);

        if (!$product) {
            return response()->json(['flag' => false, 'msg' => '商品不存在']);
        }

        $count = ShopProduct::where('shop_id', $shopId)->where('product_id', $productId)->count();

        if($count){
            return response()->json(['flag' => false, 'msg' => '该店铺已经存在','data' => $count]); 
        }

        if (ShopProduct::create($request->all())) {
            return response()->json(['flag' => true, 'msg' => '添加成功']);
        }

        return response()->json(['flag' => false, 'msg' => '添加失败']);
    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $product = ShopProduct::find($id);
        if ($product) {
            return response()->json(['flag' => true, 'msg' => '数据获取成功', 'data' => $product]);
        }
        return response()->json(['flag' => false, 'msg' => '数据获取失败']);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $shopproduct = ShopProduct::find($id);
        if (!$shopproduct) {
            return response()->json(['flag' => false, 'msg' => '修改失败-未找到']);
        }

        $validator = Validator::make($request->all(), [
            'shop_id' => 'required',
            'product_id' => 'required',
            'price' => 'required',
            'quantity' => 'required'
        ], [
            'shop_id.required' => '名称必填'
        ]);

        if ($validator->fails()) {
            return response()->json(['flag' => false, 'msg' => '验证未通过', 'errors' => $validator->errors()]);
        }


        $shopId = $request->input('shop_id');
        $productId = $request->input('product_id');

        $shop = House::find($shopId);

        if (!$shop) {
            return response()->json(['flag' => false, 'msg' => '店铺不存在']);
        }


        $count = ShopProduct::where('shop_id', $shopId)->where('product_id', $productId)->count();

        if($count){
            if($shopproduct->product_id != $productId){
                return response()->json(['flag' => false, 'msg' => '该店铺已经存在','data' => $shopproduct->product_id]); 
            }
            
        }

        if ($shopproduct->update($request->all())) {
            return response()->json(['flag' => true, 'msg' => '修改成功']);
        }

        return response()->json(['flag' => false, 'msg' => '修改失败']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $product = ShopProduct::find($id);
        if ($product) {
            $product->delete();
            return response()->json(['flag' => true, 'msg' => '删除成功']);
        }
        return response()->json(['flag' => false, 'msg' => '删除失败']);
    }
}

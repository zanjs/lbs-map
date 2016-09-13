<?php

namespace App\Http\Controllers\Fend;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use App\House;
use App\City;
use App\Status;

use DB;

use App\Helpers\Geohash;

class MapController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        
        $houses = House::with('city','status')->get();
        $count = House::count();
        $Status = Status::all();
        $Citys = City::all();
        return response()->json(['flag' => true, 'data' => $houses, 'count' => $count,'citys'=> $Citys,'status'=> $Status,'msg' => '数据获取成功']);
    }
    
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function count(){

       $Status = Status::all();

       $arr = array();

       $length = count($Status);
       for ($i = 0; $i < $length; $i++) {
           $Status[$i]->count = DB::table('houses')->where('status_id', $Status[$i]["id"])->count();
       }
       return response()->json(['flag' => true,'data' =>  $Status , 'msg' => '数据获取成功']);
    }

     /**
     * Display a listing of the resource.
     * 附近，参数n代表Geohash，精确的位数，也就是大概距离；n=6时候，大概为附近1千米
     * @return \Illuminate\Http\Response
     */
    public function search($latitude,$longitude){

       $geohash = new Geohash;
       
       $geohash_val = $geohash->encode($latitude,$longitude);
       
       $like_geohash = substr($geohash_val, 0, 5);

       $houses = DB::table('houses')->where('geohash', 'like', $like_geohash.'%')->get();
       $count = DB::table('houses')->where('geohash', 'like', $like_geohash.'%')->count();

       return response()->json(['flag' => true,'data' =>  $houses ,'geohash' => $like_geohash,'count' => $count,'msg' => '数据获取成功']);
    }

     /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function geohash($latitude,$longitude){

       $geohash = new Geohash;
       $geohash_val = $geohash->encode($latitude,$longitude);
       return response()->json(['flag' => true,'data' =>  $geohash_val , 'msg' => '数据获取成功']);
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
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $house = House::find($id);
        if (!$house) {
            return response()->json(['flag' => false, 'msg' => '修改失败']);
        }
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            // 'content' => 'required'
        ], [
            'title.required' => '标题必填'
        ]);
        if ($validator->fails()) {
            return response()->json(['flag' => false, 'msg' => '验证未通过', 'errors' => $validator->errors()]);
        }

        if ($house->update($request->all())) {
            $tagIds = $request->get('tagIds');
            if ($tagIds && is_array($tagIds)) {
                $house->tags()->sync($tagIds);
            }
            return response()->json(['flag' => true, 'msg' => '修改成功']);
        }

        return response()->json(['flag' => false, 'msg' => '修改失败']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}

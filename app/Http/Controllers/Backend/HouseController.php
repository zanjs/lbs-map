<?php

namespace App\Http\Controllers\Backend;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Validator;

use App\House;
use App\City;
use App\Tag;
use App\Status;



class HouseController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        
        // $current_page = $request->input('page', 1);
        // $page_size = $request->input('page_size', 15);
        // $houses = House::with('city','status')->forPage($current_page, $page_size)->get();
        $houses = House::with('city','status')->get();
        $count = House::count();
        return response()->json(['flag' => true, 'data' => $houses, 'count' => $count]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $citys = City::all();
        $status = Status::all();
        return response()->json(['flag' => true, 'citys' => $citys, 'status' => $status]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $city_id = $request->get('city_id', 0);
        $latitude = $request->get('latitude', 0);
        $longitude = $request->get('longitude', 0);
        $gohash = $request->get('gohash', 0);
        $hasSelectedCity = $city_id > 0;
        $validator = Validator::make($request->all(), [
            'title' => 'required|unique:houses',
            'latitude' => 'required',
            'longitude' => 'required'
        ], [
            'title.required' => '标题必填',
            'title.unique' => '标题不能重复',
            'latitude.required' => '纬度不能为空',
            'longitude.required' => '经度不能为空'
        ]);
        if (!$city_id || $city_id == 0 || $city_id == '0') {
            $validator->errors()->add('city_id', '选择城市');
        }
        if ($validator->fails() || !$hasSelectedCity) {
            if (!$hasSelectedCity) {
                $validator->errors()->add('city_id', '选择城市');
            }
            return response()->json(['flag' => false, 'msg' => '验证未通过', 'errors' => $validator->errors()]);
        }

        
        if ($house = House::create($request->all())) {
            // $tagIds = $request->get('tagIds');
            // if ($tagIds && is_array($tagIds)) {
            //     $house->tags()->sync($tagIds);
            // }
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
        $house = House::with('status','city')->find($id);
        $citys = City::all();
       
        $status = Status::all();

        if ($house) {
            return response()->json(['flag' => true, 'msg' => '数据获取成功', 'data' => $house, 'citys' => $citys, 'status' => $status]);
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
        $house = House::find($id);
        if (!$house) {
            return response()->json(['flag' => false, 'msg' => '修改失败']);
        }
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'latitude' => 'required',
            'longitude' => 'required'
        ], [
            'title.required' => '标题必填',
            'title.unique' => '标题不能重复',
            'latitude.required' => '纬度不能为空',
            'longitude.required' => '经度不能为空'
        ]);
        if ($validator->fails()) {
            return response()->json(['flag' => false, 'msg' => '验证未通过', 'errors' => $validator->errors()]);
        }

        if ($house->update($request->all())) {
            // $tagIds = $request->get('tagIds');
            // if ($tagIds && is_array($tagIds)) {
            //     $house->tags()->sync($tagIds);
            // }
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
        $house = House::find($id);
        if ($house) {
            $house->delete();
            return response()->json(['flag' => true, 'msg' => '删除成功']);
        }
        return response()->json(['flag' => false, 'msg' => '删除失败']);
    }
}

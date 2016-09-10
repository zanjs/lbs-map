<?php

namespace App\Http\Controllers\Backend;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use Validator;
use App\City;

class CityController extends Controller
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
        $categories = City::with('city')->forPage($current_page, $page_size)->get();
        $count = City::count();
        return response()->json(['flag' => true, 'data' => $categories, 'count' => $count]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $categories = City::all();
        return response()->json(['flag' => true, 'data' => $categories]);
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
            'name' => 'required|unique:categories|min:2'
        ], [
            'name.required' => '城市名称必填',
            'name.unique' => '城市名称不能重复',
            'name.min' => '城市名称最少为2个字符'
        ]);

        if ($validator->fails()) {
            return response()->json(['flag' => false, 'msg' => '验证未通过', 'errors' => $validator->errors()]);
        }

        if (City::create($request->all())) {
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
        $city = City::find($id);
        $categories = City::where('id', '!=', $id)->get();
        if ($city) {
            return response()->json(['flag' => true, 'msg' => '数据获取成功', 'data' => $city, 'categories' => $categories]);
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
        $city = City::find($id);
        if (!$city) {
            return response()->json(['flag' => false, 'msg' => '修改失败']);
        }
        $validator = Validator::make($request->all(), [
            'name' => 'required|min:2'
        ], [
            'name.required' => '城市名称必填',
            'name.min' => '城市名称最少为2个字符'
        ]);

        if ($validator->fails()) {
            return response()->json(['flag' => false, 'msg' => '验证未通过', 'errors' => $validator->errors()]);
        }

        if ($city->update($request->all())) {
            return response()->json(['flag' => true, 'msg' => '修改成功', 'data' => $city]);
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
        $city = City::find($id);
        if ($city) {
            $city->delete();
            return response()->json(['flag' => true, 'msg' => '删除成功']);
        }
        return response()->json(['flag' => false, 'msg' => '删除失败']);
    }

}

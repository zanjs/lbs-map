<?php

namespace App\Http\Controllers\Backend;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use App\House;
use App\User;
use App\City;

class DashboardController extends Controller
{
    /**
     * @return \Illuminate\Http\JsonResponse
     *
     */
    public function index()
    {

        $houses_count = House::count();
        $users_count = User::count();
        $citys_count = City::count();

        return response()->json([
            'flag' => true,
            'data' => [
                'houses_count' => $houses_count,
                'users_count' => $users_count,
                'citys_count' => $citys_count
            ]
        ]);
    }
}

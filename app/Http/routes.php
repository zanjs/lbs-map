<?php

/*
|--------------------------------------------------------------------------
| Routes File
|--------------------------------------------------------------------------
|
| Here is where you will register all of the routes in an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
    return view('welcome');
});

//Route::get('/admin', function () {
//    return view('backend');
//});

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| This route group applies the "web" middleware group to every route
| it contains. The "web" middleware group is defined in your HTTP
| kernel and includes session state, CSRF protection, and more.
|
*/

Route::group(['middleware' => ['web']], function () {
    //
});


Route::group(['namespace' => 'Fend', 'prefix' => 'fend','middleware'=>'api'], function () {



    // Route::post('login', 'AuthController@postLogin');
    // Route::post('logout', 'AuthController@postLogout');
    // Route::post('upload', 'CommonController@upload');
    Route::resource('map/count', 'MapController@count');
    Route::resource('map', 'MapController');
    // Route::get('map', 'MapController@index');
    // Route::post('map/{id}', 'MapController@update()');

    Route::get('map/search/{latitude}/{longitude}', 'MapController@search');
    Route::get('map/geohash/{latitude}/{longitude}', 'MapController@geohash');
    // Route::resource('status', 'StatusController');

    // Route::group(['middleware' => ['jwt_token']], function () {

    //     Route::get('dashboard', 'DashboardController@index');
    //     Route::get('admin_info', 'AdminController@getAdminByToken');

    //     Route::resource('admin', 'AdminController');
    //     Route::resource('city', 'CityController');
    //     Route::resource('house', 'HouseController');
    //     Route::resource('user', 'UserController');
    //     Route::resource('tag', 'TagController');
    //     Route::resource('comment', 'CommentController');

    // });

});



Route::group(['namespace' => 'Backend', 'prefix' => 'backend','middleware'=>'api'], function () {

    Route::post('login', 'AuthController@postLogin');
    Route::post('logout', 'AuthController@postLogout');
    Route::post('upload', 'CommonController@upload');

    
    Route::resource('status', 'StatusController');

    Route::group(['middleware' => ['jwt_token']], function () {

        Route::get('dashboard', 'DashboardController@index');
        Route::get('admin_info', 'AdminController@getAdminByToken');

        Route::resource('admin', 'AdminController');
        Route::resource('city', 'CityController');
        Route::resource('house', 'HouseController');
        Route::resource('product', 'ProductController');
        Route::get('product_shop/{id}', 'ProductController@shop');
        Route::put('product_shop/{id}', 'ProductController@saveProduct');
        Route::resource('shop_product', 'ShopProductController');
        Route::resource('user', 'UserController');
        Route::resource('tag', 'TagController');
        Route::resource('comment', 'CommentController');

    });

});


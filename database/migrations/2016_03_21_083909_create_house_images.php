<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateHouseImages extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('house_images', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('house_id')->unsigned();
            $table->string('url');
            $table->timestamps();
            $table->foreign('house_id')->references('id')->on('houses')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('house_images');
    }
}

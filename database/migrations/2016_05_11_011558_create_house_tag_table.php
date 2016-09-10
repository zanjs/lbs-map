<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateHouseTagTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('house_tag', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('house_id')->unsigned()->index();
            $table->integer('tag_id')->unsigned()->index();
            $table->timestamps();
            $table->foreign('house_id')->references('id')->on('houses')->onDelete('cascade');
            $table->foreign('tag_id')->references('id')->on('tags')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('house_tag');
    }
}

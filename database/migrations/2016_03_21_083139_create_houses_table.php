<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateHousesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('houses', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('city_id')->unsigned();
            $table->string('title');
            $table->text('description');
            $table->integer('status');
            $table->string('latitude');
            $table->string('longitude');
            $table->string('address');
            $table->longText('content');
            $table->string('image')->nullable();
            $table->boolean('visible')->default(1);
            $table->boolean('allow_comment')->default(1);
            $table->timestamps();
            $table->foreign('city_id')->references('id')->on('categories')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('houses');
    }
}

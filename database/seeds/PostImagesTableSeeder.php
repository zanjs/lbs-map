<?php

use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class PostImagesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create();
        $houseIds = \App\House::lists('id')->toArray();

        foreach (range(1, 20) as $index) {
            \App\HouseImage::create([
                'house_id' => $faker->randomElement($houseIds),
                'url' => $faker->imageUrl()
            ]);
        }

    }
}

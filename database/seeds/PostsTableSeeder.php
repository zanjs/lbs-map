<?php

use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class PostsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create();

        $cityIds = \App\City::lists('id')->toArray();
        $tagIds = \App\Tag::lists('id')->toArray();

        foreach (range(1, 30) as $index) {

            $house = \App\House::create([
                'title' => $faker->title(),
                'description' => $faker->sentence(),
                'status' => 1,
                'latitude' => $faker->latitude($min = -90, $max = 90),
                'longitude' => $faker->longitude($min = -180, $max = 180),
                'address' => $faker->address(),
                'city_id' => $faker->randomElement($cityIds),
                'content' => $faker->paragraph()
            ]);

            $tags = $faker->randomElements($tagIds, 3);

            $house->tags()->sync($tags);

        }
    }
}

<?php

use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class CategoriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create();

        \App\City::create([
            'name' => $faker->word()
        ]);

        foreach (range(1, 10) as $index) {
            $cityIds = \App\City::where('parent_id', 1)->lists('id')->toArray();
            \App\City::create([
                'name' => $faker->word,
                'parent_id' => $faker->optional(0.5, '0')->randomElement($cityIds)
            ]);
        }

    }
}

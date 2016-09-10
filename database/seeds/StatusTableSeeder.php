<?php

use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class StatusTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create();
        foreach (range(1, 5) as $index) {
            \App\Status::create([
                'name' => $faker->word
            ]);
        }
    }
}

<?php

use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class AdminsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create();
        \App\Admin::create([
            'name' => 'admin',
            'email' => 'zanjser@163.com',
            'password' => Hash::make('zanjser'),
            'image' => $faker->imageUrl(100, 100),
            'is_super' => 1
        ]);

        \App\Admin::create([
            'name' => 'yang',
            'email' => 'yang@yang.com',
            'password' => Hash::make('yang'),
            'image' => $faker->imageUrl(100, 100),
            'is_super' => 1
        ]);

        foreach (range(1, 10) as $index) {
            \App\Admin::create([
                'name' => 'admin' . $index,
                'email' => 'admin' . $index . '@zanjs.com',
                'password' => Hash::make('123456'),
                'image' => $faker->imageUrl(100, 100),
                'is_super' => 0
            ]);
        }
    }
}

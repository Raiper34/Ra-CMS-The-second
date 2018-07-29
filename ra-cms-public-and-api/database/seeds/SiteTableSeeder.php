<?php

use Illuminate\Database\Seeder;

class SiteTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('sites')->insert([
            'name' => 'Example',
            'homepage' => 1,
            '404' => 1,
        ]);
    }
}

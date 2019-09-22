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
            'homepage_id' => 1,
            'not_found_id' => 1,
            'template_id' => 1,
        ]);
    }
}

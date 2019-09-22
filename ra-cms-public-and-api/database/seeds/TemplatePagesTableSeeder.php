<?php

use Illuminate\Database\Seeder;

class TemplatePagesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('template_pages')->insert([
            'name' => 'Container',
            'file_name' => 'container_page',
            'template_id' => 1,
        ]);
        DB::table('template_pages')->insert([
            'name' => 'Blank',
            'file_name' => 'blank_page',
            'template_id' => 1,
        ]);
    }
}

<?php

use Illuminate\Database\Seeder;

class TemplatesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('templates')->insert([
            'name' => 'Materialize',
            'description' => 'Materialize template',
            'version' => '1.0',
            'author' => 'Filip Raiper34 Gulan',
            'folder_name' => 'materialize',
        ]);
    }
}

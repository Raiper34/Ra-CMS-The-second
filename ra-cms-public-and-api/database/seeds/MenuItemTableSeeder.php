<?php

use Illuminate\Database\Seeder;

class MenuItemTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('menu_items')->insert([
            'title' => 'Example menu',
            'order' => 0,
            'article_id' => 1,
        ]);
    }
}

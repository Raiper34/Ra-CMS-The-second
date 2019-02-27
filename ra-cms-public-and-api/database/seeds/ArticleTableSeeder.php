<?php

use Illuminate\Database\Seeder;

class ArticleTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('articles')->insert([
            'title' => 'Example article',
            'content' => 'This is example article.',
            'description' => 'Description',
            'keywords' => 'keyword1, keyword2',
            'url' => 'example',
            'user_id' => 1,
            'category_id' => 1
        ]);
    }
}

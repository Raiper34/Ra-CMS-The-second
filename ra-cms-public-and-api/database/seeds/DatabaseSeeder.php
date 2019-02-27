<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(UsersTableSeeder::class);
        $this->call(CategoryTableSeeder::class);
        $this->call(ArticleTableSeeder::class);
        $this->call(FileTableSeeder::class);
        $this->call(SiteTableSeeder::class);
        $this->call(MenuItemTableSeeder::class);
        $this->call(OauthClientsTableSeeder::class);
    }
}

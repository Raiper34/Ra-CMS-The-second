<?php

use Illuminate\Database\Seeder;

class OauthClientsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('oauth_clients')->insert([
            'name' => 'racms',
            'secret' => 'racms-secret',
            'redirect' => 'http://localhost',
            'password_client' => 1,
            'personal_access_client' => 0,
            'revoked' => 0,
        ]);
    }
}

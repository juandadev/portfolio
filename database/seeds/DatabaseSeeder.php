<?php

use App\User;
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
        // $this->call(UserSeeder::class);
        User::create([
            'name' => 'Juan Daniel',
            'email' => 'jdmartinez@itparral.edu.mx',
            'password' => bcrypt('15410596'),
        ]);
    }
}

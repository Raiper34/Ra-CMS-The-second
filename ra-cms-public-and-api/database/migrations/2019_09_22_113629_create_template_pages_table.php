<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTemplatePagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('template_pages', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('file_name');
            $table->timestamps();

            $table->unsignedInteger('template_id');
            $table->foreign('template_id')->references('id')->on('templates')->onDelete('cascade');
        });

        Schema::table('articles', function (Blueprint $table) {
            $table->unsignedInteger('template_page_id');
            $table->foreign('template_page_id')->references('id')->on('template_pages')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('menu_items');
        Schema::dropIfExists('sites');
        Schema::dropIfExists('articles');
        Schema::dropIfExists('template_pages');
    }
}

<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
    ];

    /**
     * The posts that belong to the role.
     * You may access the post's tags using $tag->posts
     */
    public function posts()
    {
        return $this->belongsToMany('App\Post');
    }
}

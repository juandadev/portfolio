<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'title', 'body', 'status', 'author',
    ];

    /**
     * The tags that belong to the post.
     * You may access the post's tags using $post->tags
     */
    public function tags()
    {
        return $this->belongsToMany('App\Tag');
    }
}

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
        'id', 'title', 'body', 'status', 'author',
    ];

    /**
     * The tags that belong to the post
     */
    public function tag()
    {
        return $this->hasMany(PostsTags::class, 'post_id');
    }
}

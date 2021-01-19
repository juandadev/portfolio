<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PostsTags extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'post_id', 'tag_id',
    ];

    /**
     * The roles that belong to the post.
     */
    public function post()
    {
        return $this->belongsTo(Post::class, 'post_id');
    }

    /**
     * The roles that belong to the user.
     */
    public function tag()
    {
        return $this->belongsTo(Tag::class, 'tag_id');
    }
}

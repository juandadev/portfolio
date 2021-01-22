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
        'id', 'name',
    ];

    /**
     * The posts that belong to the tag
     */
    public function post()
    {
        return $this->hasMany(PostsTags::class, 'tag_id');
    }
}

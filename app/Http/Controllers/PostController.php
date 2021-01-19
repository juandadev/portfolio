<?php

namespace App\Http\Controllers;

use App\Post;
use App\Tag;
use Illuminate\Http\Request;

class PostController extends Controller
{
    private $status_code = 200;

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $tags = $request->tags;

        if ($tags) {
            for ($i = 0; $i < count($tags); $i++) {
                $tag = $tags[$i];

                $isCreated = Tag::where('name', $tag->name)
                    ->first();

                if (!$isCreated) {
                    Tag::create($tag);
                }
            }
        }

        $post = Post::create($request->all());

        return response()->json([
            "status" => $this->status_code,
            "success" => true,
            "message" => "En un momento te redirigiremos al post",
            "data" => $post
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Post $post)
    {
        $post->update($request->all());

        return response()->json([
            "status" => $this->status_code,
            "success" => true,
            "message" => "Aún puedes hacer mas cambios a este u otros posts",
            "data" => $post
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function destroy(Post $post)
    {
        $post->delete();

        return response()->json([
            "status" => $this->status_code,
            "success" => true,
            "message" => "Si quieres eliminar otro post elígelo dentro de la lista",
            "data" => $post
        ]);
    }
}

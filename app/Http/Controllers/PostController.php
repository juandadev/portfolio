<?php

namespace App\Http\Controllers;

use App\Post;
use App\PostsTags;
use App\Tag;
use Faker\Provider\Lorem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class PostController extends Controller
{
    private $status_code = 200;

    public function show(Post $post)
    {
        // TODO: Need to do a view counter on each request
        return $post;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $posts = Post::orderBy('created_at')->get();
        $posts_tags = PostsTags::orderBy('created_at')->get();
        $tags = Tag::orderBy('created_at')->get();

        return [$posts, $posts_tags, $tags];
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $tags = json_decode($request->tags);
        $slug = str_replace(" ", "-", strtolower($request->title));
        $tagsCreated = [];

        if (count($tags) != 0) {
            for ($i = 0; $i < count($tags); $i++) {
                $tag = $tags[$i];

                $isCreated = Tag::where('name', $tag[0]->name)
                    ->first();

                if (!$isCreated) {
                    $tagCreated = Tag::create([
                        'name' => $tag[0]->name
                    ]);
                    array_push($tagsCreated, $tagCreated);
                }
            }
        } else {
            return response()->json([
                "status" => "failed",
                "success" => false,
                "message" => "Hubo un error con las etiquetas, revísalo antes de continuar",
            ]);
        }

        Post::create([
            'title' => $request->title,
            'slug' => $slug,
            'body' => $request->body,
            'cover' => $request->cover,
            'color' => $request->color,
            'author' => $request->author,
        ]);

        $postCreated = Post::orderBy('created_at', 'desc')
            ->first();

        for ($i = 0; $i < count($tags); $i++) {
            $tag = $tags[$i];

            $searchTag = Tag::where('name', $tag[0]->name)
                ->pluck('id')
                ->first();

            PostsTags::create([
                'post_id' => $postCreated->id,
                'tag_id' => $searchTag
            ]);
        }

        $posts_tags = PostsTags::where('post_id', $postCreated->id)->get();

        if ($request->file('cover')) {
            $postCreated->cover = $request->file('cover')->store('posts', 'public');
            $postCreated->save();
        }

        return response()->json([
            "status" => $this->status_code,
            "success" => true,
            "message" => "En un momento te redirigiremos al post",
            "post" => $postCreated,
            "postsTags" => $posts_tags,
            "tags" => $tagsCreated
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
        $tags = json_decode($request->tags);
        $postId = $post->id;
        $slug = str_replace(" ", "-", strtolower($request->title));
        $posts_tags = PostsTags::where('post_id', $postId)->get();

        for ($i = 0; $i < count($posts_tags); $i++) {
            $post_tag = $posts_tags[$i];

            $post_tag->delete();
        }

        if ($tags) {
            for ($i = 0; $i < count($tags); $i++) {
                $tag = $tags[$i];

                $isCreated = Tag::where('name', $tag[0]->name)
                    ->first();

                if (!$isCreated) {
                    Tag::create([
                        'name' => $tag[0]->name
                    ]);
                }

                $searchTag = Tag::where('name', $tag[0]->name)
                    ->pluck('id')
                    ->first();

                PostsTags::create([
                    'post_id' => $postId,
                    'tag_id' => $searchTag
                ]);
            }
        } else {
            return response()->json([
                "status" => "failed",
                "success" => false,
                "message" => "Hubo un error con las etiquetas, revísalo antes de continuar",
            ]);
        }

        $post->update([
            'title' => $request->title,
            'body' => $request->body,
            'color' => $request->color,
            'author' => $request->author,
            'slug' => $slug
        ]);

        if ($request->file('cover')) {
            Storage::disk('public')->delete($post->cover);
            $post->cover = $request->file('cover')->store('posts', 'public');
            $post->save();
        }

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

        if ($post->cover) {
            Storage::disk('public')->delete($post->cover);
        }

        return response()->json([
            "status" => $this->status_code,
            "success" => true,
            "message" => "El post $post->name ha sido borrado con éxito de la base de datos.",
            "post" => $post,
        ]);
    }
}

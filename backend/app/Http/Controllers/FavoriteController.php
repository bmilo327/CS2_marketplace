<?php

namespace App\Http\Controllers;

use App\Models\Favorite;
use Illuminate\Http\Request;

class FavoriteController extends Controller
{
    public function index(Request $request)
    {
        $sessionId = $request->query('session_id');

        return Favorite::with('product')
            ->where('session_id', $sessionId)
            ->get();
    }

    public function toggle(Request $request)
    {
        $existing = Favorite::where('session_id', $request->session_id)
            ->where('product_id', $request->product_id)
            ->first();

        if ($existing) {
            $existing->delete();

            return ['favorited' => false];
        }

        Favorite::create([
            'session_id' => $request->session_id,
            'product_id' => $request->product_id,
        ]);

        return ['favorited' => true];
    }
}

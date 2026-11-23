<?php

namespace App\Http\Controllers;

use App\Models\CartItem;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function index(Request $request)
    {
        $sessionId = $request->query('session_id');

        return CartItem::with('product')
            ->where('session_id', $sessionId)
            ->get();
    }

    public function store(Request $request)
    {
        $item = CartItem::where('session_id', $request->session_id)
            ->where('product_id', $request->product_id)
            ->first();

        if ($item) {
            $item->quantity += $request->input('quantity', 1);
            $item->save();

            return $item->load('product');
        }

        $newItem = CartItem::create([
            'session_id' => $request->session_id,
            'product_id' => $request->product_id,
            'quantity' => $request->input('quantity', 1),
        ]);

        return $newItem->load('product');
    }

    public function update(Request $request, CartItem $cartItem)
    {
        $record = CartItem::findOrFail($cartItem->id);

        if ($request->quantity <= 0) {
            $record->delete();
            return ['deleted' => true];
        }

        $record->quantity = $request->quantity;
        $record->save();

        return $record->load('product');
    }

    public function destroy(CartItem $cartItem)
    {
        return CartItem::destroy($cartItem->id);
    }
}

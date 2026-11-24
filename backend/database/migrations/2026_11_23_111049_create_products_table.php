<?php

use App\Models\Product;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name', 150);
            $table->string('category', 50); // weapon, case, knife
            $table->string('rarity', 50);
            $table->string('exterior', 50)->nullable(); // ládánál NULL
            $table->decimal('price', 10, 2);
            $table->text('image_url');
            $table->timestamps();
        });

        Product::insert([
            [
                'name' => 'Kilowatt Case',
                'category' => 'case',
                'rarity' => 'Base Grade',
                'exterior' => null,
                'price' => 3.50,
                'image_url' => 'https://example.com/images/kilowatt-case.png',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Revolution Case',
                'category' => 'case',
                'rarity' => 'Base Grade',
                'exterior' => null,
                'price' => 1.85,
                'image_url' => 'https://example.com/images/revolution-case.png',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Dreams & Nightmares Case',
                'category' => 'case',
                'rarity' => 'Base Grade',
                'exterior' => null,
                'price' => 2.40,
                'image_url' => 'https://example.com/images/dreams-nightmares-case.png',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'AK-47 | Slate',
                'category' => 'weapon',
                'rarity' => 'Restricted',
                'exterior' => 'Field-Tested',
                'price' => 14.20,
                'image_url' => 'https://example.com/images/ak47-slate-ft.png',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'AWP | Asiimov',
                'category' => 'weapon',
                'rarity' => 'Covert',
                'exterior' => 'Field-Tested',
                'price' => 89.00,
                'image_url' => 'https://example.com/images/awp-asiimov-ft.png',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'M4A1-S | Printstream',
                'category' => 'weapon',
                'rarity' => 'Covert',
                'exterior' => 'Minimal Wear',
                'price' => 245.50,
                'image_url' => 'https://example.com/images/m4a1s-printstream-mw.png',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'USP-S | Neo-Noir',
                'category' => 'weapon',
                'rarity' => 'Classified',
                'exterior' => 'Factory New',
                'price' => 42.75,
                'image_url' => 'https://example.com/images/usps-neo-noir-fn.png',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Karambit | Doppler',
                'category' => 'knife',
                'rarity' => 'Covert',
                'exterior' => 'Factory New',
                'price' => 1450.00,
                'image_url' => 'https://example.com/images/karambit-doppler-fn.png',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Butterfly Knife | Fade',
                'category' => 'knife',
                'rarity' => 'Covert',
                'exterior' => 'Factory New',
                'price' => 2180.00,
                'image_url' => 'https://example.com/images/butterfly-fade-fn.png',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};

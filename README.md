CS2 Skin & Case Webshop – Projekt Specifikáció

Egyszerűsített, Counter-Strike 2 témájú webáruház (publikus katalógus, kosár és kedvencek funkcióval, valamint admin termékfeltöltő felülettel). A rendszer felhasználói regisztráció és belépés nélkül működik.

---

## 1. Fő funkciók

### Publikus felület (`/`)
* **Termékek listázása:** Ládák (`case`), fegyverskinek (`weapon`) és kések (`knife`) megjelenítése kártyás elrendezésben (név, kategória, ritkaság, kopottság, ár, kép).
* **Kosárba helyezés (`/cart`):** Termékek hozzáadása a kosárhoz, mennyiség módosítása, tétel törlése és végösszeg számítása.
* **Kedvencek (`/favorites`):** Termékek megjelölése kedvencként (szív ikon toggle), kedvencek külön listázása.

### Admin felület (`/admin`)
* **Új termék létrehozása:** Űrlap segítségével új CS2 láda vagy fegyver felvétele az adatbázisba.

---

## 2. Adatbázis felépítés
A rendszer **3 táblát** használ. A frontend az első látogatáskor generál egy egyedi `session_id`-t (és elmenti a böngésző `localStorage`-ába), majd minden kosár- és kedvenc-kéréshez elküldi azt a backendnek, amely az adatbázisban ennek alapján különíti el a felhasználók adatait.

### `products` (Termékek)
| Mező | Típus | Leírás |
| :--- | :--- | :--- |
| `id` | `INT` (PK, Auto Increment) | Egyedi azonosító |
| `name` | `VARCHAR(150)` | Termék neve (pl. `AK-47 \| Redline`) |
| `category` | `VARCHAR(50)` | Kategória (`weapon`, `case`, `knife`) |
| `rarity` | `VARCHAR(50)` | Ritkaság (pl. `Classified`, `Covert`) |
| `exterior` | `VARCHAR(50)` (Nullable) | Kopottság (pl. `Field-Tested`, ládánál `NULL`) |
| `price` | `DECIMAL(10, 2)` | Ár (pl. EUR vagy USD) |
| `image_url` | `TEXT` | Termékkép URL-je |
| `created_at` | `TIMESTAMP` | Létrehozás időpontja |

### `cart_items` (Kosár)
| Mező | Típus | Leírás |
| :--- | :--- | :--- |
| `id` | `INT` (PK, Auto Increment) | Egyedi azonosító |
| `session_id` | `VARCHAR(100)` | Böngésző munkamenet azonosító |
| `product_id` | `INT` (FK → `products.id`) | Kosárba tett termék azonosítója |
| `quantity` | `INT` | Darabszám (alapértelmezett: `1`) |

### `favorites` (Kedvencek)
| Mező | Típus | Leírás |
| :--- | :--- | :--- |
| `id` | `INT` (PK, Auto Increment) | Egyedi azonosító |
| `session_id` | `VARCHAR(100)` | Böngésző munkamenet azonosító |
| `product_id` | `INT` (FK → `products.id`) | Kedvencnek jelölt termék azonosítója |

---

## 3. REST API Végpontok

### Termékek (Publikus & Admin)
* `GET /api/products` – Összes termék lekérdezése
* `POST /api/products` – Új termék létrehozása (Admin felületről)
* `DELETE /api/products/:id` – Termék törlése (opcionális)

### Kosár
* `GET /api/cart?session_id=...` – Aktuális kosár tartalmának lekérése
* `POST /api/cart` – Termék hozzáadása a kosárhoz (`{ session_id, product_id, quantity }`)
* `DELETE /api/cart/:id` – Tétel eltávolítása a kosárból

### Kedvencek
* `GET /api/favorites?session_id=...` – Kedvencek listájának lekérése
* `POST /api/favorites/toggle` – Kedvenc hozzáadása vagy eltávolítása (`{ session_id, product_id }`)

---

## 4. Projekt menedzment
### Publikus felület
* Bernáth Milán
### Admin felület
* Bernáth Milán
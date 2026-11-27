import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router";
import { useTermekContext } from "../contexts/TermekContext";

const NAME_OPTIONS = [
  "Kilowatt Case",
  "Revolution Case",
  "Dreams & Nightmares Case",
  "AK-47 | Slate",
  "AWP | Asiimov",
  "M4A1-S | Printstream",
  "USP-S | Neo-Noir",
  "Karambit | Doppler",
  "Butterfly Knife | Fade",
];

const CATEGORY_OPTIONS = ["weapon", "case", "knife"];

const RARITY_OPTIONS = [
  "Base Grade",
  "Restricted",
  "Classified",
  "Covert",
];

const EXTERIOR_OPTIONS = [
  "Factory New",
  "Minimal Wear",
  "Field-Tested",
  "Well-Worn",
  "Battle-Scarred",
];

export default function UjTermek() {
  const [name, setName] = useState(NAME_OPTIONS[0]);
  const [category, setCategory] = useState(CATEGORY_OPTIONS[0]);
  const [rarity, setRarity] = useState(RARITY_OPTIONS[0]);
  const [exterior, setExterior] = useState(EXTERIOR_OPTIONS[0]);
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const { ujTermekHozzaadasa } = useTermekContext();

  const navigate = useNavigate();

  function handleCategoryChange(newCategory: string) {
    setCategory(newCategory);
    if (newCategory === "case") {
      setExterior("");
    } else if (!exterior) {
      setExterior(EXTERIOR_OPTIONS[0]);
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const finalExterior = category === "case" ? null : exterior;

    try {
      await ujTermekHozzaadasa({
        name,
        category,
        rarity,
        exterior: finalExterior,
        price: Number(price),
        image_url: imageUrl.trim(),
      });

      alert(
        `A megadott termék: ${name} (${category}, ${rarity}, ${
          finalExterior ?? "null"
        }, $${price})`
      );
      navigate("/admin");
    } catch {
      alert("Hiba történt a termék mentése közben!");
    }
  }

  return (
    <section>
      <h2>Új termék felvétele</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Termék neve:</label>
          <select
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          >
            {NAME_OPTIONS.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="category">Kategória:</label>
          <select
            id="category"
            value={category}
            onChange={(e) => handleCategoryChange(e.target.value)}
          >
            {CATEGORY_OPTIONS.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="rarity">Ritkaság:</label>
          <select
            id="rarity"
            value={rarity}
            onChange={(e) => setRarity(e.target.value)}
          >
            {RARITY_OPTIONS.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="exterior">Külső:</label>
          <select
            id="exterior"
            value={exterior}
            onChange={(e) => setExterior(e.target.value)}
            disabled={category === "case"}
          >
            {EXTERIOR_OPTIONS.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="price">Ár:</label>
          <input
            id="price"
            type="number"
            step="0.01"
            min="0"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="imageUrl">Kép (URL):</label>
          <input
            id="imageUrl"
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
          />
        </div>

        <button type="submit">Mentés</button>
      </form>
    </section>
  );
}
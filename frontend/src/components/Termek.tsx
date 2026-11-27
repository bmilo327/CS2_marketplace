import { useTermekContext } from "../contexts/TermekContext";
import type { termekType } from "../types/termekType";

interface TermekProps {
  termek: termekType;
}

export default function Termek({ termek }: TermekProps) {
  const { kosarbaTeszem, kedvencValtas, kedvencek } = useTermekContext();

  const kedvencE = kedvencek.some((t) => t.id === termek.id);

  return (
    <div className="termek">
      <div className="termek-kep">
        <img src={termek.image_url} alt={termek.name} />
      </div>
      <div className="termek-adatok">
        <h3>{termek.name}</h3>
        <p>{termek.category}</p>
        <p>{termek.rarity}</p>
        {termek.exterior && <p>Külső: {termek.exterior}</p>}
        <p>{termek.price} Ft</p>
      </div>
      <div className="termek-gombok">
        <button type="button" onClick={() => kosarbaTeszem(termek)}>
          Kosárba
        </button>
        <button type="button" onClick={() => kedvencValtas(termek)}>
          {kedvencE ? "Kedvenc ✓" : "Kedvencekhez"}
        </button>
      </div>
    </div>
  );
}
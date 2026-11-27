import { useTermekContext } from "../contexts/TermekContext"

export default function Favorites() {
    const { kedvencek, kedvencValtas, kosarbaTeszem } = useTermekContext()

    return (
        <div className="kedvencek-oldal">
            <h2>Kedvencek</h2>

            {kedvencek.length === 0 ? (
                <p className="ures-uzenet">Még nincs kedvencelt termék.</p>
            ) : (
                <div className="kedvencek-lista">
                    {kedvencek.map(termek => (
                        <div className="kedvenc-elem" key={termek.id}>
                            <div className="kedvenc-elem-kep">
                                <img src={termek.image_url} alt={termek.name} />
                            </div>
                            <div className="kedvenc-elem-adatok">
                                <h3>{termek.name}</h3>
                                <p>{termek.category}</p>
                                <p>{termek.rarity}</p>
                                {termek.exterior && <p>Külső: {termek.exterior}</p>}
                                <p>{termek.price} Ft</p>
                            </div>
                            <div className="kedvenc-elem-muveletek">
                                <button type="button" onClick={() => kosarbaTeszem(termek)}>
                                    Kosárba
                                </button>
                                <button type="button" onClick={() => kedvencValtas(termek)}>
                                    Eltávolítás
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
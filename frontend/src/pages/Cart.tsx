import { useTermekContext } from "../contexts/TermekContext"

export default function Cart() {
    const { kosar, mennyisegNovel, mennyisegCsokkent, kosarbolTorol } = useTermekContext()

    const vegosszeg = kosar.reduce(
        (sum, elem) => sum + Number(elem.termek.price) * elem.mennyiseg,
        0
    )

    return (
        <div className="kosar-oldal">
            <h2>Kosár</h2>

            {kosar.length === 0 ? (
                <p className="ures-uzenet">A kosár jelenleg üres.</p>
            ) : (
                <div className="kosar-lista">
                    {kosar.map(elem => (
                        <div className="kosar-elem" key={elem.termek.id}>
                            <div className="kosar-elem-kep">
                                <img src={elem.termek.image_url} alt={elem.termek.name} />
                            </div>
                            <div className="kosar-elem-adatok">
                                <h3>{elem.termek.name}</h3>
                                <p>{elem.termek.category}</p>
                                <p>{elem.termek.rarity}</p>
                                {elem.termek.exterior && <p>Külső: {elem.termek.exterior}</p>}
                                <p>{elem.termek.price} Ft</p>
                            </div>
                            <div className="kosar-elem-muveletek">
                                <button type="button" onClick={() => mennyisegCsokkent(elem.termek.id)}>
                                    -
                                </button>
                                <span>{elem.mennyiseg}</span>
                                <button type="button" onClick={() => mennyisegNovel(elem.termek.id)}>
                                    +
                                </button>
                                <button type="button" onClick={() => kosarbolTorol(elem.termek.id)}>
                                    Törlés
                                </button>
                            </div>
                        </div>
                    ))}

                    <div className="kosar-osszesito">
                        <p>Végösszeg: {vegosszeg} Ft</p>
                    </div>
                </div>
            )}
        </div>
    )
}
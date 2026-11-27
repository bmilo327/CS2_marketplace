import type { termekType } from "../types/termekType"

interface TermekProps{
    termek: termekType
}

export default function Termek({termek}: TermekProps) {
    return(
        <div className="termek">
            <div className="termek-kep">
                <img src={termek.kep} alt={termek.nev} />
            </div>
            <div className="termek-adatok">
                <h3>{termek.nev}</h3>
                <p>{termek.kategoria}</p>
                <p>{termek.ritkasag}</p>
                <p>{termek.kulso}</p>
                <p>{termek.ar} Ft</p>
                <p></p>
            </div>
        </div>
    )
}
import { useTermekContext } from "../contexts/TermekContext"
import Termek from "./Termek"

export default function Termekek() {
    const {termekLista, load, error} = useTermekContext()

    if (load) {
        return(
            <p>Termékek betöltése...</p>
        )
    }
    if (error) {
        return(
            <p>{error}</p>
        )
    }

    return (
        <div className="termekek-lista">
            {termekLista.map((e,i)=>{
                return(
                    <Termek termek={e} key={i}/>
                )
            })}
        </div>
    )
}


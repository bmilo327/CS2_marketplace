import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import type { termekType } from "../types/termekType"
import { getTermekek } from "../services/TermekService"

interface TermekContextType{
    termekLista: termekType[]
    load: boolean
    error : string | null
}

const TermekContext = createContext<TermekContextType | undefined>(undefined)

export function TermekProvider({children}:{children: ReactNode}) {
    const [termekLista, setTermekLista] = useState<termekType[]>([])
    const [load, setLoad] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(()=>{
        getTermekek().then(data => {setTermekLista(data); setError(null)})
        .catch(()=>{
            setError("Nem sikerült beállítani az adatokat!")
        })
        .finally(()=>{
            setLoad(false)
        })
    }, [])

    return (
        <TermekContext.Provider value = {{termekLista, load, error}}>
            {children}
        </TermekContext.Provider>
    )
}

export function useTermekContext() {
    const context = useContext(TermekContext)
    if (context === undefined) {
        throw new Error("Csak a termekProvider-en belül használható!")
    }
    return context
}
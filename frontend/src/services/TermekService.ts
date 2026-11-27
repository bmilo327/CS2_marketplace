import type { termekType } from "../types/termekType"

const API_URL =  ""

export function getTermekek(){
    return fetch(API_URL).then((response)=> {
        if (!response.ok) {
            throw new Error("Hiba a termékek fetch-elése során!")
        }
        return response.json() as Promise<termekType[]>
    })
}
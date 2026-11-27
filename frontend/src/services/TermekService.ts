import type { termekType } from "../types/termekType"

const BASE_URL = "http://127.0.0.1:8000/api";

export const PRODUCTS_URL = `${BASE_URL}/products`;
export const CART_URL = `${BASE_URL}/cart`;
export const FAVORITES_URL = `${BASE_URL}/favorites`;

export type UjTermekInput = Omit<termekType, "id">;

export function getTermekek(){
    return fetch(PRODUCTS_URL).then((response)=> {
        if (!response.ok) {
            throw new Error("Hiba a termékek fetch-elése során!")
        }
        return response.json() as Promise<termekType[]>
    })
}

export function ujTermekHozzaadasa(ujTermek: UjTermekInput) {
  const kuldendoAdat: UjTermekInput = {
    ...ujTermek,
    exterior: ujTermek.category === "case" ? null : ujTermek.exterior,
    price: Number(ujTermek.price),
  };

  return fetch(PRODUCTS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(kuldendoAdat),
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Hiba az új termék mentése során!");
    }
    return response.json() as Promise<termekType>;
  });
}
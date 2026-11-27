import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  ujTermekHozzaadasa,
  type UjTermekInput,
} from "../services/TermekService";
import type { termekType } from "../types/termekType";
import { getTermekek } from "../services/TermekService";
import type { kosarType } from "../types/kosarType";

interface TermekContextType {
  termekLista: termekType[];
  load: boolean;
  error: string | null;
  kosar: kosarType[];
  kedvencek: termekType[];
  kosarbaTeszem: (termek: termekType) => void;
  mennyisegNovel: (termekId: number) => void;
  mennyisegCsokkent: (termekId: number) => void;
  kosarbolTorol: (termekId: number) => void;
  kedvencValtas: (termek: termekType) => void;
  ujTermekHozzaadasa: (ujTermek: UjTermekInput) => Promise<void>;
}

const TermekContext = createContext<TermekContextType | undefined>(undefined);

export function TermekProvider({ children }: { children: ReactNode }) {
  const [termekLista, setTermekLista] = useState<termekType[]>([]);
  const [load, setLoad] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [kosar, setKosar] = useState<kosarType[]>([]);
  const [kedvencek, setKedvencek] = useState<termekType[]>([]);

  useEffect(() => {
    getTermekek()
      .then((data) => {
        setTermekLista(data);
        setError(null);
      })
      .catch(() => {
        setError("Nem sikerült beállítani az adatokat!");
      })
      .finally(() => {
        setLoad(false);
      });
  }, []);

  async function handleUjTermekHozzaadasa(ujTermek: UjTermekInput) {
    const letrehozott = await ujTermekHozzaadasa(ujTermek);
    setTermekLista((prev) => [...prev, letrehozott]);
  }

  function kosarbaTeszem(termek: termekType) {
    setKosar((prev) => {
      const letezo = prev.find((e) => e.termek.id === termek.id);
      if (letezo) {
        return prev.map((e) =>
          e.termek.id === termek.id ? { ...e, mennyiseg: e.mennyiseg + 1 } : e,
        );
      }
      return [...prev, { termek, mennyiseg: 1 }];
    });
  }

  function mennyisegNovel(termekId: number) {
    setKosar((prev) =>
      prev.map((e) =>
        e.termek.id === termekId ? { ...e, mennyiseg: e.mennyiseg + 1 } : e,
      ),
    );
  }

  function mennyisegCsokkent(termekId: number) {
    setKosar((prev) =>
      prev
        .map((e) =>
          e.termek.id === termekId ? { ...e, mennyiseg: e.mennyiseg - 1 } : e,
        )
        .filter((e) => e.mennyiseg > 0),
    );
  }

  function kosarbolTorol(termekId: number) {
    setKosar((prev) => prev.filter((e) => e.termek.id !== termekId));
  }

  function kedvencValtas(termek: termekType) {
    setKedvencek((prev) => {
      const benneVan = prev.some((t) => t.id === termek.id);
      if (benneVan) {
        return prev.filter((t) => t.id !== termek.id);
      }
      return [...prev, termek];
    });
  }

  return (
    <TermekContext.Provider 
      value={{
        termekLista,
        load,
        error,
        kosar,
        kedvencek,
        kosarbaTeszem,
        mennyisegNovel,
        mennyisegCsokkent,
        kosarbolTorol,
        kedvencValtas,
        ujTermekHozzaadasa: handleUjTermekHozzaadasa,
      }}
    >
      {children}
    </TermekContext.Provider>
  );
}

export function useTermekContext() {
  const context = useContext(TermekContext);
  if (context === undefined) {
    throw new Error("Csak a termekProvider-en belül használható!");
  }
  return context;
}

import { createContext, useState, type ReactNode } from "react";
import type { konyvAdat, UjKonyvTipus } from "../adatok/adatok";
import { konyvek } from "../adatok/adatok";

interface KonyvContextType {
  konyvek: konyvAdat[];
  torles: (id: number) => void;
  konyvHozzaadas:(konyv:UjKonyvTipus) => void
}

export const KonyvContext = createContext<KonyvContextType | undefined>(
  undefined,
);

interface KonyvProviderValue {
  children: ReactNode;
}

export function KonyvProvider({ children }: KonyvProviderValue) {
  const [konyvekLista, setKonyvekLista] = useState<konyvAdat[]>(konyvek);

  function torles(id: number) {
    setKonyvekLista(konyvekLista.filter((konyv) => konyv.id !== id));
  }

  function konyvHozzaadas(konyv: UjKonyvTipus){
    setKonyvekLista(elozoLista => {
        const ujId =
        Math.max(0, ...elozoLista.map(k=>k.id)) + 1

        return [...elozoLista, {...konyv, id: ujId}]
    })
  }

  return (
    <KonyvContext.Provider
      value={{
        konyvek: konyvekLista,
        torles: torles,
        konyvHozzaadas : konyvHozzaadas
      }}
    >
      {children}
    </KonyvContext.Provider>
  );
}

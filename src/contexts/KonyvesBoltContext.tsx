import { createContext, useState, type ReactNode } from "react";
import type { konyvAdat, UjKonyvTipus } from "../adatok/adatok";
import { konyvek } from "../adatok/adatok";

interface KonyvContextType {
  konyvek: konyvAdat[];
  torles: (id: number) => void;
  konyvHozzaadas: (konyv: UjKonyvTipus) => void;
  konyvModositas: (konyv: konyvAdat) => void;
  szerkesztendoKonyv: konyvAdat | null; /* mert nincs egy konyv sem kivalsztva szerkesztesre */
  szerkesztesInditas: (id: number) => void;
}

export const KonyvContext = createContext<KonyvContextType | undefined>(
  undefined,
);

interface KonyvProviderValue {
  children: ReactNode;
}

export function KonyvProvider({ children }: KonyvProviderValue) {
  const [konyvekLista, setKonyvekLista] = useState<konyvAdat[]>(konyvek);
  const [szerkesztendoKonyv, setSzerkesztendoKonyv] =
    useState<konyvAdat | null>(
      null,
    ); /* mert nincs egy konyv sem kivalsztva szerkesztesre */

  function torles(id: number) {
    setKonyvekLista(konyvekLista.filter((konyv) => konyv.id !== id));
  }

  function konyvHozzaadas(konyv: UjKonyvTipus) {
    setKonyvekLista((elozoLista) => {
      const ujId = Math.max(0, ...elozoLista.map((k) => k.id)) + 1;

      return [...elozoLista, { ...konyv, id: ujId }];
    });
  }
  function konyvModositas(modositottKonyv: konyvAdat) {
    setKonyvekLista((elozoLista) =>
      elozoLista.map((konyv) =>
        konyv.id === modositottKonyv.id ? modositottKonyv : konyv,
      ),
    );
    setSzerkesztendoKonyv(null);
  }
  function szerkesztesInditas(id: number) {
    const konyv = konyvekLista.find(k=>k.id === id)

    if (konyv) {
        setSzerkesztendoKonyv(konyv)
    }
  }
  return (
    <KonyvContext.Provider
      value={{
        konyvek: konyvekLista,
        torles: torles,
        konyvHozzaadas: konyvHozzaadas,
        konyvModositas: konyvModositas,
        szerkesztendoKonyv: szerkesztendoKonyv,
        szerkesztesInditas: szerkesztesInditas
      }}
    >
      {children}
    </KonyvContext.Provider>
  );
}

export interface konyvAdat {
  id: number;
  cim: string;
  szerzo: string;
  ar: number;
  darabszam: number;
}

export type UjKonyvTipus = Omit<konyvAdat, "id">;

export const konyvek: konyvAdat[] = [
  {
    id: 1,
    cim: "A Pál utcai fiúk",
    szerzo: "Molnár Ferenc",
    ar: 3490,
    darabszam: 12,
  },
  {
    id: 2,
    cim: "Egri csillagok",
    szerzo: "Gárdonyi Géza",
    ar: 4200,
    darabszam: 8,
  },
  {
    id: 3,
    cim: "A kőszívű ember fiai",
    szerzo: "Jókai Mór",
    ar: 3990,
    darabszam: 5,
  },
  {
    id: 4,
    cim: "Tüskevár",
    szerzo: "Fekete István",
    ar: 3150,
    darabszam: 15,
  },
  {
    id: 5,
    cim: "Abigél",
    szerzo: "Szabó Magda",
    ar: 4500,
    darabszam: 10,
  },
];

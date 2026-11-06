# React űrlapkezelés és adatmódosítás – TypeScript

## 1. useState – Adatok tárolása

Az űrlap mezőinek értékeit state-ben tároljuk.

```tsx
const [ujKonyv, setUjKonyv] = useState({
    cim: "",
    szerzo: "",
    ar: 0,
    darabszam: 0
});
```

- `useState`: tárolja az adatokat.
- `ujKonyv`: aktuális objektum.
- `setUjKonyv`: módosítja az objektumot.

## 2. Közös eseménykezelő – onChange

Egyetlen függvénnyel kezelhetjük az összes inputot.

```tsx
function adatValtozas(e: ChangeEvent<HTMLInputElement>) {
    const { name, value, type } = e.target;

    setUjKonyv(elozo => ({
        ...elozo,
        [name]: type === "number" ? Number(value) : value
    }));
}
```

- `name`: melyik mező változott.
- `value`: beírt érték.
- `type`: input típusa.
- `...elozo`: megtartja a többi adatot.
- `Number(value)`: számmá alakítja az értéket.
- `[name]`: dinamikusan módosítja a megfelelő objektumtulajdonságot.

## 3. Input mezők összekötése

```tsx
<input
    type="text"
    name="cim"
    value={ujKonyv.cim}
    onChange={adatValtozas}
/>
```

- `value`: a state aktuális értéke.
- `onChange`: kezeli a módosítást.
- `name`: egyezzen az objektum tulajdonságával.

Ezt controlled inputnak nevezzük, mert az input értékét a React state vezérli.

## 4. Űrlap beküldése – onSubmit

Az űrlap beküldésekor a `mentes()` függvény fut le.

```tsx
function mentes(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!context) return;

    context.konyvHozzaadas(ujKonyv);

    setUjKonyv({
        cim: "",
        szerzo: "",
        ar: 0,
        darabszam: 0
    });
}
```

A formban:

```tsx
<form onSubmit={mentes}>
```

- `onSubmit`: kezeli a beküldést.
- `preventDefault()`: megakadályozza az oldal újratöltését.
- `konyvHozzaadas()`: elküldi az adatokat a Contextnek.
- `setUjKonyv()`: alaphelyzetbe állítja a mezőket.

## 5. Context – Új könyv hozzáadása

Új könyvnél nem kérünk ID-t a felhasználótól.

```tsx
type UjKonyvTipus = Omit<KonyvAdat, "id">;
```

A Context típusában:

```tsx
konyvHozzaadas: (konyv: UjKonyvTipus) => void;
```

A Providerben:

```tsx
function konyvHozzaadas(konyv: UjKonyvTipus) {
    setKonyvekLista(elozoLista => {
        const ujId =
            Math.max(0, ...elozoLista.map(k => k.id)) + 1;

        return [...elozoLista, { ...konyv, id: ujId }];
    });
}
```

- `Omit`: elhagyja az ID tulajdonságot.
- `Math.max()`: megkeresi a legnagyobb ID-t.
- `+ 1`: létrehozza az új ID-t.
- `...elozoLista`: megtartja a korábbi könyveket.
- `...konyv`: átmásolja az új könyv adatait.

## 6. Könyvek szerkesztése – konyvModositas()

A meglévő könyvek adatainak módosítására külön függvényt használunk.

A Context típusában:

```tsx
konyvModositas: (konyv: KonyvAdat) => void;
```

A Providerben:

```tsx
function konyvModositas(modositottKonyv: KonyvAdat) {
    setKonyvekLista(elozoLista =>
        elozoLista.map(konyv =>
            konyv.id === modositottKonyv.id
                ? modositottKonyv
                : konyv
        )
    );

    setSzerkesztendoKonyv(null);
}
```

- `map()`: végigmegy a könyvek listáján.
- `konyv.id === modositottKonyv.id`: megkeresi a módosítandó könyvet.
- `? modositottKonyv : konyv`: egyezés esetén lecseréli az objektumot, egyébként megtartja.
- `setSzerkesztendoKonyv(null)`: lezárja a szerkesztési állapotot.

**Fontos:** a könyv ID-ja nem változik, csak a többi adat frissül.

## 7. useEffect – Mellékhatások kezelése

A `useEffect` segítségével olyan műveleteket hajthatunk végre, amelyek egy komponens megjelenéséhez vagy egy megadott adat változásához kapcsolódnak.

Alapvető szintaxis:

```tsx
useEffect(() => {
    // Végrehajtandó művelet
}, [függőségek]);
```

A `useEffect` részei:

- Callback függvény: tartalmazza a végrehajtandó műveletet.
- Dependency array: meghatározza, hogy mely értékek változásakor fusson le.

### Dependency array működése

| Megadás | Mikor fut le? |
|---|---|
| `[]` | Első megjelenéskor |
| `[valtozo]` | Első megjelenéskor és a változó változásakor |
| Nincs megadva | Minden renderelés után |

### Felhasználása a projektben

A könyvek szerkesztésénél a kiválasztott könyv adatait automatikusan betöltjük az űrlapba.

```tsx
useEffect(() => {
    if (szerkesztendoKonyv) {
        setUjKonyv({
            cim: szerkesztendoKonyv.cim,
            szerzo: szerkesztendoKonyv.szerzo,
            ar: szerkesztendoKonyv.ar,
            darabszam: szerkesztendoKonyv.darabszam
        });
    }
}, [szerkesztendoKonyv]);
```

Működése:

1. A felhasználó kiválaszt egy könyvet szerkesztésre.
2. A Context eltárolja a kiválasztott könyvet.
3. Megváltozik a `szerkesztendoKonyv` értéke.
4. A `useEffect` észleli a változást.
5. A `setUjKonyv()` betölti a könyv adatait az űrlapba.

**Különbség:**

- `useState`: állapotok és adatok tárolására szolgál.
- `useEffect`: mellékhatások végrehajtására szolgál, például egy űrlap automatikus feltöltésére.

## 8. Szerkesztési állapot – Könyv kiválasztása

A Contextben tároljuk, hogy melyik könyvet szeretnénk szerkeszteni.

```tsx
const [szerkesztendoKonyv, setSzerkesztendoKonyv] =
    useState<KonyvAdat | null>(null);
```

- `KonyvAdat`: a teljes könyv objektuma.
- `null`: kezdetben nincs kiválasztott könyv.
- `setSzerkesztendoKonyv()`: beállítja a szerkesztendő könyvet.

A könyv kiválasztása:

```tsx
function szerkesztesInditas(id: number) {
    const konyv = konyvekLista.find(k => k.id === id);

    if (konyv) {
        setSzerkesztendoKonyv(konyv);
    }
}
```

- `find()`: megkeresi az adott ID-jú könyvet.
- `setSzerkesztendoKonyv(konyv)`: eltárolja a kiválasztott könyvet.

A `Sor` komponensben:

```tsx
<button onClick={() => context.szerkesztesInditas(konyv.id)}>
    Szerkesztés
</button>
```

### Hozzáadás és szerkesztés egyetlen űrlappal

A mentés során ellenőrizzük, hogy van-e kiválasztott könyv.

```tsx
function mentes(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!context) return;

    if (szerkesztendoKonyv) {
        context.konyvModositas({
            ...ujKonyv,
            id: szerkesztendoKonyv.id
        });
    } else {
        context.konyvHozzaadas(ujKonyv);
    }

    setUjKonyv({
        cim: "",
        szerzo: "",
        ar: 0,
        darabszam: 0
    });
}
```

- Ha `szerkesztendoKonyv` létezik: módosítás történik.
- Ha `szerkesztendoKonyv` értéke `null`: új könyv hozzáadása történik.
- A `...ujKonyv` átmásolja az űrlap adatait.
- Az `id` biztosítja, hogy a megfelelő könyv módosuljon.

A cím és a gomb felirata is lehet feltételes:

```tsx
{szerkesztendoKonyv
    ? "Könyv szerkesztése"
    : "Új könyv hozzáadása"}
```

```tsx
{szerkesztendoKonyv
    ? "Módosítás mentése"
    : "Könyv mentése"}
```

## 9. Fontos TypeScript típusok

| Típus | Feladat |
|---|---|
| `ChangeEvent<HTMLInputElement>` | Input változásának típusa |
| `FormEvent<HTMLFormElement>` | Form beküldésének típusa |
| `UjKonyvTipus` | ID nélküli könyv |
| `KonyvAdat` | Teljes könyv adatai |
| `ReactNode` | React komponens gyermekeinek típusa |

## 10. HTML attribútumok Reactben

| Attribútum | Feladat |
|---|---|
| `htmlFor` | Label összekapcsolása inputtal |
| `required` | Kötelező mező |
| `min="0"` | Minimum érték |
| `step="1"` | Egész számú léptetés |
| `type="submit"` | Űrlap beküldése |
| `name` | Mező azonosítása |
| `value` | Input aktuális értéke |
| `onChange` | Input változásának kezelése |
| `onSubmit` | Űrlap beküldésének kezelése |

## 11. A teljes működési folyamat

### Új könyv hozzáadása

1. A felhasználó adatokat ír be az input mezőkbe.
2. A `useState` tárolja az adatokat.
3. Az `onChange` módosítja a state-et.
4. Az `onSubmit` elindítja a mentést.
5. A `preventDefault()` megakadályozza az oldal újratöltését.
6. A `konyvHozzaadas()` átadja az adatokat a Contextnek.
7. A Context generál egy új ID-t és frissíti a könyvlistát.
8. A `Tablazat` és a `Sor` megjeleníti az új könyvet.

### Meglévő könyv szerkesztése

1. A felhasználó rákattint a Szerkesztés gombra.
2. A `szerkesztesInditas()` megkeresi a könyvet az ID alapján.
3. A Context eltárolja a kiválasztott könyvet.
4. A `useEffect` betölti az adatokat az űrlapba.
5. A felhasználó módosítja a mezőket.
6. Az `onChange` frissíti a state-et.
7. A mentés meghívja a `konyvModositas()` függvényt.
8. A Context az ID alapján frissíti a megfelelő könyvet.
9. A szerkesztési állapot visszaáll `null` értékre.

## 12. Összefoglalás

| Fogalom | Feladat |
|---|---|
| `useState` | Adatok és állapotok tárolása |
| `useEffect` | Mellékhatások kezelése |
| `value` | State értékének megjelenítése |
| `onChange` | Mező módosításának kezelése |
| `name` | Mező azonosítása |
| `onSubmit` | Űrlap beküldése |
| `preventDefault()` | Alapértelmezett beküldés megakadályozása |
| `Context` | Könyvlista kezelése és megosztása |
| `Omit` | Tulajdonság elhagyása egy típusból |
| `map()` | Lista elemeinek átalakítása |
| `find()` | Egy adott elem megkeresése |
| `null` | Nincs kiválasztott könyv |
| `konyvHozzaadas()` | Új könyv hozzáadása |
| `konyvModositas()` | Meglévő könyv módosítása |

**Alapelv:** a beviteli mezők értékei state-ben vannak, a felhasználói események módosítják ezt a state-et, a Context pedig kezeli a könyvlista hozzáadását, törlését és módosítását.
# React űrlapkezelés – TypeScript

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

## 4. Űrlap beküldése – onSubmit

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
    setKonyvLista(elozoLista => {
        const ujId = Math.max(0, ...elozoLista.map(k => k.id)) + 1;

        return [...elozoLista, { ...konyv, id: ujId }];
    });
}
```

- `Omit`: elhagyja az ID tulajdonságot.
- `Math.max()`: megkeresi a legnagyobb ID-t.
- `+ 1`: létrehozza az új ID-t.
- `...elozoLista`: megtartja a korábbi könyveket.

## 6. Fontos TypeScript típusok

| Típus | Feladat |
|---|---|
| `ChangeEvent<HTMLInputElement>` | Input változásának típusa |
| `FormEvent<HTMLFormElement>` | Form beküldésének típusa |
| `UjKonyvTipus` | ID nélküli könyv |
| `KonyvAdat` | Teljes könyv adatai |

## 7. HTML attribútumok Reactben

| Attribútum | Feladat |
|---|---|
| `htmlFor` | Label összekapcsolása inputtal |
| `required` | Kötelező mező |
| `min="0"` | Minimum érték |
| `step="1"` | Egész számú léptetés |
| `type="submit"` | Űrlap beküldése |
| `name` | Mező azonosítása |

## 8. A teljes működési folyamat

1. A felhasználó adatokat ír be az input mezőkbe.
2. A `useState` tárolja az adatokat.
3. Az `onChange` módosítja a state-et.
4. Az `onSubmit` elindítja a mentést.
5. A `preventDefault()` megakadályozza az oldal újratöltését.
6. A `konyvHozzaadas()` átadja az adatokat a Contextnek.
7. A Context generál egy új ID-t és frissíti a könyvlistát.
8. A `Tablazat` és a `Sor` megjeleníti az új könyvet.

## 9. Összefoglalás

| Fogalom | Feladat |
|---|---|
| `useState` | Adatok tárolása |
| `value` | State értékének megjelenítése |
| `onChange` | Mező módosításának kezelése |
| `name` | Mező azonosítása |
| `onSubmit` | Űrlap beküldése |
| `preventDefault()` | Alapértelmezett beküldés megakadályozása |
| `Context` | Könyvlista kezelése és megosztása |
| `Omit` | Tulajdonság elhagyása egy típusból |

**Alapelv:** a beviteli mezők értékei state-ben vannak, a felhasználói események módosítják ezt a state-et, mentéskor pedig a Context kezeli a könyvlista frissítését.
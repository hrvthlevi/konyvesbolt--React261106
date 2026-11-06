import { useState, useContext } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { KonyvContext } from "../contexts/KonyvesBoltContext";

function Form() {
  const context = useContext(KonyvContext);
  if (!context) {
    return null 
  }
  const { szerkesztendoKonyv } = context
  

  const [ujKonyv, setUjKonyv] = useState({
    cim: "",
    szerzo: "",
    ar: 0,
    darabszam: 0,
  });

  function adatValtozas(e: ChangeEvent<HTMLInputElement>) {
    const { name, value, type } = e.target;

    setUjKonyv((elozo) => ({
      ...elozo,
      [name]: type === "number" ? Number(value) : value,
    }));
  }
  function mentes(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!context) return;

    context.konyvHozzaadas(ujKonyv);

    setUjKonyv({
      cim: "",
      szerzo: "",
      ar: 0,
      darabszam: 0,
    });
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-900">
          Új könyv hozzáadása
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Töltsd ki az adatokat az új könyv rögzítéséhez.
        </p>
      </div>

      <form className="space-y-5" onSubmit={mentes}>
        <div className="space-y-2">
          <label
            htmlFor="cim"
            className="block text-sm font-medium text-slate-700"
          >
            Könyv címe
          </label>

          <input
            type="text"
            id="cim"
            name="cim"
            value={ujKonyv.cim}
            onChange={adatValtozas}
            required
            placeholder="Pl. A kis herceg"
            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="szerzo"
            className="block text-sm font-medium text-slate-700"
          >
            Szerző
          </label>

          <input
            type="text"
            id="szerzo"
            name="szerzo"
            value={ujKonyv.szerzo}
            onChange={adatValtozas}
            required
            placeholder="Pl. Antoine de Saint-Exupéry"
            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label
              htmlFor="ar"
              className="block text-sm font-medium text-slate-700"
            >
              Ár (Ft)
            </label>

            <input
              type="number"
              id="ar"
              name="ar"
              min="0"
              step="1"
              value={ujKonyv.ar}
              onChange={adatValtozas}
              required
              placeholder="2500"
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="darabszam"
              className="block text-sm font-medium text-slate-700"
            >
              Darabszám
            </label>

            <input
              type="number"
              id="darabszam"
              name="darabszam"
              min="0"
              step="1"
              value={ujKonyv.darabszam}
              onChange={adatValtozas}
              required
              placeholder="10"
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-amber-200 px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-amber-300 active:scale-[0.98]"
        >
          Könyv mentése
        </button>
      </form>
    </div>
  );
}

export default Form;

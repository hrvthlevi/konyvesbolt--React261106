
import { useContext } from "react";
import type { konyvAdat } from "../adatok/adatok";
import { KonyvContext } from "../contexts/KonyvesBoltContext";

interface SorProps {
    konyv: konyvAdat;
}

export default function Sor({ konyv }: SorProps) {
    const context = useContext(KonyvContext);

    if (!context) {
        throw new Error(
            "A Sor komponensnek KonyvesBoltProvideren belül kell lennie!"
        );
    }

    return (
        <tr className="group transition-colors hover:bg-indigo-50/50">

            <td className="px-6 py-4 text-gray-400">
                {konyv.id}
            </td>

            <td className="px-6 py-4 font-medium text-gray-900">
                {konyv.cim}
            </td>

            <td className="px-6 py-4 text-gray-600">
                {konyv.szerzo}
            </td>

            <td className="px-6 py-4 text-right font-semibold text-gray-900">
                {konyv.ar.toLocaleString("hu-HU")} Ft
            </td>

            <td className="px-6 py-4 text-center">
                <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
                    {konyv.darabszam} db
                </span>
            </td>

            <td className="px-6 py-4 text-right">
                <button
                    onClick={() => context.torles(konyv.id)}
                    className="rounded-lg border border-red-200 bg-white px-3 py-1.5 text-sm font-medium text-red-600 transition-all hover:border-red-300 hover:bg-red-50 active:scale-95"
                >
                    Törlés
                </button>
                <button
                    onClick={() =>context.szerkesztesInditas(konyv.id) }
                    className="rounded-lg border border-red-200 bg-white px-3 py-1.5 text-sm font-medium text-red-600 transition-all hover:border-red-300 hover:bg-red-50 active:scale-95"
                >
                    Szerkesztés
                </button>
            </td>

        </tr>
    );
}

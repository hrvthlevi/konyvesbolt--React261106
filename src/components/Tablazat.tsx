
import { useContext } from "react";
import Sor from "./Sor";
import { KonyvContext } from "../contexts/KonyvesBoltContext";

export default function Tablazat() {
    const context = useContext(KonyvContext);

    if (!context) {
        throw new Error(
            "A Tablazat komponensnek KedvencProvideren belül kell lennie!"
        );
    }

    return (
        <div className="mx-auto w-full max-w-6xl px-4 py-8">
            <div className="mb-6">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                    Könyvek
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                    Könyvkészlet áttekintése
                </p>
            </div>
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 text-xs uppercase tracking-wider text-gray-500">
                            <tr>
                                <th className="px-6 py-4 font-semibold">ID</th>
                                <th className="px-6 py-4 font-semibold">Cím</th>
                                <th className="px-6 py-4 font-semibold">Szerző</th>
                                <th className="px-6 py-4 text-right font-semibold">Ár</th>
                                <th className="px-6 py-4 text-center font-semibold">Db</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-100">
                            {context.konyvek.map((konyv) => (
                                <Sor
                                    key={konyv.id}
                                    konyv={konyv}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

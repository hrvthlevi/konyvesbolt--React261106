
import './App.css'
import Form from './components/Form'
import Tablazat from './components/Tablazat'

function App() {
    return (
        <div className="min-h-screen bg-slate-100">

            <header className="border-b border-slate-800 bg-slate-900 px-6 py-5 shadow-md">
                <div className="mx-auto flex max-w-7xl items-center justify-between">
                    <h1 className="text-xl font-bold tracking-tight text-white">
                        Könyvesbolt
                        <span className="ml-2 rounded-md bg-amber-200 px-2 py-1 text-xs font-bold text-slate-900">
                            ADMIN
                        </span>
                    </h1>
                    <span className="text-sm text-slate-400">
                        Adminisztrációs felület
                    </span>
                </div>
            </header>
            <main className="mx-auto max-w-7xl px-4 py-10">
                <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-3">
                    <section className="lg:col-span-2">
                        <Tablazat />
                    </section>
                    <section>
                        <Form />
                    </section>
                </div>

            </main>

        </div>
    )
}

export default App

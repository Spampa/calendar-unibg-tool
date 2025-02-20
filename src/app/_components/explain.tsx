"use client"

export default function Explain() {
    return (
        <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-1">
                <h2 className="text-lg">Guida all&apos;uso:</h2>
                <p>1 - Vai al sito <a className="text-primary" target="_blank" href="https://logistica.unibg.it/PortaleStudenti/index.php?view=easycourse&_lang=it&include=corso">Orari UNIBG</a></p>
                <p>2 - In visualizza orario selezionare <span className="font-bold">Orario Base</span></p>
                <p>3 - Scorrere fino in fondo e cliccare <span className="font-bold">Esporta in excel</span></p>
                <p>4 - Caricare il file sul sito</p>
            </div>
        </div>
    )
}
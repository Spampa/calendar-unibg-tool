import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"

export default function PrivacyPolicy() {
    return (
        <main className="container mx-auto p-6 flex flex-col gap-3">
            <div className="flex flex-col gap-3 py-6">
                <h1 className="font-extrabold text-xl">Privacy Policy</h1>
                <div className="flex flex-row gap-5 items-center">
                    <Link href={"/"} className={buttonVariants({ variant: "outline" })}><ChevronLeft />Torna alla home</Link>
                    <p>Ultimo aggiornamento: 25/02/2025</p>
                </div>
            </div>

            <h2 className="font-bold text-lg">1. Informazioni Raccolte</h2>
            <div>
                <p>L&apos;Applicazione elabora i seguenti dati:</p>
                <ul>
                    <li><strong>File Excel con gli orari scolastici</strong> fornito dall&apos;utente.</li>
                    <li><strong>Dati di Google Calendar</strong> necessari per creare e aggiornare eventi.</li>
                    <li><strong>Indirizzo email dell&apos;utente</strong> (richiesto per l&apos;autenticazione con Google OAuth).</li>
                </ul>
                <p>L&apos;Applicazione non raccoglie né memorizza alcun dato personale sui propri server.</p>
            </div>

            <h2 className="font-bold text-lg">2. Uso delle Informazioni</h2>
            <div>
                <p>Le informazioni fornite vengono utilizzate esclusivamente per:</p>
                <ul>
                    <li>Analizzare il file Excel e estrarre gli orari scolastici.</li>
                    <li>Creare o aggiornare eventi su Google Calendar in base agli orari forniti.</li>
                    <li>Mantenere il corretto funzionamento dell&apos;Applicazione.</li>
                </ul>
            </div>

            <h2 className="font-bold text-lg">3. Protezione dei Dati Sensibili</h2>
            <p>Adottiamo misure di sicurezza adeguate per proteggere i dati degli utenti, tra cui:</p>
            <ul>
                <li><strong>Crittografia:</strong> Tutte le comunicazioni tra l&apos;Applicazione e Google Calendar avvengono tramite connessioni SSL/TLS sicure.</li>
                <li><strong>Accesso limitato:</strong> Solo l’utente autenticato può visualizzare e gestire i propri dati.</li>
                <li><strong>OAuth 2.0:</strong> Utilizziamo Google OAuth per garantire un accesso sicuro senza memorizzare credenziali sensibili.</li>
                <li><strong>Conservazione dei dati:</strong> I dati vengono elaborati in tempo reale e <strong>non vengono salvati sui nostri server</strong>.</li>
                <li><strong>Revoca dei permessi:</strong> Gli utenti possono revocare l’accesso dell&apos;Applicazione in qualsiasi momento dalle <a href="https://myaccount.google.com/permissions" target="_blank" rel="noopener noreferrer">impostazioni di Google</a>.</li>
            </ul>

            <h2 className="font-bold text-lg">4. Condivisione dei Dati</h2>
            <p>
                L&apos;Applicazione <strong>non vende, condivide o trasferisce</strong> i dati degli utenti a terze parti.
                L&apos;accesso a Google Calendar avviene esclusivamente tramite le API ufficiali di Google, rispettando le loro politiche di sicurezza.
            </p>

            <h2 className="font-bold text-lg">5. Autenticazione e Sicurezza</h2>
            <p>
                L&apos;Applicazione utilizza Google OAuth per l&apos;autenticazione. Gli utenti concedono solo i permessi strettamente
                necessari per gestire il proprio calendario. Nessuna credenziale viene memorizzata.
            </p>

            <h2 className="font-bold text-lg">6. Conservazione dei Dati</h2>
            <p>
                L&apos;Applicazione <strong>non conserva alcun dato</strong> dopo l&apos;elaborazione. I dati rimangono solo all&apos;interno
                dell&apos;account Google Calendar dell&apos;utente.
            </p>

            <h2 className="font-bold text-lg">7. Diritti degli Utenti</h2>
            <p>
                Gli utenti possono revocare l&apos;accesso dell&apos;Applicazione al proprio Google Calendar in qualsiasi momento
                tramite <a href="https://myaccount.google.com/permissions" target="_blank" rel="noopener noreferrer">Google Account Permissions</a>.
            </p>

            <h2 className="font-bold text-lg">8. Modifiche alla Privacy Policy</h2>
            <p>
                Ci riserviamo il diritto di aggiornare questa Privacy Policy. Le modifiche saranno pubblicate su questa
                pagina con la data di aggiornamento.
            </p>

            <h2 className="font-bold text-lg">9. Contatti</h2>
            <p>
                Per qualsiasi domanda sulla Privacy Policy, puoi contattarci a: <a href="mailto:nicolo.spampa@gmail.com">nicolo.spampa@gmail.com</a>.
            </p>
        </main>
    )
}
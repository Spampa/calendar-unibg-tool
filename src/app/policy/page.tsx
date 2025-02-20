export default function PrivacyPolicy() {
    return (
        <main className=" container mx-auto p-6 flex flex-col gap-3">
            <h1 className=" font-extrabold text-xl">Privacy Policy</h1>
            <p>Ultimo aggiornamento: 20/02/2025</p>

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

            <h2 className="font-bold text-lg">3. Condivisione dei Dati</h2>
            <p>
                L&apos;Applicazione <strong>non vende, condivide o trasferisce</strong> i dati degli utenti a terze parti.
                L&apos;accesso a Google Calendar avviene tramite le API ufficiali di Google, nel rispetto delle loro politiche di sicurezza.
            </p>

            <h2 className="font-bold text-lg">4. Autenticazione e Sicurezza</h2>
            <p>
                L&apos;Applicazione utilizza Google OAuth per l&apos;autenticazione. Gli utenti concedono solo i permessi strettamente
                necessari per gestire il proprio calendario. Nessuna credenziale viene memorizzata.
            </p>

            <h2 className="font-bold text-lg">5. Conservazione dei Dati</h2>
            <p>
                L&apos;Applicazione <strong>non conserva alcun dato</strong> dopo l&apos;elaborazione. I dati rimangono solo all&apos;interno
                dell&apos;account Google Calendar dell&apos;utente.
            </p>

            <h2 className="font-bold text-lg">6. Diritti degli Utenti</h2>
            <p>
                Gli utenti possono revocare l&apos;accesso dell&apos;Applicazione al proprio Google Calendar in qualsiasi momento
                tramite <a href="https://myaccount.google.com/permissions" target="_blank" rel="noopener noreferrer">Google Account Permissions</a>.
            </p>

            <h2 className="font-bold text-lg">7. Modifiche alla Privacy Policy</h2>
            <p>
                Ci riserviamo il diritto di aggiornare questa Privacy Policy. Le modifiche saranno pubblicate su questa
                pagina con la data di aggiornamento.
            </p>

            <h2 className="font-bold text-lg">8. Contatti</h2>
            <p>
                Per qualsiasi domanda sulla Privacy Policy, puoi contattarci a: <a href="mailto:nicolo.spampa@gmail.com">nicolo.spampa@gmail.com</a>.
            </p>
        </main >
    )
}
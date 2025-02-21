"use client"

import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Landing() {
    const { status } = useSession();

    if (status === "authenticated") {
        redirect("/home");
    }
    else {
        return (
            <main className="flex place-content-center h-screen bg-gradient-to-r from-background via-30% via-blue-950 to-background">
                <div className="flex flex-col gap-4 h-full place-content-center items-center text-center">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-4xl font-bold">UNIBG Calendar Tool</h1>
                        <p>Carica il tuo file Excel e sincronizza gli orari su <b>Google Calendar</b> in un clic.</p>
                    </div>
                    <Link href={"/login"} className={buttonVariants()}>Inizia Subito!</Link>
                </div>

                <div className="absolute bottom-0 w-full text-center p-3 text-sm">
                    Utilizzando UNIBG Calendar Tool confermi di avere letto l&apos;<Link href={"/policy"} className="underline">informativa sulla privacy.</Link>
                </div>
            </main>
        )
    }
}
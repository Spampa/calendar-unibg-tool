"use client"

import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { MoveUpRight, ChevronRight } from "lucide-react";

export default function Landing() {
    const { status } = useSession();

    if (status === "authenticated") {
        redirect("/home");
    }
    else {
        return (
            <main className="flex flex-col items-center gap-14 h-screen p-5 pt-24 md:pt-32 mx-auto bg-background">
                <div className="flex flex-col gap-14  md:w-2/3 xl:w-1/3">
                    <div className="flex flex-col gap-8 items-center">
                        <h1 className="text-4xl font-bold text-center">Introducing UNIBG Calendar Tool</h1>
                        <div className="flex flex-row gap-2">
                            <Link href={"/login"} className={buttonVariants()}>Prova Calendar Tool<MoveUpRight /></Link>
                            <Link href={"/policy"} className={buttonVariants({ variant: "outline" })}>Informativa sulla Privacy<ChevronRight /></Link>
                        </div>
                    </div>
                    <div className="border border-b-1"></div>
                    <div className="flex flex-col items-center w-full gap-2">
                        <p>UNIBG Calendar Calendar Tool è uno strumento online dedicato agli studenti e al personale dell&apos;Università di Bergamo, progettato per semplificare la gestione del calendario accademico. Permette di convertire file Excel contenenti orari delle lezioni ed eventi universitari in un formato compatibile con Google Calendar, facilitando l&apos;importazione e la sincronizzazione.</p>
                        <p>Per offrire un&apos;esperienza personalizzata e consentire l&apos;importazione diretta su Google Calendar, richiediamo l&apos;autenticazione tramite Google OAuth. L&apos;accesso ci permette esclusivamente di creare e gestire eventi nel tuo calendario, senza raccogliere o condividere dati personali.</p>
                    </div>
                </div>
            </main>
        )
    }
}
"use client"

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

export default function Login(){
    return(
        <main className="flex place-content-center h-screen bg-gradient-to-r from-background via-30% via-blue-950 to-background">
            <div className="flex flex-col gap-4 h-full place-content-center items-center text-center">
                <h1 className="text-4xl font-bold">UNIBG Calendar Tool</h1>
                <p>Abbiamo bisogno della tua autorizzazione Google per applicare il calendario 😊</p>
                <Button onClick={() => signIn("google", { callbackUrl: "/" })}>Accedi Con Google</Button>
            </div>
        </main>
    )
}
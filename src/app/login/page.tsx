"use client"

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

export default function Login(){
    return(
        <main className="flex place-content-center h-screen bg-gradient-to-r from-background via-30% via-blue-950 to-background">
            <h1 className="text-xl font-bold absolute top-0 left-0 m-6">UNIBG Calendar Tool</h1>
            <div className="flex h-full place-content-center items-center text-center">
                <div className=" flex flex-col gap-3">
                    <h3 className="text-xl font-semibold">Inizia ad usare il tool</h3>
                    <Button variant={"default"} onClick={() => signIn("google", { callbackUrl: "/home" })}>Accedi Con Google</Button>
                </div>
            </div>
        </main>
    )
}
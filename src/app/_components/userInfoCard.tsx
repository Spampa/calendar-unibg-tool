"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils";

import {
    Card,
    //CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function UserInfoCard() {
    const { data: session } = useSession();

    return (
        <Card className={cn("w-[380px]")}>
            <CardHeader>
                <CardTitle className="flex flex-row gap-2 items-center">
                    <Avatar>
                        <AvatarImage src={session?.user?.image || ""} />
                        <AvatarFallback>{session?.user?.name ? session.user.name[0] : ""}</AvatarFallback>
                    </Avatar>
                    {session?.user?.name || ""}
                </CardTitle>
                <CardDescription>
                    Stiamo modificando il calendario di {session?.user?.email || ""}
                </CardDescription>
            </CardHeader>
            <CardFooter>
                <Button variant={"destructive"} onClick={() => signOut()}>Logout</Button>
            </CardFooter>
        </Card>
    )
}
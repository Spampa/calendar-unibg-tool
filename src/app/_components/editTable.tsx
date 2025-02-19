"use client"

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react";

import { Subject, Event } from "@/types";

interface EditTableProps {
    calendar: Array<Event>
    subjects: Array<Subject>
    setSubjects: React.Dispatch<React.SetStateAction<Subject[]>>;
}

import {
    Table,
    TableBody,
    //TableCaption,
    TableCell,
    //TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox"

import { isIncluded } from "@/lib/utils";

export default function EditTable({ calendar, subjects, setSubjects }: EditTableProps) {
    const { data: session } = useSession();
    const [status, setStatus] = useState<boolean>(false);

    useEffect(() => {
        setStatus(false);
    }, [calendar]);

    async function applyCalendar() {
        calendar.forEach(async (e: Event) => {
            if (isIncluded(e, subjects)) {
                const res = await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events", {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${session?.accessToken}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(e)
                });

                if (!res.ok) {
                    console.error("Errore durante l'aggiunta dell'evento:", e);
                }
            }
        });
        setStatus(true);
    }

    function handleCheckChange(subject: Subject) {
        setSubjects((prevSubjects: Subject[]) =>
            prevSubjects.map((s: Subject) =>
                s.id === subject.id ? { ...s, included: !s.included } : s
            )
        );
    }

    if (calendar.length != 0) {
        return (
            <div className=" w-full flex flex-col gap-2 place-content-center">
                <div className="flex place-content-center">
                    {
                        status === false ?
                            <Button onClick={() => applyCalendar()} className=" font-bold" variant={"secondary"}>Applica a Google Calendar!</Button>
                            :
                            <Button disabled className=" font-bold bg-green-500">Orario Applicato</Button>
                    }

                </div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Materia</TableHead>
                            <TableHead>Colore</TableHead>
                            <TableHead>Incluso</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {subjects.map((subject) => (
                            <TableRow key={subject.id}>
                                <TableCell className="font-medium">{subject.name}</TableCell>
                                <TableCell>
                                    <div
                                        className={`p-3 rounded-full w-3`}
                                        style={{ backgroundColor: subject.hex }}>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Checkbox
                                        checked={subject.included}
                                        key={subject.id}
                                        onCheckedChange={() => handleCheckChange(subject)}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        )
    }
    else {
        <></>
    }


}
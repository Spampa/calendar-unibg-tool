"use client"

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Calendar, LoaderCircle } from "lucide-react"
import { useState } from "react"

import { Subject, Event } from "@/types"

interface FileUploadProps {
    setCalendar: React.Dispatch<React.SetStateAction<Event[]>>;
    setSubjects: React.Dispatch<React.SetStateAction<Subject[]>>;
}

const ACCEPTED_EXCEL_FILE = [
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
    "application/vnd.ms-excel" // .xls
];

const formSchema = z.object({
    excelFile: z.instanceof(File, { message: "Devi caricare un file" })
        .refine(file => ACCEPTED_EXCEL_FILE.includes(file.type), {
            message: "Solo file .xlsx e .xls sono accettati"
        })
});

export default function FileUpload({ setCalendar, setSubjects }: FileUploadProps) {
    const [isFileLoad, setIsFileLoad] = useState<boolean>(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            excelFile: undefined,
        }
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsFileLoad(true);
        const formData = new FormData();
        formData.append("excelFile", values.excelFile);

        const res = await fetch('/api/converter', {
            method: "POST",
            body: formData
        });
       
        if (res.ok) {
            const data = await res.json();
            setCalendar(data?.calendar);
            setSubjects(data?.subjects);
        }

        setIsFileLoad(false);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="excelFile"
                    render={({ field: { onChange } }) => (
                        <FormItem>
                            <FormLabel>File excel</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="File Excel"
                                    type="file"
                                    accept=".xlsx,.xls"
                                    onChange={(event) =>
                                        onChange(event.target.files && event.target.files[0])
                                    }
                                />
                            </FormControl>
                            <FormDescription>
                                Carica il file excel esportato.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {
                    isFileLoad === false ? 
                        <Button type="submit" className=" font-bold text-secondary"><Calendar />Estrai dati</Button>
                        :
                        <Button disabled variant={"outline"} size={"icon"} className="font-bold text-secondary"><LoaderCircle className="animate-spin" /></Button>
                }
                
            </form>
        </Form>
    )
}
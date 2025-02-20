import { NextResponse } from "next/server";
import path from "path";
import * as fs from 'fs'
import * as XLSX from 'xlsx'
import { v4 as uuidv4 } from "uuid";

//types
import { Event, Subject } from "@/types";

import { getGoogleCalendarColor } from "@/lib/utils";

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const file = formData.get("excelFile") as File;

        if (!file) {
            return NextResponse.json({ status: "fail", error: "No file uploaded" }, { status: 400 });
        }

        const arrayBuffer = await file.arrayBuffer();
        const buffer = new Uint8Array(arrayBuffer);

        const uniqueFileName = `${uuidv4()}-${file.name}`;
        let filePath;
        if(process.env.NODE_ENV === 'development'){
            filePath = path.join("./tmp", uniqueFileName);
        }
        else{
            filePath = path.join("/tmp", uniqueFileName);
        }
        
        fs.writeFileSync(filePath, buffer);

        const data = await getCalendar(filePath);

        fs.unlinkSync(filePath);

        return NextResponse.json(data, { status: 200 });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ status: "fail", error: e }, { status: 500 });
    }
}

async function getCalendar(path: string) {
    const fileBuffer = fs.readFileSync(path);
    const workbook = XLSX.read(fileBuffer, { type: 'buffer' });

    // Ottieni il primo foglio
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    // Converte il foglio in JSON
    const jsonData: Record<string, unknown>[] = XLSX.utils.sheet_to_json(sheet);

    //setup empty
    const days: { [key: string]: string } = {};
    const daysCode = ["MO", "TU", "WE", "TH", "FR", "SA", "SU"];
    const calendar = <Array<Event>>[]

    const subjects = <Array<Subject>>[];

    let emptyIndex = 1;
    for (const d of jsonData) {
        if (d?.__EMPTY) {
            let i = 0;
            for (const key in d) {
                if (i == 0) {
                    emptyIndex = 1;
                }
                else if (key.charAt(key.length - 1) !== emptyIndex.toString()) {
                    let j = emptyIndex + 1
                    for (j; j <= parseInt(key.charAt(key.length - 1)); j++){
                        days[`__EMPTY_${emptyIndex}`] = daysCode[i - 1];
                    }
                    emptyIndex = j;
                }
                days[key] = daysCode[i];
                i++;
            }
            days[`__EMPTY_${emptyIndex + 1}`] = daysCode[i - 1];
            break;
        }
    }

    let id = 0;

    for (const e of jsonData) {
        for (const key in days) {
            const fields = typeof e[key] === 'string' ? e[key].split('\n') : "";

            if (!fields || fields.length == 1) continue;

            //extract fields
            const obj: { aula: string, orario: string } = { aula: '', orario: '' };

            for (const field of fields) {
                if (field.includes("Aula")) {
                    obj.aula = field
                }
                else if (field.includes(":")) {
                    obj.orario = field.replace(/\s+/g, '');
                }
            }

            const orario = obj.orario.split('-');
            let colorId = "";
            const subject = subjects.find(s => s?.name === fields[0]);
            if (subject) {
                colorId = subject.colorId;
            }
            else {
                colorId = ((subjects.length + 1)  % 11 + 1).toString();
                subjects.push({
                    name: fields[0],
                    colorId,
                    hex: getGoogleCalendarColor(colorId),
                    id: (id++).toString(),
                    included: true
                });
            }

            calendar.push({
                summary: fields[0],
                location: fields[2],
                start: {
                    dateTime: `2025-02-23T${orario[0]}:00+01:00`,
                    timeZone: "Europe/Rome"
                },
                end: {
                    dateTime: `2025-02-23T${orario[1]}:00+01:00`,
                    timeZone: "Europe/Rome"
                },
                colorId,
                recurrence: [
                    `RRULE:FREQ=WEEKLY;BYDAY=${days[key]};UNTIL=20250608T235959Z`
                ]
            });
        }

    }

    return { calendar, subjects };
}
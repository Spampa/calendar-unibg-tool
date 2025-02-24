import { NextResponse } from "next/server";
import { createGoogleCalendarEvents, createGoogleCalendar } from "@/lib/googleUtils";

export async function POST(req: Request) {
    try{
        const data = await req.json();
        const token = (req.headers.get('authorization'))?.substring("Bearer ".length);

        if (!Array.isArray(data.calendar) || !Array.isArray(data.subjects)) {
            return NextResponse.json({ status: "fail", message: "Calendar or Subjects object is not of the correct type" }, { status: 400 });
        }

        if(!token){
            return NextResponse.json({ message: "Access Token Not Valid!"}, { status: 401 });
        }

        const calendar = await createGoogleCalendar("Calendario Lezioni", "Orario lezioni UNIBG", token);
        await createGoogleCalendarEvents(data.calendar, data.subjects, token, calendar.id);
        return NextResponse.json({ message: "Calendar Created" }, { status: 201 })
    }
    catch(error){
        console.log(error);
        return NextResponse.json({ status: "fail", error }, {status: 500})
    }
}
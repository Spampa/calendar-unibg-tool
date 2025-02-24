import { Event, Subject } from "@/types"
import { isIncluded } from "./utils"
import { Calendar } from "@/types"

export function getGoogleCalendarColor(colorId: string) {
    switch (colorId) {
        case "1":
            return "#7986CB"
        case "2":
            return "#33B679"
        case "3":
            return "#8E24AA"
        case "4":
            return "#E67C73"
        case "5":
            return "#F6BF26"
        case "6":
            return "#F4511E"
        case "7":
            return "#039BE5"
        case "8":
            return "#616161"
        case "9":
            return "#3F51B5"
        case "10":
            return "#0B8043"
        case "11":
            return "#D50000"
        default:
            return "000fff"
    }
}

export async function createGoogleCalendarEvents(calendar: Array<Event>, subjects: Array<Subject>, token: string, calendarId: string) {
    try {
        await Promise.all(
            calendar
                .filter((e) => isIncluded(e, subjects))
                .map(async (e) => {
                    const res = await fetch(`https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`, {
                        method: "POST",
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(e)
                    });

                    if (!res.ok) {
                        throw new Error("Errore durante l'aggiunta dell'evento: " + JSON.stringify(e));
                    }
                })
        );
    }
    catch (error) {
        throw new Error(error instanceof Error ? error.message : String(error))
    }
}

export async function createGoogleCalendar(summary: string, description: string, token: string) {
    try {
        const calendar = await findCalendar(summary, token);
        if( calendar ) return calendar;
        
        const response = await fetch("https://www.googleapis.com/calendar/v3/calendars", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                summary,
                description,
                timeZone: "Europe/Rome"
            }),
        });

        const data: Calendar = await response.json();
        if (!response.ok) {
            throw new Error(`Errore nella creazione del calendario: ${JSON.stringify(data)}`);
        }

        return data;
    } catch (error) {
        console.error("Errore:", error);
        throw error;
    }
}

async function findCalendar(calendarName: string, token: string) {
    try {
        const response = await fetch("https://www.googleapis.com/calendar/v3/users/me/calendarList", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`Errore nel recupero dei calendari`);
        }

        const data = await response.json();

        // Cerca il calendario con il nome specificato
        const calendar = data.items.find((cal: Calendar) => cal.summary === calendarName);

        if (!calendar) {
            return null;
        }

        return calendar;
    } catch (error) {
        console.error("Errore:", error);
        throw error;
    }
}
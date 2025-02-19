interface Time {
    dateTime: string,
    timeZone: string
}

export interface Event {
    summary: string,
    location: string,
    start: Time,
    end: Time,
    colorId: string,
    recurrence: Array<string>
}
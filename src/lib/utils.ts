import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

//types
import { Event, Subject } from "@/types";

export * from "./extraction";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isIncluded(calendarItem: Event, subjects: Array<Subject>){
  for(const subject of subjects){
    if(subject.name === calendarItem.summary){
      return subject.included;
    }
  }
  return false;
}

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

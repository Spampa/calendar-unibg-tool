import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

//types
import { Event, Subject } from "@/types";

export * from "./extraction";
export * from "./googleUtils";

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
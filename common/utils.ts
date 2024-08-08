import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import dayjs, { Dayjs } from "dayjs";

export function toDateFormat(date: string | Dayjs) {
  return dayjs(date).toDate();
}

export function getRandInt(length: number) {
  const min = 10 ** (length - 1)
  const max = 10 ** (length) - 1
  return Math.round(Math.random() * (max - min + 1)) + min
}

export function slugify(text: string) {
  return text
    .replace(/[\'\&]/, '_')
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function roundToNextHalfHour(date: dayjs.Dayjs) {
  const minutes = date.minute()
  const roundUp = minutes > 0 && minutes <= 30 ? 30 : 0
  return date.minute(0).second(0).millisecond(0).add(1, 'hour').subtract(60 - roundUp, 'minute')
}

export async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
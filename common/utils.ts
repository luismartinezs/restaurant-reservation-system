import dayjs, { Dayjs } from "dayjs";

export function toDateFormat(date: string | Dayjs) {
  return dayjs(date).toDate();
}

export function getRandInt(length: number) {
  const min = 10 ** (length - 1)
  const max = 10 ** (length) - 1
  return Math.round(Math.random() * (max - min + 1)) + min
}
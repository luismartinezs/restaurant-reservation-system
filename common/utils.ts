import dayjs, { Dayjs } from "dayjs";

export function toDateFormat(date: string | Dayjs) {
  return dayjs(date).toDate();
}
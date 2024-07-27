import dayjs from "dayjs";
import { DEFAULT_HOUR, DEFAULT_PEOPLE } from "./constants";

export function getSearchQuery(params: {
  date?: string | null;
  time?: string | null;
  people?: string | null
} = {}): {
  date: string;
  time: string;
  people: number;
} {
  const { date, time, people } = params
  const now = dayjs();

  const defaultDate =
    now.hour() < DEFAULT_HOUR
      ? now.hour(DEFAULT_HOUR).minute(0).second(0).millisecond(0)
      : now.add(1, "day").hour(DEFAULT_HOUR).minute(0).second(0).millisecond(0);

  return {
    date: date ? decodeURIComponent(date) : defaultDate.format("YYYY-MM-DD"),
    time: time ? decodeURIComponent(time) : defaultDate.format("HH:mm"),
    people: people ? Number(people) : DEFAULT_PEOPLE,
  };
}
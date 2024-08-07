import dayjs from "dayjs";
import { DEFAULT_HOUR, DEFAULT_PEOPLE } from "./constants";

// assumes time string in format "HH:mm" or "H:mm"
function formatTimeQueryParam(time:string) {
  // a regexp could make this more resilient
  if (time.length === 4) {
    return `0${time}`;
  }
  return time
}

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
    time: time ? formatTimeQueryParam(decodeURIComponent(time)) : defaultDate.format("HH:mm"),
    people: people ? Number(people) : DEFAULT_PEOPLE,
  };
}
import dayjs from "dayjs";
import { useSearchParams } from "next/navigation";

const DEFAULT_HOUR = 19;
const DEFAULT_PEOPLE = 2;

export function useSearchQuery() {
  const searchParams = useSearchParams();

  const now = dayjs();

  const defaultDate =
    now.hour() < DEFAULT_HOUR
      ? now.hour(DEFAULT_HOUR).minute(0).second(0).millisecond(0)
      : now.add(1, "day").hour(DEFAULT_HOUR).minute(0).second(0).millisecond(0);

  const date = searchParams.get("date") ?? defaultDate.format("YYYY-MM-DD");
  let time = searchParams.get("time");
  time = time ? decodeURIComponent(time) : defaultDate.format("HH:mm");
  const people = searchParams.get("people") ?? DEFAULT_PEOPLE;

  return {
    date,
    time,
    people,
  };
}

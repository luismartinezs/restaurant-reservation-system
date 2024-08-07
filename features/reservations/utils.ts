import dayjs from "dayjs"
import { Insert, Read } from "./types"
import { getDates } from "@/features/restaurants"
import isBetween from "dayjs/plugin/isBetween";

dayjs.extend(isBetween)

export function canReserve(reservationAttempt: Insert, existingReservations: Read[], seatingCapacity: number): boolean {
  const { people } = reservationAttempt
  const { start: attemptStart, end: attemptEnd } = getDates(reservationAttempt.start)

  const peopleCountAtDate: { start: number, end: number } = { start: 0, end: 0 };

  for (const r of existingReservations) {
    const { start: _start, end: _end } = getDates(r.start)

    if (dayjs(attemptStart).isBetween(_start, _end, 'minute', '[)')) {
      peopleCountAtDate.start += r.people
    }
    if (dayjs(attemptEnd).isBetween(_start, _end, 'minute', '[)')) {
      peopleCountAtDate.end += r.people
    }
  }

  return (peopleCountAtDate.start + people <= seatingCapacity) && (peopleCountAtDate.end + people <= seatingCapacity)
}

// export function getNextTime(refTime?: dayjs.Dayjs): dayjs.Dayjs {
//   const now = dayjs();
//   const time = refTime ?? now;
//   const next = roundToNextHalfHour(time.add(1, "hour"));
//   const calcMin = dayjs(`${time.format("YYYY-MM-DD")} ${MIN_TIME}`);
//   const isCalcMinBeforeNow = calcMin.isBefore(time)
//   const min = isCalcMinBeforeNow ? calcMin.add(1, 'day') : calcMin;
//   const max = dayjs(`${time.format("YYYY-MM-DD")} ${MAX_TIME}`);

//   if (time.isAfter(max) || next.isBefore(min)) {
//     return min;
//   }

//   if (isCalcMinBeforeNow) {
//     return next;
//   }

//   return next

// }


export function getNextTime(currentTime?:dayjs.Dayjs): dayjs.Dayjs {
  currentTime = currentTime ?? dayjs()
  const startTime = currentTime.hour(13).minute(0).second(0);
  const endTime = currentTime.hour(22).minute(0).second(0);

  if (currentTime.isBefore(startTime)) {
    return startTime;
  }

  if (currentTime.isAfter(endTime)) {
    return startTime.add(1, 'day');
  }

  const minutes = currentTime.minute();
  if (minutes < 30) {
    return currentTime.minute(30).second(0);
  } else {
    return currentTime.add(1, 'hour').minute(0).second(0);
  }
}

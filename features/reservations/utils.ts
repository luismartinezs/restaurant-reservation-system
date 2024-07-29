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

import dayjs from "dayjs"
import { Insert, Read } from "./types"
import { getDates } from "@/features/restaurants"
import isBetween from "dayjs/plugin/isBetween";

export function canReserve(reservationAttempt: Insert, existingReservations: Read[], seatingCapacity: number): boolean {
  const { start, end } = getDates(reservationAttempt.start)

  dayjs.extend(isBetween)

  const peopleCountAtDate: { start: number, end: number } = existingReservations.reduce((acc, r) => {
    const { start: _start, end: _end } = getDates(r.start)

    if (dayjs(start).isBetween(_start, _end)) {
      acc.start += r.people
    }
    if (dayjs(end).isBetween(_start, _end)) {
      acc.end += r.people
    }
    return acc
  }, { start: 0, end: 0 })

  return Object.values(peopleCountAtDate).every(count => count + reservationAttempt.people <= seatingCapacity)
}
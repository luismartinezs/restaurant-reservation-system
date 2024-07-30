import { describe, expect, it } from "vitest";
import { canReserve } from "./utils";

const fixedProps = {
  restaurant_id: 1,
  user_id: '1'
}

function formatExistingReservation<T>(r: T, id: number) {
  return { ...r, ...fixedProps, id };
}


describe('canReserve', () => {

  // Reservation within seating capacity should return true
  it('should return true when reservation is within seating capacity', () => {
    const reservationAttempt = { start: '2023-10-10T12:00:00+0500', people: 4, ...fixedProps };
    const existingReservations = [
      { start: '2023-10-10T12:00:00+0500', people: 2 },
      { start: '2023-10-10T12:00:00+0500', people: 3 }
    ].map(formatExistingReservation);
    const seatingCapacity = 10;

    const result = canReserve(reservationAttempt, existingReservations, seatingCapacity);

    expect(result).toBe(true);
  });

  // Reservation starting exactly when another ends
  it('should return true when reservation starts exactly when another ends even if both add up to more than the seating capacity', () => {
    const reservationAttempt = { start: '2023-10-10T12:00:00+0500', people: 6, ...fixedProps };
    const existingReservations = [
      { start: '2023-10-10T10:00:00+0500', people: 6 }
    ].map(formatExistingReservation)
    const seatingCapacity = 10;

    const result = canReserve(reservationAttempt, existingReservations, seatingCapacity);

    expect(result).toBe(true);
  });

  it('should return false when reservation exceeds seating capacity', () => {
    // Mock data
    const reservationAttempt = { start: '2023-10-10T12:00:00+0500', people: 8, ...fixedProps };
    const existingReservations = [
      { start: '2023-10-10T12:00:00+0500', people: 4 },
      { start: '2023-10-10T12:00:00+0500', people: 3 }
    ].map(formatExistingReservation);
    const seatingCapacity = 10;

    // Call the function under test
    const result = canReserve(reservationAttempt, existingReservations, seatingCapacity);

    // Assertion
    expect(result).toBe(false);
  });

  // Reservation with people count exceeding capacity for start time should return false
  it.only('should return false when reservation people count exceeds capacity for start time', () => {
    // Mock data
    const reservationAttempt = { start: '2023-10-10T12:00:00+0500', people: 6, ...fixedProps };
    const existingReservations = [
      { start: '2023-10-10T11:00:00+0500', people: 4 },
      { start: '2023-10-10T11:00:00+0500', people: 3 }
    ].map(formatExistingReservation);
    const seatingCapacity = 10;

    // Call the function under test
    const result = canReserve(reservationAttempt, existingReservations, seatingCapacity);

    // Assertion
    expect(result).toBe(false);
  });

  // Reservation with people count exceeding capacity for end time should return false
  it('should return false when reservation exceeds seating capacity for end time', () => {
    // Mock data
    const reservationAttempt = { start: '2023-10-10T12:00:00+0500', people: 6, ...fixedProps };
    const existingReservations = [
      { start: '2023-10-10T13:00:00+0500', people: 4 },
      { start: '2023-10-10T13:00:00+0500', people: 3 }
    ].map(formatExistingReservation);
    const seatingCapacity = 10;

    // Call the function under test
    const result = canReserve(reservationAttempt, existingReservations, seatingCapacity);

    // Assertion
    expect(result).toBe(false);
  });
});

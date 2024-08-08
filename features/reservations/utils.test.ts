import { describe, expect, it, vi } from "vitest";
import { canReserve, getNextTime, yieldTimes } from "./utils";
import dayjs from "dayjs";

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
  it('should return false when reservation people count exceeds capacity for start time', () => {
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


describe('getNextTime', () => {

  vi.useFakeTimers({
    now: new Date('2023-10-10T10:00:00')
  })

  it('should return 13:00 if requesting for earlier than 13:00', () => {
    const result = getNextTime(dayjs('2023-10-10T10:00:00'));
    const expected = dayjs('2023-10-10T13:00:00')

    expect(result.format("MM-DD HH:mm")).toBe(expected.format("MM-DD HH:mm"));
  });

  it('should return 13:00 of next day if requesting for later than 22:00', () => {
    const result = getNextTime(dayjs('2023-10-10T22:30:00'));
    const expected = dayjs('2023-10-11T13:00:00')

    expect(result.format("MM-DD HH:mm")).toBe(expected.format("MM-DD HH:mm"));
  });

  it('should return next 30 min date for date within range', () => {
    const result = getNextTime(dayjs('2023-10-10T14:14:00'));
    const expected = dayjs('2023-10-10T14:30:00')

    expect(result.format("MM-DD HH:mm")).toBe(expected.format("MM-DD HH:mm"));
  });

  it('should return next 00 min date for date within range', () => {
    const result = getNextTime(dayjs('2023-10-10T14:45:00'));
    const expected = dayjs('2023-10-10T15:00:00')

    expect(result.format("MM-DD HH:mm")).toBe(expected.format("MM-DD HH:mm"));
  });

  it('should return next 30 min time for 00 time', () => {
    const result = getNextTime(dayjs('2023-10-10T13:30'));
    const expected = dayjs('2023-10-10T14:00')

    expect(result.format("MM-DD HH:mm")).toBe(expected.format("MM-DD HH:mm"));
  });

  it('should return next 00 min time for 30 time', () => {
    const result = getNextTime(dayjs('2023-10-10T15:30:00'));
    const expected = dayjs('2023-10-10T16:00:00')

    expect(result.format("MM-DD HH:mm")).toBe(expected.format("MM-DD HH:mm"));
  });

  // broken but let's not waste more time
  it('should return as expected when used iteratively', () => {
    const initialTime = dayjs('2023-10-10 09:45:00');
    const result = [getNextTime(initialTime)]
    for (let i = 0; i < 4; i++) {
      result.push(getNextTime(result[i]));
    }
    const expected = [
      dayjs('2023-10-10T13:00:00'),
      dayjs('2023-10-10T13:30:00'),
      dayjs('2023-10-10T14:00:00'),
      dayjs('2023-10-10T14:30:00'),
      dayjs('2023-10-10T15:00:00'),
    ]

    result.forEach((e, i) => {
      expect(e).toBeTruthy();
      expect(expected[i]).toBeTruthy();
      expect(e.format("MM-DD HH:mm")).toBe(expected[i].format("MM-DD HH:mm"));
    })

    // expect(result.map((e) => e.format("MM-DD HH:mm"))).toEqual(expected.map(e => e.format("MM-DD HH:mm")));
  });
});



describe('yieldTimes', () => {
  it('should generate times correctly with default time unit', () => {
    const startTime = dayjs("2023-10-10T12:00");
    const timeInterval = 30;
    const timesCount = 3;
    const generator = yieldTimes({ startTime, timeInterval, timesCount });

    const times = Array.from(generator);
    expect(times.length).toBe(3);
    expect(times[0].format()).toBe(dayjs("2023-10-10T13:00").format());
    expect(times[1].format()).toBe(dayjs("2023-10-10T13:30").format());
    expect(times[2].format()).toBe(dayjs("2023-10-10T14:00").format());
  });

  it('should handle zero timesCount gracefully', () => {
    const startTime = dayjs("2023-10-10T12:00");
    const timeInterval = 30;
    const timesCount = 0;
    const generator = yieldTimes({ startTime, timeInterval, timesCount });

    const times = Array.from(generator);
    expect(times.length).toBe(0);
  });
});


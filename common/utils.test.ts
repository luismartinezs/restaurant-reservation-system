// Generates a random integer of specified length
import { describe, expect, it } from "vitest";
import { getRandInt, roundToNextHalfHour, slugify } from "./utils";
import dayjs from "dayjs";

describe('getRandInt', () => {


  it('should generate a random integer of specified length', () => {
    const length = 5;
    const result = getRandInt(length);
    expect(result.toString().length).toBe(length);
  });
  it('should handle length of 1 correctly', () => {
    const length = 1;
    const result = getRandInt(length);
    expect(result).toBeGreaterThanOrEqual(1);
    expect(result).toBeLessThanOrEqual(9);
  });

});

describe('slugify', () => {
  it('should convert spaces to hyphens when given a string with spaces', () => {
    expect(slugify("Hello World")).toBe("Hello-World");
  });

  it('should handle apostrophes', () => {
    expect(slugify("Dragon's Delight")).toBe("Dragon_s-Delight");
  });

  it('should handle location names', () => {
    expect(slugify("Hong Kong")).toBe("Hong-Kong");
  });
});

describe('roundToNextHalfHour', () => {

  describe('roundToNextHalfHour', () => {
    it('should round to the next half hour when time has 15 minutes', () => {
      const date = dayjs().minute(15).second(0).millisecond(0);
      const result = roundToNextHalfHour(date);
      expect(result.minute()).toBe(30);
      expect(result.second()).toBe(0);
      expect(result.millisecond()).toBe(0);
    });
  });

  describe('roundToNextHalfHour', () => {
    it('should handle time with 0 minutes correctly', () => {
      const date = dayjs().minute(50).second(0).millisecond(0);
      const result = roundToNextHalfHour(date);
      expect(result.minute()).toBe(0);
      expect(result.second()).toBe(0);
      expect(result.millisecond()).toBe(0);
    });
  });
});
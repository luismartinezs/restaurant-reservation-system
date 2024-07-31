// Generates a random integer of specified length
import { describe, expect, it } from "vitest";
import { getRandInt } from "./utils";

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
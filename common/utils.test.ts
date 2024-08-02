// Generates a random integer of specified length
import { describe, expect, it } from "vitest";
import { getRandInt, slugify } from "./utils";

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
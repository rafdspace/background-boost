import type { EffectValue } from "../../types/";
import { presetChecker } from "../presetChecker";

describe("presetChecker", () => {
  it("should return true for maximum grayscale only", () => {
    const value: EffectValue = {
      grayscale: 100,
      blur: 0,
      sepia: 0,
      bgRemoved: false,
    };
    expect(presetChecker(value)).toBe(true);
  });

  it("should return true for maximum blur only", () => {
    const value: EffectValue = {
      grayscale: 0,
      blur: 10,
      sepia: 0,
      bgRemoved: false,
    };
    expect(presetChecker(value)).toBe(true);
  });

  it("should return true for maximum sepia only", () => {
    const value: EffectValue = {
      grayscale: 0,
      blur: 0,
      sepia: 100,
      bgRemoved: false,
    };
    expect(presetChecker(value)).toBe(true);
  });

  it("should return false if grayscale is not maximum and blur and sepia are not zero", () => {
    const value: EffectValue = {
      grayscale: 50,
      blur: 5,
      sepia: 0,
      bgRemoved: false,
    };
    expect(presetChecker(value)).toBe(false);
  });

  it("should return false if blur is not maximum and grayscale and sepia are not zero", () => {
    const value: EffectValue = {
      grayscale: 0,
      blur: 5,
      sepia: 100,
      bgRemoved: false,
    };
    expect(presetChecker(value)).toBe(false);
  });

  it("should return false if sepia is not maximum and grayscale and blur are not zero", () => {
    const value: EffectValue = {
      grayscale: 100,
      blur: 5,
      sepia: 50,
      bgRemoved: false,
    };
    expect(presetChecker(value)).toBe(false);
  });
});

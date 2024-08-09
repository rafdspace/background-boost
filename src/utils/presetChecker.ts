import type { EffectValue } from "src/types";

export const presetChecker = (value: EffectValue) => {
  const { grayscale, blur, sepia } = value;

  const isMaxGrayscaleOnly = grayscale === 100 && blur === 0 && sepia === 0;
  const isMaxBlurOnly = blur === 10 && grayscale === 0 && sepia === 0;
  const isMaxSepiaOnly = sepia === 100 && grayscale === 0 && blur === 0;

  return isMaxGrayscaleOnly || isMaxBlurOnly || isMaxSepiaOnly;
};

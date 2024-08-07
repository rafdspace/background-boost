import type { EffectValue } from "src/types";

export const presetChecker = (value: EffectValue) => {
  const { grayscale, blur, sephia } = value;

  const isMaxGrayscaleOnly = grayscale === 100 && blur === 0 && sephia === 0;
  const isMaxBlurOnly = blur === 10 && grayscale === 0 && sephia === 0;
  const isMaxSephiaOnly = sephia === 100 && grayscale === 0 && blur === 0;

  return isMaxGrayscaleOnly || isMaxBlurOnly || isMaxSephiaOnly;
};

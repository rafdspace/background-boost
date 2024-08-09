import type { PresetOption, EffectValue } from "src/types";
import PRESET_GRAYSCALE_IMAGE from "../assets/preset-grayscale.png";
import PRESET_BLUR_IMAGE from "../assets/preset-blur.png";
import PRESET_SEPIA_IMAGE from "../assets/preset-sepia.png";

export const PRESET_OPTIONS: PresetOption[] = [
  {
    name: "grayscale",
    label: "Black & White",
    image: PRESET_GRAYSCALE_IMAGE,
    maxVal: 100,
  },
  {
    name: "blur",
    label: "Blur",
    image: PRESET_BLUR_IMAGE,
    maxVal: 10,
  },
  {
    name: "sepia",
    label: "Sepia",
    image: PRESET_SEPIA_IMAGE,
    maxVal: 100,
  },
];

export const DEFAULT_PRESET_VALUE: EffectValue = {
  grayscale: 0,
  blur: 0,
  sepia: 0,
  bgRemoved: false,
};

export enum AppBroadcastMessageLabel {
  PresetChange = "Preset Change",
}

export const TIPS: string[] = [
  "Try different effects to find the perfect style for your photos.",
  "Play around with the intensity sliders to add a unique touch to each image.",
];

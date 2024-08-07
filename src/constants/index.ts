import type { PresetOption, EffectValue } from "src/types";
import PRESET_GRAYSCALE_IMAGE from "../assets/preset-grayscale.png";
import PRESET_BLUR_IMAGE from "../assets/preset-blur.png";
import PRESET_SEPHIA_IMAGE from "../assets/preset-sephia.png";

export const PRESET_OPTIONS: PresetOption[] = [
  {
    name: "grayscale",
    label: "Grayscale",
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
    name: "sephia",
    label: "Sephia",
    image: PRESET_SEPHIA_IMAGE,
    maxVal: 100,
  },
];

export const DEFAULT_PRESET_VALUE: EffectValue = {
  grayscale: 0,
  blur: 0,
  sephia: 0,
  bgRemoved: false,
};

export enum AppBroadcastMessageLabel {
  PresetChange = "Preset Change",
}

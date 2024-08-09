export type PresetType = "grayscale" | "blur" | "sepia";

export interface PresetOption {
  name: PresetType;
  label: string;
  image: string;
  maxVal: number;
}

export interface EffectValue {
  grayscale: number;
  blur: number;
  sepia: number;
  bgRemoved: boolean;
}

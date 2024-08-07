export type PresetType = "grayscale" | "blur" | "sephia";

export interface PresetOption {
  name: PresetType;
  label: string;
  image: string;
  maxVal: number;
}

export interface EffectValue {
  grayscale: number;
  blur: number;
  sephia: number;
  bgRemoved: boolean;
}

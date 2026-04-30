import { useControls } from "leva";

export type CreativeControls = {
  bloomIntensity: number;
  noiseStrength: number;
  distortionStrength: number;
  transitionProgress: number;
  backgroundSpeed: number;
  cursorInfluence: number;
};

const defaults: CreativeControls = {
  bloomIntensity: 0.28,
  noiseStrength: 0.055,
  distortionStrength: 0.32,
  transitionProgress: 0,
  backgroundSpeed: 1,
  cursorInfluence: 1,
};

export function useCreativeControls(): CreativeControls {
  const controls = useControls(
    "Creative tuning",
    {
      bloomIntensity: { value: defaults.bloomIntensity, min: 0, max: 1.2, step: 0.01 },
      noiseStrength: { value: defaults.noiseStrength, min: 0, max: 0.25, step: 0.005 },
      distortionStrength: { value: defaults.distortionStrength, min: 0, max: 1.5, step: 0.01 },
      transitionProgress: { value: defaults.transitionProgress, min: 0, max: 1, step: 0.01 },
      backgroundSpeed: { value: defaults.backgroundSpeed, min: 0.2, max: 2.5, step: 0.05 },
      cursorInfluence: { value: defaults.cursorInfluence, min: 0, max: 2.5, step: 0.05 },
    },
    { collapsed: true },
  );

  return import.meta.env.DEV ? controls : defaults;
}

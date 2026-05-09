import { useEffect, useState } from "react";

function getConnectionSaveData() {
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  return Boolean(connection?.saveData);
}

function getDeviceMemory() {
  return (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
}

export function shouldUseHeavyEffectsNow() {
  if (typeof window === "undefined") return false;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(pointer: fine)").matches;
  const wideEnough = window.matchMedia("(min-width: 768px)").matches;
  const saveData = getConnectionSaveData();
  const memory = getDeviceMemory();
  const lowMemory = typeof memory === "number" && memory <= 2;

  return finePointer && wideEnough && !reducedMotion && !saveData && !lowMemory;
}

export function useShouldUseHeavyEffects() {
  const [enabled, setEnabled] = useState(() => shouldUseHeavyEffectsNow());

  useEffect(() => {
    const update = () => setEnabled(shouldUseHeavyEffectsNow());
    const pointerQuery = window.matchMedia("(pointer: fine)");
    const widthQuery = window.matchMedia("(min-width: 768px)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    update();
    pointerQuery.addEventListener("change", update);
    widthQuery.addEventListener("change", update);
    motionQuery.addEventListener("change", update);
    window.addEventListener("resize", update);

    return () => {
      pointerQuery.removeEventListener("change", update);
      widthQuery.removeEventListener("change", update);
      motionQuery.removeEventListener("change", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return enabled;
}

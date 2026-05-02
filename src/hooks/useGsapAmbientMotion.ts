import { useEffect } from "react";
import gsap from "gsap";
import { shouldUseHeavyEffectsNow } from "./useDevicePerformance";

export function useGsapAmbientMotion() {
  useEffect(() => {
    if (!shouldUseHeavyEffectsNow()) {
      return undefined;
    }

    const context = gsap.context(() => {
      gsap.to("[data-gsap-float='hero-media']", {
        y: -18,
        x: 8,
        duration: 4.8,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      gsap.to("[data-gsap-float='hero-copy']", {
        y: 12,
        duration: 5.4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    });

    return () => context.revert();
  }, []);
}

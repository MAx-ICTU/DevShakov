import { useEffect } from "react";
import Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { shouldUseHeavyEffectsNow } from "./useDevicePerformance";

export function useLenis() {
  useEffect(() => {
    if (!shouldUseHeavyEffectsNow()) {
      return undefined;
    }

    const lenis = new Lenis({
      duration: 1.08,
      easing: (time: number) => Math.min(1, 1.001 - 2 ** (-10 * time)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
      anchors: {
        offset: -72,
      },
    });

    lenis.on("scroll", ({ velocity }: { velocity: number }) => {
      window.dispatchEvent(new CustomEvent("portfolio-scroll-velocity", { detail: velocity }));
      ScrollTrigger.update();
    });

    let frame = 0;

    const raf = (time: number) => {
      lenis.raf(time);
      frame = window.requestAnimationFrame(raf);
    };

    frame = window.requestAnimationFrame(raf);

    return () => {
      window.cancelAnimationFrame(frame);
      window.dispatchEvent(new CustomEvent("portfolio-scroll-velocity", { detail: 0 }));
      lenis.destroy();
    };
  }, []);
}

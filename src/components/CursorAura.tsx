import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const interactiveSelector = "a, button, [role='button'], input, textarea, select, summary";

export function CursorAura() {
  const [enabled, setEnabled] = useState(false);
  const [hoveringInteractive, setHoveringInteractive] = useState(false);
  const mouseX = useMotionValue(-120);
  const mouseY = useMotionValue(-120);
  const dotX = useSpring(mouseX, { stiffness: 900, damping: 42, mass: 0.18 });
  const dotY = useSpring(mouseY, { stiffness: 900, damping: 42, mass: 0.18 });
  const ringX = useSpring(mouseX, { stiffness: 190, damping: 24, mass: 0.45 });
  const ringY = useSpring(mouseY, { stiffness: 190, damping: 24, mass: 0.45 });

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const shouldEnable = finePointer && !reducedMotion;

    setEnabled(shouldEnable);
    document.documentElement.classList.toggle("custom-cursor-active", shouldEnable);

    if (!shouldEnable) {
      return () => document.documentElement.classList.remove("custom-cursor-active");
    }

    const handleMove = (event: PointerEvent) => {
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
      setHoveringInteractive(Boolean((event.target as Element | null)?.closest(interactiveSelector)));
    };

    const handleLeave = () => {
      mouseX.set(-120);
      mouseY.set(-120);
      setHoveringInteractive(false);
    };

    window.addEventListener("pointermove", handleMove);
    document.documentElement.addEventListener("pointerleave", handleLeave);

    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
      window.removeEventListener("pointermove", handleMove);
      document.documentElement.removeEventListener("pointerleave", handleLeave);
    };
  }, [mouseX, mouseY]);

  if (!enabled) {
    return null;
  }

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[120] h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan shadow-[0_0_18px_rgba(61,215,255,0.78)] mix-blend-screen"
        style={{ x: dotX, y: dotY }}
        animate={{ scale: hoveringInteractive ? 0.72 : 1 }}
        transition={{ duration: 0.18, ease: "easeOut" }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[119] h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan/42 bg-cyan/[0.035] shadow-[0_0_32px_rgba(61,215,255,0.18)] backdrop-blur-[1px] mix-blend-screen"
        style={{ x: ringX, y: ringY }}
        animate={{
          height: hoveringInteractive ? 68 : 48,
          width: hoveringInteractive ? 68 : 48,
          borderColor: hoveringInteractive ? "rgba(255,255,255,0.62)" : "rgba(61,215,255,0.42)",
          backgroundColor: hoveringInteractive ? "rgba(255,255,255,0.045)" : "rgba(61,215,255,0.035)",
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      />
    </>
  );
}

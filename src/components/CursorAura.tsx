import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const interactiveSelector = "a, button, [role='button'], input, textarea, select, summary";
const trailLength = 11;

type TrailDot = {
  id: number;
  x: number;
  y: number;
};

export function CursorAura() {
  const [enabled, setEnabled] = useState(false);
  const [hoveringInteractive, setHoveringInteractive] = useState(false);
  const [trail, setTrail] = useState<TrailDot[]>([]);
  const dotId = useRef(0);
  const lastTrailAt = useRef(0);
  const mouseX = useMotionValue(-80);
  const mouseY = useMotionValue(-80);
  const dotX = useSpring(mouseX, { stiffness: 950, damping: 44, mass: 0.14 });
  const dotY = useSpring(mouseY, { stiffness: 950, damping: 44, mass: 0.14 });
  const ringX = useSpring(mouseX, { stiffness: 260, damping: 26, mass: 0.28 });
  const ringY = useSpring(mouseY, { stiffness: 260, damping: 26, mass: 0.28 });

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

      const now = performance.now();
      if (now - lastTrailAt.current > 14) {
        lastTrailAt.current = now;
        dotId.current += 1;
        setTrail((items) => [{ id: dotId.current, x: event.clientX, y: event.clientY }, ...items].slice(0, trailLength));
      }
    };

    const handleLeave = () => {
      mouseX.set(-80);
      mouseY.set(-80);
      setHoveringInteractive(false);
      setTrail([]);
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
      {trail.map((dot, index) => (
        <motion.span
          key={dot.id}
          aria-hidden="true"
          className="pointer-events-none fixed left-0 top-0 z-[118] h-2 w-2 rounded-full bg-cyan shadow-[0_0_14px_rgba(61,215,255,0.75)] mix-blend-screen"
          style={{ x: dot.x, y: dot.y }}
          transformTemplate={(_, generated) => `translate(-50%, -50%) ${generated}`}
          initial={{ opacity: 0.62, scale: 1 - index * 0.045 }}
          animate={{ opacity: 0, scale: 0.18 }}
          transition={{ duration: 0.64, ease: "easeOut" }}
        />
      ))}

      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[120] h-3 w-3 rounded-full bg-[#7ee9ff] shadow-[0_0_18px_rgba(61,215,255,0.95),0_0_34px_rgba(61,215,255,0.38)] mix-blend-screen"
        style={{ x: dotX, y: dotY }}
        transformTemplate={(_, generated) => `translate(-50%, -50%) ${generated}`}
        animate={{ scale: hoveringInteractive ? 0.62 : 1 }}
        transition={{ duration: 0.16, ease: "easeOut" }}
      />

      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[119] h-7 w-7 rounded-full border border-cyan/48 bg-cyan/[0.025] shadow-[0_0_24px_rgba(61,215,255,0.22)] mix-blend-screen"
        style={{ x: ringX, y: ringY }}
        transformTemplate={(_, generated) => `translate(-50%, -50%) ${generated}`}
        animate={{
          height: hoveringInteractive ? 38 : 28,
          width: hoveringInteractive ? 38 : 28,
          borderColor: hoveringInteractive ? "rgba(255,255,255,0.7)" : "rgba(61,215,255,0.48)",
          opacity: hoveringInteractive ? 0.95 : 0.86,
        }}
        transition={{ duration: 0.18, ease: "easeOut" }}
      />
    </>
  );
}

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CursorAura() {
  const [enabled, setEnabled] = useState(false);
  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);
  const x = useSpring(mouseX, { stiffness: 120, damping: 28, mass: 0.5 });
  const y = useSpring(mouseY, { stiffness: 120, damping: 28, mass: 0.5 });

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setEnabled(finePointer && !reducedMotion);

    const handleMove = (event: PointerEvent) => {
      mouseX.set(event.clientX - 220);
      mouseY.set(event.clientY - 220);
    };

    window.addEventListener("pointermove", handleMove);
    return () => window.removeEventListener("pointermove", handleMove);
  }, [mouseX, mouseY]);

  if (!enabled) {
    return null;
  }

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-30 h-[440px] w-[440px] rounded-full bg-[radial-gradient(circle,rgba(61,215,255,0.16),rgba(183,255,104,0.08)_35%,transparent_67%)] blur-xl"
      style={{ x, y }}
    />
  );
}

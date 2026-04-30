import { motion, useReducedMotion } from "framer-motion";

type DepthTransitionOverlayProps = {
  active: boolean;
};

export function DepthTransitionOverlay({ active }: DepthTransitionOverlayProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[95] overflow-hidden bg-[#050505]"
      aria-hidden="true"
      initial={false}
      animate={{ opacity: active ? 1 : 0 }}
      transition={{ duration: active ? 0.22 : 0.42, ease: "easeOut" }}
    >
      {active && !reducedMotion && (
        <>
          <motion.div
            className="absolute inset-[-18%] bg-[radial-gradient(circle_at_50%_44%,transparent_0,rgba(61,215,255,0.08)_15%,rgba(5,5,5,0.74)_38%,#050505_68%)]"
            initial={{ scale: 1.35, opacity: 0 }}
            animate={{ scale: 0.54, opacity: 1 }}
            transition={{ duration: 0.86, ease: [0.76, 0, 0.24, 1] }}
          />
          <motion.div
            className="absolute left-1/2 top-1/2 h-[120vmax] w-[120vmax] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan/10"
            initial={{ scale: 1.15, opacity: 0 }}
            animate={{ scale: 0.18, opacity: [0, 0.45, 0] }}
            transition={{ duration: 0.92, ease: [0.76, 0, 0.24, 1] }}
          />
          <motion.div
            className="absolute left-1/2 top-1/2 h-[78vmax] w-[78vmax] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10"
            initial={{ scale: 1.25, opacity: 0 }}
            animate={{ scale: 0.12, opacity: [0, 0.34, 0] }}
            transition={{ duration: 0.78, delay: 0.08, ease: [0.76, 0, 0.24, 1] }}
          />
          <motion.div
            className="absolute inset-0 bg-[radial-gradient(circle_at_50%_44%,rgba(61,215,255,0.18),transparent_13rem)]"
            initial={{ opacity: 0, scale: 1.15 }}
            animate={{ opacity: [0, 0.9, 0.18], scale: [1.15, 0.72, 0.5] }}
            transition={{ duration: 0.88, ease: [0.76, 0, 0.24, 1] }}
          />
        </>
      )}
    </motion.div>
  );
}

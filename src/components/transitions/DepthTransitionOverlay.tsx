import { motion, useReducedMotion } from "framer-motion";

type DepthTransitionOverlayProps = {
  active: boolean;
};

export function DepthTransitionOverlay({ active }: DepthTransitionOverlayProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[95] overflow-hidden"
      aria-hidden="true"
      initial={false}
      animate={{ opacity: active ? 1 : 0 }}
      transition={{ duration: active ? 0.18 : 0.44, ease: "easeOut" }}
    >
      {active && !reducedMotion && (
        <>
          <motion.div
            className="absolute inset-[-12%] bg-[radial-gradient(circle_at_52%_42%,rgba(61,215,255,0.14)_0,rgba(61,215,255,0.05)_18%,rgba(5,5,5,0.18)_42%,rgba(5,5,5,0.58)_82%)]"
            initial={{ scale: 1.22, opacity: 0 }}
            animate={{ scale: 0.74, opacity: 1 }}
            transition={{ duration: 0.92, ease: [0.76, 0, 0.24, 1] }}
          />
          <motion.div
            className="absolute left-1/2 top-[44%] h-[96vmax] w-[96vmax] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan/12"
            initial={{ scale: 1.15, opacity: 0 }}
            animate={{ scale: 0.22, opacity: [0, 0.34, 0] }}
            transition={{ duration: 0.92, ease: [0.76, 0, 0.24, 1] }}
          />
          <motion.div
            className="absolute left-1/2 top-[44%] h-[64vmax] w-[64vmax] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10"
            initial={{ scale: 1.25, opacity: 0 }}
            animate={{ scale: 0.16, opacity: [0, 0.22, 0] }}
            transition={{ duration: 0.78, delay: 0.08, ease: [0.76, 0, 0.24, 1] }}
          />
          <motion.div
            className="absolute inset-0 bg-[radial-gradient(circle_at_52%_42%,rgba(61,215,255,0.2),transparent_15rem)]"
            initial={{ opacity: 0, scale: 1.15 }}
            animate={{ opacity: [0, 0.56, 0.1], scale: [1.12, 0.78, 0.58] }}
            transition={{ duration: 0.88, ease: [0.76, 0, 0.24, 1] }}
          />
        </>
      )}
    </motion.div>
  );
}

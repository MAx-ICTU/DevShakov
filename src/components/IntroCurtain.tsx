import { motion } from "framer-motion";

export function IntroCurtain() {
  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[80] overflow-hidden bg-[#020305]"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 1.35, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
    >
      <motion.div
        className="absolute left-1/2 top-1/2 h-[120vmax] w-[120vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(61,215,255,0.055),rgba(61,215,255,0.016)_18%,transparent_42%)]"
        initial={{ scale: 0.42, opacity: 0.85 }}
        animate={{ scale: 1.18, opacity: 0 }}
        transition={{ duration: 1.55, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.div
        className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.055),transparent)]"
        initial={{ x: "-120%" }}
        animate={{ x: "120%" }}
        transition={{ duration: 1.15, ease: [0.76, 0, 0.24, 1], delay: 0.08 }}
      />
    </motion.div>
  );
}

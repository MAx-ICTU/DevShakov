import { motion } from "framer-motion";

export function IntroCurtain() {
  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-0 z-[80] grid place-items-center bg-ink"
      initial={{ y: 0 }}
      animate={{ y: "-105%" }}
      transition={{ duration: 1.05, ease: [0.76, 0, 0.24, 1], delay: 0.45 }}
    >
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="text-center"
      >
        <p className="font-display text-5xl font-semibold tracking-tight text-white sm:text-7xl">MAx / 1C</p>
        <p className="mt-4 text-xs font-semibold uppercase tracking-[0.34em] text-cyan">Business logic / Automation / Web</p>
      </motion.div>
    </motion.div>
  );
}

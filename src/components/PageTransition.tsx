import { motion, useReducedMotion } from "framer-motion";
import type { PropsWithChildren } from "react";

type PageTransitionProps = PropsWithChildren<{
  className?: string;
}>;

export function PageTransition({ children, className = "" }: PageTransitionProps) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <>
      <motion.div
        className={className}
        initial={{ opacity: 0, y: 26, clipPath: "inset(7% 0 0 0)" }}
        animate={{ opacity: 1, y: 0, clipPath: "inset(0% 0 0 0)" }}
        exit={{ opacity: 0, y: -22, clipPath: "inset(0 0 8% 0)" }}
        transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[85] origin-bottom bg-[#050505]"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1, transition: { duration: 0.38, ease: [0.76, 0, 0.24, 1] } }}
      />
    </>
  );
}

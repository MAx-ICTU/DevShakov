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
        initial={{ opacity: 0, y: 32, scale: 0.982 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -18, scale: 1.012 }}
        transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </>
  );
}

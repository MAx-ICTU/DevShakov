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
        initial={{ opacity: 0, y: 34, scale: 0.972, filter: "blur(14px)" }}
        animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: -18, scale: 1.025, filter: "blur(10px)" }}
        transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </>
  );
}

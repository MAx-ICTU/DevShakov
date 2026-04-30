import { motion } from "framer-motion";
import type { MouseEvent, PropsWithChildren } from "react";
import { useTransitionController } from "../transitions/TransitionProvider";

type AnimatedContactLinkProps = PropsWithChildren<{
  className?: string;
  onNavigate?: () => void;
}>;

export function AnimatedContactLink({ children, className = "", onNavigate }: AnimatedContactLinkProps) {
  const { startContactTransition } = useTransitionController();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    onNavigate?.();
    startContactTransition("/contact");
  };

  return (
    <motion.a
      href="/contact"
      onClick={handleClick}
      className={`animated-link group ${className}`}
      whileHover={{ x: 6 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
    >
      <span>{children}</span>
      <motion.span className="inline-block" aria-hidden="true" whileHover={{ x: 4, y: -4 }}>
        ↗
      </motion.span>
    </motion.a>
  );
}

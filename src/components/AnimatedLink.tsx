import { motion } from "framer-motion";
import type { MouseEvent, PropsWithChildren } from "react";
import { useTransitionController } from "./transitions/TransitionProvider";

type AnimatedLinkProps = PropsWithChildren<
  {
  to: string;
  className?: string;
  onNavigate?: () => void;
  dataHeroLink?: boolean;
  }
>;

export function AnimatedLink({ to, children, className = "", onNavigate, dataHeroLink }: AnimatedLinkProps) {
  const { startRouteTransition } = useTransitionController();
  const isExternal = /^https?:\/\//.test(to);

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (isExternal || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }

    event.preventDefault();
    onNavigate?.();
    startRouteTransition(to);
  };

  if (isExternal) {
    return (
      <motion.a
        href={to}
        target="_blank"
        rel="noreferrer"
        className={`animated-link group ${className}`}
        whileHover={{ x: 6 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        data-hero-link={dataHeroLink || undefined}
      >
        <span>{children}</span>
        <motion.span className="inline-block" aria-hidden="true" initial={false} whileHover={{ x: 3, y: -3 }}>
          ↗
        </motion.span>
      </motion.a>
    );
  }

  return (
    <motion.a
      href={to}
      onClick={handleClick}
      className={`animated-link group ${className}`}
      whileHover={{ x: 6 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      data-hero-link={dataHeroLink || undefined}
    >
      <span>{children}</span>
      <motion.span className="inline-block" aria-hidden="true" initial={false} whileHover={{ x: 3, y: -3 }}>
        ↗
      </motion.span>
    </motion.a>
  );
}

export function PlainRouteLink({ to, children, className = "", onNavigate }: AnimatedLinkProps) {
  const { startRouteTransition } = useTransitionController();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    onNavigate?.();
    startRouteTransition(to);
  };

  return (
    <a href={to} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}

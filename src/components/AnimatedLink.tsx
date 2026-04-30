import { motion } from "framer-motion";
import type { MouseEvent, PropsWithChildren } from "react";
import { Link, useNavigate } from "react-router-dom";

type AnimatedLinkProps = PropsWithChildren<
  {
  to: string;
  className?: string;
  onNavigate?: () => void;
  dataHeroLink?: boolean;
  }
>;

export function AnimatedLink({ to, children, className = "", onNavigate, dataHeroLink }: AnimatedLinkProps) {
  const navigate = useNavigate();
  const isExternal = /^https?:\/\//.test(to);

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (isExternal || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }

    event.preventDefault();
    onNavigate?.();
    window.setTimeout(() => navigate(to), 180);
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
  return (
    <Link to={to} onClick={onNavigate} className={className}>
      {children}
    </Link>
  );
}

import { motion, useReducedMotion } from "framer-motion";

type TextRevealProps = {
  lines: string[];
  className?: string;
  lineClassName?: string;
  delay?: number;
};

export function TextReveal({ lines, className = "", lineClassName = "", delay = 0 }: TextRevealProps) {
  const reducedMotion = useReducedMotion();

  return (
    <div className={className}>
      {lines.map((line, index) => (
        <span key={`${line}-${index}`} className="block overflow-hidden">
          <motion.span
            className={`block ${lineClassName}`}
            initial={reducedMotion ? false : { y: "105%", opacity: 0 }}
            animate={reducedMotion ? { opacity: 1 } : { y: 0, opacity: 1 }}
            transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1], delay: delay + index * 0.08 }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </div>
  );
}

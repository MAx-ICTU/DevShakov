import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";

type SplitTextRevealProps = {
  text: string;
  as?: "h1" | "h2" | "p" | "span";
  className?: string;
  wordClassName?: string;
  delay?: number;
};

export function SplitTextReveal({ text, as: Tag = "span", className = "", wordClassName = "", delay = 0 }: SplitTextRevealProps) {
  const rootRef = useRef<HTMLElement | null>(null);
  const words = useMemo(() => text.split(" "), [text]);

  useEffect(() => {
    const root = rootRef.current;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!root || reducedMotion) {
      return undefined;
    }

    const targets = root.querySelectorAll("[data-split-word]");
    const context = gsap.context(() => {
      gsap.fromTo(
        targets,
        { yPercent: 105, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.62,
          delay,
          stagger: 0.035,
          ease: "power3.out",
        },
      );
    }, root);

    return () => context.revert();
  }, [delay, text]);

  return (
    <Tag ref={rootRef as never} className={className}>
      {words.map((word, index) => (
        <span key={`${word}-${index}`} className="inline-block overflow-hidden align-bottom">
          <span data-split-word className={`inline-block translate-y-0 ${wordClassName}`}>
            {word}
          </span>
          {index < words.length - 1 ? "\u00A0" : null}
        </span>
      ))}
    </Tag>
  );
}

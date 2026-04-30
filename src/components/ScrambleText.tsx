import { useEffect, useRef, useState } from "react";

const symbols = "01{}[]<>/\\_#$%&*+=?@";

type ScrambleTextProps = {
  text: string;
  className?: string;
  as?: "span" | "strong";
  trigger?: "hover" | "mount";
};

export function ScrambleText({ text, className = "", as: Tag = "span", trigger = "hover" }: ScrambleTextProps) {
  const [display, setDisplay] = useState(text);
  const frameRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  const scramble = () => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion) {
      setDisplay(text);
      return;
    }

    if (rafRef.current) {
      window.cancelAnimationFrame(rafRef.current);
    }

    frameRef.current = 0;
    const maxFrames = 22;

    const tick = () => {
      frameRef.current += 1;
      const progress = frameRef.current / maxFrames;

      setDisplay(
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index / text.length < progress) return char;
            return symbols[Math.floor(Math.random() * symbols.length)];
          })
          .join(""),
      );

      if (frameRef.current < maxFrames) {
        rafRef.current = window.requestAnimationFrame(tick);
      } else {
        setDisplay(text);
      }
    };

    tick();
  };

  useEffect(() => {
    setDisplay(text);
  }, [text]);

  useEffect(() => {
    if (trigger === "mount") {
      scramble();
    }

    return () => {
      if (rafRef.current) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger, text]);

  return (
    <Tag className={`scramble-text inline-block cursor-default select-none ${className}`} onPointerEnter={trigger === "hover" ? scramble : undefined} data-text={text}>
      {display}
    </Tag>
  );
}

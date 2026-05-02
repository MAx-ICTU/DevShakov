import { useEffect, useRef, useState } from "react";
import type { PropsWithChildren, PointerEvent } from "react";

type TextParticleTrailProps = PropsWithChildren<{
  enabled?: boolean;
  className?: string;
  intensity?: number;
  as?: "span" | "div";
}>;

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  life: number;
  maxLife: number;
  square: boolean;
};

function createParticle(x: number, y: number): Particle {
  const angle = Math.random() * Math.PI * 2;
  const speed = 0.35 + Math.random() * 1.35;
  const life = 0.4 + Math.random() * 0.4;

  return {
    x,
    y,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed - Math.random() * 0.35,
    size: 1 + Math.random() * 2,
    life,
    maxLife: life,
    square: Math.random() > 0.58,
  };
}

export function TextParticleTrail({ children, enabled = true, className = "", intensity = 1, as: Tag = "span" }: TextParticleTrailProps) {
  const rootRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const frameRef = useRef<number | null>(null);
  const lastEmitAt = useRef(0);
  const activeRef = useRef(false);
  const [effectEnabled, setEffectEnabled] = useState(false);

  const resizeCanvas = () => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas) return;

    const rect = root.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
    canvas.width = Math.max(1, Math.floor(rect.width * dpr));
    canvas.height = Math.max(1, Math.floor(rect.height * dpr));
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
    const context = canvas.getContext("2d");
    context?.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  const tick = () => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    context.clearRect(0, 0, width, height);

    particlesRef.current = particlesRef.current.filter((particle) => {
      particle.life -= 1 / 60;
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.vx *= 0.974;
      particle.vy = particle.vy * 0.974 + 0.018;

      const progress = Math.max(0, particle.life / particle.maxLife);
      const alpha = progress * progress;
      const size = particle.size * (0.35 + progress * 0.65);

      context.globalAlpha = alpha;
      context.fillStyle = "#ffffff";
      context.shadowColor = "rgba(255,255,255,0.7)";
      context.shadowBlur = 8;

      if (particle.square) {
        context.fillRect(particle.x - size / 2, particle.y - size / 2, size, size);
      } else {
        context.beginPath();
        context.arc(particle.x, particle.y, size / 2, 0, Math.PI * 2);
        context.fill();
      }

      return particle.life > 0;
    });

    context.globalAlpha = 1;
    context.shadowBlur = 0;

    if (particlesRef.current.length || activeRef.current) {
      frameRef.current = window.requestAnimationFrame(tick);
    } else {
      frameRef.current = null;
    }
  };

  const ensureLoop = () => {
    if (!frameRef.current) {
      frameRef.current = window.requestAnimationFrame(tick);
    }
  };

  const emit = (event: PointerEvent<HTMLElement>) => {
    if (!enabled || !effectEnabled) return;

    const now = performance.now();
    if (now - lastEmitAt.current < 18) return;
    lastEmitAt.current = now;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const amount = Math.max(2, Math.round(4 * intensity));

    for (let index = 0; index < amount; index += 1) {
      particlesRef.current.push(createParticle(x, y));
    }

    particlesRef.current = particlesRef.current.slice(-80);
    ensureLoop();
  };

  useEffect(() => {
    const update = () => {
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const finePointer = window.matchMedia("(pointer: fine)").matches;
      const wideEnough = window.matchMedia("(min-width: 768px)").matches;
      setEffectEnabled(enabled && finePointer && wideEnough && !reducedMotion);
    };

    update();
    window.addEventListener("resize", update);

    return () => window.removeEventListener("resize", update);
  }, [enabled]);

  useEffect(() => {
    if (!effectEnabled) {
      particlesRef.current = [];
      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }

      return undefined;
    }

    resizeCanvas();

    const observer = new ResizeObserver(resizeCanvas);
    if (rootRef.current) observer.observe(rootRef.current);
    window.addEventListener("resize", resizeCanvas);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", resizeCanvas);
      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, [effectEnabled]);

  if (!effectEnabled) {
    return (
      <Tag ref={rootRef as never} className={`relative inline-block ${className}`}>
        {children}
      </Tag>
    );
  }

  return (
    <Tag
      ref={rootRef as never}
      className={`relative inline-block ${className}`}
      onPointerEnter={() => {
        activeRef.current = true;
        ensureLoop();
      }}
      onPointerMove={emit}
      onPointerLeave={() => {
        activeRef.current = false;
      }}
    >
      {children}
      <canvas ref={canvasRef} className="pointer-events-none absolute inset-[-0.18em] z-10" aria-hidden="true" />
    </Tag>
  );
}

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  drift: number;
};

export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!canvas || reducedMotion) {
      return undefined;
    }

    const context = canvas.getContext("2d");

    if (!context) {
      return undefined;
    }

    let width = window.innerWidth;
    let height = window.innerHeight;
    let frame = 0;
    let animationId = 0;
    const pointer = { x: width / 2, y: height / 2, active: false };
    const particles: Particle[] = [];

    const resize = () => {
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * pixelRatio);
      canvas.height = Math.floor(height * pixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    const makeParticle = (x = Math.random() * width, y = Math.random() * height): Particle => ({
      x,
      y,
      vx: (Math.random() - 0.5) * 0.28,
      vy: (Math.random() - 0.5) * 0.28,
      size: Math.random() * 1.8 + 0.4,
      alpha: Math.random() * 0.55 + 0.18,
      drift: Math.random() * Math.PI * 2,
    });

    const seed = () => {
      particles.length = 0;
      const count = Math.min(74, Math.max(34, Math.floor((width * height) / 28000)));
      for (let index = 0; index < count; index += 1) {
        particles.push(makeParticle());
      }
    };

    const handleMove = (event: PointerEvent) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.active = true;

      if (particles.length < 96 && frame % 4 === 0) {
        particles.push(makeParticle(pointer.x, pointer.y));
      }
    };

    const handleLeave = () => {
      pointer.active = false;
    };

    const draw = () => {
      frame += 1;
      context.clearRect(0, 0, width, height);
      context.fillStyle = "rgba(5, 5, 5, 0.24)";
      context.fillRect(0, 0, width, height);

      for (const particle of particles) {
        const distanceX = particle.x - pointer.x;
        const distanceY = particle.y - pointer.y;
        const distance = Math.hypot(distanceX, distanceY);

        if (pointer.active && distance < 150) {
          const force = (150 - distance) / 150;
          particle.vx += (distanceX / (distance || 1)) * force * 0.018;
          particle.vy += (distanceY / (distance || 1)) * force * 0.018;
        }

        particle.drift += 0.012;
        particle.x += particle.vx + Math.cos(particle.drift) * 0.06;
        particle.y += particle.vy + Math.sin(particle.drift) * 0.06;
        particle.vx *= 0.988;
        particle.vy *= 0.988;

        if (particle.x < -20) particle.x = width + 20;
        if (particle.x > width + 20) particle.x = -20;
        if (particle.y < -20) particle.y = height + 20;
        if (particle.y > height + 20) particle.y = -20;

        context.beginPath();
        context.fillStyle = `rgba(205, 226, 232, ${particle.alpha * 0.55})`;
        context.shadowColor = "rgba(61, 215, 255, 0.16)";
        context.shadowBlur = 6;
        context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        context.fill();
      }

      context.shadowBlur = 0;
      particles.splice(96);
      animationId = window.requestAnimationFrame(draw);
    };

    resize();
    seed();
    draw();

    const handleResize = () => {
      resize();
      seed();
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerleave", handleLeave);

    return () => {
      window.cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerleave", handleLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-[1] opacity-45 mix-blend-screen" aria-hidden="true" />;
}

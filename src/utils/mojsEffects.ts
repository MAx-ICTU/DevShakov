type BurstPoint = {
  x: number;
  y: number;
};

export async function playInterfaceBurst({ x, y }: BurstPoint) {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reducedMotion) return;

  const mojs = await import("@mojs/core");

  const primary = new mojs.Burst({
    left: 0,
    top: 0,
    x,
    y,
    radius: { 0: 74 },
    count: 12,
    degree: 360,
    children: {
      shape: ["circle", "rect"],
      radius: { 5: 0 },
      scale: { 1: 0.2 },
      fill: ["#3dd7ff", "#ffffff", "#7ee9ff"],
      stroke: "#3dd7ff",
      strokeWidth: { 2: 0 },
      opacity: { 0.92: 0 },
      duration: 760,
      easing: "quad.out",
    },
  });

  const ring = new mojs.Burst({
    left: 0,
    top: 0,
    x,
    y,
    radius: { 12: 132 },
    count: 1,
    children: {
      shape: "circle",
      fill: "none",
      stroke: "#3dd7ff",
      strokeWidth: { 2: 0 },
      opacity: { 0.46: 0 },
      duration: 820,
      easing: "cubic.out",
    },
  });

  primary.play();
  ring.play();
}

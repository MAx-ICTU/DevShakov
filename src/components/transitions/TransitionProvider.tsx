import { Suspense, createContext, lazy, useCallback, useContext, useMemo, useState } from "react";
import gsap from "gsap";
import { useNavigate } from "react-router-dom";

const DisintegrationTransition = lazy(() =>
  import("./DisintegrationTransition").then((module) => ({
    default: module.DisintegrationTransition,
  })),
);

type TransitionContextValue = {
  startContactTransition: (target?: string) => void;
};

const TransitionContext = createContext<TransitionContextValue | null>(null);

export function TransitionProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const [active, setActive] = useState(false);
  const [target, setTarget] = useState("/contact");
  const imageUrl = `${import.meta.env.BASE_URL}profile.png`;

  const startContactTransition = useCallback((nextTarget = "/contact") => {
    if (active) return;

    setTarget(nextTarget);

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      setActive(true);
      return;
    }

    const copyTargets = gsap.utils.toArray<HTMLElement>("[data-transition-out]");
    const mediaTargets = gsap.utils.toArray<HTMLElement>("[data-transition-media]");

    if (!copyTargets.length && !mediaTargets.length) {
      setActive(true);
      return;
    }

    const timeline = gsap.timeline({
      defaults: { ease: "power2.inOut" },
      onComplete: () => setActive(true),
    });

    if (copyTargets.length) {
      timeline.to(
        copyTargets,
        {
          opacity: 0,
          y: -34,
          filter: "blur(7px)",
          duration: 0.46,
          stagger: 0.035,
        },
        0,
      );
    }

    if (mediaTargets.length) {
      timeline.to(
        mediaTargets,
        {
          opacity: 0.18,
          x: -34,
          scale: 0.985,
          filter: "blur(4px)",
          duration: 0.58,
        },
        0.04,
      );
    }
  }, [active]);

  const handleComplete = useCallback(() => {
    navigate(target);
    window.setTimeout(() => {
      setActive(false);
      gsap.set("[data-transition-out],[data-transition-media]", { clearProps: "all" });
    }, 420);
  }, [navigate, target]);

  const value = useMemo(() => ({ startContactTransition }), [startContactTransition]);

  return (
    <TransitionContext.Provider value={value}>
      {children}
      <Suspense fallback={active ? <div className="fixed inset-0 z-[95] bg-[#050505]" aria-hidden="true" /> : null}>
        <DisintegrationTransition active={active} imageUrl={imageUrl} onComplete={handleComplete} />
      </Suspense>
    </TransitionContext.Provider>
  );
}

export function useTransitionController() {
  const context = useContext(TransitionContext);
  if (!context) {
    throw new Error("useTransitionController must be used inside TransitionProvider");
  }
  return context;
}

import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { useNavigate } from "react-router-dom";
import { DepthTransitionOverlay } from "./DepthTransitionOverlay";

type TransitionContextValue = {
  startContactTransition: (target?: string) => void;
};

const TransitionContext = createContext<TransitionContextValue | null>(null);

export function TransitionProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const [active, setActive] = useState(false);
  const targetRef = useRef("/contact");
  const lockedRef = useRef(false);

  const resetScene = useCallback(() => {
    gsap.set("[data-depth-scene],[data-transition-out],[data-transition-media]", { clearProps: "all" });
  }, []);

  const startContactTransition = useCallback(
    (nextTarget = "/contact") => {
      if (lockedRef.current) return;

      lockedRef.current = true;
      targetRef.current = nextTarget;

      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reducedMotion) {
        navigate(nextTarget);
        lockedRef.current = false;
        return;
      }

      const scene = document.querySelector<HTMLElement>("[data-depth-scene]");
      const copyTargets = gsap.utils.toArray<HTMLElement>("[data-transition-out]");
      const mediaTargets = gsap.utils.toArray<HTMLElement>("[data-transition-media]");

      setActive(true);

      const timeline = gsap.timeline({
        defaults: { ease: "power3.inOut" },
        onComplete: () => {
          navigate(targetRef.current);
          window.setTimeout(() => {
            setActive(false);
            resetScene();
            lockedRef.current = false;
          }, 520);
        },
      });

      if (scene) {
        timeline.to(
          scene,
          {
            opacity: 0.28,
            scale: 1.085,
            filter: "blur(12px)",
            transformOrigin: "50% 42%",
            duration: 0.82,
          },
          0,
        );
      }

      if (copyTargets.length) {
        timeline.to(
          copyTargets,
          {
            opacity: 0,
            y: -18,
            scale: 0.985,
            filter: "blur(8px)",
            duration: 0.52,
            stagger: 0.025,
          },
          0.04,
        );
      }

      if (mediaTargets.length) {
        timeline.to(
          mediaTargets,
          {
            opacity: 0.2,
            scale: 1.045,
            filter: "blur(10px)",
            duration: 0.72,
          },
          0.02,
        );
      }

      timeline.to({}, { duration: 0.16 });
    },
    [navigate, resetScene],
  );

  const value = useMemo(() => ({ startContactTransition }), [startContactTransition]);

  return (
    <TransitionContext.Provider value={value}>
      {children}
      <DepthTransitionOverlay active={active} />
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

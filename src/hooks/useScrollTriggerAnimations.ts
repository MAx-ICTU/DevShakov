import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useScrollTriggerAnimations() {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion) {
      return undefined;
    }

    const context = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-scroll-section]").forEach((section) => {
        gsap.fromTo(
          section,
          { opacity: 0.72, y: 34 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 78%",
              end: "top 45%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-project-card]").forEach((card, index) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 36 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            delay: index * 0.04,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 84%",
            },
          },
        );

        gsap.to(card, {
          yPercent: index % 2 === 0 ? -4 : -7,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.7,
          },
        });
      });
    });

    return () => context.revert();
  }, []);
}

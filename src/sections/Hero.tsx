import { lazy, Suspense, useEffect, useRef } from "react";
import gsap from "gsap";
import { AnimatedLink } from "../components/AnimatedLink";
import { SplitTextReveal } from "../components/animations/SplitTextReveal";
import { AnimatedContactLink } from "../components/navigation/AnimatedContactLink";
import { TextParticleTrail } from "../components/particles/TextParticleTrail";
import { ScrambleText } from "../components/ScrambleText";
import { githubUrl } from "../data/site";
import { useShouldUseHeavyEffects } from "../hooks/useDevicePerformance";
import type { Locale } from "../types";

const HeroImageScene = lazy(() =>
  import("../components/webgl/HeroImageScene").then((module) => ({
    default: module.HeroImageScene,
  })),
);

type HeroProps = {
  locale: Locale;
};

const heroLead = {
  ru: "Начинающий 1C-разработчик с digital-бэкграундом: разбираюсь в логике бизнеса и учусь превращать ее в понятные рабочие решения.",
  en: "Junior 1C developer in progress with a digital background: I learn business logic and turn it into clear working solutions.",
};

const heroSubtitle = {
  ru: "Изучаю 1C:Предприятие 8.3 на практических кейсах: заказы, склад, справочники, документы, отчеты и базовая SQL-логика. Цель — выйти на стажировку или junior-позицию к июню 2026 года.",
  en: "I study 1C:Enterprise 8.3 through practical cases: orders, stock, catalogs, documents, reports and basic SQL logic. The goal is an internship or junior role by June 2026.",
};

const heroFocus = {
  ru: "Фокус: учет, склад, заказы, отчеты и автоматизация, которую понимают не только разработчики.",
  en: "Focus: accounting flows, stock, orders, reports and automation that non-developers can understand.",
};

export function Hero({ locale }: HeroProps) {
  const rootRef = useRef<HTMLElement | null>(null);
  const shouldUseHeavyEffects = useShouldUseHeavyEffects();
  const imageUrl = `${import.meta.env.BASE_URL}profile-desktop.jpg`;
  const mobileImageUrl = `${import.meta.env.BASE_URL}profile-mobile.jpg`;

  useEffect(() => {
    const root = rootRef.current;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!root || reducedMotion) {
      return undefined;
    }

    const context = gsap.context(() => {
      const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
      timeline
        .fromTo("[data-hero-media]", { opacity: 0, x: -42 }, { opacity: 1, x: 0, duration: 0.82 })
        .fromTo("[data-hero-kicker]", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.42 }, "-=0.45")
        .fromTo("[data-hero-copy]", { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.58 }, "-=0.18")
        .fromTo("[data-hero-link]", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.38, stagger: 0.07 }, "-=0.22");
    }, root);

    return () => context.revert();
  }, []);

  return (
    <section ref={rootRef} id="top" className="relative min-h-screen overflow-hidden pt-16">
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_62%_46%,rgba(255,255,255,0.018),transparent_24rem)]"
        aria-hidden="true"
      />
      <div className="relative grid min-h-[calc(100vh-4rem)] grid-cols-1 lg:grid-cols-[42%_58%]">
        <div
          className="relative min-h-[54vh] overflow-hidden lg:min-h-[calc(100vh-4rem)]"
          data-hero-media
          data-transition-media
          data-gsap-float="hero-media"
        >
          <div className="glitch-portrait absolute bottom-0 left-0 top-0 w-full max-w-[38rem] lg:left-[2vw] lg:top-[8vh] lg:h-[74vh] lg:w-[32vw]">
            <Suspense
              fallback={
                <picture>
                  <source media="(max-width: 767px)" srcSet={mobileImageUrl} />
                  <img
                    src={imageUrl}
                    alt="Portfolio portrait"
                    className="h-full w-full object-cover object-[50%_25%] grayscale contrast-105 brightness-[0.82]"
                    fetchPriority="high"
                  />
                </picture>
              }
            >
              {shouldUseHeavyEffects ? (
                <HeroImageScene imageUrl={imageUrl} alt="Portfolio portrait" />
              ) : (
                <picture>
                  <source media="(max-width: 767px)" srcSet={mobileImageUrl} />
                  <img
                    src={imageUrl}
                    alt="Portfolio portrait"
                    className="h-full w-full object-cover object-[50%_25%] grayscale contrast-105 brightness-[0.82]"
                    fetchPriority="high"
                  />
                </picture>
              )}
            </Suspense>
            <div className="absolute bottom-[9%] left-[8%] z-20 font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-white/58 mix-blend-difference sm:text-xs">
              <ScrambleText text="MAXIM / 1C_DEVELOPER" trigger="mount" />
            </div>
            <div
              className="pointer-events-none absolute inset-y-0 right-0 z-10 w-1/3 bg-gradient-to-r from-transparent via-[#050505]/35 to-[#050505]"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute inset-y-0 left-0 z-10 w-1/5 bg-gradient-to-r from-[#050505] via-[#050505]/22 to-transparent"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute inset-x-0 top-0 z-10 h-1/5 bg-gradient-to-b from-[#050505] via-[#050505]/20 to-transparent"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-1/4 bg-gradient-to-t from-[#050505] to-transparent"
              aria-hidden="true"
            />
          </div>
        </div>

        <div className="relative flex items-center px-5 py-14 sm:px-8 lg:min-h-[calc(100vh-4rem)] lg:px-10 lg:py-0 xl:px-14">
          <div className="w-full max-w-[64rem]" data-gsap-float="hero-copy">
            <div
              data-hero-kicker
              data-transition-out
              className="mb-8 flex max-w-5xl items-center justify-between gap-6 font-mono text-[10px] uppercase tracking-[0.22em] text-white/38"
            >
              <span>[ {locale === "ru" ? "портфолио обновляется" : "portfolio initializing"} ]</span>
              <span>© 2026</span>
            </div>

            <TextParticleTrail as="div" intensity={1.25} className="block w-fit max-w-full">
              <h1
                data-transition-out
                className="max-w-[12.8ch] font-display text-[clamp(3.8rem,7.6vw,8.5rem)] font-semibold leading-[0.84] tracking-normal text-white text-glow"
              >
                <span className="mb-3 block font-mono text-[clamp(0.8rem,1.15vw,1rem)] font-bold leading-none tracking-[0.32em] text-cyan/85">
                  01 /
                </span>
                <span className="block">
                  <SplitTextReveal text="Junior" delay={0.2} />
                </span>
                <span className="block whitespace-nowrap">
                  <SplitTextReveal text="1C Developer" delay={0.27} />
                </span>
              </h1>
            </TextParticleTrail>

            <div className="max-w-3xl">
              <p data-hero-copy data-transition-out className="mt-8 max-w-2xl text-lg font-semibold leading-7 text-white/88">
                {heroLead[locale]}
              </p>
              <p data-hero-copy data-transition-out className="mt-4 max-w-2xl text-base leading-7 text-white/66">
                {heroSubtitle[locale]}
              </p>
              <p data-hero-copy data-transition-out className="mt-4 max-w-2xl text-sm leading-6 text-white/58">
                {heroFocus[locale]}
              </p>
              <div
                data-transition-out
                className="mt-7 grid w-fit gap-2 font-mono text-xs font-bold uppercase tracking-[0.14em] text-white"
              >
                <AnimatedContactLink className="terminal-link">
                  <TextParticleTrail intensity={0.75}>CONTACT_INFORMATION</TextParticleTrail>
                </AnimatedContactLink>
                <a data-hero-link href={githubUrl} target="_blank" rel="noreferrer" className="terminal-link">
                  <TextParticleTrail intensity={0.65}>
                    <ScrambleText text="GITHUB" />
                  </TextParticleTrail>
                </a>
                <AnimatedLink to="/projects" className="terminal-link" dataHeroLink>
                  <TextParticleTrail intensity={0.65}>{locale === "ru" ? "ПРОЕКТЫ" : "PROJECTS"}</TextParticleTrail>
                </AnimatedLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

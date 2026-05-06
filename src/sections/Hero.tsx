import { useEffect, useRef } from "react";
import gsap from "gsap";
import { AnimatedLink } from "../components/AnimatedLink";
import { SplitTextReveal } from "../components/animations/SplitTextReveal";
import { AnimatedContactLink } from "../components/navigation/AnimatedContactLink";
import { TextParticleTrail } from "../components/particles/TextParticleTrail";
import { ScrambleText } from "../components/ScrambleText";
import { githubUrl } from "../data/site";
import type { Locale } from "../types";

type HeroProps = {
  locale: Locale;
};

const heroLead = {
  ru: "Собираю проекты на стыке 1C, учета, веба и автоматизации: от структуры данных и документов до понятного интерфейса и презентации результата.",
  en: "I build projects across 1C, accounting logic, web and automation: from data structure and documents to clear interfaces and project presentation.",
};

const heroSubtitle = {
  ru: "В фокусе: учебная 1C-конфигурация для заказов и склада, SQL-логика, digital-опыт, Telegram-сценарии, сайты и интерфейсы для задач малого бизнеса.",
  en: "The focus: a 1C configuration for orders and stock, SQL logic, digital experience, Telegram scenarios, websites and interfaces for small-business tasks.",
};

const heroFocus = {
  ru: "Цель портфолио — показать ход мысли: как бизнес-задача превращается в структуру, логику, экран, отчет и понятный результат.",
  en: "The portfolio shows the thinking process: how a business task becomes structure, logic, screen, report and a clear result.",
};

export function Hero({ locale }: HeroProps) {
  const rootRef = useRef<HTMLElement | null>(null);
  const imageUrl = `${import.meta.env.BASE_URL}profile-cutout.png`;

  useEffect(() => {
    const root = rootRef.current;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!root || reducedMotion) {
      return undefined;
    }

    const context = gsap.context(() => {
      const timeline = gsap.timeline({ defaults: { ease: "power3.out" }, delay: 0.28 });
      timeline
        .fromTo("[data-hero-media]", { opacity: 0, x: -42, filter: "blur(12px)" }, { opacity: 1, x: 0, filter: "blur(0px)", duration: 1.05 })
        .fromTo("[data-hero-kicker]", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.52 }, "-=0.55")
        .fromTo("[data-hero-copy]", { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.72 }, "-=0.2")
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
            <img
              src={imageUrl}
              alt="Portfolio portrait"
              className="hero-cutout-image h-full w-full object-contain object-bottom contrast-105 saturate-[0.92] brightness-[0.96] drop-shadow-[0_26px_54px_rgba(0,0,0,0.62)]"
              fetchPriority="high"
            />
            <div
              className="pointer-events-none absolute inset-y-0 left-0 z-10 w-[30%] bg-gradient-to-r from-[#050505] via-[#050505]/58 to-transparent"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute inset-y-0 right-0 z-10 w-[34%] bg-gradient-to-l from-[#050505] via-[#050505]/62 to-transparent"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[22%] bg-gradient-to-b from-[#050505] via-[#050505]/48 to-transparent"
              aria-hidden="true"
            />
            <div className="absolute bottom-[9%] left-[8%] z-20 font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-white/58 mix-blend-difference sm:text-xs">
              <ScrambleText text="MAXIM / 1C_AUTOMATION" trigger="mount" />
            </div>
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[20%] bg-gradient-to-t from-[#050505] via-[#050505]/42 to-transparent"
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
              <span>[ {locale === "ru" ? "портфолио работ" : "selected works"} ]</span>
              <span>© 2026</span>
            </div>

            <TextParticleTrail as="div" intensity={1.25} className="block w-fit max-w-full">
              <h1
                data-transition-out
                className="safe-heading max-w-full font-display text-[clamp(3rem,16vw,5.8rem)] font-semibold leading-[0.86] tracking-normal text-white text-glow sm:max-w-[12.8ch] sm:text-[clamp(4rem,7.6vw,8.5rem)]"
              >
                <span className="mb-3 block font-mono text-[clamp(0.8rem,1.15vw,1rem)] font-bold leading-none tracking-[0.32em] text-cyan/85">
                  01 /
                </span>
                <span className="block">
                  <SplitTextReveal text="1C & Web" delay={0.2} />
                </span>
                <span className="block whitespace-nowrap text-[0.58em] sm:text-[0.64em] lg:text-[0.7em]">
                  <SplitTextReveal text={locale === "ru" ? "Автоматизация" : "Automation"} delay={0.27} />
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

import { PageTransition } from "../components/animations/PageTransition";
import { SplitTextReveal } from "../components/animations/SplitTextReveal";
import { About } from "../sections/About";
import { Experience } from "../sections/Experience";
import { Skills } from "../sections/Skills";
import type { Locale } from "../types";

type AboutPageProps = {
  locale: Locale;
};

export function AboutPage({ locale }: AboutPageProps) {
  return (
    <PageTransition className="relative z-10 min-h-screen pt-24">
      <section className="px-5 py-16 sm:px-8 lg:px-14">
        <p className="mb-5 font-mono text-xs font-bold uppercase tracking-[0.28em] text-cyan">[ about ]</p>
        <SplitTextReveal
          as="h1"
          text={locale === "ru" ? "Business context before code" : "Business context before code"}
          className="max-w-5xl font-display text-[clamp(3rem,8vw,8rem)] font-semibold leading-[0.9] text-white text-glow"
        />
      </section>
      <About locale={locale} />
      <Skills locale={locale} />
      <Experience locale={locale} />
    </PageTransition>
  );
}

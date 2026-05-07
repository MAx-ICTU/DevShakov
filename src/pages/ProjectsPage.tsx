import { PageTransition } from "../components/animations/PageTransition";
import { SplitTextReveal } from "../components/animations/SplitTextReveal";
import { Projects } from "../sections/Projects";
import type { Locale } from "../types";

type ProjectsPageProps = {
  locale: Locale;
};

export function ProjectsPage({ locale }: ProjectsPageProps) {
  return (
    <PageTransition className="relative z-10 min-h-screen pt-24">
      <section className="px-5 py-16 sm:px-8 lg:px-14">
        <p className="mb-5 font-mono text-xs font-bold uppercase tracking-[0.28em] text-cyan">[ works ]</p>
        <SplitTextReveal
          as="h1"
          text={locale === "ru" ? "Подробные проектные кейсы" : "Detailed project cases"}
          className="safe-heading max-w-5xl font-display text-[clamp(2.6rem,13vw,5.2rem)] font-semibold leading-[0.92] text-white text-glow sm:text-[clamp(3.5rem,8vw,8rem)]"
        />
      </section>
      <Projects locale={locale} />
    </PageTransition>
  );
}

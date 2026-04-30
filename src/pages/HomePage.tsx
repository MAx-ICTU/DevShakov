import { PageTransition } from "../components/animations/PageTransition";
import { About } from "../sections/About";
import { Experience } from "../sections/Experience";
import { Hero } from "../sections/Hero";
import { Projects } from "../sections/Projects";
import { Skills } from "../sections/Skills";
import type { Locale } from "../types";

type HomePageProps = {
  locale: Locale;
};

export function HomePage({ locale }: HomePageProps) {
  return (
    <PageTransition className="relative z-10">
      <Hero locale={locale} />
      <About locale={locale} />
      <Skills locale={locale} />
      <Projects locale={locale} />
      <Experience locale={locale} />
    </PageTransition>
  );
}

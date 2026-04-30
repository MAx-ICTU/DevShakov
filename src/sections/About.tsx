import { Container } from "../components/Container";
import { Reveal } from "../components/Reveal";
import { SectionHeader } from "../components/SectionHeader";
import { content } from "../data/content";
import type { Locale } from "../types";

type AboutProps = {
  locale: Locale;
};

export function About({ locale }: AboutProps) {
  return (
    <section id="about" data-scroll-section className="py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr]">
          <Reveal>
            <SectionHeader eyebrow={content.about.eyebrow} title={content.about.title} locale={locale} />
          </Reveal>
          <Reveal delay={0.08}>
            <div className="relative pl-6 sm:pl-10">
              <span className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-cyan/60 via-white/10 to-transparent" />
              <span className="absolute -left-2 top-0 h-4 w-4 rounded-full bg-cyan shadow-[0_0_30px_rgba(61,215,255,0.55)]" />
              <p className="font-display text-2xl leading-10 text-white sm:text-3xl">{content.about.body[locale]}</p>
              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {content.about.facts.map((fact) => (
                  <div key={fact.label.en} className="bg-white/[0.035] p-5 transition hover:-translate-y-1 hover:bg-white/[0.065]">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{fact.label[locale]}</p>
                    <p className="mt-3 text-base font-semibold text-white">{fact.value[locale]}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

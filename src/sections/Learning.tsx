import { Container } from "../components/Container";
import { Reveal } from "../components/Reveal";
import { SectionHeader } from "../components/SectionHeader";
import { content } from "../data/content";
import { learningItems } from "../data/learning";
import type { Locale } from "../types";

type LearningProps = {
  locale: Locale;
};

export function Learning({ locale }: LearningProps) {
  return (
    <section className="bg-white/[0.018] py-24">
      <Container>
        <Reveal>
          <SectionHeader eyebrow={content.learning.eyebrow} title={content.learning.title} locale={locale} />
        </Reveal>
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {learningItems.map((item, index) => (
            <Reveal key={item.title.en} delay={index * 0.04}>
              <article className="bg-white/[0.035] p-5 transition hover:bg-white/[0.065]">
                <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-full bg-cyan/10 text-sm font-bold text-cyan">
                  {index + 1}
                </div>
                <h3 className="font-display text-xl font-semibold text-white">{item.title[locale]}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">{item.description[locale]}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

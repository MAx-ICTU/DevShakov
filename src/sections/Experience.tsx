import { Container } from "../components/Container";
import { Reveal } from "../components/Reveal";
import { SectionHeader } from "../components/SectionHeader";
import { content } from "../data/content";
import type { Locale } from "../types";

type ExperienceProps = {
  locale: Locale;
};

export function Experience({ locale }: ExperienceProps) {
  const items =
    locale === "ru"
      ? ["Маркетинговое агентство", "Сайты и дизайн", "Яндекс и Авито", "Клиентские задачи", "Малый бизнес"]
      : ["Marketing agency", "Websites and design", "Yandex and Avito", "Client tasks", "Small business"];

  return (
    <section data-scroll-section className="bg-white/[0.018] py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <Reveal>
            <SectionHeader eyebrow={content.experience.eyebrow} title={content.experience.title} locale={locale} />
            <p className="mt-6 text-lg leading-8 text-slate-300">{content.experience.body[locale]}</p>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="grid gap-3">
              {items.map((item, index) => (
                <div key={item} className="flex items-center justify-between bg-white/[0.035] p-5">
                  <span className="font-semibold text-white">{item}</span>
                  <span className="text-sm font-bold text-cyan">0{index + 1}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

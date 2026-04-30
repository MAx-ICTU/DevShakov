import { Container } from "../components/Container";
import { Reveal } from "../components/Reveal";
import { SectionHeader } from "../components/SectionHeader";
import { content } from "../data/content";
import { roadmapItems } from "../data/roadmap";
import type { Locale } from "../types";

type RoadmapProps = {
  locale: Locale;
};

const statusClass = {
  done: "bg-lime text-ink",
  active: "bg-cyan text-ink",
  next: "bg-white/10 text-slate-300",
};

export function Roadmap({ locale }: RoadmapProps) {
  return (
    <section id="roadmap" className="py-24">
      <Container>
        <Reveal>
          <SectionHeader eyebrow={content.roadmap.eyebrow} title={content.roadmap.title} locale={locale} align="center" />
        </Reveal>
        <div className="relative mx-auto mt-14 max-w-4xl">
          <div className="absolute left-5 top-0 hidden h-full w-px bg-gradient-to-b from-cyan via-white/20 to-lime md:block" />
          <div className="grid gap-5">
            {roadmapItems.map((item, index) => (
              <Reveal key={item.title.en} delay={index * 0.05}>
                <article className="relative bg-white/[0.035] p-6 md:ml-16">
                  <div className="absolute -left-[4.35rem] top-7 hidden h-10 w-10 items-center justify-center rounded-full bg-ink text-sm font-bold text-cyan shadow-[0_0_26px_rgba(61,215,255,0.22)] md:flex">
                    {index + 1}
                  </div>
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-sm font-semibold text-cyan">{item.date[locale]}</p>
                      <h3 className="mt-2 font-display text-2xl font-semibold text-white">{item.title[locale]}</h3>
                    </div>
                    <span className={`w-fit rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] ${statusClass[item.status]}`}>
                      {item.status}
                    </span>
                  </div>
                  <p className="mt-4 leading-7 text-slate-300">{item.description[locale]}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

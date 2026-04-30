import { Container } from "../components/Container";
import { Reveal } from "../components/Reveal";
import { skillGroups } from "../data/skills";
import type { Locale } from "../types";

type SkillsProps = {
  locale: Locale;
};

export function Skills({ locale }: SkillsProps) {
  return (
    <section id="skills" data-scroll-section className="bg-white/[0.018] py-28">
      <Container>
        <Reveal>
          <div className="mb-14 grid gap-6 lg:grid-cols-[1fr_0.45fr] lg:items-end">
            <div className="max-w-4xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-cyan">Skills</p>
            <h2 className="font-display text-4xl font-semibold leading-none text-white sm:text-6xl">
              {locale === "ru" ? "Навыки, которые складываются в практическую разработку." : "Skills that form practical development capability."}
            </h2>
            </div>
            <p className="text-sm leading-6 text-slate-400">
              {locale === "ru"
                ? "Подача специально разделена по направлениям: 1C-логика, web-база, данные, инструменты и digital-контекст."
                : "The stack is intentionally grouped by direction: 1C logic, web basics, data, tools and digital context."}
            </p>
          </div>
        </Reveal>
        <div className="grid gap-3 overflow-hidden md:grid-cols-2 xl:grid-cols-5">
          {skillGroups.map((group, index) => (
            <Reveal key={group.title.en} delay={index * 0.04}>
              <article className="group h-full bg-white/[0.035] p-6 transition hover:bg-white/[0.07]">
                <span className="mb-8 block font-display text-4xl font-semibold text-white/18 transition group-hover:text-cyan">0{index + 1}</span>
                <h3 className="font-display text-xl font-semibold text-white">{group.title[locale]}</h3>
                <p className="mt-3 min-h-16 text-sm leading-6 text-slate-400">{group.description[locale]}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span key={skill} className="bg-white/[0.045] px-3 py-1.5 text-xs text-slate-300">
                      {skill}
                    </span>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

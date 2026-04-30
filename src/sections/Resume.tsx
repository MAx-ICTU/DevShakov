import { Container } from "../components/Container";
import { Reveal } from "../components/Reveal";
import { content } from "../data/content";
import { ui } from "../data/site";
import type { Locale } from "../types";

type ResumeProps = {
  locale: Locale;
};

export function Resume({ locale }: ResumeProps) {
  return (
    <section className="py-24">
      <Container>
        <Reveal>
          <div className="bg-gradient-to-br from-cyan/12 via-white/[0.035] to-lime/10 p-6 sm:p-10">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-cyan">{content.resume.eyebrow[locale]}</p>
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <h2 className="font-display text-3xl font-semibold leading-tight text-white sm:text-5xl">{content.resume.title[locale]}</h2>
                <p className="mt-5 leading-7 text-slate-300">{content.resume.note[locale]}</p>
              </div>
              <a href={`${import.meta.env.BASE_URL}resume.pdf`} className="w-fit shrink-0 rounded-full bg-white px-6 py-3 text-sm font-bold text-ink transition hover:bg-cyan">
                {ui.downloadResume[locale]}
              </a>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

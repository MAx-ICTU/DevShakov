import { motion } from "framer-motion";
import { AnimatedLink } from "../components/AnimatedLink";
import { Container } from "../components/Container";
import { SplitTextReveal } from "../components/animations/SplitTextReveal";
import { projects } from "../data/projects";
import { ui } from "../data/site";
import type { Locale } from "../types";

type ProjectsProps = {
  locale: Locale;
};

export function Projects({ locale }: ProjectsProps) {
  return (
    <section id="projects" data-scroll-section className="py-28">
      <Container>
        <div className="mb-14 flex flex-col justify-between gap-6 pb-8 lg:flex-row lg:items-end">
          <div className="max-w-4xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-cyan">Projects</p>
            <SplitTextReveal
              as="h2"
              text={locale === "ru" ? "Практические проекты для портфолио и первых собеседований" : "Practical works for portfolio and first interviews"}
              className="font-display text-4xl font-semibold leading-none text-white sm:text-6xl lg:text-7xl"
            />
          </div>
          <p className="max-w-sm text-sm leading-6 text-slate-400">
            {locale === "ru"
              ? "Карточки оформлены как заготовки кейсов: бизнес-смысл, стек и чему проект должен научить."
              : "Cards are shaped as case-study drafts: business meaning, stack and what each project is meant to prove."}
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {projects.map((project, index) => (
            <motion.article
              key={project.title.en}
              data-project-card
              className="project-card group relative min-h-[34rem] overflow-hidden bg-white/[0.035] p-6"
              whileHover={{ y: -10 }}
              transition={{ duration: 0.26, ease: "easeOut" }}
            >
              <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
                <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-cyan/12 blur-3xl" />
                <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-white/6 blur-3xl" />
              </div>
              <motion.div
                className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-[radial-gradient(circle_at_40%_20%,rgba(61,215,255,0.16),transparent_18rem)]"
                initial={false}
                whileHover={{ x: 18, y: -8 }}
                transition={{ duration: 0.35 }}
              />
              <div className="relative flex h-full flex-col">
                <div className="mb-10 flex items-start justify-between">
                  <span className="font-display text-5xl font-semibold text-white/18">0{index + 1}</span>
                  <motion.span className="font-mono text-xl text-cyan" whileHover={{ x: 5, y: -5 }} aria-hidden="true">
                    ↗
                  </motion.span>
                </div>
                <h3 className="font-display text-3xl font-semibold leading-tight text-white">{project.title[locale]}</h3>
                <p className="mt-5 text-sm leading-6 text-slate-300">{project.description[locale]}</p>
                <div className="mt-7 flex flex-wrap gap-2">
                  {project.stack.map((item) => (
                    <span key={item} className="bg-white/[0.055] px-3 py-1.5 text-xs text-slate-300">
                      {item}
                    </span>
                  ))}
                </div>
                <ul className="mt-8 grid gap-3 text-sm text-slate-300">
                  {project.highlights.slice(0, 3).map((highlight) => (
                    <li key={highlight.en} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan" />
                      <span>{highlight[locale]}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-10">
                  <AnimatedLink to={project.githubUrl ?? "#"} className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-white">
                    {ui.github[locale]}
                  </AnimatedLink>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
}

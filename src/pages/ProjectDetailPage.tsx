import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { useParams } from "react-router-dom";
import { AnimatedLink, PlainRouteLink } from "../components/AnimatedLink";
import { PageTransition } from "../components/animations/PageTransition";
import { SplitTextReveal } from "../components/animations/SplitTextReveal";
import { TextParticleTrail } from "../components/particles/TextParticleTrail";
import { getAdjacentProjects, getProjectBySlug } from "../data/projects";
import type { Locale, Project } from "../types";

type ProjectDetailPageProps = {
  locale: Locale;
};

type ProjectNavCardProps = {
  project: Project;
  label: string;
  locale: Locale;
  align?: "left" | "right";
};

const easing = [0.22, 1, 0.36, 1] as const;

function ProjectNavCard({ project, label, locale, align = "left" }: ProjectNavCardProps) {
  const isRight = align === "right";
  const title = project.shortTitle?.[locale] ?? project.title[locale];

  return (
    <PlainRouteLink
      to={project.detailsUrl ?? `/projects/${project.slug}`}
      className={`group relative flex min-h-36 w-full items-end justify-between gap-6 overflow-hidden bg-[#050808]/90 px-6 py-6 font-mono uppercase text-white/72 backdrop-blur-md transition duration-300 hover:bg-cyan/10 hover:text-white sm:px-8 ${
        isRight ? "sm:text-right" : ""
      }`}
    >
      <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/10 transition group-hover:bg-cyan/60" />
      <span className="grid min-w-0 gap-3">
        <span className="text-[10px] font-bold tracking-[0.28em] text-cyan/80">{label}</span>
        <span className="safe-heading max-w-[18rem] text-sm font-bold leading-6 tracking-[0.18em] text-white/86 sm:text-base">
          {title}
        </span>
      </span>
      <span
        className={`grid h-10 w-10 shrink-0 place-items-center bg-white/[0.04] text-cyan transition duration-300 group-hover:bg-cyan group-hover:text-black ${
          isRight ? "sm:order-first" : ""
        }`}
        aria-hidden="true"
      >
        {isRight ? <ArrowRight size={17} strokeWidth={1.9} /> : <ArrowLeft size={17} strokeWidth={1.9} />}
      </span>
    </PlainRouteLink>
  );
}

export function ProjectDetailPage({ locale }: ProjectDetailPageProps) {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);
  const { previous, next } = getAdjacentProjects(slug);

  if (!project) {
    return (
      <PageTransition className="relative z-10 min-h-screen px-5 pt-32 sm:px-8 lg:px-14">
        <section className="mx-auto max-w-5xl">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.28em] text-cyan">[ project not found ]</p>
          <h1 className="mt-8 font-display text-[clamp(3rem,12vw,7rem)] font-semibold leading-none text-white text-glow">
            404
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-white/68">
            {locale === "ru" ? "Такой проект не найден. Вернитесь к списку работ." : "This project was not found. Go back to the works list."}
          </p>
          <AnimatedLink
            to="/projects"
            className="mt-10 inline-flex font-mono text-xs font-bold uppercase tracking-[0.16em] text-white"
          >
            <ArrowLeft size={15} />
            {locale === "ru" ? "Все проекты" : "All projects"}
          </AnimatedLink>
        </section>
      </PageTransition>
    );
  }

  const infoBlocks = [
    { label: { ru: "Задача", en: "Challenge" }, text: project.challenge },
    { label: { ru: "Решение", en: "Solution" }, text: project.solution },
    { label: { ru: "Результат", en: "Result" }, text: project.result },
  ];

  return (
    <PageTransition className="relative z-10 min-h-screen overflow-x-hidden">
      <section className="px-5 pb-24 pt-28 sm:px-8 lg:px-14">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-wrap items-center justify-between gap-5 font-mono text-xs font-bold uppercase tracking-[0.18em] text-white/54">
            <AnimatedLink to="/projects" className="inline-flex items-center gap-2 text-white/78 hover:text-cyan">
              <ArrowLeft size={15} strokeWidth={1.8} />
              {locale === "ru" ? "Все проекты" : "All projects"}
            </AnimatedLink>
            <span>[ {project.shortTitle?.[locale] ?? project.title[locale]} ]</span>
          </div>

          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(18rem,0.42fr)] lg:items-start">
            <header className="min-w-0">
              <p className="mb-7 font-mono text-xs font-bold uppercase tracking-[0.28em] text-cyan">
                [ project case ]
              </p>
              <TextParticleTrail as="div" intensity={0.72} className="block max-w-full">
                <h1 className="safe-heading max-w-5xl font-display text-[clamp(2rem,6.3vw,4.45rem)] font-semibold leading-[1.02] text-white text-glow sm:text-[clamp(2.5rem,5.4vw,5.2rem)]">
                  <SplitTextReveal text={project.title[locale]} />
                </h1>
              </TextParticleTrail>
              <motion.p
                className="mt-8 max-w-3xl text-base font-semibold leading-8 text-white/76 sm:text-lg"
                initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.72, delay: 0.18, ease: easing }}
              >
                {project.summary[locale]}
              </motion.p>
            </header>

            <motion.aside
              className="grid gap-5 bg-white/[0.035] p-6"
              initial={{ opacity: 0, y: 26, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.72, delay: 0.26, ease: easing }}
            >
              <div>
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-white/42">Stack</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.stack.map((item) => (
                    <span key={item} className="bg-white/[0.06] px-3 py-1.5 text-xs text-white/70">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <div className="grid gap-3">
                {project.projectUrl && (
                  <AnimatedLink
                    to={project.projectUrl}
                    className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.16em] text-white"
                  >
                    <ExternalLink size={15} strokeWidth={1.8} />
                    {locale === "ru" ? "Сайт проекта" : "Live website"}
                  </AnimatedLink>
                )}
                {project.githubUrl && (
                  <AnimatedLink
                    to={project.githubUrl}
                    className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.16em] text-white/72"
                  >
                    <ExternalLink size={15} strokeWidth={1.8} />
                    GitHub
                  </AnimatedLink>
                )}
              </div>
            </motion.aside>
          </div>

          {project.gallery && project.gallery.length > 0 && (
            <motion.section
              className="mt-16 grid gap-5 lg:grid-cols-[1.05fr_0.95fr]"
              initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.62, ease: easing }}
            >
              {project.gallery.map((item, index) => (
                <figure
                  key={item.src}
                  className={`group overflow-hidden bg-white/[0.035] p-3 ${
                    index === 0 ? "lg:row-span-2" : ""
                  }`}
                >
                  <img
                    src={item.src}
                    alt={item.alt[locale]}
                    loading="lazy"
                    className="h-auto w-full object-contain opacity-90 grayscale transition duration-500 group-hover:opacity-100 group-hover:grayscale-0"
                  />
                  <figcaption className="px-2 pb-1 pt-3 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-white/42">
                    {item.alt[locale]}
                  </figcaption>
                </figure>
              ))}
            </motion.section>
          )}

          <div className="mt-16 grid gap-5 lg:grid-cols-3">
            {infoBlocks.map((block, index) => (
              <motion.article
                key={block.label.en}
                className="min-h-[18rem] bg-white/[0.035] p-6"
                initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.62, delay: index * 0.08, ease: easing }}
              >
                <span className="font-display text-5xl font-semibold text-white/16">0{index + 1}</span>
                <h2 className="mt-8 font-display text-3xl font-semibold text-white">{block.label[locale]}</h2>
                <p className="mt-5 text-sm leading-7 text-white/66">{block.text[locale]}</p>
              </motion.article>
            ))}
          </div>

          <motion.section
            className="mt-16 grid gap-5 bg-white/[0.025] p-6 lg:grid-cols-[0.36fr_1fr]"
            initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.62, ease: easing }}
          >
            <h2 className="font-display text-3xl font-semibold text-white">{locale === "ru" ? "Дальше" : "Next steps"}</h2>
            <ul className="grid gap-3 text-sm leading-7 text-white/68">
              {project.nextSteps.map((step) => (
                <li key={step.en} className="flex gap-3">
                  <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan" />
                  <span>{step[locale]}</span>
                </li>
              ))}
            </ul>
          </motion.section>

          <nav className="relative z-20 mt-20 grid overflow-hidden border-y border-white/10 bg-black/35 sm:grid-cols-2">
            {previous ? (
              <ProjectNavCard
                project={previous}
                label={locale === "ru" ? "Предыдущий проект" : "Previous project"}
                locale={locale}
              />
            ) : (
              <span />
            )}
            {next ? (
              <ProjectNavCard
                project={next}
                label={locale === "ru" ? "Следующий проект" : "Next project"}
                locale={locale}
                align="right"
              />
            ) : (
              <span />
            )}
          </nav>
        </div>
      </section>
    </PageTransition>
  );
}

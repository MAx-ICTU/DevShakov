import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { useParams } from "react-router-dom";
import { AnimatedLink } from "../components/AnimatedLink";
import { PageTransition } from "../components/animations/PageTransition";
import { SplitTextReveal } from "../components/animations/SplitTextReveal";
import { TextParticleTrail } from "../components/particles/TextParticleTrail";
import { getAdjacentProjects, getProjectBySlug } from "../data/projects";
import type { Locale } from "../types";

type ProjectDetailPageProps = {
  locale: Locale;
};

const easing = [0.22, 1, 0.36, 1] as const;

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
          <AnimatedLink to="/projects" className="mt-10 inline-flex font-mono text-xs font-bold uppercase tracking-[0.16em] text-white">
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

          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.96fr)_minmax(20rem,0.48fr)] lg:items-start">
            <header className="min-w-0">
              <p className="mb-7 font-mono text-xs font-bold uppercase tracking-[0.28em] text-cyan">
                [ project case ]
              </p>
              <TextParticleTrail as="div" intensity={1.05} className="block max-w-full">
                <h1 className="safe-heading max-w-5xl font-display text-[clamp(2.8rem,11vw,7.2rem)] font-semibold leading-[0.9] text-white text-glow">
                  <SplitTextReveal text={project.title[locale]} />
                </h1>
              </TextParticleTrail>
              <motion.p
                className="mt-8 max-w-3xl text-lg font-semibold leading-8 text-white/78"
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
              <AnimatedLink to={project.githubUrl ?? "#"} className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.16em] text-white">
                <ExternalLink size={15} strokeWidth={1.8} />
                GitHub
              </AnimatedLink>
            </motion.aside>
          </div>

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

          <nav className="mt-16 grid gap-4 border-t border-white/10 pt-8 sm:grid-cols-2">
            {previous && (
              <AnimatedLink to={previous.detailsUrl ?? `/projects/${previous.slug}`} className="group bg-white/[0.03] p-5 font-mono text-xs font-bold uppercase tracking-[0.16em] text-white/72 hover:text-cyan">
                <ArrowLeft size={15} strokeWidth={1.8} />
                {locale === "ru" ? "Предыдущий" : "Previous"} / {previous.shortTitle?.[locale] ?? previous.title[locale]}
              </AnimatedLink>
            )}
            {next && (
              <AnimatedLink to={next.detailsUrl ?? `/projects/${next.slug}`} className="group justify-self-stretch bg-white/[0.03] p-5 font-mono text-xs font-bold uppercase tracking-[0.16em] text-white/72 hover:text-cyan sm:text-right">
                {locale === "ru" ? "Следующий" : "Next"} / {next.shortTitle?.[locale] ?? next.title[locale]}
                <ArrowRight size={15} strokeWidth={1.8} />
              </AnimatedLink>
            )}
          </nav>
        </div>
      </section>
    </PageTransition>
  );
}

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import type { KeyboardEvent, MouseEvent } from "react";
import { AnimatedLink } from "../components/AnimatedLink";
import { Container } from "../components/Container";
import { SplitTextReveal } from "../components/animations/SplitTextReveal";
import { useTransitionController } from "../components/transitions/TransitionProvider";
import { projects } from "../data/projects";
import { ui } from "../data/site";
import type { Locale, Project } from "../types";

type ProjectsProps = {
  locale: Locale;
};

type WorkCardProps = {
  project: Project;
  index: number;
  locale: Locale;
};

function WorkCard({ project, index, locale }: WorkCardProps) {
  const { startRouteTransition } = useTransitionController();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 120, damping: 18, mass: 0.4 });
  const smoothY = useSpring(pointerY, { stiffness: 120, damping: 18, mass: 0.4 });
  const backgroundX = useTransform(smoothX, [-0.5, 0.5], [-18, 18]);
  const backgroundY = useTransform(smoothY, [-0.5, 0.5], [-12, 12]);
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [4, -4]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-5, 5]);
  const detailsUrl = project.detailsUrl ?? `/projects/${project.slug}`;

  const handlePointerMove = (event: MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const handlePointerLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  const openProject = () => {
    startRouteTransition(detailsUrl);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openProject();
    }
  };

  return (
    <motion.article
      data-project-card
      className="project-card group relative min-h-[34rem] cursor-pointer overflow-hidden bg-white/[0.035] p-6 outline-none transition focus-visible:ring-2 focus-visible:ring-cyan/70"
      style={{ rotateX, rotateY }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onClick={openProject}
      onKeyDown={handleKeyDown}
      role="link"
      tabIndex={0}
      aria-label={`${locale === "ru" ? "Открыть проект" : "Open project"}: ${project.title[locale]}`}
      whileHover={{ y: -10, scale: 1.012 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
    >
      <motion.div className="pointer-events-none absolute inset-0 opacity-70" style={{ x: backgroundX, y: backgroundY }}>
        {project.previewImage && (
          <img
            src={project.previewImage}
            alt=""
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover opacity-20 mix-blend-screen grayscale transition duration-500 group-hover:scale-105 group-hover:opacity-30"
          />
        )}
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-cyan/12 blur-3xl transition duration-500 group-hover:bg-cyan/18" />
        <div className="absolute bottom-0 left-0 h-48 w-48 rounded-full bg-white/7 blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-36 bg-[radial-gradient(circle_at_40%_20%,rgba(61,215,255,0.16),transparent_18rem)]" />
      </motion.div>

      <div className="relative flex h-full flex-col">
        <div className="mb-10 flex items-start justify-between">
          <span className="font-display text-5xl font-semibold text-white/18">0{index + 1}</span>
          <motion.span className="grid h-10 w-10 place-items-center bg-white/[0.055] text-cyan" whileHover={{ x: 5, y: -5 }} aria-hidden="true">
            <ArrowUpRight size={20} strokeWidth={1.8} />
          </motion.span>
        </div>

        <h3 className="safe-heading font-display text-3xl font-semibold leading-tight text-white">{project.title[locale]}</h3>
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

        <div className="mt-auto grid w-fit gap-3 pt-10" onClick={(event) => event.stopPropagation()}>
          <AnimatedLink to={detailsUrl} className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.16em] text-white">
            <ArrowUpRight size={15} strokeWidth={1.8} />
            {locale === "ru" ? "Подробнее" : "Details"}
          </AnimatedLink>
          {project.projectUrl && (
            <AnimatedLink to={project.projectUrl} className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.16em] text-white/70">
              <ExternalLink size={15} strokeWidth={1.8} />
              {locale === "ru" ? "Сайт" : "Website"}
            </AnimatedLink>
          )}
          {project.githubUrl && (
            <AnimatedLink to={project.githubUrl} className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.16em] text-white/70">
              <ExternalLink size={15} strokeWidth={1.8} />
              {ui.github[locale]}
            </AnimatedLink>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export function Projects({ locale }: ProjectsProps) {
  return (
    <section id="projects" data-scroll-section className="py-28">
      <Container>
        <div className="mb-14 flex flex-col justify-between gap-6 pb-8 lg:flex-row lg:items-end">
          <div className="max-w-4xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-cyan">Projects</p>
            <SplitTextReveal
              as="h2"
              text={locale === "ru" ? "Проекты, которые показывают подход к задачам" : "Projects that show how I approach tasks"}
              className="safe-heading font-display text-[clamp(2.4rem,11vw,4rem)] font-semibold leading-none text-white sm:text-6xl lg:text-7xl"
            />
          </div>
          <p className="max-w-sm text-sm leading-6 text-slate-400">
            {locale === "ru"
              ? "Каждая карточка собрана как мини-кейс: задача, стек, логика решения и то, что проект демонстрирует."
              : "Each card is shaped as a mini case: task, stack, solution logic and what the project demonstrates."}
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {projects.map((project, index) => (
            <WorkCard key={project.slug} project={project} index={index} locale={locale} />
          ))}
        </div>
      </Container>
    </section>
  );
}

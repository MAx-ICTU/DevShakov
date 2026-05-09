import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { useEffect, useRef } from "react";
import type { KeyboardEvent, MouseEvent, PointerEvent } from "react";
import { PlainRouteLink } from "../components/AnimatedLink";
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
            className="absolute inset-0 h-full w-full object-cover opacity-[0.09] grayscale transition duration-500 group-hover:scale-105 group-hover:opacity-[0.16]"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050808]/82 via-[#050808]/70 to-[#050808]/92" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,8,8,0.92)_0%,rgba(5,8,8,0.72)_42%,rgba(5,8,8,0.9)_100%)]" />
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

        <div className="mt-auto flex w-full items-end justify-between gap-4 pt-10" onClick={(event) => event.stopPropagation()}>
          <div className="min-w-0">
            {project.projectUrl && (
              <a
                href={project.projectUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.16em] text-white/70 transition hover:text-cyan"
              >
                <ExternalLink size={15} strokeWidth={1.8} />
                {locale === "ru" ? "Сайт" : "Website"}
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.16em] text-white/70 transition hover:text-cyan"
              >
                <ExternalLink size={15} strokeWidth={1.8} />
                {ui.github[locale]}
              </a>
            )}
          </div>
          <PlainRouteLink
            to={detailsUrl}
            className="group/details inline-flex items-center gap-2 bg-white/[0.04] px-3 py-2 font-mono text-xs font-bold uppercase tracking-[0.16em] text-white transition hover:bg-cyan hover:text-black"
          >
            {locale === "ru" ? "Подробнее" : "Details"}
            <ArrowUpRight size={15} strokeWidth={1.8} className="transition group-hover/details:translate-x-0.5 group-hover/details:-translate-y-0.5" />
          </PlainRouteLink>
        </div>
      </div>
    </motion.article>
  );
}

export function Projects({ locale }: ProjectsProps) {
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const isPausedRef = useRef(false);
  const isDraggingRef = useRef(false);
  const didDragRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartScrollRef = useRef(0);
  const loopWidthRef = useRef(0);
  const carouselProjects = [...projects, ...projects, ...projects];

  const normalizeScroll = () => {
    const node = carouselRef.current;
    const loopWidth = loopWidthRef.current;
    if (!node || !loopWidth) return;

    if (node.scrollLeft >= loopWidth * 2) {
      node.scrollLeft -= loopWidth;
    } else if (node.scrollLeft <= 0) {
      node.scrollLeft += loopWidth;
    }
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    const node = carouselRef.current;
    if (!node) return;

    isPausedRef.current = true;
    isDraggingRef.current = true;
    didDragRef.current = false;
    dragStartXRef.current = event.clientX;
    dragStartScrollRef.current = node.scrollLeft;
    node.setPointerCapture(event.pointerId);
    node.classList.add("is-dragging");
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const node = carouselRef.current;
    if (!node || !isDraggingRef.current) return;

    const delta = event.clientX - dragStartXRef.current;
    if (Math.abs(delta) > 6) {
      didDragRef.current = true;
    }
    node.scrollLeft = dragStartScrollRef.current - delta;
    normalizeScroll();
  };

  const stopDragging = (event: PointerEvent<HTMLDivElement>) => {
    const node = carouselRef.current;
    if (!node) return;

    isDraggingRef.current = false;
    isPausedRef.current = false;
    node.classList.remove("is-dragging");
    if (node.hasPointerCapture(event.pointerId)) {
      node.releasePointerCapture(event.pointerId);
    }

    window.setTimeout(() => {
      didDragRef.current = false;
    }, 80);
  };

  useEffect(() => {
    const node = carouselRef.current;
    const firstCard = node?.querySelector<HTMLElement>("[data-carousel-card]");
    if (!node || !firstCard) return;

    const gap = 20;
    loopWidthRef.current = (firstCard.offsetWidth + gap) * projects.length;
    node.scrollLeft = loopWidthRef.current;
  }, []);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    let frame = 0;
    const tick = () => {
      const node = carouselRef.current;
      if (node && !isPausedRef.current && !isDraggingRef.current) {
        node.scrollLeft += 0.42;
        normalizeScroll();
      }
      frame = window.requestAnimationFrame(tick);
    };

    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, []);

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
      </Container>

      <div className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden">
        <div className="project-carousel-shell relative">
          <div
            ref={carouselRef}
            className="project-carousel-scroll flex cursor-grab gap-5 overflow-x-auto px-[max(1.25rem,calc((100vw-80rem)/2))] py-3 active:cursor-grabbing"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={stopDragging}
            onPointerCancel={stopDragging}
            onPointerEnter={() => {
              isPausedRef.current = true;
            }}
            onPointerLeave={(event) => {
              if (isDraggingRef.current) {
                stopDragging(event);
                return;
              }
              isPausedRef.current = false;
            }}
            onClickCapture={(event) => {
              if (didDragRef.current) {
                event.preventDefault();
                event.stopPropagation();
              }
            }}
          >
            {carouselProjects.map((project, index) => (
              <div key={`${project.slug}-${index}`} data-carousel-card className="w-[min(82vw,25rem)] shrink-0 snap-start">
                <WorkCard project={project} index={index % projects.length} locale={locale} />
              </div>
            ))}
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#050505] via-[#050505]/80 to-transparent sm:w-36" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#050505] via-[#050505]/80 to-transparent sm:w-36" />
        </div>
      </div>
    </section>
  );
}

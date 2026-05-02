import type { RoadmapItem } from "../types";

export const roadmapItems: RoadmapItem[] = [
  {
    date: { ru: "Сейчас", en: "Now" },
    title: { ru: "База платформы 1С", en: "1C platform fundamentals" },
    description: {
      ru: "Разбираю объекты конфигурации, синтаксис, управляемые формы и то, как данные проходят через систему.",
      en: "Studying configuration objects, syntax, managed forms and how data moves through the system.",
    },
    status: "active",
  },
  {
    date: { ru: "Весна 2026", en: "Spring 2026" },
    title: { ru: "Учебная конфигурация с бизнес-сценарием", en: "Learning configuration with a business scenario" },
    description: {
      ru: "Собираю кейс по заказам и складу: справочники, документы, движения и отчеты по остаткам.",
      en: "Building an orders-and-stock case: catalogs, documents, movements and stock reports.",
    },
    status: "next",
  },
  {
    date: { ru: "Весна 2026", en: "Spring 2026" },
    title: { ru: "Понятное оформление GitHub", en: "Clear GitHub presentation" },
    description: {
      ru: "Добавляю README, скриншоты и описание: какую задачу решает проект, какие объекты есть и чему я научился.",
      en: "Adding README files, screenshots and explanations: what the project solves, what objects it contains and what I learned.",
    },
    status: "next",
  },
  {
    date: { ru: "Май 2026", en: "May 2026" },
    title: { ru: "Сайт, резюме и первые отклики", en: "Website, resume and first applications" },
    description: {
      ru: "Готовлю портфолио, PDF-резюме, ссылки на проекты и короткую подачу для работодателей.",
      en: "Preparing the portfolio, PDF resume, project links and a concise pitch for employers.",
    },
    status: "next",
  },
  {
    date: { ru: "Июнь 2026", en: "June 2026" },
    title: { ru: "Цель: первая позиция в 1C", en: "Goal: first 1C role" },
    description: {
      ru: "Откликаюсь на стажировки и junior-вакансии, где смогу расти на реальных задачах под наставничеством.",
      en: "Applying for internships and junior roles where I can grow on real tasks with mentorship.",
    },
    status: "next",
  },
];

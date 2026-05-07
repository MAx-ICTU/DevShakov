import type { RoadmapItem } from "../types";

export const roadmapItems: RoadmapItem[] = [
  {
    date: { ru: "Сейчас", en: "Now" },
    title: { ru: "1C-проект по заказам и складу", en: "1C orders and stock project" },
    description: {
      ru: "Развиваю конфигурацию: справочники, документы, движения, остатки и отчеты, чтобы проект показывал не только форму, но и учетную логику.",
      en: "Developing the configuration: catalogs, documents, movements, balances and reports, so the project shows both UI and accounting logic.",
    },
    status: "active",
  },
  {
    date: { ru: "Весна 2026", en: "Spring 2026" },
    title: { ru: "Понятный GitHub для каждого кейса", en: "Clear GitHub for every case" },
    description: {
      ru: "Добавляю README, скриншоты, схему объектов и описание бизнес-сценария: что решает проект и как его смотреть.",
      en: "Adding README files, screenshots, object diagrams and business-scenario notes: what the project solves and how to review it.",
    },
    status: "next",
  },
  {
    date: { ru: "Весна 2026", en: "Spring 2026" },
    title: { ru: "Web-кейсы и визуальная подача", en: "Web cases and visual presentation" },
    description: {
      ru: "Оформляю сайт-портфолио, страницы проектов и digital-кейсы так, чтобы было понятно, какую задачу решает каждая работа.",
      en: "Presenting the portfolio website, project pages and digital cases so each work clearly explains the task it solves.",
    },
    status: "next",
  },
  {
    date: { ru: "Май 2026", en: "May 2026" },
    title: { ru: "Портфолио и резюме", en: "Portfolio and resume" },
    description: {
      ru: "Собираю сайт, PDF-резюме, ссылки на проекты и короткое описание того, какие задачи умею разбирать.",
      en: "Preparing the website, PDF resume, project links and a short explanation of the tasks I can work through.",
    },
    status: "next",
  },
  {
    date: { ru: "Июнь 2026", en: "June 2026" },
    title: { ru: "Больше практических задач", en: "More practical tasks" },
    description: {
      ru: "Расширяю портфолио реальными и учебными кейсами вокруг учета, отчетов, интеграций и автоматизации малого бизнеса.",
      en: "Expanding the portfolio with real and learning cases around accounting, reports, integrations and small-business automation.",
    },
    status: "next",
  },
];

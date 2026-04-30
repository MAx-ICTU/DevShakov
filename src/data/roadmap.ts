import type { RoadmapItem } from "../types";

export const roadmapItems: RoadmapItem[] = [
  {
    date: { ru: "Сейчас", en: "Now" },
    title: { ru: "Изучение платформы 1С", en: "Learning the 1C platform" },
    description: { ru: "Объекты конфигурации, синтаксис, управляемые формы.", en: "Configuration objects, syntax and managed forms." },
    status: "active",
  },
  {
    date: { ru: "Весна 2026", en: "Spring 2026" },
    title: { ru: "Учебная конфигурация", en: "Learning configuration" },
    description: { ru: "Заказы, склад, справочники, документы и отчеты.", en: "Orders, stock, catalogs, documents and reports." },
    status: "next",
  },
  {
    date: { ru: "Весна 2026", en: "Spring 2026" },
    title: { ru: "Оформление GitHub", en: "GitHub presentation" },
    description: { ru: "README, скриншоты, описание бизнес-сценариев.", en: "README, screenshots and business scenario descriptions." },
    status: "next",
  },
  {
    date: { ru: "Май 2026", en: "May 2026" },
    title: { ru: "Публикация портфолио", en: "Portfolio publishing" },
    description: { ru: "Сайт, резюме, ссылки на проекты и контакты.", en: "Website, resume, project links and contacts." },
    status: "next",
  },
  {
    date: { ru: "Июнь 2026", en: "June 2026" },
    title: { ru: "Отклики на junior-позиции", en: "Applying for junior roles" },
    description: { ru: "Стажировки, junior-вакансии и первые рабочие задачи.", en: "Internships, junior vacancies and first production tasks." },
    status: "next",
  },
];

import type { SkillGroup } from "../types";

export const skillGroups: SkillGroup[] = [
  {
    title: { ru: "1C & Business Logic", en: "1C & Business Logic" },
    description: {
      ru: "База, на которой я собираю сценарии учета, заказов и склада.",
      en: "The foundation I use to build scenarios for accounting, orders and stock.",
    },
    skills: ["1C:Предприятие 8.3", "Справочники", "Документы", "Отчеты", "Бизнес-процессы", "Учетная логика"],
  },
  {
    title: { ru: "Web", en: "Web" },
    description: {
      ru: "Опыт в интерфейсах и верстке помогает мне лучше понимать удобство пользователя.",
      en: "Interface and layout experience helps me think about usability from the user's side.",
    },
    skills: ["HTML", "CSS", "JavaScript", "React basics", "Адаптивная верстка"],
  },
  {
    title: { ru: "Data", en: "Data" },
    description: {
      ru: "Базовые запросы и понимание структуры данных для отчетов и проверки логики.",
      en: "Basic querying and data-structure understanding for reports and logic checks.",
    },
    skills: ["SQL", "SELECT", "JOIN", "GROUP BY", "WHERE", "Структура данных"],
  },
  {
    title: { ru: "Tools", en: "Tools" },
    description: {
      ru: "Инструменты, которые помогают вести проект аккуратно и показывать прогресс.",
      en: "Tools that help keep projects organized and make progress visible.",
    },
    skills: ["Git", "GitHub", "VS Code", "Linux basics", "GitHub Pages"],
  },
  {
    title: { ru: "Digital background", en: "Digital background" },
    description: {
      ru: "Практический контекст: заявки, сайты, объявления и реальные задачи малого бизнеса.",
      en: "Practical context: leads, websites, listings and real small-business tasks.",
    },
    skills: ["Сайты", "Дизайн", "Яндекс", "Авито", "Продвижение", "Задачи малого бизнеса"],
  },
];

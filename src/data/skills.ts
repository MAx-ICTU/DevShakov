import type { SkillGroup } from "../types";

export const skillGroups: SkillGroup[] = [
  {
    title: { ru: "1C & Business Logic", en: "1C & Business Logic" },
    description: {
      ru: "Учетная логика, объекты конфигурации и простые бизнес-процессы.",
      en: "Accounting logic, configuration objects and basic business workflows.",
    },
    skills: ["1С:Предприятие 8.3", "Справочники", "Документы", "Отчеты", "Бизнес-процессы", "Учетная логика"],
  },
  {
    title: { ru: "Web", en: "Web" },
    description: {
      ru: "База для аккуратных интерфейсов, лендингов и портфолио.",
      en: "Foundation for clean interfaces, landing pages and portfolio work.",
    },
    skills: ["HTML", "CSS", "JavaScript", "React basics", "Адаптивная верстка"],
  },
  {
    title: { ru: "Data", en: "Data" },
    description: {
      ru: "Понимание структуры данных и базовых запросов.",
      en: "Understanding data structure and basic querying.",
    },
    skills: ["SQL", "SELECT", "JOIN", "GROUP BY", "WHERE", "Структура данных"],
  },
  {
    title: { ru: "Tools", en: "Tools" },
    description: {
      ru: "Инструменты разработки, публикации и автоматизации.",
      en: "Tools for development, publishing and automation.",
    },
    skills: ["Git", "GitHub", "VS Code", "Linux basics", "Telegram Bot API"],
  },
  {
    title: { ru: "Digital background", en: "Digital background" },
    description: {
      ru: "Опыт, который помогает лучше понимать задачи малого бизнеса.",
      en: "Experience that helps understand small business needs.",
    },
    skills: ["Сайты", "Дизайн", "Яндекс", "Авито", "Продвижение", "Задачи малого бизнеса"],
  },
];

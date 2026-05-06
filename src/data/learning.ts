import type { LearningItem } from "../types";

export const learningItems: LearningItem[] = [
  {
    title: { ru: "1C:Предприятие 8.3", en: "1C:Enterprise 8.3" },
    description: {
      ru: "Платформа, объекты конфигурации и прикладная логика на сценариях учета, заказов и склада.",
      en: "Platform, configuration objects and application logic through accounting, orders and stock scenarios.",
    },
  },
  {
    title: { ru: "Справочники, документы, регистры, отчеты", en: "Catalogs, documents, registers, reports" },
    description: {
      ru: "Элементы, из которых складывается учетная система: данные, операции, движения и вывод информации.",
      en: "The building blocks of an accounting system: data, operations, movements and information output.",
    },
  },
  {
    title: { ru: "SQL и структура данных", en: "SQL and data structure" },
    description: {
      ru: "SELECT, JOIN, группировки, фильтры и понимание связей между сущностями.",
      en: "SELECT, JOIN, grouping, filters and understanding relationships between entities.",
    },
  },
  {
    title: { ru: "Web-интерфейсы", en: "Web interfaces" },
    description: {
      ru: "HTML, CSS, адаптивная верстка и визуальная подача проектов, чтобы результат было удобно смотреть и оценивать.",
      en: "HTML, CSS, responsive layout and visual project presentation that is easy to review.",
    },
  },
  {
    title: { ru: "Telegram Bot API", en: "Telegram Bot API" },
    description: {
      ru: "Сценарии автоматизации через бота: коммуникация, выдача данных, простая логика личного кабинета.",
      en: "Automation scenarios through a bot: communication, data delivery and lightweight account logic.",
    },
  },
  {
    title: { ru: "Оформление проектов", en: "Project presentation" },
    description: {
      ru: "README, скриншоты, описание бизнес-сценария и понятная структура репозитория.",
      en: "README files, screenshots, business-scenario notes and clear repository structure.",
    },
  },
];

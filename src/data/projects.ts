import { githubUrl } from "./site";
import type { Project } from "../types";

export const projects: Project[] = [
  {
    title: { ru: "Учет заказов и склада для малого бизнеса", en: "Orders and Stock Accounting for Small Business" },
    description: {
      ru: "Учебная конфигурация на 1С:Предприятие 8.3 для отработки справочников, документов, складских операций, заказов и отчетности.",
      en: "A learning configuration on 1C:Enterprise 8.3 for practicing catalogs, documents, warehouse operations, orders and reporting.",
    },
    stack: ["1С:Предприятие 8.3", "Бизнес-логика", "Учет", "Отчеты"],
    highlights: [
      { ru: "понимание учета и складских сценариев", en: "understanding accounting and warehouse scenarios" },
      { ru: "работа с объектами 1С", en: "working with 1C objects" },
      { ru: "моделирование простой бизнес-системы", en: "modeling a simple business system" },
      { ru: "практический подход к учебному проекту", en: "a practical approach to a learning project" },
    ],
    githubUrl,
    detailsUrl: "#projects",
  },
  {
    title: { ru: "Коммерческий VPN-сервис с Telegram-ботом и Mini App", en: "Commercial VPN Service with Telegram Bot and Mini App" },
    description: {
      ru: "Проектная заготовка для сервиса с Telegram-ботом, Mini App, оплатой, выдачей доступа и личным кабинетом пользователя.",
      en: "A project draft for a service with a Telegram bot, Mini App, payments, access delivery and a lightweight user account flow.",
    },
    stack: ["Telegram Bot API", "Mini App", "Backend basics", "Payments flow", "UX"],
    highlights: [
      { ru: "понимание пользовательского сценария покупки", en: "understanding the purchase user journey" },
      { ru: "связь интерфейса, логики и автоматизации", en: "connecting interface, logic and automation" },
      { ru: "подход к коммерческому продукту", en: "thinking through a commercial product" },
    ],
    githubUrl,
    detailsUrl: "#projects",
  },
  {
    title: { ru: "Сайты и дизайн для малого бизнеса / маркетинговых задач", en: "Websites and Design for Small Business / Marketing Tasks" },
    description: {
      ru: "Опыт из digital-сферы: сайты, дизайн-макеты, объявления и задачи продвижения для малого бизнеса.",
      en: "Digital background: websites, design layouts, listings and promotion tasks for small business.",
    },
    stack: ["HTML", "CSS", "Design", "Adaptive layout", "Yandex", "Avito"],
    highlights: [
      { ru: "умение собирать понятный интерфейс", en: "ability to build clear interfaces" },
      { ru: "понимание задач клиентов и заявок", en: "understanding client tasks and leads" },
      { ru: "внимание к визуальной подаче", en: "attention to visual presentation" },
    ],
    githubUrl,
    detailsUrl: "#projects",
  },
];

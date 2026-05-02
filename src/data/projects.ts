import { githubUrl } from "./site";
import type { Project } from "../types";

export const projects: Project[] = [
  {
    title: { ru: "Учет заказов и склада для малого бизнеса", en: "Orders and Stock Accounting for Small Business" },
    description: {
      ru: "Учебная 1C-конфигурация, в которой я моделирую базовый процесс малого бизнеса: номенклатура, клиенты, заказы, складские движения и отчеты для контроля остатков.",
      en: "A learning 1C configuration where I model a basic small-business workflow: products, customers, orders, stock movements and reports for stock visibility.",
    },
    stack: ["1С:Предприятие 8.3", "Бизнес-логика", "Учет", "Отчеты"],
    highlights: [
      { ru: "понимание базового учета заказов и остатков", en: "understanding basic order and stock accounting" },
      { ru: "работу со справочниками, документами и отчетами 1C", en: "working with 1C catalogs, documents and reports" },
      { ru: "умение разложить бизнес-процесс на объекты системы", en: "breaking a business process down into system objects" },
      { ru: "готовность оформлять учебный проект как портфолио", en: "turning a learning project into a portfolio case" },
    ],
    githubUrl,
    detailsUrl: "#projects",
  },
  {
    title: { ru: "Коммерческий VPN-сервис с Telegram-ботом и Mini App", en: "Commercial VPN Service with Telegram Bot and Mini App" },
    description: {
      ru: "Концепт сервиса, где я продумываю пользовательский путь: бот, Mini App, оплата, выдача доступа и простая логика личного кабинета.",
      en: "A service concept where I work through the user journey: bot, Mini App, payment flow, access delivery and a lightweight account experience.",
    },
    stack: ["Telegram Bot API", "Mini App", "Backend basics", "Payments flow", "UX"],
    highlights: [
      { ru: "умение думать сценариями, а не отдельными экранами", en: "thinking in user flows, not isolated screens" },
      { ru: "связь интерфейса, логики оплаты и автоматической выдачи доступа", en: "connecting UI, payment logic and automated access delivery" },
      { ru: "понимание, как цифровой продукт должен быть удобен пользователю", en: "understanding what makes a digital product usable" },
    ],
    githubUrl,
    detailsUrl: "#projects",
  },
  {
    title: { ru: "Сайты и дизайн для малого бизнеса / маркетинговых задач", en: "Websites and Design for Small Business / Marketing Tasks" },
    description: {
      ru: "Подборка задач из digital-опыта: сайты, дизайн-макеты, объявления и продвижение. Этот опыт помогает мне лучше понимать, как бизнес получает заявки и где автоматизация может снять ручную работу.",
      en: "A set of digital-background tasks: websites, design layouts, listings and promotion. This experience helps me understand how a business gets leads and where automation can reduce manual work.",
    },
    stack: ["HTML", "CSS", "Design", "Adaptive layout", "Yandex", "Avito"],
    highlights: [
      { ru: "понимание интерфейса как части бизнес-процесса", en: "understanding UI as part of a business process" },
      { ru: "опыт работы с задачами клиентов и заявками", en: "experience with client tasks and lead generation" },
      { ru: "аккуратность в визуальной подаче портфолио", en: "careful visual presentation in portfolio work" },
    ],
    githubUrl,
    detailsUrl: "#projects",
  },
];

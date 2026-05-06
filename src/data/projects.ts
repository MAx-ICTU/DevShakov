import { githubUrl } from "./site";
import type { Project } from "../types";

export const projects: Project[] = [
  {
    title: { ru: "Учет заказов и склада для малого бизнеса", en: "Orders and Stock Accounting for Small Business" },
    description: {
      ru: "1C-конфигурация, в которой я моделирую рабочий процесс малого бизнеса: номенклатура, клиенты, заказы, складские движения и отчеты по остаткам.",
      en: "A 1C configuration that models a small-business workflow: products, customers, orders, stock movements and stock reports.",
    },
    stack: ["1C:Предприятие 8.3", "Бизнес-логика", "Учет", "Отчеты"],
    highlights: [
      { ru: "структура справочников для товаров, клиентов и операций", en: "catalog structure for products, customers and operations" },
      { ru: "документы и движения, которые отражают заказы и склад", en: "documents and movements that represent orders and stock" },
      { ru: "отчеты для контроля остатков и понимания текущего состояния", en: "reports for stock visibility and current state control" },
      { ru: "проект оформляется как понятный кейс для просмотра на GitHub", en: "the project is presented as a clear GitHub case" },
    ],
    githubUrl,
    detailsUrl: "#projects",
  },
  {
    title: { ru: "VPN-сервис с Telegram-ботом и Mini App", en: "VPN Service with Telegram Bot and Mini App" },
    description: {
      ru: "Концепт цифрового сервиса, где проработан путь пользователя: Telegram-бот, Mini App, оплата, выдача доступа и логика личного кабинета.",
      en: "A digital service concept with a worked-through user journey: Telegram bot, Mini App, payment flow, access delivery and account logic.",
    },
    stack: ["Telegram Bot API", "Mini App", "Backend basics", "Payment flow", "UX"],
    highlights: [
      { ru: "сценарии пользователя от первого входа до получения доступа", en: "user scenarios from first entry to access delivery" },
      { ru: "связка интерфейса, оплаты и автоматической выдачи услуги", en: "connection between interface, payment and automated service delivery" },
      { ru: "понимание логики цифрового продукта и его точек роста", en: "understanding of digital product logic and growth points" },
    ],
    githubUrl,
    detailsUrl: "#projects",
  },
  {
    title: { ru: "Сайты и дизайн для малого бизнеса", en: "Websites and Design for Small Business" },
    description: {
      ru: "Работы и задачи из digital-опыта: сайты, адаптивная верстка, дизайн-макеты, объявления и продвижение. Этот блок показывает понимание интерфейса и клиентского пути.",
      en: "Work from my digital background: websites, responsive layout, design layouts, listings and promotion. This section shows understanding of interfaces and customer journeys.",
    },
    stack: ["HTML", "CSS", "Design", "Adaptive layout", "Yandex", "Avito"],
    highlights: [
      { ru: "визуальная подача продукта и понятная структура страницы", en: "visual product presentation and clear page structure" },
      { ru: "опыт работы с заявками, объявлениями и задачами клиентов", en: "experience with leads, listings and client tasks" },
      { ru: "понимание, где автоматизация может снять ручную работу", en: "understanding where automation can reduce manual work" },
    ],
    githubUrl,
    detailsUrl: "#projects",
  },
];

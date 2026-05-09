import { githubUrl } from "./site";
import type { Project } from "../types";

export const projects: Project[] = [
  {
    slug: "orders-stock",
    title: { ru: "Учет заказов и склада для малого бизнеса", en: "Orders and Stock Accounting for Small Business" },
    shortTitle: { ru: "Заказы и склад", en: "Orders and stock" },
    description: {
      ru: "1C-конфигурация, в которой моделируется рабочий процесс малого бизнеса: номенклатура, клиенты, заказы, складские движения и отчеты по остаткам.",
      en: "A 1C configuration that models a small-business workflow: products, customers, orders, stock movements and stock reports.",
    },
    summary: {
      ru: "Кейс показывает, как бизнес-процесс раскладывается на справочники, документы, движения и отчеты.",
      en: "This case shows how a business process becomes catalogs, documents, movements and reports.",
    },
    stack: ["1C:Предприятие 8.3", "Бизнес-логика", "Учет", "Отчеты"],
    highlights: [
      { ru: "структура справочников для товаров, клиентов и операций", en: "catalog structure for products, customers and operations" },
      { ru: "документы и движения, которые отражают заказы и склад", en: "documents and movements that represent orders and stock" },
      { ru: "отчеты для контроля остатков и понимания текущего состояния", en: "reports for stock visibility and current state control" },
      { ru: "понятное оформление проекта для просмотра на GitHub", en: "clear project presentation for GitHub review" },
    ],
    challenge: {
      ru: "Сделать учебный проект не набором экранов, а моделью понятного учета: какие сущности нужны, как проходит заказ и какие данные должен видеть владелец.",
      en: "Make the learning project more than a set of screens: define entities, order flow and the data a business owner needs to see.",
    },
    solution: {
      ru: "Проект строится вокруг номенклатуры, клиентов, заказов, складских операций и отчетов. Логика подается так, чтобы было видно назначение каждого объекта.",
      en: "The project is built around products, customers, orders, stock operations and reports, with each object tied to its business purpose.",
    },
    result: {
      ru: "Получается портфолио-кейс, который демонстрирует работу с учетной логикой, структурой данных и базовыми объектами 1C.",
      en: "The result is a portfolio case that demonstrates accounting logic, data structure and core 1C objects.",
    },
    nextSteps: [
      { ru: "добавить скриншоты форм и отчетов", en: "add screenshots of forms and reports" },
      { ru: "оформить схему объектов конфигурации", en: "document the configuration object diagram" },
      { ru: "подготовить README с бизнес-сценарием", en: "prepare a README with the business scenario" },
    ],
    githubUrl,
    detailsUrl: "/projects/orders-stock",
  },
  {
    slug: "navidu-agency-website",
    title: { ru: "NAVIDU: дизайн и доработка сайта маркетингового агентства", en: "NAVIDU: Marketing Agency Website Design and Updates" },
    shortTitle: { ru: "NAVIDU / сайт агентства", en: "NAVIDU agency website" },
    description: {
      ru: "Кейс из рабочего digital-опыта: дизайн главной страницы и страницы отзывов для сайта маркетингового агентства, работа с WordPress, контентные правки и анализ конкурентов.",
      en: "A real digital-work case: homepage and testimonials page design for a marketing agency website, WordPress implementation, content updates and competitor research.",
    },
    summary: {
      ru: "Я участвовал в развитии сайта маркетингового агентства NAVIDU: собирал референсы, анализировал конкурентов, проектировал визуальную подачу главной страницы, делал страницу отзывов и вносил правки на сайте через WordPress.",
      en: "I contributed to the NAVIDU marketing agency website: researched references and competitors, designed the homepage direction, created the testimonials page and made WordPress content updates.",
    },
    stack: ["WordPress", "Web design", "HTML/CSS", "Competitor analysis", "Content updates", "UX"],
    highlights: [
      { ru: "дизайн главной страницы сайта маркетингового агентства", en: "homepage design for a marketing agency website" },
      { ru: "дизайн и реализация страницы отзывов на WordPress", en: "design and WordPress implementation of the testimonials page" },
      { ru: "поиск референсов и анализ конкурентов перед визуальными решениями", en: "reference research and competitor analysis before visual decisions" },
      { ru: "небольшие правки цен, текстов и блоков на действующем сайте", en: "small price, copy and section updates on a live website" },
    ],
    challenge: {
      ru: "Нужно было помочь сайту агентства выглядеть понятнее и убедительнее для клиентов: показать услуги, стиль, доверие и реальные отзывы без ощущения шаблонного корпоративного сайта.",
      en: "The task was to make the agency website clearer and more convincing for clients: services, visual style, trust and real testimonials without a generic corporate feel.",
    },
    solution: {
      ru: "Я работал с визуальной структурой главной страницы, собирал и сравнивал референсы, смотрел сайты конкурентов, подготавливал решения для подачи агентства и отдельно занимался страницей отзывов: дизайном, версткой/кодом и интеграцией в WordPress.",
      en: "I worked on the homepage visual structure, collected and compared references, reviewed competitor websites, prepared presentation ideas for the agency and handled the testimonials page: design, code and WordPress integration.",
    },
    result: {
      ru: "Получился реальный коммерческий кейс, где дизайн связан не только с внешним видом, но и с задачами бизнеса: доверие, понятные услуги, социальное доказательство и возможность быстро обновлять контент на сайте.",
      en: "The result is a real commercial case where design connects to business goals: trust, clear services, social proof and the ability to update website content quickly.",
    },
    nextSteps: [
      { ru: "добавить больше скриншотов отдельных блоков и мобильной версии", en: "add more screenshots of individual blocks and mobile layouts" },
      { ru: "описать, какие решения были приняты после анализа конкурентов", en: "describe which decisions came from competitor analysis" },
      { ru: "добавить короткое видео-превью после отдельной оптимизации mp4", en: "add a short video preview after separate mp4 optimization" },
    ],
    projectUrl: "https://marketingwedo.ru/",
    detailsUrl: "/projects/navidu-agency-website",
    previewImage: "/projects/navidu/main.jpg",
    gallery: [
      {
        src: "/projects/navidu/main.jpg",
        alt: { ru: "Главный экран сайта NAVIDU", en: "NAVIDU homepage hero screen" },
      },
      {
        src: "/projects/navidu/home.jpg",
        alt: { ru: "Дизайн главной страницы маркетингового агентства", en: "Marketing agency homepage design" },
      },
      {
        src: "/projects/navidu/reviews.jpg",
        alt: { ru: "Страница отзывов клиентов NAVIDU", en: "NAVIDU client testimonials page" },
      },
    ],
  },
  {
    slug: "portfolio-website",
    title: { ru: "Личный сайт-портфолио с интерактивным интерфейсом", en: "Personal Portfolio Website with Interactive UI" },
    shortTitle: { ru: "Сайт-портфолио", en: "Portfolio website" },
    description: {
      ru: "Этот сайт как отдельный проект: React, TypeScript, Tailwind, анимации, WebGL-фон, адаптивность и структура под развитие личного бренда.",
      en: "This website as a standalone project: React, TypeScript, Tailwind, animations, WebGL background, responsive layout and personal-brand structure.",
    },
    summary: {
      ru: "Кейс показывает web-навыки, визуальную подачу, работу с анимациями и умение собрать портфолио как продукт.",
      en: "This case shows web skills, visual presentation, animation work and the ability to shape a portfolio as a product.",
    },
    stack: ["React", "TypeScript", "Vite", "Tailwind CSS", "Framer Motion", "Three.js"],
    highlights: [
      { ru: "структура страниц, секций и данных для RU/EN-контента", en: "page, section and data structure for RU/EN content" },
      { ru: "анимированные переходы, появление блоков и интерактивные карточки", en: "animated transitions, section reveals and interactive cards" },
      { ru: "темная визуальная система с WebGL-фоном и адаптивной версткой", en: "dark visual system with WebGL background and responsive layout" },
      { ru: "готовность к публикации на GitHub Pages", en: "ready for GitHub Pages deployment" },
    ],
    challenge: {
      ru: "Сделать сайт не похожим на обычное резюме: показать проекты, навыки, стиль и техническую аккуратность в одном интерфейсе.",
      en: "Make the website feel unlike a plain resume: show projects, skills, style and technical care in one interface.",
    },
    solution: {
      ru: "Сайт собран как статическое React-приложение с данными в отдельных файлах, роутингом, плавными переходами, карточками проектов и GitHub Pages workflow.",
      en: "The site is built as a static React app with separated data files, routing, smooth transitions, project cards and a GitHub Pages workflow.",
    },
    result: {
      ru: "Получился рабочий сайт, который можно развивать: добавлять страницы проектов, менять тексты, обновлять визуал и публиковать новые версии.",
      en: "The result is a working website that can grow: project pages, copy updates, visual changes and new published versions.",
    },
    nextSteps: [
      { ru: "добавить подробные страницы с реальными материалами проектов", en: "add detailed pages with real project materials" },
      { ru: "добавить скриншоты и ссылки на репозитории", en: "add screenshots and repository links" },
      { ru: "оптимизировать тяжелые WebGL-чанки", en: "optimize heavy WebGL chunks" },
    ],
    githubUrl,
    detailsUrl: "/projects/portfolio-website",
  },
  {
    slug: "web-design",
    title: { ru: "Сайты и дизайн для малого бизнеса", en: "Websites and Design for Small Business" },
    shortTitle: { ru: "Web и дизайн", en: "Web and design" },
    description: {
      ru: "Работы и задачи из digital-опыта: сайты, адаптивная верстка, дизайн-макеты, объявления и продвижение. Этот блок показывает понимание интерфейса и клиентского пути.",
      en: "Work from my digital background: websites, responsive layout, design layouts, listings and promotion. This section shows understanding of interfaces and customer journeys.",
    },
    summary: {
      ru: "Кейс показывает понимание визуальной подачи, клиентского пути и задач малого бизнеса.",
      en: "This case shows understanding of visual presentation, customer journey and small-business tasks.",
    },
    stack: ["HTML", "CSS", "Design", "Adaptive layout", "Yandex", "Avito"],
    highlights: [
      { ru: "визуальная подача продукта и понятная структура страницы", en: "visual product presentation and clear page structure" },
      { ru: "опыт работы с заявками, объявлениями и задачами клиентов", en: "experience with leads, listings and client tasks" },
      { ru: "понимание, где автоматизация может снять ручную работу", en: "understanding where automation can reduce manual work" },
      { ru: "связь дизайна, контента и бизнес-результата", en: "connection between design, content and business result" },
    ],
    challenge: {
      ru: "У малого бизнеса часто нет времени на сложные интерфейсы: нужно быстро показать предложение, собрать заявку и не потерять клиента.",
      en: "Small businesses often do not have time for complex interfaces: the offer must be clear, leads must be captured and customers should not be lost.",
    },
    solution: {
      ru: "Digital-опыт помогает проектировать страницы и материалы вокруг задачи: кто пользователь, что он ищет и какое действие должен сделать.",
      en: "Digital experience helps shape pages and materials around the task: who the user is, what they need and what action they should take.",
    },
    result: {
      ru: "Этот опыт усиливает 1C-направление: проще понимать, какие процессы у бизнеса болят и где нужна понятная автоматизация.",
      en: "This experience strengthens the 1C direction: it is easier to understand painful business processes and where clear automation is needed.",
    },
    nextSteps: [
      { ru: "собрать примеры макетов и страниц", en: "collect examples of layouts and pages" },
      { ru: "описать задачи, которые решал каждый материал", en: "describe the task solved by each material" },
      { ru: "добавить визуальные превью в карточки", en: "add visual previews to cards" },
    ],
    githubUrl,
    detailsUrl: "/projects/web-design",
  },
];

export function getProjectBySlug(slug: string | undefined) {
  return projects.find((project) => project.slug === slug);
}

export function getAdjacentProjects(slug: string | undefined) {
  const index = projects.findIndex((project) => project.slug === slug);
  if (index === -1) {
    return { previous: undefined, next: undefined };
  }

  return {
    previous: projects[(index - 1 + projects.length) % projects.length],
    next: projects[(index + 1) % projects.length],
  };
}

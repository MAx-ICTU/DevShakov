import type { Locale, NavItem } from "../types";

export const locales: Locale[] = ["ru", "en"];

export const githubUrl = "https://github.com/MAx-ICTU";

export const contactLinks = {
  telegram: "https://t.me/Maksim_Shakov",
  telegramLabel: "@Maksim_Shakov",
  email: "maksim.ushakov02@mail.ru",
  github: githubUrl,
};

export const navItems: NavItem[] = [
  { id: "about", label: { ru: "Обо мне", en: "About" } },
  { id: "skills", label: { ru: "Навыки", en: "Skills" } },
  { id: "projects", label: { ru: "Проекты", en: "Projects" } },
  { id: "roadmap", label: { ru: "Roadmap", en: "Roadmap" } },
  { id: "contact", label: { ru: "Контакты", en: "Contact" } },
];

export const ui = {
  logo: "MAx / 1C",
  contact: { ru: "Связаться", en: "Contact" },
  menu: { ru: "Меню", en: "Menu" },
  close: { ru: "Закрыть", en: "Close" },
  viewProjects: { ru: "Посмотреть проекты", en: "View projects" },
  github: { ru: "GitHub", en: "GitHub" },
  details: { ru: "Подробнее", en: "Details" },
  downloadResume: { ru: "Скачать резюме PDF", en: "Download resume PDF" },
  sendEmail: { ru: "Написать на email", en: "Send email" },
  openTelegram: { ru: "Telegram", en: "Telegram" },
  projectStack: { ru: "Стек", en: "Stack" },
  projectLearned: { ru: "Что показывает", en: "What it shows" },
  formName: { ru: "Имя", en: "Name" },
  formMessage: { ru: "Сообщение", en: "Message" },
  formSubmit: { ru: "Открыть письмо", en: "Open email" },
};

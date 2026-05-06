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
  { id: "about", label: { ru: "РћР±Рѕ РјРЅРµ", en: "About" } },
  { id: "skills", label: { ru: "РќР°РІС‹РєРё", en: "Skills" } },
  { id: "projects", label: { ru: "РџСЂРѕРµРєС‚С‹", en: "Projects" } },
  { id: "roadmap", label: { ru: "Roadmap", en: "Roadmap" } },
  { id: "contact", label: { ru: "РљРѕРЅС‚Р°РєС‚С‹", en: "Contact" } },
];

export const ui = {
  logo: "MAx / 1C",
  contact: { ru: "РЎРІСЏР·Р°С‚СЊСЃСЏ", en: "Contact" },
  menu: { ru: "РњРµРЅСЋ", en: "Menu" },
  close: { ru: "Р—Р°РєСЂС‹С‚СЊ", en: "Close" },
  viewProjects: { ru: "РџРѕСЃРјРѕС‚СЂРµС‚СЊ РїСЂРѕРµРєС‚С‹", en: "View projects" },
  github: { ru: "GitHub", en: "GitHub" },
  details: { ru: "РџРѕРґСЂРѕР±РЅРµРµ", en: "Details" },
  downloadResume: { ru: "РЎРєР°С‡Р°С‚СЊ СЂРµР·СЋРјРµ PDF", en: "Download resume PDF" },
  sendEmail: { ru: "РќР°РїРёСЃР°С‚СЊ РЅР° email", en: "Send email" },
  openTelegram: { ru: "Telegram", en: "Telegram" },
  projectStack: { ru: "РЎС‚РµРє", en: "Stack" },
  projectLearned: { ru: "Р§С‚Рѕ РїРѕРєР°Р·С‹РІР°РµС‚", en: "What it shows" },
  formName: { ru: "РРјСЏ", en: "Name" },
  formMessage: { ru: "РЎРѕРѕР±С‰РµРЅРёРµ", en: "Message" },
  formSubmit: { ru: "РћС‚РєСЂС‹С‚СЊ РїРёСЃСЊРјРѕ", en: "Open email" },
};

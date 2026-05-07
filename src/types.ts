export type Locale = "ru" | "en";

export type LocalizedString = Record<Locale, string>;

export type NavItem = {
  id: string;
  label: LocalizedString;
};

export type SkillGroup = {
  title: LocalizedString;
  description: LocalizedString;
  skills: string[];
};

export type Project = {
  slug: string;
  title: LocalizedString;
  shortTitle?: LocalizedString;
  description: LocalizedString;
  summary: LocalizedString;
  stack: string[];
  highlights: LocalizedString[];
  challenge: LocalizedString;
  solution: LocalizedString;
  result: LocalizedString;
  nextSteps: LocalizedString[];
  githubUrl?: string;
  detailsUrl?: string;
};

export type RoadmapItem = {
  date: LocalizedString;
  title: LocalizedString;
  description: LocalizedString;
  status: "done" | "active" | "next";
};

export type LearningItem = {
  title: LocalizedString;
  description: LocalizedString;
};

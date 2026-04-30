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
  title: LocalizedString;
  description: LocalizedString;
  stack: string[];
  highlights: LocalizedString[];
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

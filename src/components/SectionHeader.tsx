import type { LocalizedString, Locale } from "../types";

type SectionHeaderProps = {
  eyebrow: LocalizedString;
  title: LocalizedString;
  locale: Locale;
  align?: "left" | "center";
};

export function SectionHeader({ eyebrow, title, locale, align = "left" }: SectionHeaderProps) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-cyan">{eyebrow[locale]}</p>
      <h2 className="font-display text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">{title[locale]}</h2>
    </div>
  );
}

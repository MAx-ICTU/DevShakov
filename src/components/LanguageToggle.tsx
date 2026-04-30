import type { Locale } from "../types";

type LanguageToggleProps = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
};

export function LanguageToggle({ locale, setLocale }: LanguageToggleProps) {
  return (
    <div className="grid grid-cols-2 gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
      {(["ru", "en"] as Locale[]).map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => setLocale(item)}
          className={`transition ${
            locale === item ? "text-cyan" : "hover:text-white"
          }`}
          aria-pressed={locale === item}
        >
          {item.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

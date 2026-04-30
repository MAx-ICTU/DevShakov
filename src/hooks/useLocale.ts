import { useEffect, useMemo, useState } from "react";
import type { Locale, LocalizedString } from "../types";

const storageKey = "portfolio-locale";

export function useLocale() {
  const [locale, setLocale] = useState<Locale>(() => {
    const saved = localStorage.getItem(storageKey);
    return saved === "en" || saved === "ru" ? saved : "ru";
  });

  useEffect(() => {
    localStorage.setItem(storageKey, locale);
    document.documentElement.lang = locale;
  }, [locale]);

  return useMemo(
    () => ({
      locale,
      setLocale,
      t: (value: LocalizedString) => value[locale],
    }),
    [locale],
  );
}

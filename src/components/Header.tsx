import { useState } from "react";
import { motion } from "framer-motion";
import { AnimatedLink, PlainRouteLink } from "./AnimatedLink";
import { AudioToggle } from "./AudioToggle";
import { Container } from "./Container";
import { LanguageToggle } from "./LanguageToggle";
import { ScrambleText } from "./ScrambleText";
import { ui } from "../data/site";
import type { Locale } from "../types";

type HeaderProps = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
};

const navItems = [
  { to: "/", label: "HOME" },
  { to: "/projects", label: "PROJECTS" },
  { to: "/about", label: "ABOUT" },
  { to: "/contact", label: "CONTACT" },
];

export function Header({ locale, setLocale }: HeaderProps) {
  const [open, setOpen] = useState(false);

  const nav = (
    <>
      {navItems.map((item) => (
        <AnimatedLink
          key={item.to}
          to={item.to}
          className="nav-link text-sm text-slate-300 transition hover:text-white"
          onNavigate={() => setOpen(false)}
        >
          <ScrambleText text={item.label} />
        </AnimatedLink>
      ))}
    </>
  );

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-ink/24 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-4">
        <PlainRouteLink
          to="/"
          className="group flex items-center font-display text-sm font-bold uppercase tracking-[0.22em] text-white"
          aria-label="Go to home page"
        >
          <ScrambleText text={ui.logo} />
        </PlainRouteLink>
        <nav className="hidden items-center gap-7 font-mono uppercase tracking-[0.12em] lg:flex">{nav}</nav>
        <div className="hidden items-center gap-3 sm:flex">
          <AudioToggle locale={locale} />
          <LanguageToggle locale={locale} setLocale={setLocale} />
        </div>
        <button
          type="button"
          className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-white sm:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
        >
          {open ? ui.close[locale] : ui.menu[locale]}
        </button>
      </Container>
      {open && (
        <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} className="bg-ink/96 px-5 py-5 sm:hidden">
          <nav className="grid gap-4">{nav}</nav>
          <div className="mt-5">
            <AudioToggle locale={locale} />
          </div>
          <div className="mt-4">
            <LanguageToggle locale={locale} setLocale={setLocale} />
          </div>
        </motion.div>
      )}
    </header>
  );
}

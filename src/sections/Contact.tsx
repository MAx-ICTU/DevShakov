import { useState } from "react";
import { Container } from "../components/Container";
import { Reveal } from "../components/Reveal";
import { SectionHeader } from "../components/SectionHeader";
import { content } from "../data/content";
import { contactLinks, ui } from "../data/site";
import type { Locale } from "../types";

type ContactProps = {
  locale: Locale;
};

export function Contact({ locale }: ContactProps) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const subject = encodeURIComponent(locale === "ru" ? "Контакт с сайта-портфолио" : "Portfolio website contact");
    const body = encodeURIComponent(`${name}\n\n${message}`);
    window.location.href = `mailto:${contactLinks.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <SectionHeader eyebrow={content.contact.eyebrow} title={content.contact.title} locale={locale} />
            <p className="mt-6 text-lg leading-8 text-slate-300">{content.contact.body[locale]}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={contactLinks.telegram} target="_blank" rel="noreferrer" className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-white transition hover:text-cyan">
                {ui.openTelegram[locale]}
              </a>
              <a href={`mailto:${contactLinks.email}`} className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-white transition hover:text-cyan">
                {ui.sendEmail[locale]}
              </a>
              <a href={contactLinks.github} target="_blank" rel="noreferrer" className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-white transition hover:text-cyan">
                GitHub
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <form onSubmit={submit} className="bg-white/[0.035] p-6">
              <label className="block">
                <span className="text-sm font-semibold text-slate-300">{ui.formName[locale]}</span>
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="mt-2 w-full bg-ink/70 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:bg-ink"
                  placeholder={locale === "ru" ? "Ваше имя" : "Your name"}
                />
              </label>
              <label className="mt-5 block">
                <span className="text-sm font-semibold text-slate-300">{ui.formMessage[locale]}</span>
                <textarea
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  rows={6}
                  className="mt-2 w-full resize-none bg-ink/70 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:bg-ink"
                  placeholder={locale === "ru" ? "Коротко опишите задачу или вакансию" : "Briefly describe the role or task"}
                />
              </label>
              <button type="submit" className="mt-6 w-full bg-cyan px-6 py-3 text-sm font-bold text-ink transition hover:bg-lime">
                {ui.formSubmit[locale]}
              </button>
            </form>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

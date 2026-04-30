import { motion } from "framer-motion";
import { ExternalLink, Mail, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PageTransition } from "../components/animations/PageTransition";
import { SplitTextReveal } from "../components/animations/SplitTextReveal";
import { TextParticleTrail } from "../components/particles/TextParticleTrail";
import { contactLinks } from "../data/site";
import type { Locale } from "../types";

type ContactPageProps = {
  locale: Locale;
};

const contactItems = [
  { label: "EMAIL", value: contactLinks.email, href: `mailto:${contactLinks.email}`, icon: Mail },
  { label: "TELEGRAM", value: "Telegram", href: contactLinks.telegram, icon: Send },
  { label: "GITHUB", value: "MAx-ICTU", href: contactLinks.github, icon: ExternalLink },
  { label: "LINKEDIN", value: "Add LinkedIn profile", href: "https://www.linkedin.com/", icon: ExternalLink },
];

const easing = [0.22, 1, 0.36, 1] as const;

export function ContactPage({ locale }: ContactPageProps) {
  const navigate = useNavigate();

  return (
    <PageTransition className="relative z-10 min-h-screen overflow-x-hidden">
      <section data-scroll-section className="min-h-screen px-5 pb-16 pt-28 sm:px-8 lg:px-14">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-12">
          <header className="min-w-0">
            <p className="mb-7 font-mono text-xs font-bold uppercase tracking-[0.28em] text-cyan">
              [ contact route ]
            </p>
            <TextParticleTrail as="div" intensity={1.1} className="block w-fit max-w-full">
              <h1 className="max-w-[10ch] break-words font-display text-[clamp(3rem,10vw,6.6rem)] font-semibold leading-[0.88] text-white text-glow sm:max-w-none">
                <SplitTextReveal text="CONTACT" />
                <span className="block">
                  <SplitTextReveal text="INFORMATION" delay={0.08} />
                </span>
              </h1>
            </TextParticleTrail>
          </header>

          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.78fr)_minmax(18rem,0.62fr)] lg:items-start">
            <motion.div
              className="max-w-2xl"
              initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.72, delay: 0.22, ease: easing }}
            >
              <p className="font-display text-[clamp(2.2rem,5vw,4.7rem)] font-semibold leading-none text-white">
                Get in contact
              </p>
              <p className="mt-5 max-w-xl text-base font-semibold leading-7 text-white/72 sm:text-lg">
                {locale === "ru"
                  ? "Открыт к стажировке, junior-позиции, практической задаче или разговору о 1C, автоматизации и digital-проектах."
                  : "Open to internships, junior roles, practical tasks or a conversation about 1C, automation and digital projects."}
              </p>
              <motion.button
                type="button"
                onClick={() => navigate("/")}
                className="mt-10 font-mono text-xs font-bold uppercase tracking-[0.18em] text-white/78 transition hover:text-cyan"
                whileHover={{ x: -4 }}
                whileTap={{ scale: 0.98 }}
              >
                ↵ BACK HOME
              </motion.button>
            </motion.div>

            <div className="grid min-w-0 gap-3">
              {contactItems.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                  className="group grid min-w-0 gap-3 bg-white/[0.035] px-5 py-4 transition hover:bg-white/[0.07] sm:grid-cols-[9rem_minmax(0,1fr)] sm:items-center"
                  initial={{ opacity: 0, y: 26, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.58, delay: 0.34 + index * 0.08, ease: easing }}
                >
                  <span className="inline-flex items-center gap-3 font-mono text-xs font-bold uppercase tracking-[0.22em] text-white/48">
                    <item.icon size={15} strokeWidth={1.8} />
                    <span>{item.label}</span>
                  </span>
                  <span className="min-w-0 break-words text-left text-sm font-semibold text-white transition group-hover:text-cyan sm:text-right">
                    {item.value}
                  </span>
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}

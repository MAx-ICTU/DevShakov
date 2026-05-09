import { Suspense, lazy, useEffect } from "react";
import { Leva } from "leva";
import { AnimatePresence } from "framer-motion";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Header } from "./components/Header";
import { AmbientBackdrop } from "./components/AmbientBackdrop";
import { CursorAura } from "./components/CursorAura";
import { IntroCurtain } from "./components/IntroCurtain";
import { TransitionProvider } from "./components/transitions/TransitionProvider";
import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";
import { HomePage } from "./pages/HomePage";
import { ProjectDetailPage } from "./pages/ProjectDetailPage";
import { ProjectsPage } from "./pages/ProjectsPage";
import { useLocale } from "./hooks/useLocale";
import { useShouldUseHeavyEffects } from "./hooks/useDevicePerformance";
import { useGsapAmbientMotion } from "./hooks/useGsapAmbientMotion";
import { useLenis } from "./hooks/useLenis";
import { useScrollTriggerAnimations } from "./hooks/useScrollTriggerAnimations";

const BackgroundScene = lazy(() =>
  import("./components/webgl/WebGLBackground").then((module) => ({
    default: module.WebGLBackground,
  })),
);

type AnimatedRoutesProps = {
  locale: "ru" | "en";
};

function AnimatedRoutes({ locale }: AnimatedRoutesProps) {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      window.setTimeout(() => {
        document.getElementById(location.hash.slice(1))?.scrollIntoView();
      }, 120);
      return;
    }

    window.scrollTo({ top: 0, left: 0 });
    window.setTimeout(() => ScrollTrigger.refresh(), 180);
  }, [location.pathname, location.hash]);

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage locale={locale} />} />
        <Route path="/projects" element={<ProjectsPage locale={locale} />} />
        <Route path="/projects/:slug" element={<ProjectDetailPage locale={locale} />} />
        <Route path="/about" element={<AboutPage locale={locale} />} />
        <Route path="/contact" element={<ContactPage locale={locale} />} />
      </Routes>
    </AnimatePresence>
  );
}

function PortfolioApp() {
  const { locale, setLocale } = useLocale();
  const shouldUseHeavyEffects = useShouldUseHeavyEffects();
  useLenis();
  useGsapAmbientMotion();
  useScrollTriggerAnimations();

  return (
    <div className="min-h-screen bg-ink text-white">
      <TransitionProvider>
        <Leva hidden={!import.meta.env.DEV} collapsed />
        <IntroCurtain />
        {shouldUseHeavyEffects ? (
          <Suspense fallback={<div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_62%_36%,rgba(61,215,255,0.07),transparent_28rem),#050505]" aria-hidden="true" />}>
            <BackgroundScene />
          </Suspense>
        ) : (
          <div
            className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_62%_34%,rgba(61,215,255,0.055),transparent_20rem),radial-gradient(circle_at_20%_18%,rgba(255,255,255,0.018),transparent_14rem),#050505]"
            aria-hidden="true"
          />
        )}
        <AmbientBackdrop />
        <CursorAura />
        <Header locale={locale} setLocale={setLocale} />
        <main className="relative z-10 min-h-screen" data-depth-scene>
          <AnimatedRoutes locale={locale} />
        </main>
        <footer className="relative z-10 px-5 py-8 text-center text-sm text-slate-500">
          <p>MAx / 1C Developer Portfolio / 2026</p>
        </footer>
      </TransitionProvider>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <PortfolioApp />
    </BrowserRouter>
  );
}

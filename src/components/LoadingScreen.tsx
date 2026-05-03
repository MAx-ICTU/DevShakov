import { AnimatePresence, motion } from "framer-motion";
import type { MouseEvent } from "react";
import { useEffect, useState } from "react";
import { playInterfaceBurst } from "../utils/mojsEffects";

type Stage = "idle" | "loading" | "ready";

const particles = Array.from({ length: 30 }, (_, index) => index);
const scanLines = ["booting interface", "warming webgl scene", "syncing routes", "loading audio", "ready for launch"];
const glyphs = ["1C", "SQL", "WEB", "API", "BOT", "DATA"];
const bars = Array.from({ length: 16 }, (_, index) => index);

export function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [stage, setStage] = useState<Stage>("idle");
  const [progress, setProgress] = useState(0);
  const percent = progress.toString().padStart(3, "0");

  useEffect(() => {
    if (!visible) return undefined;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [visible]);

  useEffect(() => {
    if (stage !== "loading") return undefined;

    const startedAt = performance.now();
    const duration = 4400;
    let frame = 0;

    const tick = (time: number) => {
      const elapsed = time - startedAt;
      const raw = Math.min(1, elapsed / duration);
      const eased = 1 - (1 - raw) ** 3;
      const nextProgress = Math.min(100, Math.round(eased * 100));

      setProgress(nextProgress);

      if (raw < 1) {
        frame = window.requestAnimationFrame(tick);
      } else {
        setStage("ready");
      }
    };

    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [stage]);

  const playBurst = (event: MouseEvent<HTMLElement>) => {
    playInterfaceBurst({ x: event.clientX, y: event.clientY });
  };

  const startLoading = (event: MouseEvent<HTMLButtonElement>) => {
    playBurst(event);
    window.dispatchEvent(new CustomEvent("portfolio-audio-play"));
    setProgress(0);
    setStage("loading");
  };

  const openSite = (event: MouseEvent<HTMLButtonElement>) => {
    if (stage !== "ready") return;
    playBurst(event);
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[120] overflow-hidden bg-[#050505]"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.08,
            filter: "blur(18px)",
            transition: { duration: 1.05, ease: [0.22, 1, 0.36, 1] },
          }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_48%_42%,rgba(61,215,255,0.075),transparent_22rem),radial-gradient(circle_at_18%_70%,rgba(255,255,255,0.035),transparent_18rem)]" />

          <motion.div
            className="absolute left-1/2 top-1/2 h-[92vmin] w-[92vmin] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan/[0.035]"
            animate={{ scale: [0.88, 1.04, 0.88], rotate: 360 }}
            transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute left-1/2 top-1/2 h-[58vmin] w-[58vmin] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.035]"
            animate={{ scale: [1.12, 0.92, 1.12], rotate: -360 }}
            transition={{ duration: 13, repeat: Infinity, ease: "linear" }}
          />

          {particles.map((item) => (
            <motion.span
              key={item}
              className="absolute h-1 w-1 bg-cyan/55 shadow-[0_0_14px_rgba(61,215,255,0.58)]"
              style={{
                left: `${5 + ((item * 29) % 90)}%`,
                top: `${7 + ((item * 47) % 84)}%`,
                borderRadius: item % 3 === 0 ? "0" : "9999px",
              }}
              animate={{
                opacity: stage === "idle" ? [0.08, 0.34, 0.08] : [0.12, 0.88, 0.12],
                y: [0, -24 - (item % 7) * 3, 0],
                x: [0, (item % 2 === 0 ? 1 : -1) * (8 + (item % 5) * 3), 0],
                scale: [0.6, 1.18, 0.6],
              }}
              transition={{ duration: 2.1 + (item % 6) * 0.28, repeat: Infinity, delay: item * 0.045, ease: "easeInOut" }}
            />
          ))}

          {glyphs.map((glyph, index) => (
            <motion.div
              key={glyph}
              className="absolute hidden font-mono text-xs font-bold uppercase tracking-[0.3em] text-cyan/24 sm:block"
              style={{
                left: `${12 + ((index * 17) % 72)}%`,
                top: `${18 + ((index * 23) % 58)}%`,
              }}
              animate={{ opacity: [0.08, 0.38, 0.08], filter: ["blur(0px)", "blur(1px)", "blur(0px)"] }}
              transition={{ duration: 2.8 + index * 0.22, repeat: Infinity, ease: "easeInOut" }}
            >
              {glyph}
            </motion.div>
          ))}

          <div className="absolute bottom-[10%] left-1/2 hidden w-[min(52rem,80vw)] -translate-x-1/2 items-end justify-between gap-2 opacity-40 sm:flex">
            {bars.map((bar) => (
              <motion.span
                key={bar}
                className="block w-px bg-cyan/30"
                animate={{ height: [10, 38 + (bar % 5) * 10, 10], opacity: [0.18, 0.62, 0.18] }}
                transition={{ duration: 1.1 + (bar % 4) * 0.18, repeat: Infinity, delay: bar * 0.05, ease: "easeInOut" }}
              />
            ))}
          </div>

          <div className="absolute left-1/2 top-1/2 w-[min(46rem,86vw)] -translate-x-1/2 -translate-y-1/2">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65 }}
              className="text-center"
            >
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.34em] text-cyan/72">
                [ portfolio entry ]
              </p>

              <AnimatePresence mode="wait">
                {stage === "idle" && (
                  <motion.button
                    key="start"
                    type="button"
                    onClick={startLoading}
                    className="group mt-8 inline-flex items-center gap-4 font-display text-[clamp(3.4rem,13vw,8rem)] font-semibold leading-none text-white text-glow transition hover:text-cyan"
                    initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -18, filter: "blur(10px)" }}
                    whileHover={{ scale: 1.015 }}
                    whileTap={{ scale: 0.985 }}
                  >
                    Запускаем?
                    <span className="font-mono text-[0.2em] tracking-[0.2em] transition group-hover:translate-x-2">↗</span>
                  </motion.button>
                )}

                {stage !== "idle" && (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -18, filter: "blur(10px)" }}
                  >
                    <p className="mt-7 font-display text-[clamp(3.4rem,14vw,8.4rem)] font-semibold leading-none text-white text-glow">
                      {percent}%
                    </p>
                    <div className="mx-auto mt-7 h-px w-full overflow-hidden bg-white/10">
                      <motion.div className="h-full bg-cyan shadow-[0_0_18px_rgba(61,215,255,0.85)]" style={{ width: `${progress}%` }} />
                    </div>
                    <div className="mt-5 grid gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-white/36">
                      {scanLines.map((line, index) => (
                        <motion.span
                          key={line}
                          animate={{ opacity: stage === "ready" ? 0.2 : [0.18, 0.68, 0.18] }}
                          transition={{ duration: 0.7, repeat: stage === "ready" ? 0 : Infinity, delay: index * 0.1 }}
                        >
                          {line}
                        </motion.span>
                      ))}
                    </div>

                    <AnimatePresence>
                      {stage === "ready" && (
                        <motion.button
                          type="button"
                          onClick={openSite}
                          className="group mt-10 inline-flex items-center gap-4 font-display text-[clamp(2.8rem,10vw,6.2rem)] font-semibold leading-none text-white transition hover:text-cyan"
                          initial={{ opacity: 0, y: 18, filter: "blur(12px)" }}
                          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                          exit={{ opacity: 0 }}
                          whileHover={{ scale: 1.015 }}
                          whileTap={{ scale: 0.985 }}
                        >
                          Открыть сайт
                          <span className="font-mono text-[0.22em] transition group-hover:translate-x-2 group-hover:-translate-y-2">↗</span>
                        </motion.button>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

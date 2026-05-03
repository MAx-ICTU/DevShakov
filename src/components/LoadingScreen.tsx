import { AnimatePresence, motion } from "framer-motion";
import type { MouseEvent } from "react";
import { useEffect, useState } from "react";
import { playInterfaceBurst } from "../utils/mojsEffects";

type Stage = "idle" | "loading" | "launching";

const particles = Array.from({ length: 34 }, (_, index) => index);
const tunnelParticles = Array.from({ length: 54 }, (_, index) => index);
const scanLines = [
  "booting interface",
  "warming webgl scene",
  "syncing routes",
  "loading audio",
  "assembling hero particles",
  "ready for launch",
];
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
    const duration = 14000;
    let frame = 0;

    const tick = (time: number) => {
      const elapsed = time - startedAt;
      const raw = Math.min(1, elapsed / duration);
      const eased = raw < 0.75 ? 1 - (1 - raw) ** 2 : raw;
      const nextProgress = Math.min(100, Math.round(eased * 100));

      setProgress(nextProgress);

      if (raw < 1) {
        frame = window.requestAnimationFrame(tick);
      } else {
        setProgress(100);
        setStage("launching");
      }
    };

    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [stage]);

  useEffect(() => {
    if (stage !== "launching") return undefined;

    window.dispatchEvent(new CustomEvent("portfolio-transition-boost", { detail: 1 }));

    const hideTimer = window.setTimeout(() => {
      setVisible(false);
    }, 1650);

    const resetTimer = window.setTimeout(() => {
      window.dispatchEvent(new CustomEvent("portfolio-transition-boost", { detail: 0 }));
    }, 2600);

    return () => {
      window.clearTimeout(hideTimer);
      window.clearTimeout(resetTimer);
      window.dispatchEvent(new CustomEvent("portfolio-transition-boost", { detail: 0 }));
    };
  }, [stage]);

  const playBurst = (event: MouseEvent<HTMLElement>) => {
    playInterfaceBurst({ x: event.clientX, y: event.clientY });
  };

  const startLoading = (event: MouseEvent<HTMLButtonElement>) => {
    if (stage !== "idle") return;

    playBurst(event);
    window.dispatchEvent(new CustomEvent("portfolio-audio-play"));
    setProgress(0);
    setStage("loading");
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[120] overflow-hidden bg-[#050505]"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.24,
            filter: "blur(28px)",
            transition: { duration: 1.45, ease: [0.76, 0, 0.24, 1] },
          }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_48%_42%,rgba(61,215,255,0.06),transparent_22rem),radial-gradient(circle_at_18%_70%,rgba(255,255,255,0.03),transparent_18rem)]" />

          <motion.div
            className="absolute left-1/2 top-1/2 h-[92vmin] w-[92vmin] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan/[0.03]"
            animate={
              stage === "launching"
                ? { scale: [1, 0.16], rotate: 520, opacity: [0.45, 0] }
                : { scale: [0.88, 1.04, 0.88], rotate: 360, opacity: 1 }
            }
            transition={
              stage === "launching"
                ? { duration: 1.55, ease: [0.76, 0, 0.24, 1] }
                : { duration: 16, repeat: Infinity, ease: "linear" }
            }
          />
          <motion.div
            className="absolute left-1/2 top-1/2 h-[58vmin] w-[58vmin] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.03]"
            animate={
              stage === "launching"
                ? { scale: [1.04, 0.12], rotate: -420, opacity: [0.38, 0] }
                : { scale: [1.12, 0.92, 1.12], rotate: -360, opacity: 1 }
            }
            transition={
              stage === "launching"
                ? { duration: 1.45, ease: [0.76, 0, 0.24, 1] }
                : { duration: 13, repeat: Infinity, ease: "linear" }
            }
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
              animate={
                stage === "launching"
                  ? {
                      opacity: [0.7, 0],
                      x: [0, (50 - ((item * 29) % 100)) * 8],
                      y: [0, (50 - ((item * 47) % 100)) * 8],
                      scale: [1, 0.12],
                    }
                  : {
                      opacity: stage === "idle" ? [0.08, 0.34, 0.08] : [0.12, 0.88, 0.12],
                      y: [0, -24 - (item % 7) * 3, 0],
                      x: [0, (item % 2 === 0 ? 1 : -1) * (8 + (item % 5) * 3), 0],
                      scale: [0.6, 1.18, 0.6],
                    }
              }
              transition={
                stage === "launching"
                  ? { duration: 1.4, delay: item * 0.008, ease: [0.76, 0, 0.24, 1] }
                  : { duration: 2.1 + (item % 6) * 0.28, repeat: Infinity, delay: item * 0.045, ease: "easeInOut" }
              }
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
              animate={{ opacity: stage === "launching" ? 0 : [0.08, 0.38, 0.08], filter: ["blur(0px)", "blur(1px)", "blur(0px)"] }}
              transition={{ duration: stage === "launching" ? 0.3 : 2.8 + index * 0.22, repeat: stage === "launching" ? 0 : Infinity, ease: "easeInOut" }}
            >
              {glyph}
            </motion.div>
          ))}

          <AnimatePresence>
            {stage === "launching" && (
              <motion.div
                className="pointer-events-none absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  className="absolute left-1/2 top-1/2 h-[120vmax] w-[120vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(61,215,255,0.16),rgba(61,215,255,0.045)_18%,transparent_42%)]"
                  initial={{ scale: 1.35, opacity: 0 }}
                  animate={{ scale: [1.35, 0.58, 0.2], opacity: [0, 0.78, 0] }}
                  transition={{ duration: 1.65, ease: [0.76, 0, 0.24, 1] }}
                />
                {tunnelParticles.map((item) => {
                  const angle = (item / tunnelParticles.length) * Math.PI * 2;
                  const radius = 18 + (item % 9) * 5;
                  const startX = Math.cos(angle) * radius;
                  const startY = Math.sin(angle) * radius;
                  const endX = Math.cos(angle) * (360 + (item % 7) * 42);
                  const endY = Math.sin(angle) * (260 + (item % 5) * 38);

                  return (
                    <motion.span
                      key={item}
                      className="absolute left-1/2 top-1/2 h-[3px] w-[3px] rounded-full bg-white shadow-[0_0_16px_rgba(255,255,255,0.78)]"
                      initial={{ x: startX, y: startY, opacity: 0, scale: 0.2 }}
                      animate={{ x: endX, y: endY, opacity: [0, 0.95, 0], scale: [0.2, 1.3, 0.2] }}
                      transition={{ duration: 1.48, delay: item * 0.006, ease: [0.16, 1, 0.3, 1] }}
                    />
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="absolute bottom-[10%] left-1/2 hidden w-[min(52rem,80vw)] -translate-x-1/2 items-end justify-between gap-2 opacity-40 sm:flex">
            {bars.map((bar) => (
              <motion.span
                key={bar}
                className="block w-px bg-cyan/30"
                animate={{ height: [10, 38 + (bar % 5) * 10, 10], opacity: stage === "launching" ? 0 : [0.18, 0.62, 0.18] }}
                transition={{ duration: 1.1 + (bar % 4) * 0.18, repeat: stage === "launching" ? 0 : Infinity, delay: bar * 0.05, ease: "easeInOut" }}
              />
            ))}
          </div>

          <div className="absolute left-1/2 top-1/2 w-[min(46rem,86vw)] -translate-x-1/2 -translate-y-1/2">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: stage === "launching" ? 0 : 1, y: stage === "launching" ? -34 : 0, scale: stage === "launching" ? 0.92 : 1 }}
              transition={{ duration: stage === "launching" ? 0.75 : 0.65, ease: [0.22, 1, 0.36, 1] }}
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
                    aria-label="Launch portfolio"
                    className="group mt-9 inline-flex flex-col items-center gap-6 text-white transition hover:text-cyan focus:outline-none"
                    initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -18, filter: "blur(10px)" }}
                    whileHover={{ scale: 1.025 }}
                    whileTap={{ scale: 0.96 }}
                  >
                    <span className="relative grid h-[clamp(8rem,24vw,14rem)] w-[clamp(8rem,24vw,14rem)] place-items-center rounded-full">
                      <span className="absolute inset-0 rounded-full border border-cyan/30 bg-cyan/[0.035] shadow-[0_0_70px_rgba(61,215,255,0.16)] transition duration-500 group-hover:scale-110 group-hover:border-cyan/65 group-hover:shadow-[0_0_110px_rgba(61,215,255,0.28)]" />
                      <span className="absolute inset-[14%] rounded-full border border-white/10 transition duration-500 group-hover:scale-90 group-hover:border-white/24" />
                      <motion.span
                        className="absolute inset-[24%] rounded-full border border-cyan/20"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                      />
                      <span className="relative h-[38%] w-[38%]">
                        <span className="absolute left-1/2 top-0 h-[46%] w-[12%] -translate-x-1/2 rounded-full bg-white shadow-[0_0_24px_rgba(255,255,255,0.72)] transition group-hover:bg-cyan group-hover:shadow-[0_0_30px_rgba(61,215,255,0.85)]" />
                        <span className="absolute inset-x-[12%] bottom-0 top-[22%] rounded-full border-[clamp(0.42rem,1vw,0.7rem)] border-white border-t-transparent transition group-hover:border-cyan group-hover:border-t-transparent" />
                      </span>
                    </span>
                    <span className="font-mono text-[10px] font-bold uppercase tracking-[0.34em] text-white/58 transition group-hover:tracking-[0.4em] group-hover:text-cyan">
                      Нажмите, чтобы запустить
                    </span>
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
                          animate={{ opacity: stage === "launching" ? 0.14 : [0.18, 0.68, 0.18] }}
                          transition={{ duration: 0.7, repeat: stage === "launching" ? 0 : Infinity, delay: index * 0.1 }}
                        >
                          {line}
                        </motion.span>
                      ))}
                    </div>
                    <AnimatePresence>
                      {stage === "launching" && (
                        <motion.p
                          className="mt-9 font-mono text-[10px] font-bold uppercase tracking-[0.34em] text-cyan/80"
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                        >
                          entering workspace
                        </motion.p>
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

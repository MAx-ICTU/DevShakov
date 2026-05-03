import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const ready = progress >= 100;

  useEffect(() => {
    if (!visible) return undefined;

    const startedAt = performance.now();
    const duration = 3800;
    let frame = 0;

    const tick = (time: number) => {
      const elapsed = time - startedAt;
      const raw = Math.min(1, elapsed / duration);
      const eased = 1 - (1 - raw) ** 3;
      setProgress(Math.min(100, Math.round(eased * 100)));

      if (raw < 1) {
        frame = window.requestAnimationFrame(tick);
      }
    };

    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [visible]);

  useEffect(() => {
    if (!visible) return undefined;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [visible]);

  const openSite = () => {
    if (!ready) return;
    window.dispatchEvent(new CustomEvent("portfolio-audio-play"));
    setVisible(false);
  };

  const particles = Array.from({ length: 18 }, (_, index) => index);

  const keyNodes = [
    { label: "1C", className: "left-[10%] top-[28%]" },
    { label: "SQL", className: "right-[14%] top-[34%]" },
    { label: "WEB", className: "right-[18%] bottom-[30%]" },
    { label: "AUTO", className: "left-[16%] bottom-[24%]" },
  ];

  const scanLines = Array.from({ length: 5 }, (_, index) => index);

  const percent = progress.toString().padStart(3, "0");

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[120] overflow-hidden bg-[#050505]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02, filter: "blur(10px)", transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] } }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(61,215,255,0.12),transparent_18rem),radial-gradient(circle_at_18%_70%,rgba(255,255,255,0.045),transparent_16rem)]" />
          <motion.div
            className="absolute left-1/2 top-1/2 h-[72vmin] w-[72vmin] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan/10"
            animate={{ scale: [0.82, 1.08, 0.82], rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute left-1/2 top-1/2 h-[44vmin] w-[44vmin] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/8"
            animate={{ scale: [1.18, 0.76, 1.18], rotate: -360 }}
            transition={{ duration: 6.8, repeat: Infinity, ease: "linear" }}
          />

          {particles.map((item) => (
            <motion.span
              key={item}
              className="absolute h-1 w-1 rounded-full bg-cyan/70 shadow-[0_0_16px_rgba(61,215,255,0.7)]"
              style={{
                left: `${8 + ((item * 37) % 84)}%`,
                top: `${10 + ((item * 53) % 78)}%`,
              }}
              animate={{ opacity: [0.12, 0.8, 0.12], y: [0, -18, 0], scale: [0.6, 1.15, 0.6] }}
              transition={{ duration: 2.4 + (item % 5) * 0.35, repeat: Infinity, delay: item * 0.08, ease: "easeInOut" }}
            />
          ))}

          {keyNodes.map((node) => (
            <motion.div
              key={node.label}
              className={`absolute hidden font-mono text-xs font-bold uppercase tracking-[0.28em] text-cyan/36 sm:block ${node.className}`}
              animate={{ opacity: [0.18, 0.48, 0.18], x: [0, 10, 0] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
            >
              {node.label}
            </motion.div>
          ))}

          <div className="absolute left-1/2 top-1/2 w-[min(42rem,84vw)] -translate-x-1/2 -translate-y-1/2">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="text-center"
            >
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.34em] text-cyan/80">
                [ initializing portfolio ]
              </p>
              <p className="mt-6 font-display text-[clamp(2.7rem,12vw,7.4rem)] font-semibold leading-none text-white text-glow">
                {percent}%
              </p>
              <div className="mx-auto mt-7 h-px w-full overflow-hidden bg-white/10">
                <motion.div className="h-full bg-cyan shadow-[0_0_18px_rgba(61,215,255,0.85)]" style={{ width: `${progress}%` }} />
              </div>
              <div className="mt-5 grid gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-white/36">
                {scanLines.map((line) => (
                  <motion.span
                    key={line}
                    animate={{ opacity: ready ? 0.18 : [0.18, 0.64, 0.18] }}
                    transition={{ duration: 0.7, repeat: ready ? 0 : Infinity, delay: line * 0.1 }}
                  >
                    {line === 0 && "loading assets"}
                    {line === 1 && "warming webgl scene"}
                    {line === 2 && "syncing interface"}
                    {line === 3 && "preparing audio"}
                    {line === 4 && "ready for launch"}
                  </motion.span>
                ))}
              </div>

              <AnimatePresence>
                {ready && (
                  <motion.button
                    type="button"
                    onClick={openSite}
                    className="group mt-9 inline-flex items-center gap-3 font-mono text-xs font-bold uppercase tracking-[0.22em] text-white transition hover:text-cyan"
                    initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0 }}
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Открыть сайт
                    <span className="inline-block transition group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
                  </motion.button>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

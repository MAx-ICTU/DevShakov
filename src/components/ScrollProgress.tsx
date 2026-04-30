import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 130, damping: 24, mass: 0.3 });

  return <motion.div className="fixed left-0 top-0 z-[70] h-1 w-full origin-left bg-cyan" style={{ scaleX }} />;
}

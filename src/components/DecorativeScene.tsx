export function DecorativeScene() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute left-[8%] top-24 h-48 w-48 rounded-full bg-cyan/10 blur-3xl" />
      <div className="absolute bottom-20 right-[8%] h-56 w-56 rounded-full bg-lime/10 blur-3xl" />
      <div className="absolute right-[18%] top-36 hidden h-64 w-64 rotate-12 rounded-[2rem] border border-cyan/20 bg-white/[0.03] shadow-glow md:block" />
      <div className="absolute right-[22%] top-52 hidden h-44 w-44 -rotate-6 rounded-[1.5rem] border border-lime/20 bg-white/[0.04] md:block" />
      <div className="absolute left-1/2 top-1/2 hidden h-[38rem] w-[38rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.06] lg:block" />
      <div className="absolute left-1/2 top-1/2 hidden h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.05] lg:block" />
    </div>
  );
}

type MarqueeBandProps = {
  items: string[];
};

export function MarqueeBand({ items }: MarqueeBandProps) {
  const loop = [...items, ...items, ...items];

  return (
    <div className="relative overflow-hidden border-y border-white/10 bg-white/[0.035] py-4">
      <div className="animate-marquee flex w-max gap-8">
        {loop.map((item, index) => (
          <span key={`${item}-${index}`} className="font-display text-xl font-semibold uppercase text-white/80 sm:text-2xl">
            {item}
            <span className="ml-8 text-cyan">/</span>
          </span>
        ))}
      </div>
    </div>
  );
}

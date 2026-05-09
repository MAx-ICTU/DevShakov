export function AmbientBackdrop() {
  return (
    <div className="ambient-backdrop pointer-events-none fixed inset-0 z-[1] overflow-hidden" aria-hidden="true">
      <div className="ambient-backdrop__glow ambient-backdrop__glow--main" />
      <div className="ambient-backdrop__glow ambient-backdrop__glow--side" />
      <div className="ambient-backdrop__stars" />
      <div className="ambient-orbit ambient-orbit--left">
        <span />
        <span />
        <i />
      </div>
      <div className="ambient-orbit ambient-orbit--right">
        <span />
        <span />
        <i />
      </div>
    </div>
  );
}

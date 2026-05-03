import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { audioTrack } from "../data/site";
import type { Locale } from "../types";

type AudioToggleProps = {
  locale: Locale;
};

export function AudioToggle({ locale }: AudioToggleProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [unavailable, setUnavailable] = useState(false);
  const source = `${import.meta.env.BASE_URL}${audioTrack.src}`;
  const label = playing ? audioTrack.pauseLabel[locale] : audioTrack.playLabel[locale];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return undefined;

    const handleEnded = () => setPlaying(false);
    const handleError = () => {
      setUnavailable(true);
      setPlaying(false);
    };

    audio.volume = 0.28;
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);

    return () => {
      audio.pause();
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
    };
  }, []);

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio || unavailable) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
      return;
    }

    try {
      await audio.play();
      setPlaying(true);
    } catch {
      setUnavailable(true);
      setPlaying(false);
    }
  };

  return (
    <div className="relative inline-flex items-center">
      <audio ref={audioRef} src={source} preload="none" loop />
      <button
        type="button"
        onClick={toggle}
        className="group inline-flex h-8 items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-white/68 transition hover:text-cyan disabled:cursor-not-allowed disabled:text-white/28"
        aria-label={label}
        title={unavailable ? audioTrack.missingLabel[locale] : label}
        disabled={unavailable}
      >
        {playing ? <Volume2 size={15} strokeWidth={1.8} /> : <VolumeX size={15} strokeWidth={1.8} />}
        <span>{playing ? "AUDIO ON" : "AUDIO OFF"}</span>
      </button>
    </div>
  );
}

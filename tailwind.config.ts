import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#05070b",
        panel: "#0d1118",
        line: "rgba(255,255,255,0.12)",
        cyan: "#3dd7ff",
        lime: "#b7ff68",
        amber: "#ffcb6b",
      },
      fontFamily: {
        sans: ["Inter", "Manrope", "system-ui", "sans-serif"],
        display: ["Space Grotesk", "Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 24px 80px rgba(61, 215, 255, 0.18)",
      },
    },
  },
  plugins: [],
} satisfies Config;

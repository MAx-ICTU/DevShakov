import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// For GitHub Pages project sites set VITE_BASE_PATH="/repository-name/".
// For a user/organization site or local preview keep it as "/".
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE_PATH ?? "/",
});

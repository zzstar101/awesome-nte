import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from "node:url";

const repoRoot = fileURLToPath(new URL("..", import.meta.url));
const srcDir = fileURLToPath(new URL("./src", import.meta.url));

export default defineConfig({
  base: "./",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@repo": repoRoot,
      "@": srcDir,
    },
  },
  server: {
    fs: {
      allow: [repoRoot],
    },
  },
});

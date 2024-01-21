import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [
    react(),
    svgr({
      include: "**/*.svg?react",
    }),
  ],
  resolve: {
    alias: [
      { find: "@", replacement: path.resolve(__dirname, "./src") },
      { find: "public", replacement: path.resolve(__dirname, "./public") },
    ],
  },
});

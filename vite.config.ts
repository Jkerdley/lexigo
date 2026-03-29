import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ["@mui/material", "@mui/icons-material", "@emotion/react", "@emotion/styled"],
  },
  server: {
    proxy: {
      "/api/proxy-google": {
        target: "https://translate.googleapis.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/proxy-google/, "/translate_a/single"),
      },
    },
  },
});

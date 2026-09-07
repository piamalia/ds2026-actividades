import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Habilitamos el Proxy local para desarrollo offline sin CORS
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
});

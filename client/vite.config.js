import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { config } from "dotenv";

config();
// https://vitejs.dev/config/
export default defineConfig({
  define: {
    "process.env": process.env,
  },
  plugins: [react()],

  server: {
    // port: 3000,
    // open: true,
    proxy: {
      "/api": {
        target: `http://localhost:5001`,
        changeOrigin: true,
        secure: false,
      },
    },
  },
});

import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
// // export default defineConfig({
//   plugins: [react()],
//   define: {
//     "process.env": process.env,
//   },
//   server: {
//     // port: 3000,
//     // open: true,
//     proxy: {
//       "/api": {
//         target: `http://localhost:${VITE_SERVER_PORT}`,
//         changeOrigin: true,
//         secure: false,
//       },
//     },
//   },
// // });

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  // import.meta.env.VITE_NAME available here with: process.env.VITE_NAME
  // import.meta.env.VITE_PORT available here with: process.env.VITE_PORT

  return defineConfig({
    plugins: [react()],
    base: "./",
    define: {
      "process.env": process.env,
    },
    build: {
      chunkSizeWarningLimit: 1600,
    },
    server: {
      port: process.env.VITE_CLIENT_PORT,
      open: true,
      cors: true,
      proxy: {
        "/api": {
          target: `http://localhost:${process.env.VITE_SERVER_PORT}`,
          changeOrigin: true,
          secure: false,
        },
      },
    },
  });
};

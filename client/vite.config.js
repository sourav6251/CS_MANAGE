// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import tailwindcss from "@tailwindcss/vite";
// // https://vite.dev/config/
// export default defineConfig({
//     optimizeDeps: {
//         include: ["pdfjs-dist", "pdfjs-dist/build/pdf.worker.js"],
//     },
//     build: {
//         rollupOptions: {
//             external: [/^pdfjs-dist\/.*/], // Ensure worker is not externalized
//         },
//     },
//     plugins: [react(), tailwindcss()],
// });
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  optimizeDeps: {
    include: ['pdfjs-dist', 'react-pdf'],
  },
});
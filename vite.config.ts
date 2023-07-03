import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
import svgr from "vite-plugin-svgr";

dotenv.config();

export default defineConfig({
    plugins: [react(), svgr()],
    server: {
        port: process?.env?.VITE_PORT
            ? parseInt(process?.env?.VITE_PORT)
            : 9001,
    },
});

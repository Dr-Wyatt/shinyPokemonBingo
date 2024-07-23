import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import eslint from "@nabla/vite-plugin-eslint";
import viteTsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint(), viteTsconfigPaths()],
  server: {
    open: true,
  },
});

import { fileURLToPath } from "node:url";
import { mergeConfig } from "vite";
import { configDefaults, defineConfig } from "vitest/config";
import viteConfig from "./vite.config";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: "jsdom",
      include: ["src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
      exclude: [...configDefaults.exclude, "e2e/*"],
      root: fileURLToPath(new URL("./", import.meta.url)),
      coverage: {
        provider: "c8",
        reporter: ["lcov", "html"],
      },
      setupFiles: "./src/mocks/vitestSetup.ts",
      deps: {
        inline: ["vitest-canvas-mock"],
      },
      globals: true,
    },
  })
);

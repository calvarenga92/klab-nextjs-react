import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true, // habilita describe, it, expect sem precisar importar
    environment: "jsdom",
    setupFiles: "./vitest.setup.ts"
  },
});

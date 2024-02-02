import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["src/v1/tests/*.test.ts"],
    setupFiles: ["src/tests/helpers/setup.ts"],
  },
});

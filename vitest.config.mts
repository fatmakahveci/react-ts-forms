import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

export default defineConfig({
  oxc: { jsx: { runtime: "automatic" } },
  resolve: { alias: {
    react: fileURLToPath(new URL("./node_modules/react", import.meta.url)),
    "react-dom": fileURLToPath(new URL("./node_modules/react-dom", import.meta.url)),
  } },
  test: {
    environment: "jsdom",
    projects: [
      {
        resolve: { alias: { "@": fileURLToPath(new URL("./user-input/src", import.meta.url)) } },
        test: { name: "input", include: ["tests/input.test.tsx"] },
      },
      {
        resolve: { alias: { "@": fileURLToPath(new URL("./user-list-forms/src", import.meta.url)) } },
        test: { name: "users", include: ["tests/users.test.tsx"] },
      },
    ],
  },
});

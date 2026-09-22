import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

export default defineConfig({
  oxc: { jsx: { runtime: "automatic" } },
  resolve: {
    alias: {
      react: fileURLToPath(new URL("./node_modules/react", import.meta.url)),
      "react-dom": fileURLToPath(
        new URL("./node_modules/react-dom", import.meta.url),
      ),
    },
  },
  test: {
    environment: "jsdom",
    projects: [
      {
        resolve: {
          alias: {
            "@": fileURLToPath(
              new URL("./apps/form-validation/src", import.meta.url),
            ),
          },
        },
        test: {
          name: "form-validation",
          include: [
            "tests/use-input.test.tsx",
            "tests/validation-form.test.tsx",
          ],
        },
      },
      {
        resolve: {
          alias: {
            "@": fileURLToPath(
              new URL("./apps/user-management/src", import.meta.url),
            ),
          },
        },
        test: {
          name: "user-management",
          include: [
            "tests/add-user-form.test.tsx",
            "tests/user-directory.test.tsx",
          ],
        },
      },
    ],
  },
});

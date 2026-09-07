import { fileURLToPath } from "node:url";

const appRoot = fileURLToPath(new URL(".", import.meta.url));

export default {
  turbopack: { root: appRoot },
  outputFileTracingRoot: appRoot,
};

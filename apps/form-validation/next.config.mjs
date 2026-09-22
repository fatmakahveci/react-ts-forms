import { fileURLToPath } from "node:url";

const appRoot = fileURLToPath(new URL(".", import.meta.url));

const nextConfig = {
  output: "standalone",
  transpilePackages: ["@form-studio/ui"],
  turbopack: { root: appRoot },
  outputFileTracingRoot: appRoot,
};

export default nextConfig;

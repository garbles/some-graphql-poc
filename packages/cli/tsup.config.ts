import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/compile.ts", "src/bin.ts", "src/out/sdk.ts"],
  outDir: "build",
  format: ["cjs", "esm"],
  sourcemap: true,
  clean: true,
  dts: true,
  splitting: false,
  bundle: false,
});

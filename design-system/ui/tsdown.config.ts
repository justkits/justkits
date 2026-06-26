import { defineConfig } from "tsdown";
import { vanillaExtractPlugin } from "@vanilla-extract/rollup-plugin";

export default defineConfig([
  {
    entry: ["src/components/*/index.ts"],
    plugins: [vanillaExtractPlugin()],
    format: ["esm"],
    dts: true,
    clean: false,
    banner: "'use client';",
    deps: {
      onlyBundle: false,
      neverBundle: [/^@justkits\//],
    },
  },
  {
    entry: ["src/index.ts"],
    plugins: [vanillaExtractPlugin()],
    format: ["esm"],
    dts: true,
    clean: false,
    deps: {
      onlyBundle: false,
    },
    banner: "'use client';",
    css: {
      fileName: "styles.css",
    },
  },
]);

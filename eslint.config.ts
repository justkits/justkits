import { defineConfig } from "eslint/config";
import { baseEslintConfig } from "@justkits/eslint-config/base";

export default defineConfig([
  {
    extends: [baseEslintConfig],
  },
]);

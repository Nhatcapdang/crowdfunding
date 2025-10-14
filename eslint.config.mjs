import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      react: (await import("eslint-plugin-react")).default,
    },
    rules: {
      "react/react-in-jsx-scope": "off", // Not needed in Next.js
      "react/prop-types": "off", // Using TypeScript instead
      "react/display-name": "warn",
      "react/no-unescaped-entities": "error",
      "react/no-unknown-property": "error",
      "react/self-closing-comp": "error",
      "react/jsx-curly-brace-presence": ["error", { "props": "never", "children": "never" }],
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
];

export default eslintConfig;

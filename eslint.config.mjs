import nextPlugin from "@next/eslint-plugin-next";

const eslintConfig = [
  {
    ignores: [".next/**", "node_modules/**", "coverage/**", "playwright-report/**"]
  },
  {
    files: ["src/**/*.{ts,tsx}", "prisma/**/*.ts"],
    plugins: {
      "@next/next": nextPlugin
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
      "@next/next/no-html-link-for-pages": "off"
    }
  }
];

export default eslintConfig;

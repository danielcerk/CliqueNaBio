import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname, // Diretório base para resolver as configurações
});

const eslintConfig = [
  ...compat.extends(
    "next/core-web-vitals", // Configuração básica do Next.js
    "next/typescript"       // Suporte para TypeScript
  ),
  {
    files: ["**/*.ts", "**/*.tsx"], // Alvo para arquivos TypeScript
    rules: {
      // Regras específicas para TypeScript
      "@typescript-eslint/no-unused-vars": ["warn"],
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-explicit-any': 'warn', 
    },
  },
  {
    files: ["**/*.js", "**/*.jsx"], // Alvo para arquivos JavaScript
    rules: {
      // Regras específicas para JavaScript
      "no-console": "warn",
    },
  },
];

export default eslintConfig;

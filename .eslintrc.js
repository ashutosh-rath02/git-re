module.exports = {
  root: true,
  ignorePatterns: ["node_modules/**", "dist/**"],
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "next",
    "prettier",
  ],
  file: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {
    "react/no-direct-mutation-state": [
      "error", // Keep the default as error
      {
        ignoreCallbacks: true, // Allow mutation within callbacks (optional)
        mutators: ["this.setState"], // Allow mutation using this.setState (optional)
      },
    ],
    "react/no-unescaped-entities": "off",
    "@next/next/no-page-custom-font": "off",
  },
};
// eslint-disable-next-line no-undef

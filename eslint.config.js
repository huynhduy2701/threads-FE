// import globals from "globals";
// import pluginJs from "@eslint/js";
// import tseslint from "typescript-eslint";
// import pluginReact from "eslint-plugin-react";


// export default [
//   {files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"]},
//   {languageOptions: { globals: globals.browser }},
//   pluginJs.configs.recommended,
//   ...tseslint.configs.recommended,
//   pluginReact.configs.flat.recommended,
// ];

import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import pluginReact from "eslint-plugin-react";

export default {
  overrides: [
    {
      files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
      languageOptions: {
        globals: globals.browser, // Cấu hình các biến toàn cục cho trình duyệt
        parserOptions: {
          ecmaVersion: 2020,
          sourceType: "module", // Đảm bảo sử dụng module cho JS/TS
        },
      },
      plugins: [
        pluginReact, // Plugin React
        "@typescript-eslint", // Plugin TypeScript
      ],
      extends: [
        "eslint:recommended", // Các quy tắc cơ bản của ESLint
        pluginJs.configs.recommended, // Quy tắc mặc định cho JS
        pluginReact.configs.recommended, // Quy tắc mặc định cho React
        "@typescript-eslint/recommended", // Quy tắc cơ bản cho TypeScript
        "plugin:react/recommended", // Quy tắc cơ bản cho React
        "plugin:react/jsx-runtime", // Cấu hình JSX cho React 17+
      ],
      rules: {
        "react/prop-types": "off", // Tắt kiểm tra prop-types nếu bạn sử dụng TypeScript
        "no-unused-vars": "warn", // Cảnh báo nếu có biến không sử dụng
        "@typescript-eslint/no-unused-vars": ["warn"], // Kiểm tra biến không sử dụng trong TypeScript
        "@typescript-eslint/explicit-module-boundary-types": "off", // Tắt kiểm tra kiểu trả về cho function
      },
    },
  ],
};

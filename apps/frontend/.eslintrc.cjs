module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },

  settings: {
    react: {
      version: "detect",
    },
    "import/resolver": {
      node: {
        paths: ["src"],
        extensions: [".js", ".jsx", ".ts", ".tsx"],
        alias: {
          "@": "./src",
        },
      },
    },
  },

  env: {
    node: true,
    browser: true,
    amd: true,
  },

  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:prettier/recommended",
  ],

  plugins: [
    "simple-import-sort",
    "@typescript-eslint/eslint-plugin",
    "react",
    "react-hooks",
    "prettier",
  ],

  rules: {
    "prettier/prettier": ["error", { singleQuote: false }],

    "react/react-in-jsx-scope": "off",

    "class-methods-use-this": "off",
    "no-console": "off",
    "no-underscore-dangle": "off",
    "no-empty": "off",
    "no-param-reassign": "warn",

    "import/prefer-default-export": "off",
    "import/extensions": "off",

    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      { ignoreRestSiblings: true },
    ],
    "@typescript-eslint/no-shadow": "warn",
    "@typescript-eslint/naming-convention": [
      "warn",
      {
        selector: "variable",
        format: ["camelCase", "PascalCase", "UPPER_CASE"],
        leadingUnderscore: "allowSingleOrDouble",
      },
      {
        selector: "enum",
        format: ["PascalCase"],
      },
      {
        selector: "interface",
        format: ["PascalCase"],
      },
    ],

    quotes: [2, "double", { avoidEscape: true }],

    "simple-import-sort/imports": [
      "error",
      {
        groups: [
          [
            "^(assert|buffer|child_process|cluster|console|constants|crypto|dgram|dns|domain|events|fs|http|https|module|net|os|path|punycode|querystring|readline|repl|stream|string_decoder|sys|timers|tls|tty|url|util|vm|zlib|freelist|v8|process|async_hooks|http2|perf_hooks)(/.*|$)",
          ],
          ["^react", "^@?\\w"],
          // Side effect imports.
          ["^\\u0000"],
          // Parent imports. Put `..` last. and relative imports
          [
            "assets/",
            "components/",
            "configs/",
            "domains/",
            "hooks/",
            "layouts/",
            "libs/",
            "services/",
            "stores/",
            "utils/",
            "\\.\\.(?!/?$)",
            "\\.\\./?$",
            "\\./(?=.*/)(?!/?$)",
            "\\.(?!/?$)",
            "\\./?$",
          ],
          // Style imports.
          ["^.+\\.s?css$"],
        ],
      },
    ],
  },
};

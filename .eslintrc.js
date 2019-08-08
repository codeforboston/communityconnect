module.exports = {
  parser: "babel-eslint",
  extends: ["airbnb", "plugin:prettier/recommended", "prettier/react"],
  rules: {
    "react/jsx-filename-extension": [
      1,
      {
        extensions: [".js", ".jsx"]
      }
    ],
    "no-console": 0,
    "react/forbid-prop-types": [
      true,
      {
        forbid: ["any"]
      }
    ],
    "react/destructuring-assignment": 0,
    "react/no-array-index-key": 0,
    "jsx-a11y/no-static-element-interactions": 0,
    "jsx-a11y/click-events-have-key-events": 0,
    "padding-line-between-statements": [
      "error",
      {
        blankLine: "never",
        prev: ["singleline-const", "singleline-let", "singleline-var"],
        next: ["singleline-const", "singleline-let", "singleline-var"]
      },
      {
        blankLine: "always",
        prev: [
          "class",
          "function",
          "multiline-const",
          "multiline-let",
          "multiline-var",
          "multiline-expression",
          "multiline-block-like"
        ],
        next: [
          "class",
          "function",
          "multiline-const",
          "multiline-let",
          "multiline-var",
          "multiline-expression",
          "multiline-block-like",
          "singleline-const",
          "singleline-let",
          "singleline-var"
        ]
      },
      {
        blankLine: "always",
        prev: [
          "class",
          "function",
          "multiline-const",
          "multiline-let",
          "multiline-var",
          "multiline-expression",
          "multiline-block-like",
          "singleline-const",
          "singleline-let",
          "singleline-var"
        ],
        next: [
          "class",
          "function",
          "multiline-const",
          "multiline-let",
          "multiline-var",
          "multiline-expression",
          "multiline-block-like"
        ]
      },
      {
        blankLine: "always",
        prev: "*",
        next: "cjs-export"
      },
      {
        blankLine: "always",
        prev: "cjs-import",
        next: "*"
      },
      {
        blankLine: "never",
        prev: "cjs-import",
        next: "cjs-import"
      },
      {
        blankLine: "always",
        prev: "*",
        next: "return"
      }
    ]
  },
  env: {
    jest: true,
    browser: true,
    node: true,
    es6: true
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    }
  }
};

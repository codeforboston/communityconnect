module.exports = {
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "google",
  ],
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaVersion": 9,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true,
    },
  },
  "plugins": [
    "react",
    "babel",
  ],
  "settings": {
    "react": {
      "version": "detect",
    },
  },
  "env": {
    "browser": true,
    "es6": true,
  },
  "rules": {
    "indent": [
      "error",
      2,
      {
        "CallExpression": {
          "arguments": 1,
        },
      },
    ],
    "no-invalid-this": "off",
    "babel/no-invalid-this": ["error"],
    "require-jsdoc": "warn",
  },
  "overrides": [
    {
      "files": "**/*.test.js",
      "env": {
        "jest": true,
      },
    },
  ],
};

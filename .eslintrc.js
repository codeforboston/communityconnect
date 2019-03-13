module.exports = {
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "google",
  ],
  "parserOptions": {
    "ecmaVersion": 7,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true,
    },
  },
  "plugins": [
    "react",
  ],
  "settings": {
    "react": {
      "version": "detect",
    },
  },
  "env": {
    "browser": true,
  },
};

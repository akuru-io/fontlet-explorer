const path = require("path");

module.exports = {
  extends: ["airbnb", "prettier", "prettier/react"],
  plugins: ["react", "prettier"],
  settings: {
    "import/resolver": {
      node: {
        paths: [path.resolve(__dirname, "src")]
      }
    }
  },
  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 2016,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    }
  },
  env: {
    es6: true,
    browser: true,
    node: true
  },
  rules: {
    "react/jsx-filename-extension": "off",
    "no-underscore-dangle": "off",
    "import/first": ["error", { "absolute-first": false }],
    "react/prop-types": "off",
    "global-require": "off",
    "import/prefer-default-export": "off",
    "react/prefer-stateless-function": [0, { "ignorePureComponents": true }],
    "import/no-extraneous-dependencies": ["error", { "devDependencies": true }],
    "indent": ["error", 2]
  }
};

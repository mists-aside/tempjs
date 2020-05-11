// .prettierrc.js

const config = require('./.config');

module.exports = {
  parser: config.language === "typescript" ? "typescript" : "babel",
  printWidth: 120,
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: "all",
  bracketSpacing: false
};

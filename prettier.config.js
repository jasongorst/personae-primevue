export default {
  bracketSameLine: false,
  semi: false,
  singleAttributePerLine: true,
  trailingComma: "none",

  // plugins
  plugins: [
    "prettier-plugin-prisma",
    "prettier-plugin-tailwindcss",
    "prettier-plugin-classnames",
    "prettier-plugin-merge"
  ],

  // prettier-plugin-tailwindcss
  tailwindAttributes: ["pt"],
  tailwindFunctions: ["tw"],
  tailwindPreserveWhitespace: true,
  tailwindStylesheet: "./app/assets/css/main.css",

  // prettier-plugin-classnames
  customAttributes: ["pt"],
  customFunctions: ["tw"],
  endingPosition: "relative"
}

export default {
  bracketSameLine: false,
  semi: false,
  singleAttributePerLine: true,
  trailingComma: "none",

  // plugins
  plugins: ["prettier-plugin-tailwindcss", "prettier-plugin-prisma"],

  // prettier-plugin-tailwindcss options
  tailwindAttributes: ["pt"],
  tailwindFunctions: ["tw"],
  tailwindPreserveWhitespace: true,
  tailwindStylesheet: "./app/assets/css/main.css"
}

/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions & import('@trivago/prettier-plugin-sort-imports/types').PluginConfig} */
export default {
  plugins: [
    "prettier-plugin-tailwindcss",
    "@trivago/prettier-plugin-sort-imports",
  ],
  importOrder: [
    "^react$",
    "^react-dom$",
    "^convex(/.*)?$",
    "<THIRD_PARTY_MODULES>",
    "^~/.*$",
    "^[./].*?$",
    "^.+\\.s?css$",
  ],
};

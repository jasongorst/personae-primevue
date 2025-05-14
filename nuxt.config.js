import tailwindcss from "@tailwindcss/vite"

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',

  css: [ "~/assets/css/main.css" ],

  devServer: { port: 3001 },

  devtools: {
    enabled: true,
    timeline: { enabled: true }
  },

  future: { compatibilityVersion: 4 },

  modules: [
    "@nuxt/icon",
    "@primevue/nuxt-module",
    "nuxt-lodash"
  ],

  runtimeConfig: {
    // placeholders to be overridden by env vars
    public: {
      useApi: { baseURL: "" },
      api: { baseURL: "" }
    }
  },

  vite: {
    plugins: [ tailwindcss() ]
  },

  icon: {
    size: "1em",
    class: "inline",
    mode: "svg",

    aliases: {
      personae: "fa6-solid:masks-theater"
    },

    clientBundle: {
      icons: [],
      scan: true,
      sizeLimitKb: 256
    }
  },

  lodash: {
    prefix: "_",
    prefixSkip: false,
    upperAfterPrefix: false
  },

  primevue: {
    importPT: { from: "@@/passthrough/customPT.js" },
    options: {
      ptOptions: {
        mergeSections: true,
        mergeProps: true
      },
      unstyled: true
    }
  }
})

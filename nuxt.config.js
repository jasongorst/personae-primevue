// noinspection SpellCheckingInspection

import tailwindcss from "@tailwindcss/vite"

// noinspection JSUnusedGlobalSymbols
export default defineNuxtConfig({
  app: {
    head: {
      link: [
        { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
        { rel: "icon", href: "/theater-masks-solid.svg" },
        { rel: "manifest", href: "/manifest.json" },
        { rel: "mask-icon", href: "/theater-masks-solid.svg", color: "#6e0b75" }
      ],

      meta: [
        { charset: "UTF-8" },
        { name: "theme-color", content: "#6e0b75" },
        { name: "viewport", content: "width=device-width, initial-scale=1.0" }
      ],

      title: "Dramatis Personae"
    }
  },

  srcDir: "app/",
  compatibilityDate: "2025-11-25",
  css: ["~/assets/css/main.css"],
  devServer: { port: 3000 },

  devtools: {
    enabled: true,
    timeline: { enabled: true }
  },

  experimental: { asyncContext: true },
  future: { compatibilityVersion: 5 },

  imports: {
    dirs: ["stores"],
    presets: [{ from: "tailwind-merge", imports: ["twJoin", "twMerge"] }]
  },

  modules: [
    "@nuxt/icon",
    "@pinia/nuxt",
    "@pinia/colada-nuxt",
    "@primevue/nuxt-module"
  ],

  nitro: {
    experimental: {
      asyncContext: true,
      tasks: true,
      websocket: true
    }
  },

  runtimeConfig: {
    public: {
      api: { baseURL: "" },
      auth: { baseURL: "" },
      websocketHost: ""
    },

    betterAuth: { baseURL: "", secret: "" },
    postmarkServerToken: "",
    prismaDatabaseURL: ""
  },

  vite: {
    build: {
      sourcemap: false,
      terserOptions: {
        format: { comments: false }
      }
    },

    esbuild: { legalComments: "none" },
    plugins: [tailwindcss()],

    vue: {
      template: {
        compilerOptions: {
          isCustomElement: (tag) =>
            tag.startsWith("trix-") || tag.startsWith("action-text-")
        }
      }
    }
  },

  // module configs
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

  pinia: { storesDirs: ["./app/stores/**"] },

  primevue: {
    directives: { include: ["Tooltip"] },
    importPT: { from: "~/primevue/passthrough.js" },

    options: {
      ptOptions: {
        mergeSections: true,
        mergeProps: true
      },

      unstyled: true
    }
  }
})

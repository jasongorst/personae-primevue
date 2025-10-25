import tailwindcss from "@tailwindcss/vite"

const mockAuthModule = process.env.VITEST ? ["./test/mocks/setup.js"] : []

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
  compatibilityDate: "2025-07-31",
  css: ["~/assets/css/main.css"],
  devServer: { port: 3000 },

  devtools: {
    enabled: true,
    timeline: { enabled: true }
  },

  imports: {
    dirs: ["stores"],

    presets: [
      {
        from: "tailwind-merge",
        imports: ["twJoin", "twMerge"]
      }
    ]
  },

  modules: [
    "@nuxt/icon",
    "@pinia/nuxt",
    "@primevue/nuxt-module",
    "@sidebase/nuxt-auth",
    ...mockAuthModule
  ],

  nitro: {
    experimental: {
      asyncContext: true,
      websocket: true
    }
  },

  runtimeConfig: {
    // placeholders to be overridden by env vars
    auth: { baseUrl: "" },
    public: {
      useApi: { baseURL: "" },
      api: { baseURL: "" },
      websocketHost: ""
    }
  },

  vite: {
    build: {
      sourcemap: false,
      terserOptions: {
        format: { comments: false }
      }
    },

    esbuild: {
      legalComments: "none"
    },

    optimizeDeps: {
      include: [
        "@primevue/core/api",
        "@primevue/forms",
        "@primevue/forms/resolvers/yup",
        "jsondiffpatch",
        "jsondiffpatch/formatters/jsonpatch",
        "lodash-es",
        "primevue/autocomplete",
        "primevue/button",
        "primevue/card",
        "primevue/chip",
        "primevue/column",
        "primevue/config",
        "primevue/confirmationservice",
        "primevue/confirmdialog",
        "primevue/datatable",
        "primevue/dialog",
        "primevue/dialogservice",
        "primevue/inputtext",
        "primevue/listbox",
        "primevue/menu",
        "primevue/message",
        "primevue/password",
        "primevue/progressspinner",
        "primevue/toast",
        "primevue/toastservice",
        "primevue/toolbar",
        "primevue/useconfirm",
        "primevue/usetoast",
        "socket.io-client",
        "tailwind-merge",
        "trix",
        "uuid",
        "yup"
      ]
    },

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
  auth: {
    isEnabled: true,
    originEnvKey: "NUXT_AUTH_BASE_URL",

    provider: {
      type: "local",

      endpoints: {
        signUp: false,
        signIn: { path: "/login", method: "post" },
        signOut: { path: "/logout", method: "post" },
        getSession: { path: "/session", method: "get" }
      },

      session: {
        dataType: {
          username: "string",
          email: "string",
          admin: "boolean"
        }
      },

      token: {
        headerName: "Authorization",
        type: "Bearer",
        signInResponseTokenPointer: "/access_token"
      },

      refresh: {
        isEnabled: true,

        endpoint: {
          path: "/jwt-refresh",
          method: "post"
        },

        refreshOnlyToken: false,

        token: {
          signInResponseRefreshTokenPointer: "/refresh_token",
          refreshResponseTokenPointer: "/access_token",
          refreshRequestTokenPointer: "/refresh_token"
        }
      }
    }
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

  pinia: {
    storesDirs: ["./app/stores/**"]
  },

  primevue: {
    directives: {
      include: ["Tooltip"]
    },
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

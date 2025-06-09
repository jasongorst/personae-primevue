import tailwindcss from "@tailwindcss/vite"

const mockAuthModule = process.env.VITEST ? [ "./test/mocks/setup.js" ] : []

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
    "@sidebase/nuxt-auth",
    "nuxt-lodash",
    ...mockAuthModule
  ],

  runtimeConfig: {
    // placeholders to be overridden by env vars
    auth: { baseUrl: "" },
    public: {
      useApi: { baseURL: "" },
      api: { baseURL: "" }
    }
  },

  vite: {
    plugins: [ tailwindcss() ]
  },

  // module configs
  auth: {
    isEnabled: true,

    globalAppMiddleware: {
      unauthenticatedOnly: false,
      navigateAuthenticatedTo: "/",
      navigateUnauthenticatedTo: "/",
      addDefaultCallbackUrl: false
    },

    originEnvKey: "NUXT_AUTH_BASE_URL",

    provider: {
      type: "local",
      pages: { login: "/" },

      endpoints: {
        signUp: false,
        signIn: { path: "/login", method: "post" },
        signOut: { path: "/logout", method: "post" },
        getSession: { path: "/session", method: "get" }
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

  primevue: {
    directives: {
      include: [ "Tooltip" ]
    },
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

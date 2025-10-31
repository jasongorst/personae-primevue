export default defineNitroConfig({
  buildDir: ".nuxt",
  compatibilityDate: "2025-10-29",
  experimental: {
    asyncContext: true,
    tasks: true,
    websocket: true
  }
})

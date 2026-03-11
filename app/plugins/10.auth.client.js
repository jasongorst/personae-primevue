// noinspection JSUnusedGlobalSymbols
export default defineNuxtPlugin(async (nuxtApp) => {
  if (!nuxtApp.payload.serverRendered) {
    await useAuthClient().fetchSession()
  } else if (nuxtApp.payload.prerenderedAt || nuxtApp.payload.isCached) {
    // To avoid hydration mismatch
    nuxtApp.hook("app:mounted", async () => {
      await useAuthClient().fetchSession()
    })
  }
})

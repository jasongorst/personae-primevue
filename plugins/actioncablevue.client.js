import ActionCableVue from "actioncable-vue"

export default defineNuxtPlugin(({ vueApp }) => {
  const config = useRuntimeConfig()

  // noinspection JSUnresolvedReference
  vueApp.use(ActionCableVue, {
    debug: true,
    debugLevel: "all",
    connectionUrl: config.public.websocketHost,
    connectImmediately: true,
  })
})

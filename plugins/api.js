export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const token = useCookie("auth.token", { watch: false})

  const api = $fetch.create({
    baseURL: config.public.useApi.baseURL,
    transform: (response) => deepConvertKeys(response, _camelCase),

    onRequest({ options }) {
      if (token?.value) {
        options.headers.set("Authorization", token.value)
      }

      if (options.method !== "GET" && options.method !== "HEAD") {
        options.body = deepConvertKeys(options.body, _snakeCase)
      }
    },

    onResponseError({ response }) {
      console.log(response)
    }
  })

  // expose to useNuxtApp().$api
  return { provide: { api } }
})

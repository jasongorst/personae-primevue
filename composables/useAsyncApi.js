export function useAsyncApi(url, options) {
  const { $api } = useNuxtApp()

  return useFetch(url, {
      ...options,
      $fetch: $api
  })
}

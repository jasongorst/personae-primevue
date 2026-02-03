export default function useAbortableEmit(key, eventName = null, ...params) {
  const options = { deep: true }
  const event = eventName || key

  const handler = () => useEmit(event, ...params)

  const abortableHandler = (_nuxtApp, { signal }) => {
    return new Promise((resolve, reject) => {
      signal?.addEventListener("abort", () => {
        reject(new Error("Request aborted"))
      })

      return Promise.resolve(callback.call(this, handler)).then(resolve, reject)
    })
  }

  return useAsyncData(key, abortableHandler, options)
}

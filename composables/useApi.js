export function useApi(
  url,
  {
    // useApi options
    token = null,
    manual = false,
    bodyTransform = (body) => deepConvertKeys(body, _snakeCase),
    // useFetch defaults
    baseURL = null,
    transform = (response) => deepConvertKeys(response, _camelCase),
    // useFetch interceptors
    onRequest = _noop,
    onRequestError = _noop,
    onResponse = _noop,
    onResponseError = _noop,
    // useApi interceptor for rails fieldErrors
    onFieldError = _noop,
    // any other options to pass to useFetch
    ...additionalOptions
  } = {}
) {
  const config = useRuntimeConfig()

  // noinspection JSUnusedGlobalSymbols
  const useFetchOptions = {
    onRequest: [
      // defaults
      ({ options }) => {
        options.baseURL = baseURL ?? config.public.useApi.baseURL
      },

      // bodyTransform
      ({ options }) => {
        if (options.method !== "GET" && options.method !== "HEAD") {
          options.body = bodyTransform(options.body)
        }
      },

      async ({ request, options }) => await onRequest({ request, options })
    ],

    onRequestError: async ({ request, options, error }) => {
      await onRequestError({ request, options, error })
    },

    onResponse: async ({ request, response, options }) => {
      if (response.ok) {
        await onResponse({ request, response, options })
      }
    },

    onResponseError: async ({ request, response, options }) => {
      if (_has(response._data, "fieldError") || (response.status === 422)) {
        await onFieldError({ request, response, options })
      } else {
        await onResponseError({ request, response, options })
      }
    },

    baseURL: baseURL,
    transform: transform
  }

  _merge(useFetchOptions, additionalOptions)

  if (toValue(manual)) {
    useFetchOptions.immediate = false
    useFetchOptions.watch = false
  }

  if (isPresent(token)) {
    useFetchOptions.headers = useFetchOptions.headers ?? {}
    useFetchOptions.headers.Authorization = toValue(token)
  }

  return useFetch(url, useFetchOptions)
}

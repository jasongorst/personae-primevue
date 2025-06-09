export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  let options

  try {
    options = await event.$fetch(
      "/characters/options", {
        baseURL: config.public.api.baseURL
      }
    )
  } catch(error) {
    throw createError({ statusCode: 500, statusMessage: error.message })
  }

  return options
})

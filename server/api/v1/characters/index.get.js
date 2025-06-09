export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const query = getQuery(event)
  let characters

  try {
    characters = await event.$fetch(
      "/characters", {
        query: query,
        baseURL: config.public.api.baseURL
      }
    )
  } catch (error) {
    throw createError({ statusCode: 500, statusMessage: error.message })
  }

  return characters
})

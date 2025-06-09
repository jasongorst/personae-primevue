export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const id = getRouterParam(event, 'id')
  let character

  try {
    character = await event.$fetch(
      `/characters/${id}`, {
        baseURL: config.public.api.baseURL
      }
    )
  } catch(error) {
    throw createError({ statusCode: 500, statusMessage: error.message })
  }

  return character
})

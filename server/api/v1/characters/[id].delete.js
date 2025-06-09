export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const id = getRouterParam(event, 'id')
  let response

  try {
    response = await event.$fetch(
      `/characters/${id}`, {
        method: "delete",
        baseURL: config.public.api.baseURL
      }
    )
  } catch(error) {
    throw createError({ statusCode: 500, statusMessage: error.message })
  }

  return response
})

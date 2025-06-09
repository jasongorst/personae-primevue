export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const id = getRouterParam(event, 'id')
  let account

  try {
    account = await event.$fetch(
      `/accounts/${id}`, {
        baseURL: config.public.api.baseURL
      }
    )
  } catch(error) {
    throw createError({ statusCode: 500, statusMessage: error.message })
  }

  return account
})

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  let accounts

  try {
    accounts = await event.$fetch(
      "/accounts", {
        baseURL: config.public.api.baseURL
      }
    )
  } catch (error) {
    throw createError({ statusCode: 500, statusMessage: error.message })
  }

  return accounts
})

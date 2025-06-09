import { snakeCase } from "lodash-es"

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const id = getRouterParam(event, 'id')
  const account = await readBody(event)
  let response

  try {
    response = await event.$fetch(
      `/accounts/${id}`, {
        method: "patch",
        body: deepConvertKeys(account, snakeCase),
        baseURL: config.public.api.baseURL
      })
  } catch(error) {
    throw createError({ statusCode: 500, statusMessage: error.message })
  }

  return response
})

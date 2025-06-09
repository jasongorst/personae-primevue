import { snakeCase } from "lodash-es"

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const id = getRouterParam(event, 'id')
  const character = await readBody(event)
  let response

  try {
    response = await event.$fetch(
      `/characters/${id}`, {
        method: "patch",
        body: deepConvertKeys(character, snakeCase),
        baseURL: config.public.api.baseURL
      })
  } catch(error) {
    throw createError({ statusCode: 500, statusMessage: error.message })
  }

  return response
})

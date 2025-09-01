import { toInteger } from "lodash-es"

export default defineEventHandler(async (event) => {
  const id = toInteger(getRouterParam(event, "id"))
  const character = await readBody(event)

  try {
    return await prisma.character.update({
      where: { id: id },
      data: character
    })
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message
    })
  }
})

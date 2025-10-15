export default defineEventHandler(async (event) => {
  const id = _toInteger(getRouterParam(event, "id"))

  try {
    return await prisma.character.delete({ where: { id: id } })
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message
    })
  }
})

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id")
  const character = await readBody(event)

  try {
    return await prisma.character.prisma.user.update({
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

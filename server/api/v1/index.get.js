export default defineEventHandler(async () => {
  try {
    const characters = await prisma.character.findMany({
      orderBy: [{ createdAt: "asc" }]
    })

    const keyById = _curryRight(_keyBy)("id")

    return keyById(characters)
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message
    })
  }
})

export default defineEventHandler(async () => {
  try {
    const characters = await prisma.character.findMany({
      orderBy: [{ createdAt: "asc" }]
    })

    return reshapeCharacters(characters)
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message
    })
  }
})

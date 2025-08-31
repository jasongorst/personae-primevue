export default defineEventHandler(async () => {
  try {
    return await prisma.character.findMany({
      orderBy: [{ createdAt: "asc" }]
    })
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message
    })
  }
})

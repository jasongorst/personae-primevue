export default defineEventHandler(async () => {
  try {
    return await prisma.user.findMany({
      orderBy: [{ createdAt: "asc" }]
    })
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message
    })
  }
})

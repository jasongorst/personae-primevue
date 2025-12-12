export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id")

  try {
    return await prisma.user.findUnique({ where: { id } })
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message
    })
  }
})

export default defineEventHandler(async (event) => {
  const user = await readBody(event)

  try {
    return await prisma.user.create({ data: user })
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message
    })
  }
})

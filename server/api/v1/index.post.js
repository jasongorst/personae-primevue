export default defineEventHandler(async (event) => {
  const character = await readBody(event)

  try {
    return await prisma.character.create({ data: character })
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message
    })
  }
})

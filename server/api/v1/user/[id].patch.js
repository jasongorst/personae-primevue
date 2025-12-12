export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id")
  const user = await readBody(event)

  try {
    if (_has(user, "password")) {
      // noinspection JSUnresolvedReference
      await auth.api.setUserPassword({
        body: { newPassword: user.password, userId: id }
      })

      _unset(user, "password")
    }

    return await prisma.user.update({
      where: { id: id },
      data: user
    })
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message
    })
  }
})

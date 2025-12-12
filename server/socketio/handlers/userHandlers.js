// noinspection DuplicatedCode

export function userHandlers(io, socket) {
  socket.on("user:read", readUser)
  socket.on("user:list", listUsers)
  socket.on("user:paginate", paginateUsers)
  socket.on("user:count", countUsers)
  socket.on("user:delete", deleteUser)
  socket.on("user:create", createUser)
  socket.on("user:update", updateUser)

  async function readUser(id, callback) {
    const query = ({ id }) => prisma.user.findUnique({ where: { id } })
    await _executeQuery({ id, query, callback })
  }

  async function listUsers(callback) {
    const query = () =>
      prisma.user.findMany({ orderBy: [{ createdAt: "asc" }] })
    await _executeQuery({ query, callback })
  }

  async function paginateUsers(skip, take, callback) {
    const query = () =>
      prisma.user.findMany({ orderBy: [{ createdAt: "asc" }], skip, take })

    await _executeQuery({ query, callback })
  }

  async function countUsers(callback) {
    const query = () => prisma.user.count()
    await _executeQuery({ query, callback })
  }

  async function deleteUser(id, callback) {
    const query = ({ id }) => prisma.user.delete({ where: { id } })
    const mutator = (rawResult) => _pick(rawResult, ["id"])
    const permissions = ["delete"]

    await _executeQuery({
      id,
      query,
      mutator,
      permissions,
      callback
    })
  }

  async function createUser(data, callback) {
    const validator = (user) => createUserSchema.parse(user)
    const query = ({ data }) => prisma.user.create({ data })
    const permissions = ["create"]

    await _executeQuery({
      data,
      validator,
      query,
      permissions,
      callback
    })
  }

  async function updateUser(id, data, callback) {
    console.log("[updateUser]", data)

    const validator = (user) => updateUserSchema.parse(user)
    const query = ({ id, data }) => prisma.user.update({ where: { id }, data })
    const permissions = ["update"]

    await _executeQuery({
      id,
      data,
      validator,
      query,
      permissions,
      callback
    })
  }

  async function _executeQuery({
    id,
    data,
    validator,
    query,
    mutator = _identity,
    permissions,
    callback
  }) {
    try {
      if (permissions) {
        await _authorize(permissions)
      }

      const { previous, result: rawResult } = await _validateAndQuery({
        id,
        data,
        validator,
        query
      })

      const result = mutator(rawResult)
      callback({ data: result })
      return { previous, result }
    } catch (error) {
      console.log(error)

      callback({ error })
      return { error }
    }
  }

  async function _authorize(permissions) {
    if (_isNil(socket.data?.user)) {
      throw new AuthError("You must be signed in to modify users.")
    }

    const permitted = await checkPermission(socket.data.user.id, "user", permissions)

    if (!permitted) {
      throw new AuthError(
        `${socket.data.user.username} isn't allowed to modify users.`,
        { resource: "user", permissions }
      )
    }
  }

  async function _validateAndQuery({
    id = null,
    data = null,
    validator = _identity,
    query = _noop
  }) {
    let validId, validData
    let previous = {}

    if (id) {
      validId = userSchema.shape.id.parse(id)

      // on update/delete
      // TODO: this will also needlessly run on read
      previous = await prisma.user.findUnique({ where: { id: validId } })
    }

    if (data) {
      validData = validator(data)
    }

    if (_has(validData, "password")) {
      // noinspection JSUnresolvedReference
      await auth.api.setUserPassword({
        body: { newPassword: validData.password, userId: id },
        headers: socket.handshake.headers
      })

      _unset(validData, "password")
    }

    const result = await query({ id: validId, data: validData })
    return { previous, result }
  }
}

export function userHandlers(_io, socket) {
  socket.on("user:read", readUser)
  socket.on("user:list", listUsers)
  socket.on("user:paginate", paginateUsers)
  socket.on("user:count", countUsers)
  socket.on("user:delete", deleteUser)
  socket.on("user:create", createUser)
  socket.on("user:update", updateUser)

  const userHandlerOptions = {
    user: socket.data?.user,
    resource: "user",
    idValidator: userSchema.shape.id.parse
  }

  async function readUser(id, callback) {
    await userHandler({
      id,
      callback,

      query: ({ id }) =>
        prisma.user.findUnique({
          omit: { banned: true, banReason: true, banExpires: true },
          where: { id }
        })
    })
  }

  async function listUsers(callback) {
    await userHandler({
      callback,

      query: () =>
        prisma.user.findMany({
          omit: { banned: true, banReason: true, banExpires: true },
          orderBy: [{ createdAt: "asc" }]
        })
    })
  }

  async function paginateUsers(skip, take, callback) {
    await userHandler({
      callback,

      query: () =>
        prisma.user.findMany({
          omit: { banned: true, banReason: true, banExpires: true },
          orderBy: [{ createdAt: "asc" }],
          skip,
          take
        })
    })
  }

  async function countUsers(callback) {
    await userHandler({ callback, query: () => prisma.user.count() })
  }

  async function deleteUser(id, callback) {
    await userHandler({
      callback,
      permissions: ["delete"],
      id,
      mutator: (rawResult) => _pick(rawResult, ["id"]),
      query: ({ id }) => prisma.user.delete({ where: { id } })
    })
  }

  async function createUser(data, callback) {
    await userHandler({
      callback,
      permissions: ["create"],
      data,
      validator: createUserSchema.parse,

      query: ({ data }) =>
        serverAuth().api.createUser({
          body: {
            ..._omit(data, "username"),
            data: { username: data.username }
          }
        })
    })
  }

  async function updateUser(id, data, callback) {
    await userHandler({
      callback,
      permissions: ["update"],
      id,
      data,
      validator: updateUserSchema.parse,
      query: ({ id, data }) => prisma.user.update({ where: { id }, data })
    })
  }

  async function userHandler(options) {
    return await executeQuery({ ...userHandlerOptions, ...options })
  }
}

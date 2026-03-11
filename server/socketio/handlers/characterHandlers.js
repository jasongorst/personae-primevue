export function characterHandlers(_io, socket) {
  socket.on("character:read", readCharacter)
  socket.on("character:list", listCharacters)
  socket.on("character:delete", deleteCharacter)
  socket.on("character:create", createCharacter)
  socket.on("character:update", updateCharacter)
  socket.on("character:options", fetchCharacterOptions)

  const characterHandlerOptions = {
    user: socket.data?.user,
    resource: "character",
    idValidator: characterSchema.shape.id.parse
  }

  async function readCharacter(id, callback) {
    await characterHandler({
      callback,
      id,
      query: ({ id }) => prisma.character.findUnique({ where: { id } })
    })
  }

  async function listCharacters(callback) {
    await characterHandler({
      callback,
      query: () =>
        prisma.character.findMany({ orderBy: [{ createdAt: "asc" }] })
    })
  }

  async function deleteCharacter(id, callback) {
    await characterHandler({
      callback,
      permissions: ["delete"],
      id,
      mutator: (rawResult) => _pick(rawResult, ["id"]),
      query: ({ id }) => prisma.character.delete({ where: { id } })
    })

    socket.broadcast.emit("character:delete", id)
  }

  async function createCharacter(payload, callback) {
    const character = await characterHandler({
      callback,
      permissions: ["create"],
      data: addPlainTextAttributes(payload),
      validator: createCharacterSchema.parse,
      query: ({ data }) => prisma.character.create({ data })
    })

    socket.broadcast.emit("character:create", character)
  }

  async function updateCharacter(id, payload, callback) {
    const character = await characterHandler({
      callback,
      permissions: ["update"],
      id,
      data: addPlainTextAttributes(payload),
      validator: updateCharacterSchema.parse,
      query: ({ id, data }) => prisma.character.update({ where: { id }, data })
    })

    socket.broadcast.emit("character:update", character)
  }

  async function fetchCharacterOptions(callback) {
    const columns = _keys(categoryAttributes)

    const fetchColumnOptions = async (column) => {
      return prisma.character.groupBy({
        by: column,
        where: { [column]: { not: "" } },
        orderBy: { [column]: "asc" }
      })
    }

    await characterHandler({
      callback,

      query: () => Promise.all(_map(columns, (column) => fetchColumnOptions(column))),

      mutator: (rawResult) =>
        _zipObject(
          columns,
          _map(rawResult, (group) => _flatMap(group, _values))
        )
    })
  }

  async function characterHandler(options) {
    return await executeQuery({ ...characterHandlerOptions, ...options })
  }
}

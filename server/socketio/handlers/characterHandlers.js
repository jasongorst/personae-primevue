// noinspection JSUnusedGlobalSymbols
export function characterHandlers(io, socket) {
  socket.on("character:read", readCharacter)
  socket.on("character:list", listCharacters)
  socket.on("character:delete", deleteCharacter)
  socket.on("character:create", createCharacter)
  socket.on("character:update", updateCharacter)

  async function readCharacter(id, callback) {
    const query = ({ id }) => prisma.character.findUnique({ where: { id } })
    await _executeQuery({ id, query, callback })
  }

  async function listCharacters(callback) {
    const query = () =>
      prisma.character.findMany({ orderBy: [{ createdAt: "asc" }] })

    const mutator = reshapeCharacters
    await _executeQuery({ query, mutator, callback })
  }

  async function deleteCharacter(id, callback) {
    const query = ({ id }) => prisma.character.delete({ where: { id } })
    const mutator = (rawResult) => _pick(rawResult, ["id"])
    const permissions = ["delete"]

    const { previous, error } = await _executeQuery({
      id,
      query,
      mutator,
      permissions,
      callback
    })

    if (_isUndefined(error)) {
      broadcastPatch(socket, generateCharacterPatch(previous, {}))
    }
  }

  async function createCharacter(payload, callback) {
    const data = addPlainTextAttributes(payload)
    const validator = (character) => createCharacterSchema.parse(character)
    const query = ({ data }) => prisma.character.create({ data })
    const permissions = ["create"]

    const { previous, result, error } = await _executeQuery({
      data,
      validator,
      query,
      permissions,
      callback
    })

    if (_isUndefined(error)) {
      broadcastPatch(socket, generateCharacterPatch(previous, result))
    }
  }

  async function updateCharacter(id, payload, callback) {
    const data = addPlainTextAttributes(payload)
    const validator = (character) => updateCharacterSchema.parse(character)

    const query = ({ id, data }) =>
      prisma.character.update({ where: { id }, data })

    const permissions = ["update"]

    const { previous, result, error } = await _executeQuery({
      id,
      data,
      validator,
      query,
      permissions,
      callback
    })

    if (_isUndefined(error)) {
      broadcastPatch(socket, generateCharacterPatch(previous, result))
    }
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
      console.error(error)

      callback({ error })
      return { error }
    }
  }

  async function _authorize(permissions) {
    if (_isNil(socket.data?.user)) {
      throw new AuthError("You must be signed in to modify characters.")
    }

    const permitted = await checkPermission(
      socket.data?.user?.id,
      "character",
      permissions
    )

    if (!permitted) {
      throw new AuthError(
        `${socket.data.user.username} isn't allowed to modify characters.`,
        { resource: "character", permissions }
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
      validId = validateId(id)

      // on update/delete
      previous = await prisma.character.findUnique({ where: { id: validId } })
    }

    if (data) {
      validData = validator(data)
    }

    const result = await query({ id: validId, data: validData })
    return { previous, result }
  }
}

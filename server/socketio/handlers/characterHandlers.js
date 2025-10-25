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

  async function deleteCharacter(token, id, callback) {
    const query = ({ id }) => prisma.character.delete({ where: { id } })
    const mutator = (rawResult) => _pick(rawResult, ["id"])

    const { previous, error } = await _executeQuery({
      token,
      id,
      query,
      mutator,
      callback
    })

    if (_isUndefined(error)) {
      broadcastPatch(socket, generateCharacterPatch(previous, {}))
    }
  }

  async function createCharacter(token, payload, callback) {
    const data = addPlainTextAttributes(payload)

    const validator = (character) =>
      createCharacterSchema.validateSync(character)

    const query = ({ data }) => prisma.character.create({ data })

    const { previous, result, error } = await _executeQuery({
      token,
      data,
      validator,
      query,
      callback
    })

    if (_isUndefined(error)) {
      broadcastPatch(socket, generateCharacterPatch(previous, result))
    }
  }

  async function updateCharacter(token, id, payload, callback) {
    const data = addPlainTextAttributes(payload)

    const validator = (character) =>
      updateCharacterSchema.validateSync(character)

    const query = ({ id, data }) =>
      prisma.character.update({ where: { id }, data })

    const { previous, result, error } = await _executeQuery({
      token,
      id,
      data,
      validator,
      query,
      callback
    })

    if (_isUndefined(error)) {
      broadcastPatch(socket, generateCharacterPatch(previous, result))
    }
  }

  async function _executeQuery({
    token,
    id,
    data,
    validator,
    query,
    mutator = _identity,
    callback
  }) {
    try {
      const { previous, result: rawResult } = await _validateAndQuery({
        token,
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

  async function _validateAndQuery({
    token = null,
    id = null,
    data = null,
    validator = _identity,
    query = _noop
  }) {
    if (token) {
      await isAuthenticated(socket, token)
    }

    let validId, validData
    let previous = {}

    if (id) {
      validId = validateId(id)

      // on update/delete
      if (token) {
        previous = await prisma.character.findUnique({ where: { id: validId } })
      }
    }

    if (data) {
      validData = validator(data)
    }

    const result = await query({ id: validId, data: validData })
    return { previous, result }
  }
}

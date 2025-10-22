export function registerCharacterHandlers(io, socket) {
  socket.on("character:create", createCharacter)
  socket.on("character:read", readCharacter)
  socket.on("character:update", updateCharacter)
  socket.on("character:delete", deleteCharacter)
  socket.on("character:list", listCharacters)
  socket.on("character:lock", lockCharacter)
  socket.on("character:unlock", unlockCharacter)

  async function readCharacter(id, callback) {
    const query = ({ id }) => prisma.character.findUnique({ where: { id } })
    await executeQuery({ id, query, callback })
  }

  async function listCharacters(callback) {
    const query = () =>
      prisma.character.findMany({ orderBy: [{ createdAt: "asc" }] })

    const mutator = reshapeCharacters
    await executeQuery({ query, mutator, callback })
  }

  async function deleteCharacter(token, id, callback) {
    const query = ({ id }) => prisma.character.delete({ where: { id } })
    const { previous, error } = await executeQuery({ token, id, query, callback })

    if (_isUndefined(error)) {
      broadcastPatch(io, socket, generateCharacterPatch(previous, {}))
    }
  }

  async function createCharacter(token, payload, callback) {
    const data = addPlainTextAttributes(payload)
    
    const validator = (character) =>
      createCharacterSchema.validateSync(character)
    
    const query = ({ data }) => prisma.character.create({ data })

    const { previous, result, error } = await executeQuery({
      token,
      data,
      validator,
      query,
      callback
    })

    if (_isUndefined(error)) {
      broadcastPatch(io, socket, generateCharacterPatch(previous, result))
    }
  }

  async function updateCharacter(token, id, payload, callback) {
    const data = addPlainTextAttributes(payload)
    
    const validator = (character) =>
      updateCharacterSchema.validateSync(character)
    
    const query = ({ id, data }) =>
      prisma.character.update({ where: { id }, data })
    
    const { previous, result, error } = await executeQuery({
      token,
      id,
      data,
      validator,
      query,
      callback
    })

    if (_isUndefined(error)) {
      broadcastPatch(io, socket, generateCharacterPatch(previous, result))
    }
  }

  async function lockCharacter(token, id, callback) {
    const data = {
      locked: true,
      lockedAt: new Date(),
      lockedBy: socket.data.user.username
    }
    
    const query = ({ id, data }) =>
      prisma.character.update({ where: { id }, data })

    const { previous, result, error } = await executeQuery({
      token,
      id,
      data,
      query,
      callback
    })

    if (_isUndefined(error)) {
      broadcastPatch(io, socket, generateCharacterPatch(previous, result))
    }
  }

  async function unlockCharacter(token, id, callback) {
    const data = {
      locked: false,
      lockedAt: null,
      lockedBy: null
    }
    
    const query = ({ id, data }) =>
      prisma.character.update({ where: { id }, data })

    const { previous, result, error } = await executeQuery({
      token,
      id,
      data,
      query,
      callback
    })

    if (_isUndefined(error)) {
      broadcastPatch(io, socket, generateCharacterPatch(previous, result))
    }
  }

  async function executeQuery({
    token,
    id,
    data,
    validator,
    query,
    mutator = _identity,
    callback
  }) {
    try {
      const { previous, result: rawResult } = await validateAndQuery({
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

  async function validateAndQuery({
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

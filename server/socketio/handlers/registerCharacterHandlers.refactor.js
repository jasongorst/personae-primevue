export function registerCharacterHandlers(io, socket) {
  socket.on("character:create", createCharacter)
  socket.on("character:read",  readCharacter)
  socket.on("character:update", updateCharacter)
  socket.on("character:delete", deleteCharacter)
  socket.on("character:list", listCharacters)
  socket.on("character:lock", lockCharacter)
  socket.on("character:unlock", unlockCharacter)

  async function readCharacter(id, callback) {
    try {
      const validId = validateId(id)
      const data = await prisma.character.findUnique({ where: { id: validId } })
      callback({ data })
    } catch (error) {
      callback({ error })
    }
  }

  async function listCharacters(callback) {
    try {
      const data = reshapeCharacters(
        await prisma.character.findMany({ orderBy: [{ createdAt: "asc" }] })
      )

      callback({ data })
    } catch (error) {
      callback({ error })
    }
  }

  async function createCharacter(token, payload, callback) {
    const schema = createCharacterSchema
    const query = ({ payload }) => {
      prisma.character.create({ data: payload })
    }

    try {
      const { result } = await applyQuery({ token, payload: addPlainTextAttributes(payload), query, schema })
      callback({ data: result })
      broadcastPatch(io, socket, addCharacterPatch(result))
    } catch (error) {
      callback({ error })
    }
  }

  async function deleteCharacter(token, id, callback) {
    const query = ({ id }) => {
      prisma.character.delete({ where: { id } })
    }

    try {
      const { result } = await applyQuery({ token, id, query })
      callback({ data: result })
      broadcastPatch(io, socket, removeCharacterPatch(result))
    } catch (error) {
      callback({ error })
    }
 }

  async function updateCharacter(token, id, payload, callback) {
    await modifyCharacter(token, id, addPlainTextAttributes(payload), callback)
  }

  async function lockCharacter(token, id, callback) {
    const payload = { locked: true, lockedAt: new Date(), lockedBy: socket.data.user.username }
    await modifyCharacter(token, id, payload, callback)
  }

  async function unlockCharacter(token, id, callback) {
    const payload = { locked: false, lockedAt: null, lockedBy: null}
    await modifyCharacter(token, id, payload, callback)
  }

  async function modifyCharacter(token, id, payload, callback) {
    const query = ({ id, payload }) => {
      prisma.character.update({ where: { id }, data: payload })
    }

    try {
      const { previous, result } = await applyQuery({ token, id, payload, query })
      callback({ data: result })
      broadcastPatch(io, socket, replaceCharacterPatch(previous, result))
    } catch (error) {
      callback({ error })
    }
  }

  async function applyQuery({ token, id = null, payload = null, query, schema = updateCharacterSchema }) {
    await isAuthenticated(socket, token)
    let validId, validPayload, previous, result

    if (id) {
      validId = validateId(id)
      previous = await prisma.character.findUnique({ where: { id: validId } })
    }

    if (payload) {
      validPayload = schema.validateSync(payload)
    }

    result = await query({ id: validId, payload: validPayload })

    return { previous, result }
  }
}

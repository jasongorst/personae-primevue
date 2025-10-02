export function registerCharacterHandlers(io, socket) {
  socket.on("character:create", createCharacter)
  socket.on("character:read",  readCharacter)
  socket.on("character:update", updateCharacter)
  socket.on("character:delete", deleteCharacter)
  socket.on("character:list", listCharacters)
  socket.on("character:lock", lockCharacter)
  socket.on("character:unlock", unlockCharacter)

  async function createCharacter(token, payload, callback) {
    if (!(await isAuthenticated(socket, callback, token))) {
      return
    }
    
    let validated, created
    
    try {
      validated = createCharacterSchema.validateSync(payload)
    } catch (error) {
      callback({ error })
      return
    }
    
    const augmented = addPlainTextAttributes(validated)

    try {
      created = await prisma.character.create({ data: augmented })
    } catch (error) {
      callback({ error })
      return
    }

    callback({ data: created })
    broadcastPatch(io, socket, addCharacterPatch(created))
  }

  async function readCharacter(id, callback) {
    const { validId, error } = validateId(id)

    if (error) {
      callback({ error })
      return
    }

    let character

    try {
      character = await prisma.character.findUnique({ where: { id: validId } })
    } catch (error) {
      callback({ error })
      return
    }

    callback({ data: character })
  }

  async function updateCharacter(token, id, payload, callback) {
    if (!(await isAuthenticated(socket, callback, token))) {
      return
    }
    
    const { validId, error } = validateId(id)

    if (error) {
      callback({ error })
      console.error("[updateCharacter validateId]", error)
      return
    }

    let validated, previous, updated

    try {
      validated = updateCharacterSchema.validateSync(payload)
    } catch (error) {
      callback({ error })
      console.error("[updateCharacter validate]", error)
      return
    }
    
    try {
      previous = await prisma.character.findUnique({ where: { id: validId }})
    } catch (error) {
      callback({ error })
      console.error("[updateCharacter previous]", error)
      return
    }
    
    const augmented = addPlainTextAttributes(validated)

    try {
      updated = await prisma.character.update({ where: { id: validId }, data: augmented })
    } catch (error) {
      callback({ error })
      console.error("[updateCharacter update]", error)
      return
    }

    callback({ data: updated })
    
    broadcastPatch(io, socket, replaceCharacterPatch(previous, updated))
 }

  async function deleteCharacter(token, id, callback) {
    if (!(await isAuthenticated(socket, callback, token))) {
      return
    }
    
    const { validId, error } = validateId(id)

    if (error) {
      callback({ error })
      return
    }

    try {
      await prisma.character.delete({ where: { id: validId } })
    } catch (error) {
      callback({ error })
      return
    }

    callback({ data: { id: validId } })
    broadcastPatch(io, socket, removeCharacterPatch(validId))
 }

  async function listCharacters(callback) {
    const { data, error } = await readCharacters()

    if (error) {
      callback({ error })
      return
    }
    
    callback({ data })
  }

  async function lockCharacter(token, id, callback) {
    if (!(await isAuthenticated(socket, callback, token))) {
      return
    }
    
    const { validId, error } = validateId(id)

    if (error) {
      callback({ error })
      return
    }

    let locked

    try {
      locked = await prisma.character.update({
        where: { id: validId },
        data: { lock: true, lockedAt: Date.now() }
      })
    } catch (error) {
      callback({ error })
      return
    }

    callback({ data: locked.lockedAt })
    // socket.broadcast.emit("character:lock", validId, locked.lockedAt)
  }

  async function unlockCharacter(token, id, callback) {
    if (!(await isAuthenticated(socket, callback, token))) {
      return
    }
    
    const { validId, error } = validateId(id)

    if (error) {
      callback({ error })
      return
    }

    try {
      await prisma.character.update({
        where: { id: validId },
        data: { lock: false, lockedAt: null }
      })
    } catch (error) {
      callback({ error })
      return
    }

    callback({ data: validId })
    // socket.broadcast.emit("character:unlock", validId)
  }
  
  async function readCharacters() {
    let data, error
    
    try {
      data = reshapeCharacters(
        await prisma.character.findMany({ orderBy: [{ createdAt: "asc" }] })
      )
    } catch (err) {
      error = err
    }
    
    return { data, error }
  }
}

export function registerCharacterHandlers(socket) {
  socket.on("character:create", createCharacter)
  socket.on("character:read",  readCharacter)
  socket.on("character:update", updateCharacter)
  socket.on("character:delete", deleteCharacter)
  socket.on("character:list", listCharacters)
  socket.on("character:lock", lockCharacter)
  socket.on("character:unlock", unlockCharacter)

  async function createCharacter(payload, callback) {
    let character, created

    console.log("[createCharacter payload]", payload)

    try {
      character = characterSchema.validateSync(payload)
      console.log("[createCharacter validated]", character)
    } catch (error) {
      callback({ error })
      return
    }

    try {
      created = await prisma.character.create({ data: character })
      console.log("[createCharacter created]", created)
    } catch (error) {
      callback({ error })
      return
    }

    callback({ data: created })

    const patch = addCharacterPatch(created)
    console.log("[createCharacter patch]", patch)
    // noinspection JSCheckFunctionSignatures
    socket.broadcast.emit("character:patch", patch)
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

  async function updateCharacter(id, payload, callback) {
    const { validId, error } = validateId(id)

    if (error) {
      callback({ error })
      return
    }

    let character, updated

    try {
      character = characterSchema.validateSync(payload)
      console.log("[updateCharacter validated]", character)
    } catch (error) {
      callback({ error })
      return
    }

    try {
      updated = await prisma.character.update({ where: { id: validId }, data: character })
      console.log("[updateCharacter updated]", updated)
    } catch (error) {
      console.error(error)
      callback({ error })
      return
    }

    callback({ data: updated })

    const patch = replaceCharacterPatch(validId, character)
    console.log("[updateCharacter patch]", patch)
    // noinspection JSCheckFunctionSignatures
    socket.broadcast.emit("character:patch", patch)
 }

  async function deleteCharacter(id, callback) {
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
    // noinspection JSCheckFunctionSignatures
    socket.broadcast.emit("character:patch", removeCharacterPatch(validId))
 }

  async function listCharacters(callback) {
    let characters

    try {
      characters = reshapeCharacters(
        await prisma.character.findMany({ orderBy: [{ createdAt: "asc" }] })
      )
    } catch (error) {
      callback({ error })
      return
    }

    callback({ data: characters })
  }

  async function lockCharacter(id, callback) {
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

  async function unlockCharacter(id, callback) {
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
}

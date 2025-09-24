export default async function broadcastPatch(socket, patch) {
  let created
  
  try {
    created = await prisma.patch.create({ data: patch })
  } catch (error) {
    return { error }
  }
  
  // noinspection JSCheckFunctionSignatures
  socket.broadcast.emit("character:patch", { timestamp: created.createdAt, patch })
}

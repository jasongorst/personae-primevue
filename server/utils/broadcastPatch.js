export default function broadcastPatch(io, socket, patch) {
  // noinspection JSCheckFunctionSignatures
  socket.broadcast.emit("character:patch", patch)
}

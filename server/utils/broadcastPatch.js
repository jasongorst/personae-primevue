export default function broadcastPatch(socket, patch) {
  // noinspection JSCheckFunctionSignatures
  socket.broadcast.emit("character:patch", patch)
}

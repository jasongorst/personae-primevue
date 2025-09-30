export async function authMiddleware(socket, next) {
  socket.data = { token: await authenticateSocket(socket) }
  next()
}

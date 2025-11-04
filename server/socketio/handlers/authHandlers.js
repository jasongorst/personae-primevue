export function authHandlers(io, socket) {
  socket.on("auth:submitToken", submitToken)
  socket.on("auth:revokeToken", revokeToken)

  async function submitToken(token, callback) {
    try {
      socket.data = await authenticateToken(token)
      console.log("[auth:submitToken]", socket.data)

      callback({ authenticated: true })
    } catch (error) {
      console.error(error)
      callback({ error })
    }
  }

  function revokeToken(callback) {
    socket.data = { token: null, user: null }
    console.log("[auth:revokeToken]", socket.data)

    callback({ authenticated: false })
  }
}

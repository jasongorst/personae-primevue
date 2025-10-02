export async function authMiddleware(socket, next) {
  const token = socket.handshake.auth.token
  
  if (token) {
    try {
      socket.data = await authenticateToken(token)
    } catch (error) {
      console.error("[authMiddleware]", error)
      socket.data = { token: null, user: null }
    }
    
  }
  
  next()
}

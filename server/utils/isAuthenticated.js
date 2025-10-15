export default async function isAuthenticated(socket, callback, token) {
  // mutates socket.data
  // returns true after successful auth
  if (_isNil(token)) {
    callback({ error: "missing token" })
    return false
  }
  
  socket.data = await authenticateToken(token)
  
  if (_isNull(socket.data.token)) {
    callback({ error: "invalid token" })
    return false
  }
  
  return true
}

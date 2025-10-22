export default async function isAuthenticated(socket, token) {
  // mutates socket.data
  if (_isNil(token) || _isEmpty(token)) {
    throw Error("missing token")
  }

  socket.data = await authenticateToken(token)

  if (_isNull(socket.data.token)) {
    throw Error("invalid token")
  }

  return true
}

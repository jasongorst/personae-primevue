import { isNil, isNull } from "lodash-es"

// mutates socket.data
// returns true after successful auth
export default async function isAuthenticated(socket, callback, token) {
  if (isNil(token)) {
    callback({ error: "missing token" })
    return false
  }
  
  socket.data = await authenticateToken(token)
  
  if (isNull(socket.data.token)) {
    callback({ error: "invalid token" })
    return false
  }
  
  return true
}

import { isEmpty, isNil, isNull } from "lodash-es"

export default async function isAuthenticated(socket, token) {
  // mutates socket.data
  if (isNil(token) || isEmpty(token)) {
    throw Error("missing token")
  }
  
  socket.data = await authenticateToken(token)
  
  if (isNull(socket.data.token)) {
    throw Error("invalid token")
  }
  
  return true
}

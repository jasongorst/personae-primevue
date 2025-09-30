// import { pick } from "lodash-es"

export default async function authenticateSocket(socket) {
  const config = useRuntimeConfig()
  let token = null
  // let user = null

  try {
    const session = await $fetch(
      "/session", {
        baseURL: config.auth.baseUrl,
        headers: {
          Authorization: socket.handshake.auth.token
        }
      }
    )
    
    // noinspection JSUnresolvedReference
    token = `Bearer ${session.access_token}`
    // user = pick(session, [ "username", "email", "admin" ])
  } catch (error) {
    if (error.statusCode === 401) {
      console.error("[validateToken 401]", error)
    } else if (error.statusCode === 409) {
      console.error("[validateToken 409]", error)
    } else {
      console.error("[validateToken other]", error)
    }
  }
  
  // return { token, user }
  return token
}

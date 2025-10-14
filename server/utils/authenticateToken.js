export default async function authenticateToken(token) {
  const config = useRuntimeConfig()
  let validatedToken = null
  let user = null

  try {
    const session = await $fetch(
      "/session", {
        baseURL: config.auth.baseUrl,
        headers: {
          Authorization: token
        }
      }
    )
    
    // noinspection JSUnresolvedReference
    validatedToken = `Bearer ${session.access_token}`
    user = _pick(session, [ "username", "email", "admin" ])
  } catch (error) {
    if (error.statusCode === 401) {
      console.error("[authenticateJWT 401]", error)
      throw error
    } else if (error.statusCode === 409) {
      console.error("[authenticateJWT 409]", error)
      throw error
    } else {
      console.error("[authenticateJWT other]", error)
      throw error
    }
  }
  
  return { token: validatedToken, user }
}

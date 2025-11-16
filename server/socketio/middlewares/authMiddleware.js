// noinspection JSUnusedGlobalSymbols
export async function authMiddleware(socket, next) {
  // noinspection JSUnresolvedReference
  const session = await auth.api.getSession({
    headers: socket.handshake.headers
  })

  if (session) {
    // access the session.session && session.user
    socket.data = {
      session: session.session,
      user: session.user
    }
  }

  next()
}

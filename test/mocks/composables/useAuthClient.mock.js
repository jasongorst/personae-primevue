import { mockNuxtImport } from "@nuxt/test-utils/runtime"

const emptyUuid = "00000000-0000-0000-0000-000000000000"
const now = new Date()
const years = 365 * 24 * 60 * 60 * 1000

const user = {
  name: "Test User",
  email: "test@example.com",
  role: "user",
  username: "test",
  id: emptyUuid
}

const session = {
  token: "0".repeat(32),
  userId: user.id,
  id: emptyUuid,
  createdAt: now,
  updatedAt: now,
  expiresAt: new Date().setTime(now.getTime() + 20 * years)
}

mockNuxtImport("useAuthClient", () => {
  return () => {
    return {
      user: ref(user),
      session: ref(session),
      isSignedIn: ref(true),
      signIn: () => null,
      signUp: () => null,
      signOut: () => null,
      fetchSession: () => ({ session, user }),
      authClient: {}
    }
  }
})

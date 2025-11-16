import { createAuthClient } from "better-auth/client"
import { adminClient, inferAdditionalFields } from "better-auth/client/plugins"
import { additionalFields } from "../../server/utils/auth/additionalFields.js"
import { ac, admin as adminRole, user as userRole } from "../../server/utils/auth/permissions.js"

// noinspection JSUnusedGlobalSymbols
export default function useAuthClient() {
  const config = useRuntimeConfig()
  const headers = import.meta.server ? useRequestHeaders() : undefined

  const authClient = createAuthClient({
    fetchOptions: { headers },

    plugins: [
      adminClient({
        ac,

        roles: {
          admin: adminRole,
          user: userRole
        }
      }),

      inferAdditionalFields(additionalFields)
    ]
  })

  const defaultRedirectTo = {
    redirectGuestTo: "/",
    redirectUserTo: "/"
  }

  const redirectTo = _defaults(defaultRedirectTo, config.public.auth.redirectTo)

  const session = useState("auth:session", () => null)
  const user = useState("auth:user", () => null)
  const isSignedIn = computed(() => !!session.value)

  const fetchingSession = import.meta.server
    ? ref(false)
    : useState("auth:fetchingSession", () => false)

  async function signOut({ redirectTo } = {}) {
    // noinspection JSUnresolvedReference
    const result = await authClient.signOut()

    session.value = null
    user.value = null

    if (redirectTo) {
      await navigateTo(redirectTo)
    }

    return result
  }

  async function fetchSession() {
    if (fetchingSession.value) {
      console.log("already fetching session")
      return
    }

    fetchingSession.value = true
    // noinspection JSUnresolvedReference
    const { data } = await authClient.getSession({ fetchOptions: { headers }})

    session.value = data?.session || null
    user.value = data?.user || null
    fetchingSession.value = false

    return data
  }

  if (import.meta.client) {
    authClient.$store.listen("$sessionSignal", async (signal) => {
      if (!signal) {
        return
      }

      await fetchSession()
    })
  }

  // noinspection JSUnresolvedReference
  return {
    session,
    user,
    isSignedIn,
    signIn: authClient.signIn,
    signUp: authClient.signUp,
    signOut,
    redirectTo,
    fetchSession,
    authClient
  }
}

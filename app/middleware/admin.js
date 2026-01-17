export default defineNuxtRouteMiddleware(async () => {
  const nuxtApp = useNuxtApp()
  const { fetchSession, user } = useAuthClient()
  await fetchSession()

  if (user.value.role !== "admin") {
    return nuxtApp.runWithContext(() => {
      const toast = useToast()

      toast.add({
        severity: "danger",
        summary: "Not An Admin.",
        detail: "Only an admin can access that.",
        life: 3000
      })

      return abortNavigation()
    })
  }
})

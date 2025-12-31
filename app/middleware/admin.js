export default defineNuxtRouteMiddleware(() => {
  const { user } = useAuthClient()

  if (user.value.role !== "admin") {
    const toast = useToast()

    toast.add({
      severity: "error",
      summary: "Not An Admin.",
      detail: "Only an admin can access that.",
      life: 3000
    })

    return abortNavigation()
  }
})

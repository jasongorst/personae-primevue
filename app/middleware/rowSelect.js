export default defineNuxtRouteMiddleware((to, _) => {
  const { status } = useAuth()
  const isLoggedIn = computed(() => status.value === "authenticated")

  if (!isLoggedIn.value) {
    return navigateTo({ name: "show-id", params: { id: to.params.id } })
  }
})

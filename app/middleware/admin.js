export default defineNuxtRouteMiddleware(() => {
  const { isSignedIn, user } = useAuthClient()

  if (!isSignedIn.value || user.value.role !== "admin") {
    return abortNavigation("Not an admin.")
  }
})

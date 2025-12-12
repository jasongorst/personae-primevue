export default defineNuxtRouteMiddleware(() => {
  const { isSignedIn } = useAuthClient()

  if (!isSignedIn.value) {
    return abortNavigation("Not signed in.")
  }
})

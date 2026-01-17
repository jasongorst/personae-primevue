import SignInDialog from "~/components/SignInDialog.vue"

export default defineNuxtRouteMiddleware(async () => {
  const nuxtApp = useNuxtApp()
  const { fetchSession, isSignedIn } = useAuthClient()
  await fetchSession()

  if (!isSignedIn.value) {
    return nuxtApp.runWithContext(() => {
      const dialog = useDialog()

      useOpenDialog(dialog, SignInDialog, {
        props: {
          showHeader: true,
          pt: {
            header: "pb-0",
            pcCloseButton: {
              root: "rounded-[1em]! size-6!",
              icon: "size-3"
            }
          }
        },

        templates: {
          header: (
            <div class="flex items-center gap-2 p-0 text-warn-600 dark:text-warn-500">
              <Icon
                name="ph:warning-circle-fill"
                size="1.375rem"
              />

              <div class="text-lg font-semibold">
                You&rsquo;ll need to sign in before doing that.
              </div>
            </div>
          )
        }
      })

      return abortNavigation()
    })
  }
})

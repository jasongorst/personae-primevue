<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
// sign in
onBeforeMount(async () => {
  const toast = useToast()
  const { signIn } = useAuth()

  const credentials = {
    email: "jason@evilpaws.org",
    password: "Y.nQ!Xw.L3b9288twbh-dxY6nq7yoHp."
  }

  await signInWithPassword(credentials)

  async function signInWithPassword(values) {
    try {
      await signIn(values, { redirect: false })
    } catch (error) {
      console.log("[signIn error]", error)

      toast.add({
        severity: "error",
        summary: "Not Signed In.",
        detail: error.data?.message || error.message,
        closeable: false
      })
    }
  }
})

// register websocket handlers (client only)
if (import.meta.client) {
  useWebsocketHandlers()
}

// init charactersStore
callOnce(() => useCharactersStore().load())
</script>

<style scoped>

</style>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
// init charactersStore
const { load, patch } = useCharactersStore()
callOnce(async () => await load())

// connect to websocket
// const { status, data, send, open, close } = useWebSocket(
//   "ws://localhost:3001/ws",
//   { heartbeat: true }
// )

// sign in
const toast = useToast()
const { signIn } = useAuth()

onBeforeMount(async () => {
  const credentials = {
    email: "jason@evilpaws.org",
    password: "Y.nQ!Xw.L3b9288twbh-dxY6nq7yoHp."
  }

  await signInWithPassword(credentials)
})

async function signInWithPassword(values) {
  try {
    await signIn(values, { redirect: false })
  } catch (error) {
    console.log(error)

    toast.add({
      severity: "error",
      summary: "Not Signed In.",
      detail: error.data?.message || error.message,
      closeable: false
    })
  }
}
</script>

<style scoped>

</style>

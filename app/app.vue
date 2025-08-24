<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
// init charactersStore
const { load, patch } = useCharactersStore()
callOnce(async () => await load())

// connect to ActiveCable channel
const { vueApp } = useNuxtApp()
let $cable

const channels = {
  CharacterChannel: {
    connected() {
      console.log("[CharacterChannel connected]")
      load()
    },

    received(data) {
      data = deepParseTimestamps(deepConvertKeys(data, _camelCase))
      console.log("[CharacterChannel message]", data)

      // patch(data)
      // console.log("[patched]")
    },

    disconnected() {
      console.log("[CharacterChannel disconnected]")
    }
  }
}

onMounted(() => {
  $cable = vueApp.config.globalProperties.$cable
  // noinspection JSUnresolvedReference
  $cable.registerChannels(channels, vueApp)
  $cable.subscribe({ channel: "CharacterChannel" })
})

onUnmounted(() => {
  // noinspection JSUnresolvedReference
  $cable.unregisterChannels(channels, vueApp)
  $cable.unsubscribe("CharacterChannel")
})

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

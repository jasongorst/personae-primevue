<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
onMounted(async () => await useAutoSignIn())

// register websocket handlers (client-side only)
onMounted(() => useWebsocketHandlers())

// init charactersStore
const charactersStore = useCharactersStore()
const { isLoaded } = storeToRefs(charactersStore)
const { load } = charactersStore

if (!isLoaded) {
  await load()
}
</script>

<style scoped>

</style>

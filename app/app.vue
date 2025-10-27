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
callOnce(async () => await useCharactersStore().load())
</script>

<style scoped></style>

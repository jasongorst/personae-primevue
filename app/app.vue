<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
// register websocket handlers (client only)
if (import.meta.client) {
  useWebsocketHandlers()
}

// init charactersStore
callOnce(async () => await useCharactersStore().load())
</script>

<style scoped>

</style>

<template>
  <PiniaColadaDevtools />

  <ToastContainer />

  <ConfirmContainer />

  <DynamicDialog />

  <div class="relative">
    <NavBar />

    <NuxtPage />
  </div>
</template>

<script setup>
import { PiniaColadaDevtools } from "@pinia/colada-devtools"

// onMounted(async () => {
//   if (import.meta.dev) {
//     await useAutoSignIn()
//   }
// })

onMounted(async () => await usePrefetchCharacters())

onUnmounted(() => {
  const {
    $socketio: { socket }
  } = useNuxtApp()

  socket.removeAllListeners()
  socket.disconnect()
})
</script>

<style scoped></style>

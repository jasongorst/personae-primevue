<template>
  <div>
    <div>Status: {{ isConnected ? "connected" : "disconnected" }}</div>
    <div>Transport: {{ transport }}</div>
  </div>

  <div>
    <div>auth: {{ auth }}</div>
  </div>
</template>

<script setup>
const {
  $socketio: { socket, isConnected, transport }
} = useNuxtApp()
const { status } = useAuth()

const auth = ref(socket.auth)
watch(status, () => (auth.value = socket.auth))

onMounted(() =>
  socket.prependAny((eventName, ...args) => {
    console.log("[ws event]", eventName, args)
  })
)

onBeforeUnmount(() => socket.offAny())
</script>

<style scoped></style>

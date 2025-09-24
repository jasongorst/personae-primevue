<template>
  <div>
    <p>Status: {{ isConnected ? "connected" : "disconnected" }}</p>
    <p>Transport: {{ transport }}</p>
  </div>
</template>

<script setup>
const { $socketio: { socket, isConnected, transport } } = useNuxtApp()

onMounted(() => socket.prependAny((eventName, ...args) => {
  console.log("[ws event]", eventName, args)
}))

onBeforeUnmount(() => socket.offAny())
</script>

<style scoped>

</style>

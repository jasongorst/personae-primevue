<template>
  <div>
    <p>Status: {{ isConnected ? "connected" : "disconnected" }}</p>
    <p>Transport: {{ transport }}</p>
  </div>
</template>

<script setup>
const { socket, isConnected, transport, onConnect, onDisconnect } = useSocket({
  onConnectCallback: () => { console.log("connect callback") },
  onDisconnectCallback: () => { console.log("disconnect callback") }
})

onBeforeUnmount(() => {
  socket.off("connect", onConnect)
  socket.off("disconnect", onDisconnect)
})
</script>

<style scoped>

</style>

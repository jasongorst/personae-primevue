<template>
  <div>
    <div>status: {{ isConnected ? "connected" : "disconnected" }}</div>
    <div>transport: {{ transport }}</div>
    <div>
      <Button
        size="small"
        @click="refreshListeners"
      >
        listeners
      </Button>

      {{ listeners }}
    </div>
  </div>
</template>

<script setup>
const {
  $socketio: { socket, isConnected, transport }
} = useNuxtApp()

onMounted(() =>
  socket.prependAny((eventName, ...args) => {
    console.log("[socket.io event]", eventName, args)
  })
)

onBeforeUnmount(() => socket.offAny())

const listeners = ref(socket._callbacks)

function refreshListeners() {
  listeners.value = socket._callbacks
}
</script>

<style scoped></style>

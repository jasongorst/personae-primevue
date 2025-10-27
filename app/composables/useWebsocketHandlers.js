export default function useWebsocketHandlers() {
  const {
    $socketio: { socket }
  } = useNuxtApp()
  const { applyPatch } = useCharactersStore()

  // connection state recovery
  socket.on("connect", async () => {
    if (socket.recovered) {
      // any event missed during the disconnection period will be received now
    } else {
      // new or unrecoverable session
      await useCharactersStore().load()
    }
  })

  socket.on("character:patch", (patch) => {
    console.log("[character:patch]", patch)

    // applyPatch(patch)
  })

  onUnmounted(() => socket.removeAllListeners())
}

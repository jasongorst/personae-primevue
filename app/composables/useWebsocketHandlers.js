export default function useWebsocketHandlers() {
  const { $socketio: { socket } } = useNuxtApp()
  const { applyPatch } = useCharactersStore()

  // socket.on("character:patch", ({ timestamp, patch }) => {
  socket.on("character:patch", (patch) => {
    applyPatch(patch)
    // socket.auth.offset = timestamp
  })

  onBeforeUnmount(() => {
    socket.off("connect")
    socket.off("disconnect")

    socket.off("character:patch")
  })
}

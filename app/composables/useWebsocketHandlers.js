export default function useWebsocketHandlers() {
  const { $socketio } = useNuxtApp()
  const { socket } = $socketio
  const { applyPatch } = useCharactersStore()

  socket.on("character:patch", (patch) => {
    console.log(["character:patch"], patch)
    applyPatch(patch)
  })

  onBeforeUnmount(() => {
    socket.off("connect")
    socket.off("disconnect")

    socket.off("character:patch")
  })
}

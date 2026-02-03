export default function useHandlers() {
  const {
    $socketio: { socket }
  } = useNuxtApp()

  const { applyPatch } = useCharactersStore()

  socket.on("character:patch", (patch) => {
    console.log("[character:patch]", patch)

    applyPatch(patch)
  })
}

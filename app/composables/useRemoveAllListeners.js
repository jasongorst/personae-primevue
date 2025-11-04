export default function useRemoveAllListeners() {
  const {
    $socketio: { socket }
  } = useNuxtApp()

  socket.removeAllListeners()
}

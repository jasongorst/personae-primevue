export default async function useEmit(event, ...params) {
  const {
    $socketio: { socket }
  } = useNuxtApp()

  const { data, error } = await socket.emitWithAck(event, ...params)

  if (error) {
    console.error("[useEmit] [error]", event, params, error)

    throw new Error(error)
  }

  return data
}

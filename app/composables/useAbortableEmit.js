export default async function useAbortableEmit(event, ...params) {
  let abortSignal

  if (_has(_last(params), "signal")) {
    abortSignal = _last(params).signal
    params = _initial(params)
  }

  abortSignal?.throwIfAborted()

  abortSignal?.addEventListener("abort", () => {
    throw new DOMException(abortSignal?.reason, "AbortError" )
  })

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

import { io } from "socket.io-client"

export default function useSocket({
  onConnectCallback = _noop,
  onDisconnectCallback = _noop
} = {}) {
  const socket = io()
  const isConnected = ref(false)
  const transport = ref("N/A")
  
  if (socket.connected) {
    onConnect()
  }
  
  function onConnect() {
    isConnected.value = true
    transport.value = socket.io.engine.transport.name
  
    socket.io.engine.on("upgrade", (rawTransport) => {
      transport.value = rawTransport.name
    })
    
    onConnectCallback()
  }
  
  function onDisconnect() {
    isConnected.value = false
    transport.value = "N/A"
    
    onDisconnectCallback()
  }
  
  socket.on("connect", onConnect)
  socket.on("disconnect", onDisconnect)
  
  return {
    socket,
    isConnected,
    transport,
    onConnect,
    onDisconnect
  }
}

import { io } from "socket.io-client"

export default defineNuxtPlugin({
  name: "socketio",
  enforce: "pre",

  async setup () {
    const config = useRuntimeConfig()

    const socket = io(config.public.websocketHost, { transports: [ "polling", "websocket" ] })
    const isConnected = ref(false)
    const transport = ref("N/A")

    if (socket.connected) {
      onConnect()
    }

    socket.on("connect", onConnect)
    socket.on("disconnect", onDisconnect)

    function onConnect() {
      isConnected.value = true
      transport.value = socket.io.engine.transport.name

      socket.io.engine.on("upgrade", (rawTransport) => {
        transport.value = rawTransport.name
      })
    }

    function onDisconnect() {
      isConnected.value = false
      transport.value = "N/A"
    }

    return {
      provide: {
        socketio: { socket, isConnected, transport }
      }
    }
  },

  hooks: {
    "app:rendered"() {
      if (import.meta.server) {
        const { $socketio } = useNuxtApp()
        const { socket } = $socketio
        
        socket.off("connect")
        socket.off("disconnect")
      }
    }
  },

  env: {
    // Set this value to `false` if you don't want the plugin to run when rendering server-only or island components.
    islands: false
  }
})

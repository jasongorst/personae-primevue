import { io } from "socket.io-client"

// noinspection JSUnusedGlobalSymbols
export default defineNuxtPlugin({
  name: "socketio",
  enforce: "pre",

  async setup() {
    const config = useRuntimeConfig()
    const socket = io(config.public.websocketHost)

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

      socket.off("connect")
      socket.off("disconnect")
    }

    return {
      provide: {
        socketio: { socket, isConnected, transport }
      }
    }
  },

  hooks: {
    "app:mounted": () => {
      const {
        $socketio: { socket }
      } = useNuxtApp()

      useWebsocketHandlers()

      console.log("[listeners]")

      _forIn(socket._callbacks, (callbacks, event) => {
        console.log(`${event}`, callbacks)
      })
    }
  },

  env: {
    // Set this value to `false` if you don't want the plugin to run when rendering server-only or island components.
    islands: true
  }
})

import { io } from "socket.io-client"

export default defineNuxtPlugin({
  name: "socketio",
  enforce: "pre",

  async setup() {
    const config = useRuntimeConfig()
    const { status, token } = useAuth()
    const isSignedIn = computed(() => status.value === "authenticated")

    const socket = io(config.public.websocketHost, {
      auth: { token: isSignedIn.value ? token.value : null }
    })

    const isConnected = ref(false)
    const transport = ref("N/A")

    if (socket.connected) {
      await onConnect()
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

      // socket.on("connect", () => {
      //   if (socket.recovered) {
      //     console.log("[recovered connection]")
      //   } else {
      //     console.log("[new connection]")
      //   }
      // })

      const { status, token } = useAuth()

      watch(status, async (newValue) => {
        let response

        // update token on auth status change
        switch (newValue) {
          case "authenticated":
            response = await socket.emitWithAck("auth:submitToken", token.value)
            socket.auth.token = token.value
            console.log("[auth:submitToken]", response)
            break
          case "unauthenticated":
            response = await socket.emitWithAck("auth:revokeToken")
            socket.auth.token = null
            console.log("[auth:revokeToken]", response)
            break
          default:
            return
        }
      })

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

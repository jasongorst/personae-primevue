import { io } from "socket.io-client"

export default defineNuxtPlugin({
  name: "socketio",
  enforce: "pre",

  async setup() {
    const config = useRuntimeConfig()
    const { status, token} = useAuth()
    const isSignedIn = computed(() => status.value === "authenticated")

    const opts = { auth: {} }

    if (isSignedIn.value) {
      opts.auth.token = token.value
    } else {
      opts.auth.token = null
    }

    const socket = io(config.public.websocketHost, opts)
    const isConnected = ref(false)
    const transport = ref("N/A")

    if (socket.connected) {
      await onConnect()
    }

    socket.on("connect", onConnect)
    socket.on("disconnect", onDisconnect)

    watch(status, async (newValue) => {
      if (newValue !== "loading") {
        if (newValue === "authenticated") {
          socket.auth = { token: token.value }
        } else {
          socket.auth = { token: null }
        }

        // force reconnect
        console.log("[auth status change, reconnecting]")
        socket.disconnect().connect()
      }
    })

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

  hooks: {},

  env: {
    // Set this value to `false` if you don't want the plugin to run when rendering server-only or island components.
    islands: true
  }
})

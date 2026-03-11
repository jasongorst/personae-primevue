import { io } from "socket.io-client"

const LOG_CONNECTIONS = false
const LOG_EVENTS = false
const LOG_LISTENERS = false
const LOG_HOOKS = false

// noinspection JSUnusedGlobalSymbols
export default defineNuxtPlugin({
  name: "socketio",
  enforce: "pre",

  async setup() {
    const { isSignedIn, user } = useAuthClient()
    const config = useRuntimeConfig()
    const socket = io(config.public.websocketHost)

    const isConnected = ref(false)
    const transport = ref("N/A")

    if (socket.connected) {
      onConnect()
    }

    socket.on("connect", onConnect)
    socket.on("disconnect", onDisconnect)

    if (LOG_EVENTS) {
      // log all outgoing events
      socket.onAnyOutgoing((eventName, ...args) =>
        console.log("[app socketio] [outgoing]", eventName, args)
      )
    }

    function onConnect() {
      isConnected.value = true
      transport.value = socket.io.engine.transport.name

      socket.io.engine.on("upgrade", (rawTransport) => {
        transport.value = rawTransport.name
      })

      if (LOG_CONNECTIONS) {
        console.log(
          "[app socketio] [onConnect]",
          import.meta.server ? "server" : "client",
          transport.value,
          isSignedIn.value ? user.value.username : ""
        )
      }
    }

    function onDisconnect() {
      if (LOG_CONNECTIONS) {
        console.log(
          "[app socketio] [onDisconnect]",
          import.meta.server ? "server" : "client",
          transport.value,
          isSignedIn.value ? user.value.username : ""
        )
      }

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
      if (LOG_HOOKS) {
        console.log(
          "[app socketio] [app:mounted]",
          import.meta.server ? "server" : "client"
        )
      }

      const {
        $socketio: { socket }
      } = useNuxtApp()

      useEventHandlers()

      if (LOG_LISTENERS) {
        console.log("[listeners]")

        _forIn(socket._callbacks, (callbacks, event) => {
          console.log(`${event}`, callbacks)
        })
      }

      // reconnect on signin/signout
      watch(useAuthClient().isSignedIn, () => socket.disconnect().connect())
    },

    "app:rendered": () => {
      if (LOG_HOOKS) {
        console.log(
          "[app socketio] [app:rendered]",
          import.meta.server ? "server" : "client"
        )
      }

      useNuxtApp().$socketio.socket.disconnect()
    }
  },

  env: {
    // Set this value to `false` if you don't want the plugin to run when rendering server-only or island components.
    islands: true
  }
})

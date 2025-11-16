// noinspection JSAccessibilityCheck,JSUndefinedPropertyAssignment,JSUnresolvedReference

import { Server as Engine } from "engine.io"
import { Server } from "socket.io"
import * as middlewares from "../socketio/middlewares"
import * as handlers from "../socketio/handlers"

export default defineNitroPlugin((nitroApp) => {
  const engine = new Engine()

  const io = new Server({
    serveClient: false,

    // connectionStateRecovery: {
    //   maxDisconnectionDuration: 2 * 60 * 1000,
    //   skipMiddlewares: false
    // }
  })

  io.bind(engine)

  // middlewares
  _forOwn(
    middlewares,
    (middleware) => io.use(middleware)
  )

  nitroApp.hooks.hook("request", (event) => {
    // expose server instance
    event.context.io = io
  })

  io.on("connection", async (socket) => {
    // register handlers
    _forOwn(
      handlers,
      (handler) => handler(io, socket)
    )

    // log all incoming events
    // socket.onAny((eventName, ...args) =>
    //   console.log(eventName, ..._initial(args))
    // )

    // log all outgoing events
    // socket.onAnyOutgoing((eventName, ...args) => console.log(eventName, args))

    console.log(
      "[connection]",
      socket.id,
      socket.data.user?.username ?? "unauthenticated"
    )

    console.log("[# connected]", io.of("/").sockets.size)
  })

  nitroApp.router.use(
    "/socket.io/",
    defineEventHandler({
      handler(event) {
        engine.handleRequest(event.node.req, event.node.res)
        event._handled = true
      },

      websocket: {
        open(peer) {
          engine.prepare(peer._internal.nodeReq)
          engine.onWebSocket(
            peer._internal.nodeReq,
            peer._internal.nodeReq.socket,
            peer.websocket
          )
        }
      }
    })
  )
})

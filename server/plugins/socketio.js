// noinspection JSAccessibilityCheck,JSUndefinedPropertyAssignment,JSUnresolvedReference

import { Server as Engine } from "engine.io"
import { Server } from "socket.io"
import * as middlewares from "../socketio/middlewares"
import * as handlers from "../socketio/handlers"

const LOG_CONNECTIONS = false
const LOG_EVENTS = false

export default defineNitroPlugin((nitroApp) => {
  const engine = new Engine()

  const io = new Server({
    serveClient: false

    // connectionStateRecovery: {
    //   maxDisconnectionDuration: 2 * 60 * 1000,
    //   skipMiddlewares: false
    // }
  })

  io.bind(engine)

  // register middlewares
  _forOwn(middlewares, (middleware) => io.use(middleware))

  // expose server instance
  nitroApp.hooks.hook("request", (event) => (event.context.io = io))

  io.on("connection", async (socket) => {
    // register handlers
    _forOwn(handlers, (handler) => handler(io, socket))

    if (LOG_CONNECTIONS) {
      // log connection
      console.log(
        "[server socketio] [connection]",
        socket.id,
        socket.data.user?.username ?? "unauthenticated"
      )

      console.log(
        "[server socketio] [# connected]",
        io.of("/").sockets.size
      )

      socket.on("disconnect", (reason) => {
        console.log(
          "[server socketio] [disconnect]",
          reason,
          socket.id,
          socket.data.user?.username ?? "unauthenticated"
        )
      })
    }

    if (LOG_EVENTS) {
      // log all incoming events
      socket.onAny((eventName, ...args) =>
        console.log("[server socketio] [incoming]", eventName, ..._initial(args))
      )

      // log all outgoing events
      socket.onAnyOutgoing((eventName, ...args) =>
        console.log("[server socketio] [outgoing]", eventName, args)
      )
    }
  })

  nitroApp.router.use(
    "/socket.io/",

    defineEventHandler({
      handler: (event) => {
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

// noinspection JSAccessibilityCheck,JSUndefinedPropertyAssignment,JSUnresolvedReference

import { Server as Engine } from "engine.io"
import { Server } from "socket.io"
import { registerCharacterHandlers } from "../handlers"

export default defineNitroPlugin((nitroApp) => {
  const engine = new Engine()

  const io = new Server({
    serveClient: false,

    connectionStateRecovery: {
      maxDisconnectionDuration: 2 * 60 * 1000, // 2 hours
      skipMiddlewares: true
    }
  })

  io.bind(engine)

  nitroApp.hooks.hook("request", (event) => {
    // expose server instance
    event.context.io = io
  })

  io.on("connection", async (socket) => {
    console.log("[connection]", socket.id)

    // // delivery guarantee
    // const offset = socket.handshake.auth.offset
    //
    // if (offset) {
    //   // this is a reconnection
    //   const missedEvents = await prisma.patch.prisma.user.findMany({
    //     where: { createdAt: { gt: offset } }
    //   })
    //
    //   for (const event of missedEvents) {
    //     socket.emit("character:patch", { timestamp: event.createdAt, patch: event.patch })
    //   }
    // } else {
    //   // this is a first connection
    // }

    registerCharacterHandlers(socket)

    socket.onAny((eventName, ...args) => console.log(eventName, args))
    socket.onAnyOutgoing((eventName, ...args) => console.log(eventName, args))

    // if (socket.recovered) {
    //   // recovery was successful: socket.id, socket.rooms and socket.data were restored
    // } else {
    //   // new or unrecoverable session
    // }
  })

  nitroApp.router.use("/socket.io/", defineEventHandler({
    handler(event) {
      engine.handleRequest(event.node.req, event.node.res)
      event._handled = true
    },

    websocket: {
      open(peer) {
        engine.prepare(peer._internal.nodeReq)
        engine.onWebSocket(peer._internal.nodeReq, peer._internal.nodeReq.socket, peer.websocket)
      }
    }
  }))
})

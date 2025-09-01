import { Server as Engine } from "engine.io"
import { Server } from "socket.io"

export default defineNitroPlugin((nitroApp) => {
  const engine = new Engine()
  const io = new Server()
  
  io.bind(engine)
  
  io.on("connection", (socket) => {
    // ...
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

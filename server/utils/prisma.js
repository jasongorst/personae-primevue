import { Prisma, PrismaClient } from "../../prisma/generated/prisma/client"

const characterLocks = Prisma.defineExtension({
  name: "handleLocks",
  
  query: {
    character: {
      async update({ args, query }) {
        const lock = await PrismaClient.character.findUnique({
          where: { id: args.where.id },
          select: { lock: true }
        })
        
        if (lock) {
          return false
        } else {
          return query(args)
        }
      }
    }
  }
})

// export default new PrismaClient().$extends(characterLocks)
export default new PrismaClient()

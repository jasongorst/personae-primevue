import "dotenv/config"
import { PrismaClient } from "./generated/prisma/client"

const prisma = new PrismaClient()

async function main() {
  const fields = [
    "player",
    "mortalName",
    "faeName",
    "rank",
    "kith",
    "location",
    "position",
    "seeming",
    "house",
    "bannerhouse"
  ]

  await prisma.$transaction(async (tx) => {
    for (const field of fields) {
      const characters = await tx.character.findMany({
        select: { id: true, [field]: true },
        where: { [field]: null }
      })

      for (const character of characters) {
        await tx.character.update({
          where: { id: character.id },
          data: { [field]: "" }
        })
      }
    }
  })
}

main()
  .catch(async (error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => await prisma.$disconnect())

import "dotenv/config"
import { PrismaClient } from "./generated/prisma/client"
import htmlToPlainText from "../shared/utils/htmlToPlainText"

const prisma = new PrismaClient()

async function main() {
  await prisma.$transaction(async (tx) => {
    const notes = await tx.character.findMany({
      select: {
        id: true,
        notes: true
      },
      
      where: {
        notes: { not: "" }
      }
    })
    
    for (const character of notes) {
      await tx.character.update({
        where: { id: character.id },
        data: { notesPlainText: htmlToPlainText(character.notes) }
      })
    }
    
    const descriptions = await tx.character.findMany({
      select: {
        id: true,
        description: true
      },
      
      where: {
        description: { not: "" }
      }
    })
    
    for (const character of descriptions) {
      await tx.character.update({
        where: { id: character.id },
        data: { descriptionPlainText: htmlToPlainText(character.description) }
      })
    }
  })
}

main()
  .catch(async (error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => prisma.$disconnect())

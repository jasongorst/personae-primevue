export default defineTask({
  meta: {
    name: "migration:replaceNulls",
    description: "Set null values in Character fields to empty string."
  },

  async run({ _payload, _context }) {
    console.log("Running migration task replaceNulls...")

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

    try {
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
    } catch (error) {
      console.error(error)
      process.exit(1)
    } finally {
      await prisma.$disconnect()
    }
  }
})

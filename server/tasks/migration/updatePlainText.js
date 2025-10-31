export default defineTask({
  meta: {
    name: "migration:updatePlainText",
    description: "Update plainText fields in Character from corresponding richText."
  },

  async run({ _payload, _context }) {
    console.log("Running migration task updatePlainText...")

    try {
      await prisma.$transaction(async (tx) => {
        console.log("begin transaction")

        for (const richText of richTextAttributes) {
          console.log(`  field: ${richText}`)

          const characters = await tx.character.findMany({
            select: { id: true, [richText]: true }
          })

          for (const character of characters) {
            console.log(`    character: ${character.id}`)

            await tx.character.update({
              where: { id: character.id },
              data: { [`${richText}PlainText`]: htmlToPlainText(character[richText])}
            })
          }
        }

        console.log("end transaction")
      })
    } catch (error) {
      console.error(error)
      process.exit(1)
    } finally {
      await prisma.$disconnect()
    }
  }
})

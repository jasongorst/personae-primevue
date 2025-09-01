import { forEach, set, reduce } from "lodash-es"

export default defineEventHandler(async () => {
  try {
    const characters = await prisma.character.findMany({
      orderBy: [{ createdAt: "asc" }]
    })
    
    return reduce(
      // collection
      characters,
      
      // iteratee
      (accumulator, character) => {
        // add plain text versions of rich text attributes to character
        forEach(
          richTextAttributes,
          (attribute) => set(character, `${attribute}PlainText`, toPlainText(character[attribute]))
        )
        
        // add character to accumulator, keyed by id
        set(accumulator, character.id, character)
        
        return accumulator
      },
      
      // initial accumulator
      {}
    )
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message
    })
  }
})

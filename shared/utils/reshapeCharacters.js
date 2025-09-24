import { reduce, set } from "lodash-es"
import addPlainTextAttributes from "./addPlainTextAttributes.js"

export default function reshapeCharacters(characters) {
  return reduce(
    // collection
    characters,

    // iteratee
    (accumulator, character) => {
      // add plain text versions of rich text attributes to character
      addPlainTextAttributes(character)

      // add character to accumulator, keyed by id
      set(accumulator, character.id, character)

      return accumulator
    },

    // initial accumulator
    {}
  )
}

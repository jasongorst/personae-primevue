import { reduce, set } from "lodash-es"

export default function reshapeCharacters(characters) {
  return reduce(
    characters,
    (object, character) => set(object, character.id, character),
    {}
  )
}

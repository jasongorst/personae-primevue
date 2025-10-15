export default function reshapeCharacters(characters) {
  return _reduce(
    characters,
    (object, character) => _set(object, character.id, character),
    {}
  )
}

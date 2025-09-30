export default function addCharacterPatch(character) {
  return [{
    op: "add",
    path: `/${character.id}`,
    value: addPlainTextAttributes(character)
  }]
}

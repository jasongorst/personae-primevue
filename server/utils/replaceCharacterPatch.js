export default function replaceCharacterPatch(id, character) {
  return {
    op: "replace",
    path: `/${id}`,
    value: character
  }
}

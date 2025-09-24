export default function removeCharacterPatch(id) {
  return {
    op: "remove",
    path: `/${id}`
  }
}

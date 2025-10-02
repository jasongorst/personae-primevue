export default function removeCharacterPatch(id) {
  const previousProxy = { [id]: {} }
  const updatedProxy = {}
  
  return jsonPatch.compare(previousProxy, updatedProxy)
}

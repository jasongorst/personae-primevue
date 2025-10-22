export default function generateCharacterPatch(previous, updated) {
  const previousProxy = proxyCharacters(previous)
  const updatedProxy = proxyCharacters(updated)
  
  return jsonPatch.compare(previousProxy, updatedProxy)
}

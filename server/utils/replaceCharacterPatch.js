export default function replaceCharacterPatch(previous, updated) {
  const previousProxy = reshapeCharacters([ previous ])
  const updatedProxy = reshapeCharacters([ updated ])
  
  return jsonPatch.compare(previousProxy, updatedProxy)
}

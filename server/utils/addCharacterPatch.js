export default function addCharacterPatch(character) {
  const previousProxy = {}
  const updatedProxy = reshapeCharacters([ character ])
  
  return jsonPatch.compare(previousProxy, updatedProxy)
}

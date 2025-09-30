import { compare } from "fast-json-patch/index.mjs"

export default function replaceCharacterPatch(id, previous, updated) {
  // build proxies
  const previousProxy = reshapeCharacters(previous)
  const updatedProxy = reshapeCharacters(updated)

  console.log("[replaceCharactersPatch proxies]", previousProxy, updatedProxy)
  
  const patch = compare(previousProxy, updatedProxy)
  
  console.log(patch)
  
  return patch
}

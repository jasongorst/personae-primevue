export default function findUpdated(source, target) {
  const updatedAttributes = _reject(
    schemaAttributesList,
    (attribute) => source[attribute] === target[attribute]
  )
  
  return _pick(target, updatedAttributes)
}

export default function convertKeys(object, converter) {
  return _mapKeys(
    object,
    (_, key) => converter(key)
  )
}

export default function deepConvertKeys(object, converter) {
  if (_isArray(object)) {
    // recursively deep converts the keys of objects in the array (or nested arrays)
    return _map(object, (element) => deepConvertKeys(element, converter))
  } else if (_isPlainObject(object)) {
    // converts the keys of the top-level object and recursively converts the keys
    //   of nested objects (in values or inside arrays)
    return _mapValues(
      convertKeys(object, converter),
      (value) => deepConvertKeys(value, converter)
    )
  } else {
    return object
  }
}

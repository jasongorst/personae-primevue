export default function deepConvertValues(object, converter) {
  // converter called with (value, key, object)
  if (_isArray(object)) {
    return _map(object, (element) => deepConvertValues(element, converter))
  } else if (_isPlainObject(object)) {
    return _mapValues(
      object,
      (value, key, object) => {
        if (_isArray(value) || _isPlainObject(value)) {
          return deepConvertValues(value, converter)
        } else {
          return converter(value, key, object)
        }
      }
    )
  } else {
    return object
  }
}

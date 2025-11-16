export default function convertValues(object, converter) {
  // converter called with (value, key, object)
  if (_isPlainObject(object)) {
    return _mapValues(object, (value, key, object) => converter(value, key, object))
  } else {
    return object
  }
}

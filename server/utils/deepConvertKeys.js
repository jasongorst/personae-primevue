import { isArray, isPlainObject, map, mapValues } from "lodash-es"

export default function deepConvertKeys(object, converter) {
  if (isArray(object)) {
    return map(object, (element) => deepConvertKeys(element, converter))
  } else if (isPlainObject(object)) {
    return mapValues(
      convertKeys(object, converter),
      (value) => deepConvertKeys(value, converter)
    )
  } else {
    return object
  }
}

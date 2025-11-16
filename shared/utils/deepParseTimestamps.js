export default function deepParseTimestamps(object) {
  function parseTimestamps(value, key) {
    if (_includes(["createdAt", "updatedAt"], key)) {
      return new Date(value)
    } else {
      return value
    }
  }

  return deepConvertValues(object, parseTimestamps)
}

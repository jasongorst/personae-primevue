export default function isUpdated(source, target) {
  return _some(target, (value, key) => !_isEqual(value, source?.[key]))
}

export default function isEmptyOrWhitespace(value) {
  const re = /^\s+$/
  return _isEmpty(value) || re.test(value)
}

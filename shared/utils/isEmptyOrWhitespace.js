export default function isEmptyOrWhitespace(string) {
  const re = /^\s+$/
  return _isEmpty(string) || re.test(string)
}

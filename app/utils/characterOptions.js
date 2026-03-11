export default function characterOptions(characters) {
  return _mapValues(optionsAttributes, (_, attribute) =>
    uniqValues(characters, attribute)
  )
}

export default function proxyCharacters(character) {
  if (_isEmpty(character)) {
    return {}
  } else {
    return { [character.id]: character }
  }
}

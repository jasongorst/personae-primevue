export default function addPlainTextAttributes(character) {
  // mutates character
  _forEach(richTextAttributes, (attribute) => {
    if (_has(character, attribute)) {
      _set(
        character,
        `${attribute}PlainText`,
        _isEmpty(character[attribute])
          ? ""
          : htmlToPlainText(character[attribute])
      )
    }
  })

  return character
}

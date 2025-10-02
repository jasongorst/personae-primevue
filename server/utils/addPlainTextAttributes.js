import { forEach, has, isEmpty, set } from "lodash-es"

// mutates character
export default function addPlainTextAttributes(character) {
  forEach(
    richTextAttributes,
    (attribute) => {
      if (has(character, attribute)) {
        set(
          character,
          `${attribute}PlainText`,
          isEmpty(character[attribute]) ? "" : htmlToPlainText(character[attribute])
        )
      }
    }
  )

  return character
}

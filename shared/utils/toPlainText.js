import { convert } from "html-to-text"

export default function toPlainText(html) {
  return convert(html, { wordwrap: false })
}

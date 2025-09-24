import { convert } from "html-to-text"

export default function htmlToPlainText(html){
  return convert(html, { wordwrap: false })
}

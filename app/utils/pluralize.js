export default function pluralize(label, value) {
  if (value > 1) {
    return label + "s"
  } else {
    return label
  }
}

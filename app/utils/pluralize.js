export default function pluralize(label, value) {
  if (value === 1) {
    return label
  } else {
    return label + "s"
  }
}

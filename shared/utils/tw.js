// identity tagged template literal function for prettier-plugin-tailwindcss
export default function tw(strings, ...values) {
  return String.raw({ raw: strings }, ...values)
}

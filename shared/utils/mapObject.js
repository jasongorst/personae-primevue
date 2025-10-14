export default function mapObject(keys, generator = _identity) {
  return _zipObject(
    keys,
    _map(keys, (key) => generator(key))
  )
}

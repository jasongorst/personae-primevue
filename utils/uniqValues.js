export default function uniqValues(ary, property) {
  return _sortBy(
    _uniq(
      _reject(
        _map(ary, property),
        isBlank
      )
    )
  )
}

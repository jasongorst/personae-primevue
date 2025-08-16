export default function findDifferences(source, target) {
  return _fromPairs(
    _filter(
      _toPairs(toValue(target)),
      ([ key, value ]) => !_isEqual(value, toValue(source)?.[key])
    )
  )
}

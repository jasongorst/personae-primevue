export default function mungedUniqValues(ary, property) {
  const values = _reject(_map(ary, property), isBlank)
  const counts = _toPairs(_countBy(values))
  const grouped = _groupBy(counts, (el) => _toLower(_first(el)))
  const duplicates = _pickBy(grouped, (value) => _size(value) > 1)
  const uniq = _sortBy(_uniq(values))

  _forEach(duplicates, (value) => {
    const leastFrequent = _initial(_sortBy(value, (el) => el[1]))
    const toRemove = _flatten(_map(leastFrequent, _take))
    _remove(uniq, (value) => _includes(toRemove, value))
  })

  return uniq
}

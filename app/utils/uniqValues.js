export default function uniqValues(ary, property) {
  return _sortBy(_uniq(_compact(_map(ary, property))))
}

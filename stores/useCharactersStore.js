import * as jsonpatch from "fast-json-patch"

export const useCharactersStore = defineStore("characters", () => {
  const config = useRuntimeConfig()

  // state
  const data = ref({})
  const filters = ref(initialFilters)
  const sort = ref({ attribute: "createdAt", order: "asc" })
  const loading = ref(false)
  const error = ref(null)

  // getters
  const characters = computed(() => _values(data.value))
  const count = computed(() => _size(characters.value))
  const isLoaded = computed(() => isPositive(count.value))
  const hasAnyFilter = computed(() => _some(filters.value, (value) => isPresent(value.value)))
  const hasGlobalFilter = computed(() => isPresent(filters.value['global'].value))
  const hasAnyAttributeFilter = computed(() => _some(_map(listAttributes, (attribute) => hasFilterFor(attribute))))

  const options = computed(
    () => _fromPairs(_map(
      optionsAttributes,
      (attribute) => [
        attribute,
        _sortBy(_uniq(_compact(_map(characters.value, (character) => character[attribute]))))
      ]
    ))
  )

  // actions
  async function _fetch() {
    try {
      const response = await $fetch(
        "/characters",
        { baseURL: config.public.api.baseURL }
      )

      data.value = deepParseTimestamps(deepConvertKeys(response, _camelCase))
    } catch(err) {
      console.log(err)

      error.value = err
    }
  }

  async function loadCharacters() {
    loading.value = true
    await _fetch()
    loading.value = false
  }

  async function reloadCharacters() {
    await _fetch()
  }

  function hasFilterFor(attribute) {
    return isPresent(filters.value[attribute]?.value)
  }

  function resetFilters() {
    filters.value = initialFilters
  }

  function resetFilterFor(attribute) {
    filters.value[attribute] = initialFilters[attribute]
  }

  function removeFilter(attribute, value) {
    filters.value[attribute] = _without(filters.value[attribute], value)
  }

  function patch(patch) {
    try {
      jsonpatch.applyPatch(data.value, patch)
    } catch(error) {
      console.log(error)
    }
  }

  return {
    // state
    data,
    filters,
    sort,
    loading,
    error,

    // getters
    characters,
    count,
    isLoaded,
    hasAnyFilter,
    hasGlobalFilter,
    hasAnyAttributeFilter,
    options,

    // actions
    loadCharacters,
    reloadCharacters,
    hasFilterFor,
    resetFilters,
    resetFilterFor,
    removeFilter,
    patch
  }
})

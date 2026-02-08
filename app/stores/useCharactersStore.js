import { FilterMatchMode } from "@primevue/core/api"

export const useCharactersStore = defineStore("characters", () => {
  const queryCache = useQueryCache()

  // state
  const data = ref({})

  const categoryAttributes = ref(
    _pickBy(characterAttributes, { type: "autocomplete" })
  )

  const datatableAttributes = ref(
    _pickBy(characterAttributes, { showColumn: true })
  )

  const nameAttributes = ref(_pickBy(characterAttributes, { type: "text" }))

  const datatableCategoryAttributes = ref(
    _pickBy(datatableAttributes.value, { type: "autocomplete" })
  )

  // empty filters object
  const emptyFilters = ref({
    global: { value: "", matchMode: FilterMatchMode.CONTAINS },

    ..._mapValues(datatableAttributes.value, ({ type }) =>
      type === "autocomplete"
        ? { value: [], matchMode: FilterMatchMode.IN }
        : { value: "", matchMode: FilterMatchMode.CONTAINS }
    )
  })

  // empty character
  const emptyCharacter = ref(_mapValues(characterAttributes, () => ""))


  const filters = ref(_cloneDeep(emptyFilters.value))
  const sort = ref({ attribute: "createdAt", order: "asc" })

  // getters
  const characters = computed(() => _values(data.value))
  const count = computed(() => _size(characters.value))
  const hasGlobalFilter = computed(() => isPresent(filters.value.global.value))
  const hasAnyFilters = computed(() => hasAnyFiltersFor(_keys(filters.value)))

  const hasAnyNameFilters = computed(() =>
    hasAnyFiltersFor(_keys(nameAttributes.value))
  )

  const hasAnyCategoryFilters = computed(() =>
    hasAnyFiltersFor(_keys(datatableCategoryAttributes.value))
  )

  const hasAnyAttributeFilters = computed(() =>
    hasAnyFiltersFor(_keys(datatableAttributes.value))
  )

  const hasFilterByAttribute = computed(() =>
    _mapValues(filters.value, ({ value }) => isPresent(value))
  )

  const options = computed(() =>
    _mapValues(categoryAttributes.value, (_, attribute) =>
      uniqValues(characters.value, attribute)
    )
  )

  // actions
  function hasAnyFiltersFor(attributes) {
    return _some(_pick(filters.value, attributes), ({ value }) =>
      isPresent(value)
    )
  }

  function hasFilterFor(attribute) {
    return hasFilterByAttribute.value[attribute]
  }

  function resetFilters() {
    filters.value = _cloneDeep(emptyFilters.value)
  }

  function resetFilterFor(attribute) {
    filters.value[attribute] = _cloneDeep(emptyFilters.value[attribute])
  }

  function removeFilterValueFrom(attribute, value) {
    filters.value[attribute].value = _without(
      filters.value[attribute].value,
      value
    )
  }

  function resetGlobalFilter() {
    filters.value.global.value = ""
  }

  function getCharacter(id) {
    if (!isEmpty(data.value)) {
      return data.value?.[id]
    } else {
      return null
    }
  }

  function applyPatch(patch) {
    // jsonPatch.patch(data.value, patch)
  }

  function load() {
    data.value = queryCache.getQueryData(characterQuery.key)
  }

  // async function read(id) {
  //   const { data: character } = useQuery(characterByIdQuery, () => ({ id }))
  //
  //   return character
  // }

  // async function create(character) {
  //   const { createCharacter } = useCreateCharacter()
  //
  //   return createCharacter(character)
  // }

  // async function update(id, attributes) {
  //   const { updateCharacter } = useUpdateCharacter()
  //
  //   return updateCharacter(id, attributes)
  // }

  // async function destroy(id) {
  //   const { deleteCharacter } = useDeleteCharacter()
  //
  //   return deleteCharacter(id)
  // }

  return {
    // state
    data,
    filters,
    sort,
    categoryAttributes,
    datatableAttributes,
    nameAttributes,
    datatableCategoryAttributes,
    emptyFilters,
    emptyCharacter,

    // getters
    characters,
    count,
    hasAnyAttributeFilters,
    hasAnyCategoryFilters,
    hasAnyFilters,
    hasAnyNameFilters,
    hasFilterByAttribute,
    hasGlobalFilter,
    options,

    // actions
    hasAnyFiltersFor,
    applyPatch,
    load,
    // read,
    // create,
    // destroy,
    getCharacter,
    hasFilterFor,
    removeFilterValueFrom,
    resetFilterFor,
    resetFilters,
    resetGlobalFilter,
    // update
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCharactersStore, import.meta.hot))
}

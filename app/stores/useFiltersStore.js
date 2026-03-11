import { FilterMatchMode } from "@primevue/core/api"

export const useFiltersStore = defineStore("filters", () => {
  // state
  const emptyFilters = ref({
    global: { value: "", matchMode: FilterMatchMode.CONTAINS },

    ..._mapValues(datatableAttributes, ({ type }) =>
      type === "autocomplete"
        ? { value: [], matchMode: FilterMatchMode.IN }
        : { value: "", matchMode: FilterMatchMode.CONTAINS }
    )
  })

  const filters = ref(_cloneDeep(emptyFilters.value))
  const showFilters = ref(false)

  // getters
  const hasFilterByAttribute = computed(() =>
    _mapValues(filters.value, ({ value }) => isPresent(value))
  )

  // actions
  function hasAnyAttributeFilters() {
    return hasAnyFiltersFor(_keys(datatableAttributes))
  }

  function hasAnyCategoryFilters() {
    return hasAnyFiltersFor(_keys(optionsAttributes))
  }

  function hasAnyFilters() {
    return _some(hasFilterByAttribute.value)
  }

  function hasAnyFiltersFor(attributes) {
    return _some(_pick(hasFilterByAttribute.value, attributes))
  }

  function hasAnyNameFilters() {
    return hasAnyFiltersFor(_keys(nameAttributes))
  }

  function hasFilterFor(attribute) {
    return hasFilterByAttribute.value?.[attribute]
  }

  function hasGlobalFilter() {
    return isPresent(filters.value.global.value)
  }

  function removeFilterValueFrom(attribute, value) {
    filters.value[attribute].value = _without(
      filters.value[attribute].value,
      value
    )
  }

  function resetFilters() {
    filters.value = _cloneDeep(emptyFilters.value)
  }

  function resetFilterFor(attribute) {
    filters.value[attribute] = _cloneDeep(emptyFilters.value[attribute])
  }

  function resetGlobalFilter() {
    filters.value.global.value = ""
  }

  function toggleShowFilters() {
    showFilters.value = !showFilters.value
  }

  return {
    // state
    emptyFilters,
    filters,
    showFilters,

    // getters
    hasFilterByAttribute,

    // actions
    hasAnyAttributeFilters,
    hasAnyCategoryFilters,
    hasAnyFilters,
    hasAnyFiltersFor,
    hasAnyNameFilters,
    hasFilterFor,
    hasGlobalFilter,
    removeFilterValueFrom,
    resetFilterFor,
    resetFilters,
    resetGlobalFilter,
    toggleShowFilters
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useFiltersStore, import.meta.hot))
}

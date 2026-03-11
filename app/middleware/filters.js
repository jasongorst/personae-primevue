import { FilterMatchMode } from "@primevue/core/api"

export default defineNuxtRouteMiddleware(async () => {
  const filtersStore = useFiltersStore()
  const { removeFilterValueFrom } = filtersStore
  const { filters } = storeToRefs(filtersStore)

  const { data: options } = await useQuery(characterOptionsQuery)

  console.log("[/app/middleware/filters] [characterOptionsQuery]", options.value)

  const optionsFilters = _pickBy(filters.value, { matchMode: FilterMatchMode.IN })
  const removedFilters = _mapValues(optionsFilters, _stubArray)

  _forEach(optionsFilters, ({ values }, attribute) => {
    console.log("[/app/middleware/filters] [optionsFilters]", attribute, values)

    _forEach(values, (value) => {
      if (!_includes(options.value[attribute], value)) {
        console.log("[/app/middleware/filters] [removing filter]", attribute, value)
        removedFilters[attribute].push(value)
        removeFilterValueFrom(attribute, value)
      }
    })
  })

  console.log("[/app/middleware/filters] [removedFilters]", removedFilters)
})

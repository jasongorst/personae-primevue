import { FilterMatchMode } from "@primevue/core/api"

export const useCharactersStore = defineStore("characters", () => {
  const {
    $socketio: { socket }
  } = useNuxtApp()

  // fetch characters
  const {
    // state
    data,
    error: loadError,
    status: loadStatus,

    // actions
    refresh: load
  } = useAsyncData(
    "character:list",
    async () => {
      const { data: response } = await socket
        .timeout(3000)
        .emitWithAck("character:list")

      return response
    },
    { deep: true }
  )

  // state

  // attribute groups
  const categoryAttributes = ref(_pickBy(characterAttributes, { type: "autocomplete" }))
  const datatableAttributes = ref(_pickBy(characterAttributes, { showColumn: true }))
  const nameAttributes = ref(_pickBy(characterAttributes, { type: "text" }))
  const datatableCategoryAttributes = ref(_pickBy(datatableAttributes.value, { type: "autocomplete" }))

  // empty filters object
  const emptyFilters = ref(_mapValues(
    datatableAttributes.value,
    ({ type }) =>
      type === "autocomplete"
        ? { value: [], matchMode: FilterMatchMode.IN }
        : { value: "", matchMode: FilterMatchMode.CONTAINS }
  ))

  emptyFilters.value.global = { value: "", matchMode: FilterMatchMode.CONTAINS }

  const filters = ref(_cloneDeep(emptyFilters.value))
  const sort = ref({ attribute: "createdAt", order: "asc" })

  // getters
  const characters = computed(() => _values(data.value))
  const count = computed(() => _size(characters.value))
  const isLoaded = computed(() => loadStatus.value === "success")
  const isLoading = computed(() => loadStatus.value === "pending")
  const hasLoadError = computed(() => loadStatus.value === "error")

  const hasGlobalFilter = computed(() => isPresent(filters.value.global.value))
  const hasAnyFilters = computed(() => hasAnyFiltersFor(_keys(filters.value)))
  const hasAnyNameFilters = computed(() => hasAnyFiltersFor(_keys(nameAttributes.value)))
  const hasAnyCategoryFilters = computed(() => hasAnyFiltersFor(_keys(datatableCategoryAttributes.value)))
  const hasAnyAttributeFilters = computed(() => hasAnyFiltersFor(_keys(datatableAttributes.value)))

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
    return _some(
      _pick(filters.value, attributes),
      ({ value }) => isPresent(value)
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

  async function ensureLoaded() {
    if (!isLoaded.value) {
      await load()
    }
  }

  async function getCharacter(id) {
    await ensureLoaded()
    return data.value[id]
  }

  function applyPatch(patch) {
    // jsonPatch.patch(data.value, patch)
  }

  async function read(id) {
    const { data, error, status } = await useAsyncData(
      `character:read:${id}`,
      async () => {
        const { data: response } = await socket
          .timeout(3000)
          .emitWithAck("character:read", id)
        return response
      }
    )

    if (status.value === "error") {
      return { error }
    }

    return data.value
  }

  async function create(character) {
    try {
      const response = await socket
        .timeout(3000)
        .emitWithAck("character:create", character)

      if (_has(response, "data")) {
        _set(data.value, response.data.id, response.data)
      }

      return response
    } catch (error) {
      console.error("[useCharacterStore create]", error)

      return { error }
    }
  }

  async function update(id, character) {
    try {
      const response = await socket
        .timeout(3000)
        .emitWithAck("character:update", id, character)

      if (_has(response, "data")) {
        _set(data.value, response.data.id, response.data)
      }

      return response
    } catch (error) {
      console.error("[useCharacterStore update]", error)

      return { error }
    }
  }

  async function destroy(id) {
    try {
      const response = await socket
        .timeout(3000)
        .emitWithAck("character:delete", id)

      if (_has(response, "data")) {
        _unset(data.value, response.data.id)
      }

      return response
    } catch (error) {
      console.error("[useCharacterStore destroy]", error)

      return { error }
    }
  }

  return {
    // state
    data,
    filters,
    loadError,
    loadStatus,
    sort,
    categoryAttributes,
    datatableAttributes,
    nameAttributes,
    datatableCategoryAttributes,
    emptyFilters,

    // getters
    characters,
    count,
    hasAnyAttributeFilters,
    hasAnyCategoryFilters,
    hasAnyFilters,
    hasAnyNameFilters,
    hasFilterByAttribute,
    hasGlobalFilter,
    hasLoadError,
    isLoaded,
    isLoading,
    options,

    // actions
    hasAnyFiltersFor,
    applyPatch,
    read,
    create,
    destroy,
    ensureLoaded,
    getCharacter,
    hasFilterFor,
    load,
    removeFilterValueFrom,
    resetFilterFor,
    resetFilters,
    resetGlobalFilter,
    update
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCharactersStore, import.meta.hot))
}

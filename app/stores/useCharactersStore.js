import { FilterMatchMode } from "@primevue/core/api"

const emptyFilters = mapObject(filtersAttributes, (attribute) => {
  if (_includes(categoryAttributes, attribute)) {
    return { value: [], matchMode: FilterMatchMode.IN }
  } else {
    return { value: "", matchMode: FilterMatchMode.CONTAINS }
  }
})

export const useCharactersStore = defineStore("characters", () => {
  const {
    $socketio: { socket }
  } = useNuxtApp()

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
      const { data: response } = await socket.timeout(3000).emitWithAck("character:list")
      return response
    },
    { deep: true }
  )

  // state
  const filters = ref(_cloneDeep(emptyFilters))
  const sort = ref({ attribute: "createdAt", order: "asc" })

  // getters
  const characters = computed(() => _values(data.value))
  const count = computed(() => _size(characters.value))
  const isLoaded = computed(() => !isEmpty(data.value))
  const isLoading = computed(() => loadStatus.value === "pending")
  const hasLoadError = computed(() => loadStatus.value === "error")

  const hasGlobalFilter = computed(() => isPresent(filters.value.global.value))

  const hasAnyFilters = computed(() =>
    _some(filters.value, (filter) => isPresent(filter.value))
  )

  const hasFilterByAttribute = computed(() =>
    mapObject(listAttributes, (attribute) =>
      isPresent(filters.value[attribute].value)
    )
  )

  const hasAnyNameFilters = computed(() =>
    _pick(hasFilterByAttribute.value, nameAttributes)
  )

  const hasAnyCategoryFilters = computed(() =>
    _pick(hasFilterByAttribute.value, categoryAttributes)
  )

  const hasAnyAttributeFilters = computed(() =>
    _some(hasFilterByAttribute.value)
  )

  const options = computed(() =>
    mapObject(optionsAttributes, (attribute) =>
      uniqValues(characters.value, attribute)
    )
  )

  // actions
  function hasFilterFor(attribute) {
    return hasFilterByAttribute.value[attribute]
  }

  function resetFilters() {
    filters.value = _cloneDeep(emptyFilters)
  }

  function resetFilterFor(attribute) {
    filters.value[attribute] = _cloneDeep(emptyFilters[attribute])
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

  async function getCharacter(id) {
    if (isLoaded.value) {
      return data.value[id]
    } else {
      return await read(id)
    }
  }

  // async function ensureLoaded() {
  //   if (!isLoaded.value) {
  //     await load()
  //   }
  // }

  function applyPatch(patch) {
    jsonPatch.apply(data.value, patch)
  }

  async function read(id) {
    const { data, error, status} = await useAsyncData(
      `character:read:${id}`,
      async () => {
        const { data: response } = await socket.timeout(3000).emitWithAck("character:read", id)
        return response
      }
    )

    if (status.value === "error") {
      return error
    }

    return data.value
  }

  async function create(character) {
    try {
      const response = await socket.timeout(3000).emitWithAck("character:create", character)

      if (_has(response, "data")) {
        _set(data.value, response.data.id, response.data)
      }

      return response
    } catch (error) {
      console.error("[useCharacterStore create]", error)

      return error
    }
  }

  async function update(id, character) {
    try {
      const response = await socket.timeout(3000).emitWithAck("character:update", id, character)

      if (_has(response, "data")) {
        _set(data.value, response.data.id, response.data)
      }

      return response
    } catch (error) {
      console.error("[useCharacterStore update]", error)

      return error
    }
  }

  async function destroy(id) {
    try {
      const response = await socket.timeout(3000).emitWithAck("character:delete", id)

      if (_has(response, "data")) {
        _unset(data.value, response.data.id)
      }

      return response
    } catch (error) {
      console.error("[useCharacterStore destroy]", error)

      return error
    }
  }

  return {
    // state
    data,
    filters,
    loadError,
    loadStatus,
    sort,

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
    applyPatch,
    read,
    create,
    destroy,
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

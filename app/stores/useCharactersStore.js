import { FilterMatchMode } from "@primevue/core/api"

const emptyFilters = mapObject(filtersAttributes, (attribute) => {
  if (_includes(categoryAttributes, attribute)) {
    return {
      value: [],
      matchMode: FilterMatchMode.IN
    }
  } else {
    return {
      value: "",
      matchMode: FilterMatchMode.CONTAINS
    }
  }
})

export const useCharactersStore = defineStore("characters", () => {
  const {
    $socketio: { socket }
  } = useNuxtApp()

  // state
  const data = ref({})
  const filters = ref(_cloneDeep(emptyFilters))
  const sort = ref({ attribute: "createdAt", order: "asc" })
  const loading = ref(false)

  // getters
  const characters = computed(() => _values(data.value))
  const count = computed(() => _size(characters.value))
  const isLoaded = computed(() => !isEmpty(characters.value))

  const hasGlobalFilter = computed(() =>
    isPresent(filters.value.global.value)
  )

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

  function removeFilterFrom(attribute, value) {
    filters.value[attribute].value = _without(filters.value[attribute].value, value)
  }

  function resetGlobalFilter() {
    filters.value.global.value = ""
  }

  async function getCharacter(id) {
    await ensureLoaded()
    return data.value[id]
  }

  async function ensureLoaded() {
    if (!isLoaded.value) {
      await load()
    }
  }

  function applyPatch(patch) {
    jsonPatch.apply(data.value, patch)
  }

  async function load() {
    const response = await socket.emitWithAck("character:list")

    if (_has(response, "data")) {
      data.value = response.data
    }

    return response
  }

  async function create(character, token) {
    const response = await socket.emitWithAck(
      "character:create",
      token,
      character
    )

    if (_has(response, "data")) {
      _set(data.value, response.data.id, response.data)
    }

    return response
  }

  async function update(id, character, token) {
    const response = await socket.emitWithAck(
      "character:update",
      token,
      id,
      character
    )

    if (_has(response, "data")) {
      _set(data.value, response.data.id, response.data)
    }

    return response
  }

  async function destroy(id, token) {
    const response = await socket.emitWithAck("character:delete", token, id)

    if (_has(response, "data")) {
      _unset(data.value, response.data.id)
    }

    return response
  }

  return {
    // state
    data,
    filters,
    loading,
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
    isLoaded,
    options,

    // actions
    applyPatch,
    create,
    destroy,
    getCharacter,
    hasFilterFor,
    load,
    removeFilterFrom,
    resetFilterFor,
    resetFilters,
    resetGlobalFilter,
    update
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCharactersStore, import.meta.hot))
}

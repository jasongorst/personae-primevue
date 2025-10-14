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
  const config = useRuntimeConfig()

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
    isPresent(filters.value["global"].value)
  )
  
  const hasAnyFilters = computed(() =>
    _some(filters.value, (value) => isPresent(value.value))
  )

  const hasFilterByAttribute = computed(() =>
    mapObject(listAttributes, (attribute) =>
      isPresent(filters.value[attribute].value)
    )
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

  function removeFilter(attribute, value) {
    filters.value[attribute] = _without(filters.value[attribute], value)
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

  // api
  async function apiLoad() {
    const { response, error } = await apiFetch({
      method: "get"
    })

    if (error) {
      return false
    } else {
      data.value = response
      return response
    }
  }

  async function apiCreate(character, token) {
    const { response, error } = await apiFetch({
      method: "post",
      character: character,
      token: token
    })

    if (error) {
      return false
    } else {
      if (_has(response, "id")) {
        _set(data.value, response.id, response)
      } else {
        console.log("[characterStore.apiCreate - no id]", response)
      }
    }

    return response
  }

  async function apiUpdate(id, character, token) {
    const { response, error } = await apiFetch({
      method: "patch",
      id: id,
      character: character,
      token: token
    })

    if (error) {
      return false
    } else {
      _assign(data.value[id], toValue(character))
      return response
    }
  }

  async function apiDestroy(id, token) {
    const { error } = await apiFetch({
      method: "delete",
      id: id,
      token: token
    })

    if (error) {
      return false
    } else {
      _unset(data.value, id)
      return true
    }
  }

  // private
  async function apiFetch({
    method = "get",
    id = null,
    character = null,
    _token = null
  } = {}) {
    let response, error

    const url = toValue(id) ? `/${toValue(id)}` : "/"

    const fetchOptions = {
      baseURL: config.public.api.baseURL,
      method: method
    }

    if (toValue(character)) {
      fetchOptions.body = toValue(character)
    }

    try {
      loading.value = true
      response = await $fetch(url, fetchOptions)
      loading.value = false
    } catch (err) {
      console.log("[apiFetch error]", err)
      error = err
    }

    return { response, error }
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
    hasAnyFilters,
    hasFilterByAttribute,
    hasGlobalFilter,
    isLoaded,
    options,

    // actions
    apiCreate,
    apiDestroy,
    apiLoad,
    apiUpdate,
    applyPatch,
    create,
    destroy,
    getCharacter,
    hasFilterFor,
    load,
    removeFilter,
    resetFilterFor,
    resetFilters,
    resetGlobalFilter,
    update
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCharactersStore, import.meta.hot))
}

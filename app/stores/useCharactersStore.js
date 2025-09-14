import * as jsonpatch from "fast-json-patch"

export const useCharactersStore = defineStore("characters", () => {
  const config = useRuntimeConfig()

  const { $socketio } = useNuxtApp()
  const socket = $socketio.socket

  // state
  const data = ref({})
  const filters = ref(_clone(emptyFilters))
  const sort = ref({ attribute: "createdAt", order: "asc" })
  const loading = ref(false)

  // getters
  const characters = computed(() => _values(data.value))
  const count = computed(() => _size(characters.value))
  const isLoaded = computed(() => isPositive(count.value))
  const hasGlobalFilter = computed(() => isPresent(filters.value["global"].value))
  const hasAnyFilter = computed(() => _some(filters.value, (value) => isPresent(value.value)))

  const hasAnyAttributeFilter = computed(
    () => _some(_map(listAttributes, (attribute) => hasFilterFor(attribute)))
  )

  const options = computed(
    () => _reduce(
      optionsAttributes,
      (accumulator, attribute) => _set(
        accumulator,
        attribute,
        _sortBy(_uniq(_compact(
          _map(characters.value, (character) => character[attribute])
        )))
      ),
      {}
    )
  )

  // actions
  function hasFilterFor(attribute) {
    return isPresent(filters.value[attribute]?.value)
  }

  function resetFilters() {
    filters.value = _clone(emptyFilters)
  }

  function resetFilterFor(attribute) {
    filters.value[attribute] = emptyFilters[attribute]
  }

  function removeFilter(attribute, value) {
    filters.value[attribute] = _without(filters.value[attribute], value)
  }

  async function getCharacter(id) {
    await ensureLoaded()
    return data.value[id]
  }

  function applyPatch(patch) {
    try {
      jsonpatch.applyPatch(data.value, patch)
    } catch (error) {
      console.log("[applyPatch error]", error)
    }
  }

  async function ensureLoaded() {
    if (!isLoaded.value) {
      load()
    }
  }

  function load() {
    let response
    
    socket.emit("character:list", (res) => {
      if (_has(res, "data")) {
        data.value = res.data
      } else {
        response = res
      }
    })
    
    return response
  }

  function create(character, _token) {
    let response
    
    socket.emit("character:create", character, (res) => response = res)
    
    if (_has(response, "data")) {
      const created = response.data
      _set(data.value, created.id, created)
    }
    
    return response
  }

  function update(id, character, _token) {
    let response
    
    socket.emit("character:update", id, character, (res) => response = res)
    
    if (_has(response, "data")) {
      const created = response.data
      _set(data.value, created.id, created)
    }
    
    return response
  }
  
  function destroy(id, _token) {
    let response

    socket.emit("character:delete", id, (res) => response = res)
    
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
        console.log("[useCharacterStore create (no id)]", response)
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

    const options = {
      baseURL: config.public.api.baseURL,
      method: method
    }

    if (toValue(character)) {
      options.body = toValue(character)
    }

    try {
      loading.value = true
      response = await $fetch(url, options)
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
    hasAnyAttributeFilter,
    hasAnyFilter,
    hasGlobalFilter,
    isLoaded,
    options,

    // actions
    load,
    create,
    destroy,
    update,
    apiLoad,
    apiCreate,
    apiDestroy,
    apiUpdate,
    getCharacter,
    hasFilterFor,
    applyPatch,
    removeFilter,
    resetFilterFor,
    resetFilters,
  }
})

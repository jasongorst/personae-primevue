import * as jsonpatch from "fast-json-patch"

export const useCharactersStore = defineStore("characters", () => {
  const config = useRuntimeConfig()

  // state
  const data = ref({})
  const filters = ref(_clone(emptyFilters))
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

  function patch(patch) {
    try {
      jsonpatch.applyPatch(data.value, patch)
    } catch(error) {
      console.log(error)
    }
  }

  async function ensureLoaded() {
    if (!isLoaded.value) {
      await load()
    }
  }

  async function load() {
    const { response, error } = await apiFetch( {
      method: "get"
    })

    if (error) {
      error.value = error
      return false
    } else {
      data.value = response
      return response
    }
  }

  async function create(character, token) {
    const { response, error } = await apiFetch({
      method: "post",
      character: character,
      token: token
    })

    if (error) {
      error.value = error
      return false
    } else {
      if (_has(response, "id")) {
        _set(data.value, response.id, response)
      } else {
        console.log("[useCharacterStore create()]", response)
      }
    }

    return response
  }

  async function destroy(id, token) {
    const { error } = await apiFetch({
      method: "delete",
      id: id,
      token: token
    })

    if (error) {
      error.value = error
      return false
    } else {
      _unset(data.value, id)
      return true
    }
  }

  async function update(id, character, token) {
    const { response, error } = await apiFetch({
      method: "patch",
      id: id,
      character: character,
      token: token
    })

    if (error) {
      error.value = error
      return false
    } else {
      _assign(data.value[id], toValue(character))
      return response
    }
  }

  // private
  async function apiFetch({
      method = "get",
      id = null,
      character = null,
      token = null
    } = {}) {
    let response, error
    let url = "/characters"

    const options = {
      baseURL: config.public.api.baseURL,
      method: method
    }

    if (toValue(id)) {
      url += `/${toValue(id)}`
    }

    if (toValue(token)) {
      _set(options, "headers.Authorization", toValue(token))
    }

    if (toValue(character)) {
      _set(options, "body.character", deepConvertKeys(toValue(character), _snakeCase))
    }

    try {
      loading.value = true
      response = await $fetch(url, options)
      loading.value = false

      response = deepParseTimestamps(deepConvertKeys(response, _camelCase))
    } catch (err) {
      console.log(err)
      error = err
    }

    return { response, error }
  }

  return {
    // state
    data,
    error,
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
    create,
    destroy,
    getCharacter,
    hasFilterFor,
    load,
    patch,
    removeFilter,
    resetFilterFor,
    resetFilters,
    update
  }
})

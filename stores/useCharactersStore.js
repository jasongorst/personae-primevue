import initialFilters from "../utils/initialFilters.js"

// noinspection JSUnresolvedReference
export const useCharactersStore = defineStore('characters', {
  state: () => ({
    data: {},
    query: "",
    filters: initialFilters,
    sort: { attribute: "createdAt", order: "asc" }
  }),

  getters: {
    characters: (state) => _values(state.data),
    count: (state) => _size(state.date),
    isLoaded: (state) => isPositive(state.count),
    hasFilter: (state) => _some(state.filters, (value) => isPresent(value.value))
  },

  actions: {
    clearFilters() {
      this.filters = initialFilters
    },

    removeFilter(attribute, value) {
      this.filters[attribute] = _without(this.filters[attribute], value)
    }
  },
})

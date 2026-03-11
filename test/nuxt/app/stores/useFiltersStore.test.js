import { setActivePinia, createPinia } from "pinia"

let store

beforeEach(() => {
  setActivePinia(createPinia())
  store = useFiltersStore()
})

describe("initializes state", () => {
  test("emptyFilters has the correct shape", () => {
    expect(_keys(store.emptyFilters)).toEqual(["global", ..._keys(datatableAttributes)])
  })

  test("filters inits to emptyFilters", () => {
    expect(store.filters).toEqual(store.emptyFilters)
  })

  test("showFilters inits to false", () => {
    expect(store.showFilters).toBe(false)
  })
})

describe("hasFilterByAttribute getter", () => {
  test("inits to false", () => {
    expect(store.hasFilterByAttribute.global).toBe(false)
  })

  test("is true when filter set", () => {
    store.filters.global.value = "foo"
    expect(store.hasFilterByAttribute.global).toBe(true)
  })
})

describe("actions", () => {
  describe("hasAnyAttributeFilters", () => {
    test("inits to false", () => {
      expect(store.hasAnyAttributeFilters()).toBe(false)
    })

    test("returns true after an attribute filter is set", () => {
      const attribute = _first(_keys(datatableAttributes))
      store.filters[attribute].value = "foo"
      expect(store.hasAnyAttributeFilters()).toBe(true)
    })
  })

  describe("hasAnyCategoryFilters", () => {
    test("inits to false", () => {
      expect(store.hasAnyAttributeFilters()).toBe(false)
    })

    test("returns true after a category filter is set", () => {
      const attribute = _first(_keys(optionsAttributes))
      store.filters[attribute].value = "foo"
      expect(store.hasAnyAttributeFilters()).toBe(true)
    })
  })

  describe("hasAnyFilters", () => {
    test("inits to false", () => {
      expect(store.hasAnyAttributeFilters()).toBe(false)
    })

    test("returns true after global filter is set", () => {
      store.filters.global.value = "foo"
      expect(store.hasAnyFilters()).toBe(true)
    })

    test("returns true after a category filter is set", () => {
      const attribute = _first(_keys(optionsAttributes))
      store.filters[attribute].value = "foo"
      expect(store.hasAnyFilters()).toBe(true)
    })

    test("returns true after a name filter is set", () => {
      const attribute = _first(_keys(nameAttributes))
      store.filters[attribute].value = "foo"
      expect(store.hasAnyFilters()).toBe(true)
    })
  })
})

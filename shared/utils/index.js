import { concat, difference, includes, map, reduce, set } from "lodash-es"
import { FilterMatchMode } from "@primevue/core/api"

const nameAttributes = [ "faeName", "mortalName" ]
const richTextAttributes = [ "description", "notes" ]

const optionsAttributes = [
  "player",
  "kith",
  "house",
  "bannerhouse",
  "seeming",
  "rank",
  "location",
  "position"
]

// for filter Listboxes: optionsAttributes except house and bannerhouse
const categoryAttributes = difference(optionsAttributes, [ "house", "bannerhouse" ])

// for datatable: name and category attributes
const listAttributes = concat(nameAttributes, categoryAttributes)

// for global filter
const plainTextAttributes = map(richTextAttributes, (attribute) => `${attribute}PlainText`)
const globalFilterAttributes = concat(nameAttributes, optionsAttributes, plainTextAttributes)

// for datatable filters
const filtersAttributes = concat(listAttributes, "global")

// for create/edit forms
const apiAttributes = concat(
  map(nameAttributes, (attr) => ({ attribute: attr, type: "text" })),
  map(optionsAttributes, (attr) => ({ attribute: attr, type: "autocomplete" })),
  map(richTextAttributes, (attr) => ({ attribute: attr, type: "richText" }))
)

const emptyCharacter = reduce(
  apiAttributes,
  (accumulator, { attribute, type }) => {
    if (type === "richText") {
      return set(accumulator, attribute, "")
    } else {
      return set(accumulator, attribute, null)
    }
  },
  {}
)

const emptyFilters = reduce(
  filtersAttributes,
  (accumulator, attribute) => {
    if (includes(categoryAttributes, attribute)) {
      return set(accumulator, attribute, { value: [], matchMode: FilterMatchMode.IN })
    } else {
      return set(accumulator, attribute, { value: "", matchMode: FilterMatchMode.CONTAINS })
    }
  },
  {}
)

export {
  richTextAttributes,
  plainTextAttributes,
  listAttributes,
  optionsAttributes,
  apiAttributes,
  globalFilterAttributes,
  categoryAttributes,
  emptyCharacter,
  emptyFilters
}

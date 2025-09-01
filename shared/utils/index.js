import { concat, difference, fromPairs, includes, map, reduce } from "lodash-es"
import { FilterMatchMode } from "@primevue/core/api"

const attributes = [
  "faeName",
  "mortalName",
  "player",
  "kith",
  "house",
  "bannerhouse",
  "seeming",
  "rank",
  "location",
  "position"
]

const nameAttributes = [ "faeName", "mortalName" ]
const omitFromList = [ "house", "bannerhouse" ]

export const richTextAttributes = [ "description", "notes" ]
export const plainTextAttributes = map(richTextAttributes, (attribute) => `${attribute}PlainText`)

// for datatable, all detail attributes except house and bannerhouse
export const listAttributes = difference(attributes, omitFromList)

// for autocomplete, all detail attributes except names
export const optionsAttributes = difference(attributes, nameAttributes)

// for create/edit
export const apiAttributes = concat(
  map(nameAttributes, (attr) => ({ attribute: attr, type: "text" })),
  map(optionsAttributes, (attr) => ({ attribute: attr, type: "autocomplete" })),
  map(richTextAttributes, (attr) => ({ attribute: attr, type: "richText" }))
)

// for global filter
export const globalFilterAttributes = concat(nameAttributes, optionsAttributes, plainTextAttributes)

// for attribute filters, all list attributes except names
export const categoryAttributes = difference(listAttributes, nameAttributes)

export const emptyCharacter = fromPairs(
  map(apiAttributes, ({ attribute, type }) => {
    return [
      attribute,
      (type === "richText") ? "" : null
    ]
  })
)

export const emptyFilters = reduce(
  listAttributes,
  (filters, attribute) => {
    if (includes(categoryAttributes, attribute)) {
      // category attribute
      filters[attribute] = {
        value: [],
        matchMode: FilterMatchMode.IN
      }
    } else {
      filters[attribute] = {
        value: "",
        matchMode: FilterMatchMode.CONTAINS
      }
    }

    // add global field
    filters['global'] = {
      value: "",
      matchMode: FilterMatchMode.CONTAINS
    }

    return filters
  },
  {}
)

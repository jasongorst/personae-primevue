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
export const plainTextAttributes = _map(richTextAttributes, (attribute) => `${attribute}PlainText`)

// for datatable, all detail attributes except house and bannerhouse
export const listAttributes = _difference(attributes, omitFromList)

// for autocomplete, all detail attributes except names
export const optionsAttributes = _difference(attributes, nameAttributes)

// for create/edit
export const apiAttributes = _concat(
  _map(nameAttributes, (attr) => ({ attribute: attr, type: "text" })),
  _map(optionsAttributes, (attr) => ({ attribute: attr, type: "autocomplete" })),
  _map(richTextAttributes, (attr) => ({ attribute: attr, type: "richText" }))
)

// for global filter
export const apiAttributesList = _concat(nameAttributes, optionsAttributes, plainTextAttributes)

// for attribute filters, all list attributes except names
export const categoryAttributes = _difference(listAttributes, nameAttributes)

export const emptyCharacter = _fromPairs(
  _map(apiAttributes, ({ attribute }) => [ attribute, null ])
)

export const emptyFilters = _reduce(
  listAttributes,
  (filters, attribute) => {
    if (_includes(categoryAttributes, attribute)) {
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

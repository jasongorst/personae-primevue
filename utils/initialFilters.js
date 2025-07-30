import { FilterMatchMode } from "@primevue/core/api"

export default _reduce(
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
        matchMode: FilterMatchMode.STARTS_WITH
      }
    }

    // add global field
    filters['global'] = {
      value: null,
      matchMode: FilterMatchMode.CONTAINS
    }

    return filters
  },
  {}
)

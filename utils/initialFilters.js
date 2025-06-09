import { FilterMatchMode } from "@primevue/core/api"

export default  _reduce(listAttributes, (acc, attribute) => {
  if (_includes(categoryAttributes, attribute)) {
    // category attribute
    acc[attribute] = {
      value: [],
      matchMode: FilterMatchMode.IN
    }
  } else {
    acc[attribute] = {
      value: "",
      matchMode: FilterMatchMode.STARTS_WITH
    }
  }

  return acc
}, {})

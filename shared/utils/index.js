// import mapObject from "shared/utils/mapObject.js"

const nameAttributes = ["faeName", "mortalName"]
const richTextAttributes = ["description", "notes"]

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
const categoryAttributes = _difference(optionsAttributes, [
  "house",
  "bannerhouse"
])

// for datatable: name and category attributes
const listAttributes = _concat(nameAttributes, categoryAttributes)

// for global filter
const plainTextAttributes = _map(
  richTextAttributes,
  (attribute) => `${attribute}PlainText`
)

const globalFilterAttributes = _concat(
  nameAttributes,
  optionsAttributes,
  plainTextAttributes
)

// for datatable filters
const filtersAttributes = _concat(listAttributes, "global")

// for create/edit forms
const schemaAttributes = _concat(
  _map(nameAttributes, (attr) => ({ attribute: attr, type: "text" })),
  _map(optionsAttributes, (attr) => ({
    attribute: attr,
    type: "autocomplete"
  })),
  _map(richTextAttributes, (attr) => ({ attribute: attr, type: "richText" }))
)

const schemaAttributesList = _map(
  schemaAttributes,
  ({ attribute }) => attribute
)

const emptyCharacter = mapObject(schemaAttributesList, () => "")

export {
  categoryAttributes,
  emptyCharacter,
  filtersAttributes,
  globalFilterAttributes,
  listAttributes,
  optionsAttributes,
  plainTextAttributes,
  richTextAttributes,
  schemaAttributes,
  schemaAttributesList
}

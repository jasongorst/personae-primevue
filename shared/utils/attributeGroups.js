export const categoryAttributes = _pickBy(characterAttributes, {
  type: "autocomplete"
})

export const datatableAttributes = _pickBy(characterAttributes, {
  showColumn: true
})

export const optionsAttributes = _pickBy(datatableAttributes, {
  type: "autocomplete"
})

export const globalFilterFields = _map(
  characterAttributes,
  ({ type }, attribute) =>
    type === "richText" ? `${attribute}PlainText` : attribute
)

export const nameAttributes = _pickBy(characterAttributes, { type: "text" })
